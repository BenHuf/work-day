var $container = $(".container");

var hourCount = 9;
var now = moment().format("hhA");

console.log("the time is" + now);

for (var i = 0; i < hourCount; i++) {
    var time = i + 9
    console.log(time);
    if (i < 4) {
        $('<div class="timeblock col-12 col-lg border border-primary p-4">')
        .text(time + "AM")
        .appendTo($container);
    }
    else {
        time -= 12;
        $('<div class="timeblock col-12 col-lg border border-primary p-4">')
        .text(time + "PM")
        .appendTo($container);
    }
};

var time = moment("hh");
console.log("this is the" + time);