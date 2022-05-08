var $container = $(".container");

var hourCount = 9;
var now = moment().format("kk");

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
        .text(timeblockTime)
        .attr('id', hour)
        .appendTo($container);
    }
    else if (hour === now) {
        $('<div class="d-flex bg-danger row justify-content-between timeblock col-12 col-lg border border-primary p-4">')
        .text(timeblockTime)
        .attr('id', hour)
        .appendTo($container);
    }
    else {
        $('<div class="d-flex bg-success row justify-content-between timeblock col-12 col-lg border border-primary p-4">')
        .text(timeblockTime)
        .attr('id', hour)
        .appendTo($container);
    }
}

// adds task text div
$('<div class=toDo>')
.text("add text here")
.attr('id', parent)
.appendTo(".timeblock");

// add save button
$('<button class=saveBtn>')
.text("Save")
.appendTo($(".timeblock"));
};

createTimeBlocks();