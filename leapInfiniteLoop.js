var controllerOptions ={};
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var deltaX;
var deltaY;
Leap.loop(controllerOptions, function(frame)
{
    clear();
    deltaX = Math.round(Math.random()) * 2 - 1;
    deltaY = Math.round(Math.random()) * 2 - 1;
    circle(x + deltaX,y+deltaY,50);
}
);