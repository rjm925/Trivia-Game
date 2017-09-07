var correct = 0;
var incorrect = 0;
var items = ["infinityedge.png", "deathcap.png", "sunfire.png", "frozenheart.png", "frozenfist.png", "triforce.png", "frozenmallet.png"];
var answers = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];
var optionA = ["Excalibur", "Rabadon's Deathcap", "Veil of Discord", "Frozen Staff", "Thousand Years of Pain", "Delta Sword", "Frozen Mallet"];
var optionB = ["Yellow Sword Thingy", "Wooglet's Witchcap", "Invisibility Cloak", "Frozen Heart", "Iceborn Gauntlet", "Guardian Angel", "Mjolnir"];
var optionC = ["Infinity Edge", "Sorting Hat", "Sunfire Cape", "Rylai's Crystal Scepter", "Wolverine Fist", "Ethereal Blade", "Guardian's Hammer"];
var optionD = ["Zeal", "Hood of Defiance", "Phoenix Armor", "Glacial Shroud", "Frozen Fist", "Trinity Force", "Hammer of Justice"];
var unanswered = items.length;
var userAnswer = [];
var check = ["C", "A", "C", "B", "B", "D", "A"];

$("#start").on("click", function() {
  $("#start").hide();
  $("#timer").html("<h2>Time Remaining: 30 seconds</h2>");
  var i = 0;
  var number = 30;
  var intervalId;

  function run() {
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    number--;
    $("#timer").html("<h2>Time Remaining: " + number + " seconds</h2>");
    if (number === 0) {
      if (i === items.length-1) {
        stop();
      }
      else {
        $("#timer").html("<h2>Time Remaining: 30 seconds</h2>");
        i++;
        ask(i);
        number = 30; 
      }      
    }
  }

  function stop() {
    clearInterval(intervalId);
  }

  run();
  ask(i);
});

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
  });
}