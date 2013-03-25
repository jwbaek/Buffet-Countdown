var count = -1              // global count variable 
var seconds_in_hour = 3600; // number of seconds in hour    
var intervalListener = null;// 

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

    if (count <= 0) {          
        document.getElementById("can_eat").innerHTML="Can I eat?  -> YES!"; 
        document.getElementById("countdown").innerHTML="Go to buffet NOW!"; 
        console.log("Clearing interval");
        window.clearInterval(intervalListener);
        return;
    }

    var days = Math.floor(count / _day);
    if (days == 0) days = "";
    else days = days + " days";
    var hours = Math.floor((count % _day) / _hour);
    if (hours == 0) days = "";
    else hours = hours + " hours";
    var minutes = Math.floor((count % _hour) / _minute);
    if (minutes == 0) days = "";
    else minutes = minutes + " minutes";
    var seconds = (count % _minute);
    if (seconds == 0) days = "";
    else seconds = seconds + " seconds";

    document.getElementById("can_eat").innerHTML="Can I eat?  -> NO!"; 
    document.getElementById("countdown").innerHTML="Countdown: " + days + " " + hours + " " + minutes + " " + seconds; 
};

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
    if (start !== null && (start - new Date()) > 0) {
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
            
            //var start = getTimestamp(date + " " + time);
            
            localStorage.setItem("buffet_target", datetime);
            localStorage.setItem("buffet_name", name);
            
            var countdown= Math.floor((datetime - new Date())/1000);
            startTimer(countdown);
        };

    };
});
