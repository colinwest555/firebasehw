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
   var trainName = $("#train-name-input").val().trim();
   var destination = $("#role-input").val().trim();
   var firstTrain = $("#start-input").val().trim();
   var frequency = $("#rate-input").val().trim();
    var timeLeft = (frequency + firstTrain)
   var startTime;
   

   // Creates local “temporary” object for holding employee data
   var newEmp = {
     name: trainName,
     role: destination,
     start: firstTrain,
     rate: frequency,
     mins:timeLeft
   };

   // Uploads employee data to the database
   database.ref().push(newEmp);



   alert("Train successfully added");

   // Clears all of the text-boxes
   $("#train-name-input").val("");
   $("#role-input").val("");
   $("#start-input").val("");
   $("#rate-input").val("");
 });

 // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot) {
 
   
    var timeLeft = (frequency + firstTrain)

   var trainName = childSnapshot.val().name;
   var destination = childSnapshot.val().role;
   var firstTrain = childSnapshot.val().start;
   var frequency = childSnapshot.val().rate;
   var timeLeft = childSnapshot.val().mins;

   

 



   var empMonths = moment().format('LT');



   var newRow = $("<tr>").append(
     $("<td>").text(trainName),
     $("<td>").text(destination),
     $("<td>").text(frequency ),
     $("<td>").text(firstTrain),
     //$("<td>").text(firstTrain),
     $("<td>").text(timeLeft),
   
   );

   // Append the new row to the table
   $("#employee-table > tbody").append(newRow);
 });