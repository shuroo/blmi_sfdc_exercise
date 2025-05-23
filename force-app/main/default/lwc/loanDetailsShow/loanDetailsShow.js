import { LightningElement, track, wire } from 'lwc';
import getLoanDetails from '@salesforce/apex/LoanRequestController.getLoanDetails';

export default class LoanDetailsD extends LightningElement {
    @track loanId = ''; // To hold the input loan ID
    @track loanData; // To hold the loan details
    @track error; // To hold any errors
    @track isLoading = false; // To control the loading spinner

     @wire(getLoanDetails, { loanId: '$recordId' }) // Assuming you have a recordId property
    wiredLoanRequest({ error, data }) {
        if (data) {
            this.loanData = data; // Assign the fetched data to loanData
            this.error = undefined; // Clear any previous errors
        } else if (error) {
            this.error = error; // Assign the error to the error property
            this.loanData = undefined; // Clear loanData on error
        }
    }

    navigate(actionName){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.loanId,
                objectApiName: 'Loan_Request__c',
                actionName: actionName
            }
        });
    }
    handleEdit(){
        this.navigate('edit');
    }

    handleBack(){
        this.navigate('view');
    }

}
