const db = require('../services/db');

class Session {
    // Static function to add a new session booking
    static async bookSession(Therapist_Reg_No, firstName, lastName, age, email, phoneNumber, purposeOfSession, preferredTypeOfSession, preferredDateTime) {
        try {
            
            const sql = `
                INSERT INTO Booked_Session (Therapist_Reg_No, First_Name, Last_Name, Age, Email, Phone_Number, Purpose_of_Session, Preferred_Type_of_Session, Preferred_Time_and_Date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            
            await db.query(sql, [Therapist_Reg_No, firstName, lastName, age, email, phoneNumber, purposeOfSession, preferredTypeOfSession, preferredDateTime]);

            
            return true;
        } catch (error) {
          
            console.error("Error booking session:", error);
            return false;
        }
    }
}

module.exports = {
    Session
}
