var controllerOptions ={};
var x;
var y;
var z;
var rawXMin = 500;
var rawXMax = -500;
var rawYMin = 500;
var rawYMax = -500;
var screenX;
var screenY;
var oldXRange;
var oldYRange;
var newXRange = window.innerWidth;
var newYRange = window.innerHeight;
var hand;
var fingers;
Leap.loop(controllerOptions, function(frame)
{
    oldXRange = rawXMax - rawYMin;
    oldYRange = rawYMax - rawYMin;
    clear();
    HandleFrame(frame);
}
);

function HandleFrame(frame){
    hand = frame.hands[0];
    if(frame.hands.length == 1){
        HandleHand(hand);
    }
};

function HandleHand(hand){
    fingers = hand.fingers;
        for (var f=0; f<fingers.length; f++)
        {
            if(fingers[f].type == 1){
                HandleFinger(fingers[f]);
            }
        }
};

function HandleFinger(finger){
    //console.log(finger);
    var tipPos = finger.tipPosition;
    //console.log(tipPos);
    if(tipPos[0] < rawXMin){
        rawXMin = tipPos[0];
    }
    if(tipPos[0] > rawXMax){
        rawXMax = tipPos[0];
    }
    if(tipPos[1] < rawYMin){
        rawYMin = tipPos[1];
    }
    if(tipPos[1] > rawYMax){
        rawYMax = tipPos[1];
    }

    screenX = (((tipPos[0] - rawXMin) * newXRange) / oldXRange) + 0;
    screenY = (((tipPos[1] - rawYMin) * newYRange) / oldYRange) + 0;

    circle(screenX, (window.innerHeight-screenY), 50);

    //z = finger.tipPosition[2];
    //circle(x+(.5*window.innerWidth),(window.innerHeight-y)-(.5*window.innerHeight),50);
    //console.log(rawXMin);
    //console.log(rawXMax);
    //console.log(rawYMin);
    //console.log(rawYMax);
}