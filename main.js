var count = -1              // global count variable  
var intervalListener = null;

// used to parse time
var _minute = 60;
var _hour = _minute * 60;
var _day = _hour * 24;

// returns date (in milliseconds) from string
function getTimestamp(str) {
    var d = str.match(/\d+/g);                          // extract date parts
    return +new Date(d[2], d[0] - 1, d[1], d[3], d[4]); // build Date object
}

// function that counts down global variable count
function timer() {

    count=count-1;
    var buffet_name = localStorage.getItem("buffet_name");

    if (count <= 0) {          
        displayYes();
        document.getElementById("countdown").innerHTML="Go to " + buffet_name + " NOW!"; 
        console.log("Clearing interval");
        window.clearInterval(intervalListener);
        return;
    }

    displayCountDown(count);
};

function displayYes() {
    document.getElementById("can_eat").innerHTML="YES!";
    $("#can_eat").css('color', 'green'); 
}

function displayNo() {
    document.getElementById("can_eat").innerHTML="NO!"; 
    $("#can_eat").css('color', 'red'); 
}

function displayCountDown(count) {

    var days = Math.floor(count / _day);
    if (days == 0) days = "";
    else days = days + " days ";
    var hours = Math.floor((count % _day) / _hour);
    if (hours == 0) hours = "";
    else hours = hours + " hours ";
    var minutes = Math.floor((count % _hour) / _minute);
    if (minutes == 0) minutes = "";
    else minutes = minutes + " minutes ";
    var seconds = (count % _minute) + " seconds "; // show seconds even if 0

    if (Math.floor(count / _day) > 0) {
        if (Math.floor(count / _day) == 1) days = ""
        displayYes();
        document.getElementById("countdown").innerHTML="Fasting starts in: " + days + hours + minutes + seconds; 
    } else {
        displayNo();
        document.getElementById("countdown").innerHTML="Fasting ends in: " + days + hours + minutes + seconds;
    }
}

// starts countdown
function startTimer(countdown){

    var reset_button = document.getElementById("reset_button");   
    // clears current data and shows form
    reset_button.onclick = function() {
        localStorage.removeItem("buffet_target");
        localStorage.removeItem("buffet_name");

        console.log("Clearing interval");
        window.clearInterval(intervalListener);

        $("#status").addClass("hidden");
        $("#buffet_form").removeClass("hidden");
    };

    $("#status").removeClass("hidden");
    count = countdown;
    timer();
    // calls timer every second
    intervalListener=setInterval(timer,1000);
};

$(document).ready(function () {  
    $("#status").addClass("hidden");
    $("#buffet_form").addClass("hidden");

    // check if buffet_target is already set. If so, count down!
    var start = localStorage.getItem("buffet_target");
    console.log(start);
    if (start !== null && (parseInt(start) - new Date()) > 0) {
        startTimer(Math.floor((start - new Date())/1000));
    }
    // else, show form
    else{
        $("#buffet_form").removeClass("hidden");
        var submit_button = document.getElementById("submit_button");
        submit_button.onclick = function() {

            $("#buffet_form").addClass("hidden");
            $("#status").removeClass("hidden");
            var allVariables = document.getElementById("buffet_form").getElementsByClassName("attr");
            
            var name = allVariables['buffet_name'].value;
            var datetime = Date.parse(allVariables['buffet_date'].value);

            allVariables['buffet_name'].value = ""
            allVariables['buffet_date'].value = ""
            
            localStorage.setItem("buffet_target", datetime.valueOf());
            localStorage.setItem("buffet_name", name);
            
            var countdown= Math.floor((datetime - new Date())/1000);
            startTimer(countdown);
        };

    };
});
