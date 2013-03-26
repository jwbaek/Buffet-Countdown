var count = -1              // global count variable 
var seconds_in_hour = 3600; // number of seconds in hour    
var intervalListener = null;

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
        document.getElementById("can_eat").innerHTML="YES!";
        $("#can_eat").css('color', 'green'); 
        document.getElementById("countdown").innerHTML="Go to " + buffet_name + " NOW!"; 
        console.log("Clearing interval");
        window.clearInterval(intervalListener);
        return;
    }
    
    document.getElementById("can_eat").innerHTML="NO!"; 
    $("#can_eat").css('color', 'red'); 
    document.getElementById("countdown").innerHTML= buffet_name + " in " + count + " secs"; 
};

function printCountDown(count){
    var days, months
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

// for datepicker
$(function () {
    var dates = $("#buffet_date").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onSelect: function (selectedDate) {
            var option = this.id == "from" ? "minDate" : "maxDate",
        instance = $(this).data("datepicker"),
        date = $.datepicker.parseDate(
            instance.settings.dateFormat ||
            $.datepicker._defaults.dateFormat,
            selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });
});

$(document).ready(function () {  
    $("#status").addClass("hidden");
    $("#buffet_form").addClass("hidden");

    // check if buffet_target is already set. If so, count down!
    var start = localStorage.getItem("buffet_target");
    console.log(start);
    if (start !== null && Math.floor((start - new Date())/1000) > 0) {
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
            var date = allVariables['buffet_date'].value;
            var time = allVariables['buffet_time'].value;
            
            var start = getTimestamp(date + " " + time);
            
            localStorage.setItem("buffet_target", start);
            localStorage.setItem("buffet_name", name);
            
            var countdown= Math.floor((start - new Date())/1000);
            startTimer(countdown);
        };

    };
});
