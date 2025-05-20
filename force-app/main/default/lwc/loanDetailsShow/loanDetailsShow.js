import { LightningElement, track } from 'lwc';
import getLoanDetails from '@salesforce/apex/LoanRequestController.getLoanDetails';

export default class LoanDetailsD extends LightningElement {
    @track loanId = ''; // To hold the input loan ID
    @track loanData; // To hold the loan details
    @track error; // To hold any errors
    @track isLoading = false; // To control the loading spinner

    handleInputChange(event) {
        this.loanId = event.target.value; // Capture the loan ID from input
    }

    loadLoanDetails() {
        this.isLoading = true; // Show the spinner
        this.error = null; // Clear previous errors
        getLoanDetails({ loanId: this.loanId }) // Call the Apex method to get loan details
            .then(result => {
                this.loanData = result;
                this.isLoading = false; // Hide the spinner after data is retrieved
            })
            .catch(error => {
                this.error = error.body.message;
                this.isLoading = false; // Hide the spinner
            });
    }
}
