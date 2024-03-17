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


// Create a route for root - /
app.get("/", function(req, res) {
    // Set up an array of data
    var test_data = ['one', 'two', 'three', 'four'];
    // Send the array through to the template as a variable called data
    res.render("index", 
                {'title':'My index page', 'heading':'My heading', 'data':test_data});
});


// app.get("/all-students", function(req, res) {
//     sql = 'select * from Students';
//     db.query(sql).then(results => {
//         let data = []
//         for(let i=0; i<results.length; i++){
//             res.write(results[i].name)
//         }
//         res.end()
//         console.log(data);
//     });
// });


app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
   var sql = 'select * from Therapist';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
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




app.get("/online-therapy", function(req, res) {
    var sql = 'SELECT DISTINCT T.Therapist_Reg_No, T.TherapistName, P.PatientID, P.PtName FROM Therapist T JOIN Patients P ON T.Therapist_Reg_No = P.Therapist_Reg_No';

    // Asynchronously execute the SQL query
    db.query(sql).then(results => {
        var output = '<table border="1px">';
        output += '<tr><th>Therapist Registration Number</th><th>Therapist Name</th><th>Patient ID</th><th>Patient Name</th></tr>';
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.Therapist_Reg_No + '</td>';
            output += '<td>' + row.TherapistName + '</td>';
            output += '<td>' + row.PatientID + '</td>';
            output += '<td>' + row.PtName + '</td>';
            output += '</tr>';
        }
        output += '</table>';
        res.send(output);
    }).catch(error => {
        // Handle any errors that occur during the database query
        console.error('Error fetching therapists linked to patients:', error);
        res.status(500).send('Error fetching therapists linked to patients');
    });
});




 app.get("/therapists", function(req, res) {
     // Assumes a table called test_table exists in your database
    var sql = 'select * from Therapist';
     db.query(sql).then(results => {
         console.log(results);
         res.send(results)
     });
 });

// Task 2 display a formatted list of students
/* app.get("/all-students-formatted", function(req, res) {
    var sql = 'select * from Students';
    // As we are not inside an async function we cannot use await
    // So we use .then syntax to ensure that we wait until the 
    // promise returned by the async function is resolved before we proceed
    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.id + '</td>';
            output += '<td>' + '<a href="./single-student/' + row.id + '">' + row.name + '</a>' + '</td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);
    });
});
 */









app.get("/single-student/:id", function(req, res) {
    var stId = req.params.id;
    var stSql = "SELECT s.name as student, ps.name as programme, \
    ps.id as pcode from Students s \
    JOIN Student_Programme sp on sp.id = s.id \
    JOIN Programmes ps on ps.id = sp.programme \
    WHERE s.Id = ?"
    var modSql = "SELECT * From Programme_Modules pm \
    JOIN Modules m on m.code = pm.module \
    WHERE programme = ?";
    db.query(stSql, [stId]).then(results => {
        console.log(results);
        var pCode = results[0].pcode;
        output = '';
        output += '<div><b>Student: </b>' + results[0].student; '</div>';
        output += '<div><b>Programme: </b>' + results[0].Programme; '</div>';
        
        // Now call database for the modules
        db.query(modSql, [pCode]).then(results => {
            output += '<table border="1px">';
            console.log(results);
            for (var row of results) {
                output += '<tr>';
                output += '<td>' + row.module + '</td>';
                output += '<td>' + row.name + '</td>';
                output += '</tr>'
            }
            output+= '</table>';
            res.send(output);
        });

    });
})


//Retrieving therapist information 
app.get("/online-therapy", function(req, res) {
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
    var sql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = ?";
    

    db.query(sql, ['Phoebe Prize']).then(results => {
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
    });
});

//Retrieving individual information from Susan Porter
app.get("/find-out-more-susan-porter", function(req, res) {
    var sql = "SELECT Therapist_Reg_No, TherapistName, Experience, Speciality, Approach, Availability FROM Therapist WHERE TherapistName = ?";
    

    db.query(sql, ['Susan Porter']).then(results => {
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
    });
});



// Task 2 display a formatted list of students
app.get("/all-students-formatted", function(req, res) {
    var sql = 'select * from Students';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('all-students', {data: results});
    });
});







// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        let data = []
        for(let i=0; i<results.length; i++){
            res.write(results[i].name)
        }
        res.end()
        console.log(data);
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/", function(req, res) {
    res.send("Hello world!");
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

// Start server on port 3000
app.listen(2000,function(){
    console.log(`Server running at http://127.0.0.1:2000/`);
});

