var controllerOptions ={};
var x;
var y;
var z;
var rawXMin = 500;
var rawXMax = -500;
var rawYMin = 500;
var rawYMax = -500;
var screenX1;
var screenY1;
var screenX2;
var screenY2;
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
            HandleFinger(fingers[f]);
            //if(fingers[f].type == 1){
            //    HandleFinger(fingers[f]);
            //}
        }
};

function HandleBone(bone){
    var bone_start = bone.prevJoint;
    var bone_end = bone.nextJoint;

    [screenX1, screenY1] = TransformCoordinates(bone_start[0], bone_start[1]);
    [screenX2, screenY2] = TransformCoordinates(bone_end[0], bone_end[1]);

    line(screenX1 - window.innerWidth, window.innerHeight - screenY1, screenX2 - window.innerWidth, window.innerHeight - screenY2);
    //circle((screenX-window.innerWidth), (window.innerHeight-screenY), 50);
};

function HandleFinger(finger){
    console.log(finger);
    var tipPos = finger.tipPosition;

    for (var b=0; b<finger.bones.length; ++b){
        HandleBone(finger.bones[b]);
    }

}

function TransformCoordinates (x,y) {
    if(x < rawXMin){
        rawXMin = x;
    }
    if(x > rawXMax){
        rawXMax = x;
    }
    if(y < rawYMin){
        rawYMin = y;
    }
    if(y > rawYMax){
        rawYMax = y;
    }

    x = (((x - rawXMin) * newXRange) / oldXRange) + 0;
    y = (((y - rawYMin) * newYRange) / oldYRange) + 0;

    return [x,y];
};