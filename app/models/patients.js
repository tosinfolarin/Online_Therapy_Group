// Get the functions in the db.js file to use
const db = require('./../services/db');

class Patient {
    constructor(patientID) {
        this.patientID = patientID;
        this.patientName = null;
        this.patientDOB = null;
        this.patientPhoneNumber = null;
        this.patientEmailAddress = null;
        this.note = null;
    }

    async getPatientInfo() {
        try {
            const patientName = await this.getPatientName();
            const patientDOB = await this.getPatientDOB();
            const patientPhoneNumber = await this.getPatientPhoneNumber();
            const patientEmailAddress = await this.getPatientEmailAddress();
            // const note = await this.addPatientNote();
    
            const patientInfo = {
                patientID: this.patientID,
                patientName,
                patientDOB,
                patientPhoneNumber,
                patientEmailAddress,
        
            };
            return patientInfo;
        } catch (error) {
            console.error("Error retrieving patient information:", error);
            throw error;
        }
    }
    


    async getPatientName() {
        if (!this.patientName) {
            const sql = "SELECT PtName FROM Patients WHERE PatientID = ?";
            const results = await db.query(sql, [this.patientID]);
            if (results.length > 0) {
                this.patientName = results[0].PtName;
            }
        }
        return this.patientName;
    }
    
    async getPatientDOB() {
        if (!this.patientDOB) {
            const sql = "SELECT PtDOB FROM Patients WHERE PatientID = ?";
            const results = await db.query(sql, [this.patientID]);
            if (results.length > 0) {
                this.patientDOB = results[0].PtDOB;
            }
        }
        return this.patientDOB;
    }
    
    async getPatientPhoneNumber() {
        if (!this.patientPhoneNumber) {
            const sql = "SELECT PtPhoneNo FROM Patients WHERE PatientID = ?";
            const results = await db.query(sql, [this.patientID]);
            if (results.length > 0) {
                this.patientPhoneNumber = results[0].PtPhoneNo;
            }
        }
        return this.patientPhoneNumber;
    }
    
    async getPatientEmailAddress() {
        if (!this.patientEmailAddress) {
            const sql = "SELECT PtEmail FROM Patients WHERE PatientID = ?";
            const results = await db.query(sql, [this.patientID]);
            if (results.length > 0) {
                this.patientEmailAddress = results[0].PtEmail;
            }
        }
        return this.patientEmailAddress;
    }


    //  async addPatientNote (note) {
    //     var sql = "UPDATE Patients SET Notes = ? WHERE PatientID = ?"
    //     const result = await db.query(sql, [note, this.id]);
    //     // Ensure the note property in the model is up to date
    //     this.note = note;
    //     return result;
    // }

    async addPatientNote (note) {
        // Check if note is provided
        if (note === undefined) {
            // If note is not provided, set it to null
            note = null;
        }
        var sql = "UPDATE Patients SET Notes = ? WHERE PatientID = ?";
        const result = await db.query(sql, [note, this.patientID]);
        // Ensure the note property in the model is up to date
        this.note = note;
        return result;
    }
    
}

module.exports = {
    Patient
}

