var $container = $(".container");

var hourCount = 9;
var now = moment().format("kk");
var tasks = [];


$(document).ready(function(){});

console.log("the time is" + now);

// creates time block elements 
var createTimeBlocks = function() {
for (var i = 0; i < hourCount; i++) {
    var timeblockTime = moment().hour(9).add(i, 'hour').format("hA");
    var hour = moment().hour(9).add(i, 'hour').format("kk")
    console.log(hour);
    console.log(timeblockTime);
    console.log("now" + now + "hour" + hour)
    if (hour < now) {
        $('<div class="d-flex bg-secondary row justify-content-between timeblock col-12 col-lg border border-primary p-4">')
        .attr('id', hour)
        .appendTo($container);
    }
    else if (hour === now) {
        $('<div class="d-flex bg-danger row justify-content-between timeblock col-12 col-lg border border-primary p-4">')
        .attr('id', hour)
        .appendTo($container);
    }
    else {
        $('<div class="d-flex bg-success row justify-content-between timeblock col-12 col-lg border border-primary p-4">')
        .attr('id', hour)
        .appendTo($container);
    }

    $('<p class="timeLabel">')
    .text(timeblockTime)
    .attr('id', hour)
    .appendTo(".timeblock#" + hour);

    $('<p class="toDo">')
    .text("add text here")
    .attr('id', hour)
    .appendTo(".timeblock#" + hour);

    $('<button class="saveBtn">')
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
        .addClass("editTask")
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

$(document).on("blur", "textarea", function(){
    var text = $(this).val();

    var id = $(this)
    .closest(".timeblock")
    .attr("id")

    var taskP = $("<p>")
    .addClass("toDo")
    .attr('id', id)
    .text(text);

    $(this).replaceWith(taskP);
})


createTimeBlocks();