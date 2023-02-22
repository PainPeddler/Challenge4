var time = 5*60; //time variable, first number is in units of minutes
var start = document.querySelector(".startBtn");
var choices = document.querySelector(".choices");
var initials = document.querySelector(".username");
var playAgain = document.querySelector(".playAgainBtn")
var count = -1;
var otherCount = 0; //used in highscores function
gameCompletion = false;
var score;
function countdown (){
    document.getElementById("minutes").style.visibility= "visible";
    document.getElementById("seconds").style.visibility= "visible";
var countdownTimer = setInterval(function() {
    var minutes = Math.floor((time/60) % 60);
    var seconds = Math.floor(time % 60);
    //console.log(seconds); //for testing only
    document.getElementById("minutes").innerHTML = minutes + ":";
    if (seconds < 10) {
        document.getElementById("seconds").innerHTML ="0"+ seconds 
    }
    else { 
    document.getElementById("seconds").innerHTML = seconds;
    }

    time = time-1;

    if (gameCompletion == true) {
        clearInterval(countdownTimer)
        
    }
    else if(time < 0){
    outOfTime();

    clearInterval(countdownTimer)
    }
    
}, 1000);
}

function examQ() {

document.getElementById("button").style.display = "none";
document.getElementById("Question").style.visibility = "visible";
document.getElementById("choices").style.visibility = "visible";
document.getElementById("scoreTracker").style.visibility = "hidden";
document.getElementById("initials").style.visibility = "hidden";
document.getElementById("playAgainBtn").style.visibility = "hidden";

var questions = ["How many possible values can a Boolean variable have?", "What are the primary types of loops used in programming?","Which of these does is NOT a block-level element?", "Which coding language is best suited for purely design/aethetics?"
,"What type of variable cannot be altered?", "What would the following line of code return in the console:\n console.log(0 == false);"];
var correctChoices= ["2","For & While", "span", "CSS", "constant","true"];
var incorrectChoices= ["1","3","4","Loop de loops", "Fruit Loops", "Left & Right"
, "article","section", "div", "Español", "The designer language","Meow-inese","An unstoppable variable","An immovable variable","Chuck Norris","false","You cannot put expressions inside console.log()","I am a wrong answer, pleased to meet you"];

count++;
if (count > correctChoices.length-1){ //runs til out of questions
    score = time;
    document.getElementById("score").innerHTML = score;
    document.getElementsByClassName('Highscores')[0].style.visibility = "visible";
    document.getElementById("entry").style.visibility = "visible";
    document.getElementById("username").style.visibility = "visible";
    document.getElementById("submit").style.visibility = "visible";
    //document.getElementById('Highscores').innerHTML = "You scored " + score; this originally overrode html. keeping for learning purposes. do not uncomment
    document.getElementById("Question").style.visibility = "hidden";
    document.getElementsByClassName('choices')[0].style.visibility = "hidden";
    gameCompletion = true;
    document.getElementsByClassName('countdown-timer')[0].style.visibility = "hidden";
    count = -1; //resetting count for replay 
    time = 60* 5;
    return score;
}
else
{

//array for each question cleaned out and replaced each time in loop
var choicesForQuestion = [];
choicesForQuestion = [correctChoices[count],incorrectChoices[0+3*count],incorrectChoices[1+3*count],incorrectChoices[2+3*count]];

//Fisher Yates array shuffle to randomize choice order
for (i = choicesForQuestion.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = choicesForQuestion[i];
    choicesForQuestion[i] = choicesForQuestion[j];
    choicesForQuestion[j] = k;
  }

  //display answer options to user
  document.getElementById("Question").innerHTML = questions[count];
  document.getElementById("firstChoice").innerHTML= choicesForQuestion[0];
  document.getElementById("secondChoice").innerHTML= choicesForQuestion[1];
  document.getElementById("thirdChoice").innerHTML= choicesForQuestion[2];
  document.getElementById("fourthChoice").innerHTML= choicesForQuestion[3];
  debugger
document.getElementById("firstChoice").onclick= function(){checker(0)};
document.getElementById("secondChoice").onclick= function(){checker(1)};
document.getElementById("thirdChoice").onclick= function(){checker(2)};
document.getElementById("fourthChoice").onclick= function(){checker(3)};
//checks user choice and judges whether it is correct or not
function checker (userSelection) {
    console.log(correctChoices[count]);
    console.log(choicesForQuestion[userSelection]);
  if(choicesForQuestion[userSelection] == correctChoices[count]){ 
    console.log("correct!");
  }
  else {
  console.log("Incorrect");
  time = time-60;
  }
}
}
}

var scoreList =[];
//clears page before displaying scores
function Highscores() {
    var score = document.getElementById("score").innerText;
    var name = initials.value;
    document.getElementsByClassName('Highscores')[0].style.visibility = "hidden";
    document.getElementById("entry").style.visibility = "hidden";
    document.getElementById("username").style.visibility = "hidden";
    document.getElementById("submit").style.visibility = "hidden";
    //var newScore = new Array;
    //newScore.push(score);
    //newScore.push(name);

   // var newEntry = [score, initials.value]; oddly bugged do not uncomment
    //scoreList.push(newScore);
    //console.log (scoreList[0][0]);
    //console.log(scoreList[0][1]);
     //function to sort multidimensional arrays by one column; taken from here: https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
    //scoreList.sort(function(a,b) {
      //  return a[0]-b[0]

    //});
    //put list to document
    for (i=0; i< 1; i++) {
    document.getElementById("scoreTracker").innerHTML += score +" "+ name + "<br />";
    //document.getElementById("initials").innerHTML += name +"<br />";
    document.getElementById("scoreTracker").style.visibility = "visible";
    document.getElementById("initials").style.visibility = "visible";
    document.getElementById("playAgainBtn").style.visibility = "visible";
    //othercount++;
    }

}



function outOfTime() {
    document.getElementById("Question").innerHTML = "You've run out of time!";
    document.getElementById("choices").style.visibility = "hidden";
    document.getElementById("minutes").style.visibility= "hidden";
    document.getElementById("seconds").style.visibility= "hidden";
    document.getElementById("playAgainBtn").style.visibility = "visible";
}
function resetTimer(){
    time = 5*60;
    gameCompletion = false;
    count = -1;
}

start.addEventListener("click", countdown);
start.addEventListener("click", examQ);
playAgain.addEventListener("click", resetTimer);
playAgain.addEventListener("click", countdown);
playAgain.addEventListener("click", examQ);
choices.addEventListener("click",examQ);
document.getElementById("Highscores").addEventListener("submit", Highscores);