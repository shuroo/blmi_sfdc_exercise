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
            this.loanData = result; // Assuming the Apex method returns the created loan record
            this.isLoading = false; // Hide the spinner
            this.recordId = result.Id; // Capture the record ID of the created loan request
            this.navigateToRecord(result); // Navigate to the created record
        })
        .catch(error => {
            this.error = error.body.message; // Capture any errors
            this.isLoading = false; // Hide the spinner
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:  this.recordId, // The ID of the saved record
                objectApiName: 'Loan_Request__c', // Specify the object API name
                actionName: 'view' // Specify action to view the record
            }
        });
    }
}