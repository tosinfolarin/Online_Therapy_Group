


//This is our OOP. using class to handle therapist routes currently we have two routes..
class TherapistController {

    //Note -- This was added in conjunction with the video by Lisa
    note;


    constructor(docs) {
        this.docs = docs;
    }

    //Note
    note;

    // Route for /online-therapy
    async getAllTherapists(req, res) {
        
            var sql = 'SELECT TherapistName, Therapist_Reg_No FROM Therapist';
            var results = await this.docs.query(sql);
            res.render('docsmainpage', { results: results });
        
    }

    // Route for /singledoc/:Therapist_Reg_No
    async getSingleTherapist(req, res) {
    
            var therapistRegNo = req.params.Therapist_Reg_No;
            var sql = 'SELECT * FROM Therapist WHERE TherapistName = ?';
            var results = await this.docs.query(sql, [therapistRegNo]);
            res.render('alldocs', { results: results });
        
    }



    // This has been added in conjunction with the tutorial from Lisa
    async addPatientNote (note) {
        var sql = "UPDATE Patients SET note = ? WHERE this.patientName = ?"
        const result = await db.query(sql, [note, this.id]);
        // Ensure the note property in the model is up to date
        this.note = note;
        return result;
    }
}

module.exports = TherapistController;
