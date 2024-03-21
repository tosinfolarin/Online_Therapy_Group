// Import express.js
const express = require("express");


// Create express app
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');


// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');




const TherapistController = require('./models/Therapistcontrol');
const therapistController = new TherapistController(db);

app.get('/online-therapy', (req, res) => therapistController.getAllTherapists(req, res));
app.get('/singledoc/:Therapist_Reg_No', (req, res) => therapistController.getSingleTherapist(req, res));

// Create a route for root - /
// app.get("/", function(req, res) {
//     res.send("Hello Theo!");
// });

 //Create a route for root
 app.get("/home", function(req, res) {
     res.render("index");
 });

// Create a route for root - /
 app.get("/", function(req, res) {
     res.render("index", {'title':'My index page', 'heading':'My heading'});
 });











// This is my profile page for the online therapy
app.get("/profilepage", function(req, res) {
    res.render('profile')
});





app.get("/", function(req, res) {
        res.render("signin");
    });
    

// 



//Retrieving individual information from Johnny Depp
app.get("/find-out-more-johnny-depp", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Johnny Depp'";
    
    

    db.query(sql, ['Johnny Depp']).then(results => {
       
        res.render('doctors', {results:results});
    });
});

app.get("/doctordetails/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Johnny Depp'";
    db.query(docsql, [docsId]).then(results =>{
       res.render('jd',{results:results} );
    });
});




// app.get("/online-therapy", function(req, res) {
//     var sql = 'SELECT DISTINCT Therapist_Reg_No, TherapistName FROM Therapist';

//     // Asynchronously execute the SQL query
//     db.query(sql).then(results => {
//         var output = '<h1>List of Therapists</h1>';
//         output += '<ul>';
//         for (var row of results) {
//             output += '<li>' + row.Therapist_Reg_No + ': ' + row.TherapistName + '</li>';
//         }
//         output += '</ul>';
//         res.send(output);
//     }).catch(error => {
//         // Log the error to the console
//         console.error('Error fetching therapists:', error);
//         // Send an appropriate response with a status code of 500
//         res.status(500).send('Error fetching therapists');
//     });
// });
















//Retrieving individual information from Jane Carter
app.get("/find-out-more-jane-carter", function(req, res) {
    var sql2 = "SELECT * FROM Therapist WHERE TherapistName = 'jane Carter'";
    

    db.query(sql2, ['jane Carter']).then(results => {
        res.render('doctors2', {results:results});
    });
});

app.get("/jane-carter/:TherapistName", function(req,res){
    var docsId2 = req.params.TherapistName;
    var docsql2 = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Jane Carter'";
    db.query(docsql2, [docsId2]).then(results =>{
       res.render('jc',{results:results} );
    });
});

//Retrieving individual information from Thomas Appleby
app.get("/find-out-more-thomas-appleby", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Thomas Appleby'";
    

    db.query(sql, ['Thomas Appleby']).then(results => {
        res.render('doctors3', {results:results});
    });
});

app.get("/Thomas/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Thomas Appleby'";
    db.query(docsql, [docsId]).then(results =>{
       res.render('TA',{results:results} );
    });
});


    
//Retrieving individual information from Phoebe Price
app.get("/find-out-more-phoebe-prize", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Thomas App'";
    

    db.query(sql, ['Phoebe Prize']).then(results => {
       
            res.render('doctors4', {results:results});
    });
});

app.get("/phoebe/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Phoebe Prize'";
    db.query(docsql, [docsId]).then(results =>{
        res.render('pp', {results:results});
    })
})


//Retrieving individual information from Susan Porter
app.get("/find-out-more-susan-porter", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Susan Porter'";
    

    db.query(sql, ['Susan Porter']).then(results => {
        res.render('doctors5', {results:results});
    });
});

app.get("/susan/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Susan Porter'";
    db.query(docsql, [docsId]).then(results =>{
        res.render('sp', {results:results});
    })
})



