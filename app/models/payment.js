// Get the functions in the db.js file to use
const db = require('./../services/db');

class Payment {
    constructor(paymentID, paymentDate, paymentMethod, paymentTime, status) {
      this.paymentID = paymentID;
      this.paymentDate = paymentDate;
      this.paymentMethod = paymentMethod;
      this.paymentTime = paymentTime;
      this.status = status;
    }
  
    // Function to retrieve payment details
    getPaymentInfo() {
      return {
        paymentID: this.paymentID,
        paymentDate: this.paymentDate,
        paymentMethod: this.paymentMethod,
        paymentTime: this.paymentTime,
        status: this.status,
      };
    }
}