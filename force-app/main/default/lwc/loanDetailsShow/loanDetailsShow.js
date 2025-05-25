import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getLoanRequestDetails from '@salesforce/apex/LoanRequestController.getLoanDetails';  

export default class LoanDetailsShow extends NavigationMixin(LightningElement) {
    @track loanData;  
    @track error; 

    @api recordId;  

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
        
        this[NavigationMixin.Navigate]({
            type: 'standard__app',
            attributes: {
                 appTarget: 'BLeumi_Lightening_App_Page' 
            }
        });
    }
}