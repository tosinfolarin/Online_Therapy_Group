class Consultation {
    constructor(consultationID, consultationDate, patient, therapist, notes) {
      this.consultationID = consultationID;
      this.consultationDate = consultationDate;
      this.patient = patient; 
      this.therapist = therapist;
      this.notes = notes;
    }
  
    // Function to retrieve consultation details
    getConsultationDetails() {
      return {
        consultationID: this.consultationID,
        consultationDate: this.consultationDate,
        patient: this.patient.getPatientInfo(),
        therapist: this.therapist.getTherapistInfo(),
        notes: this.notes,
      };
    }
  }