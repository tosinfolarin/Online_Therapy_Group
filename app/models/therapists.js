// Get the functions in the db.js file to use
const db = require('./../services/db');

class Therapist {
    constructor(therapistsName, therapistRegistrationNumber, therapistPhoneNumber, experience, speciality, approach, availability, notes) {
        this.therapistsName = therapistsName; 
        this.therapistPhoneNumber = therapistPhoneNumber; 
        this.therapistRegistrationNumber = therapistRegistrationNumber;
        this.experience = experience;
        this.speciality = speciality;
        this.approach = approach;
        this.availability = availability;
        this.notes = notes;
    }

    getTherapistInfo() {
        return {
            therapistRegistrationNumber: this.therapistRegistrationNumber,
            therapistPhoneNumber: this.therapistPhoneNumber,
            name: this.therapistsName, 
            experience: this.experience,
            speciality: this.speciality,
            approach: this.approach,
            availability: this.availability,
            notes: this.notes,
        };
    }
}
