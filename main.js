$(document).ready(function () {  
    $("#status").addClass("hidden");
    
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
    function getTimestamp(str) {
        var d = str.match(/\d+/g); // extract date parts
        return +new Date(d[2], d[0] - 1, d[1], d[3], d[4]); // build Date object
    }
    //localStorage.setItem("bar", "foo");
    console.log(localStorage.getItem("bar"));
    
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
        
        console.log(start);
        
        var count= Math.floor((start - new Date())/1000);
        
        timer();
        var counter=setInterval(timer, 1000); 
        
        function timer() {
            count=count-1;
            if (count <= 0) {
                clearInterval(counter);            
                document.getElementById("can_eat").innerHTML="Can I eat?  -> YES!"; 
                document.getElementById("countdown").innerHTML="Go to buffet NOW!"; 
                return;
            }
            
            document.getElementById("can_eat").innerHTML="Can I eat?  -> NO!"; 
            document.getElementById("countdown").innerHTML="Countdown: " + count + " secs"; 
        }
    };
});
