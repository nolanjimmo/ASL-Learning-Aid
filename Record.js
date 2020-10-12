var controllerOptions ={};
nj.config.printThreshold = 1000;
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
var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;
var oneFrameOfData = nj.zeros([5,4, 6, numSamples]);
Leap.loop(controllerOptions, function(frame)
{
    //console.log(oneFrameOfData.toString());
    currentNumHands = frame.hands.length;
    oldXRange = rawXMax - rawYMin;
    oldYRange = rawYMax - rawYMin;
    clear();
    HandleFrame(frame);
    RecordData();
    previousNumHands = frame.hands.length;
}
);

function HandleFrame(frame){
    hand = frame.hands[0];
    if(frame.hands.length > 0){
        HandleHand(hand, frame.interactionBox);
    }
};

function HandleHand(hand, InteractionBox){
    fingers = hand.fingers;
        for (var f=fingers.length-1; f>=0; f--) {
            for (var b=0; b<fingers[f].bones.length; b++)  {
                HandleBone(fingers[f].bones[b], f, InteractionBox);
            }
        };
};

function HandleBone(bone, finger_index, InteractionBox){
    var bone_index = bone.type;
    var normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true);
    var normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true);

    oneFrameOfData.set(finger_index, bone_index, 0, currentSample, normalizedPrevJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 1, currentSample, normalizedPrevJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 2, currentSample, normalizedPrevJoint[2]);
    oneFrameOfData.set(finger_index, bone_index, 3, currentSample, normalizedNextJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 4, currentSample, normalizedNextJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 5, currentSample, normalizedNextJoint[2]);


    screenX1 = window.innerWidth * normalizedPrevJoint[0];
    screenY1 = window.innerHeight * (1 - normalizedPrevJoint[1]);
    screenX2 = window.innerWidth * normalizedNextJoint[0];
    screenY2 = window.innerHeight * (1 - normalizedNextJoint[1]);




    //If anyone comes to look at how I did the strokeWeight calculation... I don't really understand why you would need to pass another param
    //in to this function when you have the bone type already accessible, so I just this visual conversion using the bone type... I don't really
    //even see another useful variable within finger that isn't within the bone.
    if (currentNumHands == 1){
        stroke(0, 180 - bone.type * 60, 0);
    } else if (currentNumHands == 2){
        stroke(180 - bone.type * 60, 0 ,0);
    }
    strokeWeight((10 - (3 * bone.type)));
    line(screenX1, screenY1, screenX2, screenY2);

};

function HandleFinger(finger){
    console.log(finger);
    var tipPos = finger.tipPosition;

    for (var b=0; b<finger.bones.length; ++b){
        HandleBone(finger.bones[b]);
    }

};

function RecordData(){

    if(currentNumHands == 2){
        currentSample++;
        if(currentSample == numSamples){
            currentSample = 0;
        };
    };
    if(currentNumHands > 0 && previousNumHands > currentNumHands){
        background(100);
        //console.log(oneFrameOfData.pick(null,null,null,0).toString());
        console.log(oneFrameOfData.toString());
    };

};