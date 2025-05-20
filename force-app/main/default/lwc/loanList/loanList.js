import { LightningElement, track, wire } from 'lwc';
import getLoanRequests from '@salesforce/apex/LoanRequestController.getLoanRequests'; // Apex method to get loan requests

export default class LoanList extends LightningElement {
    @track loanRequests; // To hold the list of loan requests
    @track error; // To hold any errors
    @track isLoading = true; // To control loading spinner
    sortedBy;
    sortedDirection;

    columns = [
        { label: 'Customer Name', fieldName: 'Customer__c', type: 'text' },
        { label: 'Loan Amount', fieldName: 'LoanAmount__c', type: 'currency' },
        { label: 'Loan Status', fieldName: 'LoanStatus__c', type: 'text' },
    ];

    @wire(getLoanRequests)
    wiredLoanRequests({ error, data }) {
        if (data) {
            this.loanRequests = data;
            this.isLoading = false; // Hide the spinner
        } else if (error) {
            this.error = error.body.message; // Capture any errors
            this.isLoading = false; // Hide the spinner
        }
    }
}