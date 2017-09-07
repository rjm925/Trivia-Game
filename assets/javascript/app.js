var correct = 0;
var incorrect = 0;
var items = ["infinityedge.png", "deathcap.png", "sunfire.png", "frozenheart.png", "frozenfist.png", "triforce.png", "frozenmallet.png"];
var answers = ["Infinity Edge", "Rabadon's Deathcap", "Sunfire Cape", "Frozen Heart", "Iceborn Gauntlet", "Trinity Force", "Frozen Mallet"];
var optionA = ["Excalibur", "Rabadon's Deathcap", "Veil of Discord", "Frozen Staff", "Thousand Years of Pain", "Delta Sword", "Frozen Mallet"];
var optionB = ["Yellow Sword Thingy", "Wooglet's Witchcap", "Invisibility Cloak", "Frozen Heart", "Iceborn Gauntlet", "Guardian Angel", "Mjolnir"];
var optionC = ["Infinity Edge", "Sorting Hat", "Sunfire Cape", "Rylai's Crystal Scepter", "Wolverine Fist", "Ethereal Blade", "Guardian's Hammer"];
var optionD = ["Zeal", "Hood of Defiance", "Phoenix Armor", "Glacial Shroud", "Frozen Fist", "Trinity Force", "Hammer of Justice"];
var unanswered = items.length;
var check = ["C", "A", "C", "B", "B", "D", "A"];
var i = 0;
var number = 5;
var intervalId;

$("#restart").hide();

$("#start").on("click", function() {
  $("#start").hide();
  $("#timer").html("<h2>Time Remaining: 5 seconds</h2>");
  run();
  ask(i);
});

$("#restart").on("click", function() {
  $("#restart").hide();
  i = 0;
  correct = 0;
  incorrect = 0;
  unanswered = items.length;
  $("#main").empty();
  $("#start").show();
});

function run() {
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $("#timer").html("<h2>Time Remaining: " + number + " seconds</h2>");
  if (number === 0) {
      stop();
      $("#main").html("<p>Out of Time!</p>");
      $("#main").append("<p>The Correct Answer was: " + answers[i] + "</p>");
      setTimeout(quiz, 3000);   
  }
}

function stop() {
  clearInterval(intervalId);
}

function ask(q) {
  $("#main").empty();
  var image = $("<img>");
  image.attr("src", "assets/images/" + items[q]);
  var first = $("<p>");
  first.addClass("option");
  first.attr("value", "A");
  first.append(optionA[q]);
  var second = $("<p>");
  second.addClass("option");
  second.attr("value", "B");
  second.append(optionB[q]);
  var third = $("<p>");
  third.addClass("option");
  third.attr("value", "C");
  third.append(optionC[q]);
  var fourth = $("<p>");
  fourth.addClass("option");
  fourth.attr("value", "D");
  fourth.append(optionD[q]);
  $("#main").append(image);
  $("#main").append("<br><br>");
  $("#main").append(first);
  $("#main").append(second);
  $("#main").append(third);
  $("#main").append(fourth);

  $(".option").on("click", function() {
    var answer = $(this).attr("value");
    stop();
    if (answer === check[i]) {
      correct++;
      unanswered--;
      $("#main").html("<p>Correct!</p>");
      setTimeout(quiz, 3000);
    }
    else {
      incorrect++;
      unanswered--;
      $("#main").html("<p>Nope!</p>");
      $("#main").append("<p>The Correct Answer was: " + answers[i] + "</p>");
      setTimeout(quiz, 3000);
    }
  });
}

function quiz() {
  i++;
  number = 5;
  if (i === items.length) {
    end();
  }
  else {
    $("#timer").html("<h2>Time Remaining: 5 seconds</h2>");
    run();
    ask(i);
  }
}

function end() {
  stop();
  $("#timer").empty();
  $("#main").empty();
  $("#main").append("<h2><b>All Done!</b></h2><br><br>");
  $("#main").append("<p id='right'>Correct Answers: " + correct + "</p>");
  $("#main").append("<p id='wrong'>Incorrect Answers: " + incorrect + "</p>");
  $("#main").append("<p id='blank'>Unanswered: " + unanswered + "</p>");
  $("#restart").show();
}