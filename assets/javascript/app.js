// Array of item images
const items = ["infinityedge.png", "deathcap.png", "sunfire.png", "frozenheart.png", "frozenfist.png", "triforce.png", "frozenmallet.png"];
// Array of correct answers
const answers = ["Infinity Edge", "Rabadon's Deathcap", "Sunfire Cape", "Frozen Heart", "Iceborn Gauntlet", "Trinity Force", "Frozen Mallet"];
// Array of first choice
const optionA = ["Excalibur", "Rabadon's Deathcap", "Veil of Discord", "Frozen Staff", "Thousand Years of Pain", "Delta Sword", "Frozen Mallet"];
// Array of second choice
const optionB = ["Yellow Sword Thingy", "Wooglet's Witchcap", "Invisibility Cloak", "Frozen Heart", "Iceborn Gauntlet", "Guardian Angel", "Mjolnir"];
// Array of third choice
const optionC = ["Infinity Edge", "Sorting Hat", "Sunfire Cape", "Rylai's Crystal Scepter", "Wolverine Fist", "Ethereal Blade", "Guardian's Hammer"];
// Array of fourth choice
const optionD = ["Zeal", "Hood of Defiance", "Phoenix Armor", "Glacial Shroud", "Frozen Fist", "Trinity Force", "Hammer of Justice"];

// Correct answer counter
let correct = 0;
// Incorrect answer counter
let incorrect = 0;
// Question tracker
let i = 0;
// Initial time
let seconds = 5;
// Interval tracker
let intervalId;
// Unanswered counter
let unanswered = items.length;

// Hide restart button on load
$("#restart").hide();

// Click event for start button
$("#start").on("click", function() {
  // Hide start button on click
  $("#start").hide();
  // Hide instructions
  $("#instructions").hide();
  // Show timer
  $("#timer").html("<h2>Time Remaining: 5 seconds</h2>");
  // Interval timer
  run();
  // Prompt question
  ask(i);
});

// Click event for restart button
$("#restart").on("click", function() {
  // Hide restart button on click
  $("#restart").hide();
  // Reset question tracker
  i = 0;
  // Reset correct counter
  correct = 0;
  // Reset incorrect counter
  incorrect = 0;
  // Reset unanswered counter
  unanswered = items.length;
  // Clear results
  $("#main").empty();
  // Show start button
  $("#start").show();
  // Show instructions
  $("#instructions").show();
});

// Timer
function run() {
  // Calls decrement function every second
  intervalId = setInterval(decrement, 1000);
}

// Decrease count
function decrement() {
  // Decrement seconds
  seconds--;
  // Display time remaining
  $("#timer").html("<h2>Time Remaining: " + seconds + " seconds</h2>");
  // Timer stops at 0
  if (seconds === 0) {
    // Call stop function
    stop();
    // Display message
    $("#main").html("<p>Out of Time!</p>");
    // Display correct answer
    $("#main").append("<p>The Correct Answer was: " + answers[i] + "</p>");
    // Display next question after 3 seconds
    setTimeout(quiz, 3000);   
  }
}

// Stop timer
function stop() {
  // Clears interval
  clearInterval(intervalId);
}

// Ask question q
function ask(q) {
  // Clear main div
  $("#main").empty();
  // Create image tag
  let image = $("<img>");
  // Add src for image
  image.attr("src", "assets/images/" + items[q]);
  // Create first option
  let first = $("<p>");
  // Add option class
  first.addClass("option");
  // Give tag a value attribute
  first.attr("value", optionA[q]);
  // Append option A
  first.append(optionA[q]);
  // Create second option
  let second = $("<p>");
  // Add option class
  second.addClass("option");
  // Give tag a value attribute
  second.attr("value", optionB[q]);
  // Append option B
  second.append(optionB[q]);
  // Create third option
  let third = $("<p>");
  // Add option class
  third.addClass("option");
  // Give tag a value attribute
  third.attr("value", optionC[q]);
  // Append option C
  third.append(optionC[q]);
  // Create fourth option
  let fourth = $("<p>");
  // Add option class
  fourth.addClass("option");
  // Give tag a value attribute
  fourth.attr("value", optionD[q]);
  // Append option D
  fourth.append(optionD[q]);
  // Display image
  $("#main").append(image);
  // Add space
  $("#main").append("<br><br>");
  // Append first option
  $("#main").append(first);
  // Append second option
  $("#main").append(second);
  // Append third option
  $("#main").append(third);
  // Append fourth option
  $("#main").append(fourth);

  // Click event for option class
  $(".option").on("click", function() {
    // Grabs answer in value attribute
    let answer = $(this).attr("value");
    // Stop timer
    stop();
    // User is correct
    if (answer === answers[i]) {
      // Increment correct counter
      correct++;
      // Decrement unanswered counter
      unanswered--;
      // Display message
      $("#main").html("<p>Correct!</p>");
      // Call quiz function after 3 seconds
      setTimeout(quiz, 3000);
    }
    // User is incorrect
    else {
      // Increment incorrect counter
      incorrect++;
      // Decrement unanswered counter
      unanswered--;
      // Display message
      $("#main").html("<p>Nope!</p>");
      // Display correct answer
      $("#main").append("<p>The Correct Answer was: " + answers[i] + "</p>");
      // Call quiz function after 3 seconds
      setTimeout(quiz, 3000);
    }
  });
}

// Function to ask next question
function quiz() {
  // Increment question couter
  i++;
  // Reset timer to 5
  seconds = 5;
  // No more questions
  if (i === items.length) {
    // Call end function
    end();
  }
  // Next question
  else {
    // Display initial timer
    $("#timer").html("<h2>Time Remaining: 5 seconds</h2>");
    // Start timer
    run();
    // Call function to ask next question
    ask(i);
  }
}

// Game over
function end() {
  // Stop timer
  stop();
  // Clear timer message
  $("#timer").empty();
  // Clear any messages
  $("#main").empty();
  // Append messages
  $("#main").append("<h2><b>All Done!</b></h2><br><br>");
  // Show number of correct answers
  $("#main").append("<p id='right'>Correct Answers: " + correct + "</p>");
  // Show number of incorrect answers
  $("#main").append("<p id='wrong'>Incorrect Answers: " + incorrect + "</p>");
  // Show number of unanswered questions
  $("#main").append("<p id='blank'>Unanswered: " + unanswered + "</p>");
  // Show restart button
  $("#restart").show();
}