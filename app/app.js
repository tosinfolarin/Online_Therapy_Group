// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use('./app/views', express.static("views"));

app.use('/assets', express.static("assets"));

// Get the functions in the db.js file to use
const db = require('./services/db');

//This ensures that we can use the POST parameter
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static("assets"));

const { User } = require("./models/user");

const { Patient } = require('./models/patients.js');



// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));






const TherapistController = require('./models/Therapistcontrol');
const therapistController = new TherapistController(db);

app.get('/online-therapy', (req, res) => therapistController.getAllTherapists(req, res));
app.get('/singledoc/:Therapist_Reg_No', (req, res) => therapistController.getSingleTherapist(req, res));

 //Create a route for root
 app.get("/home", function(req, res) {
     res.render("index");
 });

// Create a route for root - /
 app.get("/", function(req, res) {
     res.render("index", {'title':'My index page', 'heading':'My heading'});
 });


 //WELCOME BACK MESSAGE AFTER LOGIN

//  // Create a route for root - /
// app.get("/", function(req, res) {
//   console.log(req.session);
//   if (req.session.uid) {
//   res.send('Welcome back, ' + req.session.uid + '!');
// } else {
//   res.send('Please login to view this page!');
// }
// res.end();
// });









// When users click on the sign in button they are able to sign in
app.get("/notes", function(req, res) {
  res.render("notes");
});





// When users click on the sign in button they are able to sign in
app.get("/signin.html", function(req, res) {
    res.render("signin");
  });

// When users click on the sign up button from the sign in page they are able to sign up
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

// When users click on the Profile page, their profile shows
  app.get("/profile.html", function(req, res) {
    res.render("profile");
  });

// When users click on the therapists button, they see the list of therapists
app.get("/Therapists.html", function(req, res) {
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

   

});

app.get("/all-patients", function(req, res) {
  var sql = 'SELECT PatientID, PtName AS Patient_Name, PtDOB AS Date_of_Birth, PtPhoneNo AS Phone_Number, PtEmail AS Email FROM Patients';
  db.query(sql).then(results => {
    console.log(results);
    res.send(results);
  });
});

   
  app.get("/all-patients-formatted", function(req, res) {
    var sql = 'SELECT PatientID, PtName AS Patient_Name, PtDOB AS Date_of_Birth, PtPhoneNo AS Phone_Number, PtEmail AS Email FROM Patients';
    db.query(sql) .then(results => {
      res.render('all-patients', {data: results});
      })
  });
  


// // Single patient page.  Show the students name, course and modules
// app.get("/single-patient/:PatientID", async function (req, res) {
//   var patientID = req.params.PatientID;
//   console.log(patientID);

//   // Query to get the patient's information and their consultation details
//   var patientSql = "SELECT Patients.PtName AS Patient_Name, Consultations.ConsultationID, Consultations.C_Type AS Consultation_Type, \
//   Consultations.C_Date AS Consultation_Date, Consultations.C_Time AS Consultation_Time, Consultations.C_Duration AS Consultation_Duration, \
//   Therapist.TherapistName AS Therapist_Name FROM Patients \
//   JOIN Consultations ON Patients.PatientID = Consultations.PatientID \
//   JOIN Therapist ON Consultations.Therapist_Reg_No = Therapist.Therapist_Reg_No \
//   WHERE Patients.PatientID = ?;";

//   var patientResult = await db.query(patientSql, [patientID]);
//   console.log(patientResult);

//   // Get the consultations for this patient using the patientID
//   var modSql = "SELECT * FROM Consultations \
//   JOIN Patients ON Consultations.PatientID = Patients.PatientID \
//   WHERE Consultations.PatientID = ?";

//   var modResult = await db.query(modSql, [patientID]);
//   console.log(modResult);

//   // Send the result as JSON object
//   res.json({ patient: patientResult, consultations: modResult });
// });





app.get("/single-patient/:id", async function (req, res) {
  const patientID = req.params.id;
  // Create a patient class with the ID passed
  const patient = new Patient(patientID);
  // Retrieve all patient information
  await patient.getPatientInfo();
  console.log(patient);
  res.render('patient', { patient: patient });
});



app.post('/add-note', async function (req, res) {
  const params = req.body;
  const patientID = params.id; // Get patient ID from the request body
  const note = params.note; // Get note from the request body

  try {
    const patient = new Patient(patientID); // Instantiate Patient object with patientID
    await patient.addPatientNote(note); // Add note to patient
    res.send('Note added successfully'); // Send success response
  } catch (err) {
    console.error(`Error while adding note: `, err.message);
    res.status(500).send('Error while adding note'); // Send error response
  }
});




//   app.post('/add-note', async function (req, res) {
//     params = req.body;
//     // Adding a try/catch block which will be useful later when we add to the database
//     var PatientID = new Patient(params.id);
//     try {
//          await patient.addPatientNote(params.note);
//          res.send('form submitted');
//         }
//      catch (err) {
//          console.error(`Error while adding note `, err.message);
//      }
//      // Just a little output for now
//      res.send('form submitted');

// });


// app.post('/add-note', function (req, res) {
//   // Adding a try/catch block which will be useful later when we add to the database
//   try {
//       // Just a console.log for now to check we are receiving the form field values
//       console.log(req.body);
//    } catch (err) {
//        console.error(`Error while adding note `, err.message);
//    }
//    // Just a little output for now
//    res.send('form submitted');

// });



  app.get("/therapists", function(req, res) {
    var sql = 'select * from Therapist';
     db.query(sql).then(results => {
         console.log(results);
         res.send(results)
     });
 });




 app.get("/", function(req, res) {
  res.render("signin");
});

// // This is my profile page for the online therapy
// app.get("/profilepage", function(req, res) {
//     res.render('profile')
// });

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










app.get("/doctordetails/:Therapist_Reg_No", function(req,res){
    var docsId = req.params.Therapist_Reg_No;
    var docsql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = 'Johnny Depp'";
    db.query(docsql, [docsId]).then(results =>{
       res.render('jd',{results:results} );
    });
});


// Register
app.get('/signup', function (req, res) {
  res.render('signup');
});

// If the email is matches an email in the database
// a new password is set, if not then a new user is added

app.post('/signup', async function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          // If a valid, existing user is found, set the password and redirect to the users single-student page
          await user.setUserPassword(params.password);
          // console.log(req.session.id);
          // res.send('Password set successfully');
          // res.redirect('/profile.html/' + uId); // TRY TO INCORPORATE THIS
          res.redirect('/profile.html/');
      }
      else {
          // If no existing user is found, add a new one
          newId = await user.addUser(params.email);
          res.send('/signup.html');
      }
  } catch (err) {
      console.error(`Error while adding password `, err.message);
  }
});





// Login
app.get('/signin', function (req, res) {
  res.render('signin');
});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          match = await user.authenticate(params.password);
          if (match) {
              req.session.uId = uId;
              req.session.loggedIn = true;
              req.session.userName = user.name;
              console.log(req.session.id);
              // res.redirect('/profile.html/' + uId);
              res.redirect('/profile.html/');
          }
          else {
              // TODO improve the user journey here
              res.send('invalid password');
          }
      }
      else {
          res.send('invalid email');
      }
  } catch (err) {
      console.error(`Error while comparing `, err.message);
  }
});




// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/signin');
});





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