//defining our routes without using the OOP. class please check the Models folder to see our OOP structure
/* app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT TherapistName, Therapist_Reg_No FROM Therapist';
    

    // we asynchronously executed the SQL query
    db.query(sql).then(results => {
        res.render('docsmainpage', {results:results});
    }).catch(error => {
        // Handle any errors that occur during the database query
        console.error('Error fetching therapists linked to patients:', error);
        res.status(500).send('Error fetching therapists linked to patients');
    });
});

app.get("/singledoc/:Therapist_Reg_No", function(req, res){
    var alldoc = req.params.Therapist_Reg_No;
    var alldocsql ="SELECT * from therapist  WHERE TherapistName = ?";


    
    
    db.query(alldocsql, [alldoc]).then(results =>{
       res.render('alldocs', {results:results})


    })
}); */




 app.get("/therapists", function(req, res) {
     // Assumes a table called test_table exists in your database
    var sql = 'select * from Therapist';
     db.query(sql).then(results => {
         console.log(results);
         res.send(results)
     });
 });

 app.get("/", function(req, res) {
  res.render("signin");
});


//TClasses

class Person {
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
    }
  }
  
  class Therapist extends Person {
    constructor(name, therapistRegistrationNumber, therapistPhoneNumber, experience, speciality, approach, availability, notes) {
      super(name);
      super(phoneNumber)
      this.therapistRegistrationNumber = therapistRegistrationNumber;
      this.therapistPhoneNumber = therapistPhoneNumber;
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
        name: this.name,
        phoneNumber: this.phoneNumber,
        experience: this.experience,
        speciality: this.speciality,
        approach: this.approach,
        availability: this.availability,
        notes: this.notes,
      };
    }
   
  }


  class Patient extends Person{
    constructor(patientID, name, patientDOB, patientPhoneNumber, patientEmailAddress) {
      this.patientID = patientID;
      super(name) = patientName;
      this.patientDOB = patientDOB;
      this.patientPhoneNumber = patientPhoneNumber;
      this.patientEmailAddress = patientEmailAddress;
    }
  
    // Function to retrieve patient information
    getPatientInfo() {
      return {
        patientID: this.patientID,
        name: this.name,
        patientDOB: this.patientDOB,
        patientPhoneNumber: this.patientPhoneNumber,
        patientEmailAddress: this.patientEmailAddress,
      };
    }
  }


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






        
//Retrieving therapist information 
/* app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist';

    db.query(sql).then(results => {
        var output = '<table border="1px">';
        output += '<tr><th>Therapist Registration Number</th><th>Therapist Name</th><th>Experience</th><th>Speciality</th><th>Preferred Approach</th><th>Availability</th></tr>';
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.Therapist_Reg_No + '</td>';
            output += '<td>' + row.TherapistName + '</td>';
            output += '<td>' + row.Experience + '</td>';
            output += '<td>' + row.Speciality + '</td>';
            output += '<td>' + row.Approach + '</td>';
            output += '<td>' + row.Availability + '</td>';
            output += '</tr>';
        }
        output += '</table>';
        res.send(output);
    })
}); */


//Retrieving individual information from Johnny Depp



       



// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/", function(req, res) {
    res.send("Hello online therapy world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 2000











        
       



//Retrieving therapist information 
/* app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist';

    db.query(sql).then(results => {
        var output = '<table border="1px">';
        output += '<tr><th>Therapist Registration Number</th><th>Therapist Name</th><th>Experience</th><th>Speciality</th><th>Preferred Approach</th><th>Availability</th></tr>';
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.Therapist_Reg_No + '</td>';
            output += '<td>' + row.TherapistName + '</td>';
            output += '<td>' + row.Experience + '</td>';
            output += '<td>' + row.Speciality + '</td>';
            output += '<td>' + row.Approach + '</td>';
            output += '<td>' + row.Availability + '</td>';
            output += '</tr>';
        }
        output += '</table>';
        res.send(output);
    })
}); */


//Retrieving individual information from Johnny Depp
/* app.get("/find-out-more-johnny-depp", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Johnny Depp'";
    
    

    db.query(sql, ['Johnny Depp']).then(results => {
       
        res.render('doctors', {results:results});
    });
});

app.get("/doctordetails/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Johnny Depp'";
    db.query(docsql, [docsId]).then(results =>{
       res.render('jd',{results:results} );
    });
});

 */


//Retrieving individual information from Jane Carter
/* app.get("/find-out-more-jane-carter", function(req, res) {
    var sql2 = "SELECT * FROM Therapist WHERE TherapistName = 'jane Carter'";
    

    db.query(sql2, ['jane Carter']).then(results => {
        res.render('doctors2', {results:results});
    });
});

app.get("/jane-carter/:TherapistName", function(req,res){
    var docsId2 = req.params.TherapistName;
    var docsql2 = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Jane Carter'";
    db.query(docsql2, [docsId2]).then(results =>{
       res.render('jc',{results:results} );
    });
}); */

//Retrieving individual information from Thomas Appleby
/* app.get("/find-out-more-thomas-appleby", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Thomas Appleby'";
    

    db.query(sql, ['Thomas Appleby']).then(results => {
        res.render('doctors3', {results:results});
    });
});

app.get("/Thomas/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Thomas Appleby'";
    db.query(docsql, [docsId]).then(results =>{
       res.render('TA',{results:results} );
    });
}); */




    
//Retrieving individual information from Phoebe Price
/* app.get("/find-out-more-phoebe-prize", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Thomas App'";
    

    db.query(sql, ['Phoebe Prize']).then(results => {
       
            res.render('doctors4', {results:results});
    });
});

app.get("/phoebe/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Phoebe Prize'";
    db.query(docsql, [docsId]).then(results =>{
        res.render('pp', {results:results});
    })
}) */


//Retrieving individual information from Susan Porter
/* app.get("/find-out-more-susan-porter", function(req, res) {
    var sql = "SELECT * FROM Therapist WHERE TherapistName = 'Susan Porter'";
    

    db.query(sql, ['Susan Porter']).then(results => {
        res.render('doctors5', {results:results});
    });
});

app.get("/susan/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Susan Porter'";
    db.query(docsql, [docsId]).then(results =>{
        res.render('sp', {results:results});
    })
})
 */



// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/", function(req, res) {
    res.send("Hello online therapy world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

//defining our routes without using the OOP. class
/* app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT TherapistName, Therapist_Reg_No FROM Therapist';
    

    // we asynchronously executed the SQL query
    db.query(sql).then(results => {
        res.render('docsmainpage', {results:results});
    }).catch(error => {
        // Handle any errors that occur during the database query
        console.error('Error fetching therapists linked to patients:', error);
        res.status(500).send('Error fetching therapists linked to patients');
    });
});

app.get("/singledoc/:Therapist_Reg_No", function(req, res){
    var alldoc = req.params.Therapist_Reg_No;
    var alldocsql ="SELECT * from therapist  WHERE TherapistName = ?";


    
    
    db.query(alldocsql, [alldoc]).then(results =>{
       res.render('alldocs', {results:results})


    })
}); */




 app.get("/therapists", function(req, res) {
     // Assumes a table called test_table exists in your database
    var sql = 'select * from Therapist';
     db.query(sql).then(results => {
         console.log(results);
         res.send(results)
     });
 });









        
//Retrieving therapist information 
/* app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist';

    db.query(sql).then(results => {
        var output = '<table border="1px">';
        output += '<tr><th>Therapist Registration Number</th><th>Therapist Name</th><th>Experience</th><th>Speciality</th><th>Preferred Approach</th><th>Availability</th></tr>';
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.Therapist_Reg_No + '</td>';
            output += '<td>' + row.TherapistName + '</td>';
            output += '<td>' + row.Experience + '</td>';
            output += '<td>' + row.Speciality + '</td>';
            output += '<td>' + row.Approach + '</td>';
            output += '<td>' + row.Availability + '</td>';
            output += '</tr>';
        }
        output += '</table>';
        res.send(output);
    })
}); */


//Retrieving individual information from Johnny Depp



       



// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/", function(req, res) {
    res.send("Hello online therapy world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 2000
app.listen(2000,function(){
    console.log(`Server running at http://127.0.0.1:2000/`);
});

