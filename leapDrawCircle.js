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
        for (var f=fingers.length - 1; f>=0; f--) {
            for (var b=fingers[f].bones.length - 1; b >= 0; b--)  {
                HandleBone(fingers[f].bones[b]);
            }
        };

function HandleBone(bone){
    var bone_start = bone.prevJoint;
    var bone_end = bone.nextJoint;

    [screenX1, screenY1] = TransformCoordinates(bone_start[0], bone_start[1]);
    [screenX2, screenY2] = TransformCoordinates(bone_end[0], bone_end[1]);


    //If anyone comes to look at how I did the strokeWeight calculation... I don't really understand why you would need to pass another param
    //in to this function when you have the bone type already accessible, so I just this visual conversion using the bone type... I don't really
    //even see another useful variable within finger that isn't within the bone.
    strokeWeight((10 - (3 * bone.type)));
    //stroke((bone.type * 5) * 2);
    stroke(180 - bone.type * 60);
    line(screenX1 - window.innerWidth, window.innerHeight - screenY1, screenX2 - window.innerWidth, window.innerHeight - screenY2);

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