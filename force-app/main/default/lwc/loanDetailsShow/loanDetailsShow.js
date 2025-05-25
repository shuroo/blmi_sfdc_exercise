import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getLoanRequestDetails from '@salesforce/apex/LoanRequestController.getLoanDetails'; // Adjust based on your Apex method

export default class LoanDetailsShow extends NavigationMixin(LightningElement) {
    @track loanData; // To hold loan details
    @track error; // To hold any errors

    @api recordId; // Record ID passed to this component

    connectedCallback() {
        this.fetchLoanRequestDetails();
    }

    fetchLoanRequestDetails() {
        getLoanRequestDetails({ loanId: this.recordId })
            .then(result => {
                this.loanData = result; // Assign the fetched data to loanData
                this.error = undefined; // Clear any previous errors
            })
            .catch(error => {
                this.error = error.body.message; // Capture any errors
            });
    }

    handleBack() {
        // Logic to navigate back to the previous page, e.g., using NavigationMixin
        this[NavigationMixin.Navigate]({
            type: 'standard__app',
            attributes: {
                appTarget: 'YourAppName' // Replace with your app name
            }
        });
    }
}