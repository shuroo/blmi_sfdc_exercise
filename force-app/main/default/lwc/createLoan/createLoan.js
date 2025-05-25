import { LightningElement, track } from 'lwc';
import saveLoanRequest from '@salesforce/apex/LoanRequestController.saveLoanRequest'; // Apex method to save loan request
import { NavigationMixin } from 'lightning/navigation';

export default class CreateLoan extends NavigationMixin(LightningElement) {
    @track customerName = '';
    @track loanAmount;
    @track loanStatus = '';
    @track loanData; // To hold loan details 
    @track error; // To hold any errors
    @track isLoading = false; // To control loading spinner
    @track recordId; // To hold the record ID of the created loan request

    loanStatusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
    ];

   navigateToRecord(recordId) {

        console.log('Nagivate to view record of id:' + recordId); 

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId, // Replace with your actual record ID
                objectApiName: 'Loan_Request__c', // The object API name
                actionName: 'view' // Specify action as 'view'
            }
        });
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'customerName') {
            this.customerName = event.target.value;
        } else if (field === 'loanAmount') {
            this.loanAmount = event.target.value;
        } else if (field === 'loanStatus') {
            this.loanStatus = event.target.value;
        }
    }

    saveLoanRequest() {
        this.isLoading = true; // Show the spinner
        this.error = null; // Clear previous errors

        saveLoanRequest({ 
            customerName: this.customerName, 
            loanAmount: this.loanAmount, 
            loanStatus: this.loanStatus 
        })
        .then(result => { 
            var recordId = result.Id; // Capture the ID of the created loan request
            console.log('resultId- --- :'+ recordId);
               
            this.loanData = result; // Assuming the Apex method returns the created loan record
            this.isLoading = false; // Hide the spinner
            this.recordId = recordId; // Capture the record ID of the created loan request
            console.log('Loan Request Created with ID: ' + this.recordId);

             this.navigateToRecord(recordId); 

        })
        .catch(error => {   
            this.error = JSON.stringify(error); // Capture any errors
            this.isLoading = false; // Hide the spinner
            alert('Loan Request failed with error: ' + this.error);
        });
    };
}     