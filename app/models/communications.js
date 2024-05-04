// Get the functions in the db.js file to use
const db = require('./../services/db');

class CommunicationLog {
    constructor(logID, typeOfCommunication, logDate, logTime, logContent) {
      this.logID = logID;
      this.typeOfCommunication = typeOfCommunication;
      this.logDate = logDate;
      this.logTime = logTime;
      this.logContent = logContent;
    }
  
    // Function to retrieve Journal details
    getJournalDetails() {
      return {
        logID: this.logID,
        typeOfCommunication: this.typeOfCommunication,
        logDate: this.logDate,
        logTime: this.logTime,
        logContent: this.logContent,
      };
    }
  }
