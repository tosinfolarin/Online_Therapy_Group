


//This is our OOP. using class to handle therapist routes currently we have two routes..
class TherapistController {
    constructor(docs) {
        this.docs = docs;
    }

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
}

module.exports = TherapistController;
