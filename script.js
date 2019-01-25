var config = {
    apiKey: "AIzaSyDL_t17u2R1ggZKJiP9QBMA1Ee6rFobISE",
    authDomain: "trainscheduler555.firebaseapp.com",
    databaseURL: "https://trainscheduler555.firebaseio.com",
    projectId: "trainscheduler555",
    storageBucket: "trainscheduler555.appspot.com",
    messagingSenderId: "675355052374"
  };
  firebase.initializeApp(config);
 
  var database = firebase.database();
 $("#submit-button").on("click", function(event) {
   event.preventDefault();

   // Grabs user input
   var empName = $("#employee-name-input").val().trim();
   var empRole = $("#destination-input").val().trim();
   var empStart = $("#start-input").val().trim();
   var empRate = $("#rate-input").val().trim();

   // Creates local “temporary” object for holding employee data
   var newEmp = {
     name: empName,
     destination: empRole,
     start: empStart,
     rate: empRate
   };

   // Uploads employee data to the database
   database.ref().push(newEmp);



   alert("Train successfully added");

   // Clears all of the text-boxes
   $("#employee-name-input").val("");
   $("#destination-input").val("");
   $("#start-input").val("");
   $("#rate-input").val("");
 });

 // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot) {
 
   


   // Store everything into a variable.
   var empName = childSnapshot.val().name;
   var empRole = childSnapshot.val().role;
   var empStart = childSnapshot.val().startDate;
   var empRate = childSnapshot.val().rate;

   

   
   var empMonths = moment().format('LT');

   // Calculate the total billed rate
 
   // Create the new row
   var newRow = $("<tr>").append(
     $("<td>").text(empName),
     $("<td>").text(empRole),
     $("<td>").text(empRate),
     $("<td>").text(empMonths),
     $("<td>").text(),
   
   );

   // Append the new row to the table
   $("#employee-table > tbody").append(newRow);
 });