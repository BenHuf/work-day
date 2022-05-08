// define/initialize variables
// jquery
var $container = $(".container");
var $rowDiv = $(".row-div");
var $currentDay = $("#currentDay");
// momentjs
var now = moment().format("kk");
var today = moment().format("dddd MMMM D, YYYY");
// javascript
var tasks = {};
var hourCount = 9;

// add date to top of screen
$currentDay.text(today)

// creates time block elements 
var createTimeBlocks = function() {
    for (var i = 0; i < hourCount; i++) {
        var timeblockTime = moment().hour(9).add(i, 'hour').format("hA");
        var hour = moment().hour(9).add(i, 'hour').format("kk");
        var textContent = tasks["" + hour];

        $('<div class="hour col-1">')
            .text(timeblockTime)
            .attr('id', hour)
            .appendTo($rowDiv);

        $('<div class="toDo border-left border-right col-10 pl-3">')
            .text(textContent)
            .attr('id', hour)
            .appendTo($rowDiv);

        $('<button class="saveBtn col-1">')
            .text("Save")
            .attr('id', hour)
            .appendTo($rowDiv);

        if (hour < now) {
            $("div#" + hour + ".toDo")
            .addClass("past")
        }
        else if (hour === now) {
            $("div#" + hour + ".toDo")
            .addClass("present")
        }
        else {
            $("div#" + hour + ".toDo")
            .addClass("future")
        }
    }
}

// task text was clicked
$(document).on("click", ".toDo", function() {
    var text = $(this)
        .text()
        .trim();

    var id = $(this)
        .attr("id");

    var classLabel = $(this)
        .attr("class");

    var textInput = $("<textarea>")
        .addClass(classLabel)
        .attr("id", id)
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

// replace tasks when you click off of textarea
$(document).on("blur", "textarea", function(){
    var text = $(this).val();

    var id = $(this)
        .attr("id")

    var classLabel = $(this)
        .attr("class");

    var taskP = $("<div>")
        .addClass(classLabel)
        .attr('id', id)
        .text(text);

    $(this).replaceWith(taskP);
})

// save tasks by clicking save button
$(document).on("click", ".saveBtn", function(){
    var id = $(this).attr("id");
    var text = $("#" + id + ".toDo").text();
    tasks[""+id] = text;
    saveTasks();
})

// function to retrieve tasks from storage
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {
        };
    }
};


// save tasks to local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


// load tasks and create time blocks on page load
loadTasks();
createTimeBlocks();