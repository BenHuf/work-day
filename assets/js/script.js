var $container = $(".container");

var hourCount = 9;
var now = moment().format("kk");
var today = moment().format("DD MMMM, YYYY")
var $dotw = $(".dotw");
var tasks = {};

// Add date to top of screen
$dotw.text("Today's Date is " + today);

// ensure document is ready
$(document).ready(function(){});

// creates time block elements 
var createTimeBlocks = function() {
    for (var i = 0; i < hourCount; i++) {
        var timeblockTime = moment().hour(9).add(i, 'hour').format("hA");
        var hour = moment().hour(9).add(i, 'hour').format("kk")
        var textContent = tasks["" + hour]
        console.log(hour);
        console.log(timeblockTime);
        console.log("now" + now + "hour" + hour)
        if (hour < now) {
            $('<div class="d-flex h-100 bg-secondary justify-content-between align-content-center row timeblock col-12 col-lg border border-primary p-4">')
            .attr('id', hour)
            .appendTo($container);
        }
        else if (hour === now) {
            $('<div class="d-flex h-100 bg-danger justify-content-between align-content-center row timeblock col-12 col-lg border border-primary p-4">')
            .attr('id', hour)
            .appendTo($container);
        }
        else {
            $('<div class="d-flex h-100 bg-success justify-content-between align-content-center row timeblock col-12 col-lg border border-primary p-4">')
            .attr('id', hour)
            .appendTo($container);
        }

        $('<p class="timeLabel h-100 col-1">')
        .text(timeblockTime)
        .attr('id', hour)
        .appendTo(".timeblock#" + hour);

        $('<div class="toDo border-left border-right d-flex col-8">')
        .text(textContent)
        .attr('id', hour)
        .appendTo(".timeblock#" + hour);

        $('<button class="saveBtn h-100 col-1">')
        .text("Save")
        .attr('id', hour)
        .appendTo($(".timeblock#" + hour));
    }
}

// task text was clicked
$(document).on("click", ".toDo", function() {
    console.log("triggered");
    
    var text = $(this)
        .text()
        .trim();

    var textInput = $("<textarea>")
        .addClass("editTask col-8")
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

// replace tasks when you click off of textarea
$(document).on("blur", "textarea", function(){
    var text = $(this).val();

    var id = $(this)
    .closest(".timeblock")
    .attr("id")

    var taskP = $("<p>")
    .addClass("toDo d-flex col-8")
    .attr('id', id)
    .text(text);

    $(this).replaceWith(taskP);
})

$(document).on("click", ".saveBtn", function(){
    var id = $(this).attr("id");
    var text = $("#" + id + ".toDo").text();
    tasks[""+id] = text;
    saveTasks();
    console.log("clicked save" + id + "the text " + text);

})

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {
        };
    }
}


// save tasks to local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

loadTasks();
createTimeBlocks();