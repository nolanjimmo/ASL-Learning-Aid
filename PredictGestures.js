const knnClassifier = ml5.KNNClassifier();

var controllerOptions ={};
var trainingCompleted = false;
var numSamples = 2;
var features;
var currentLabel;
var predictedLabel;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(numSamples);

//Deliverable 6 variable additions
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
//var oneFrameOfData = nj.zeros([6,5,4,numSamples]);
var oneFrameOfData = nj.zeros([5,4,6]);
var predResultCounter = 0;
var meanPredAccuracy = 0;

Leap.loop(controllerOptions, function(frame)
{
    clear();
    if (trainingCompleted == false){
        Train();
        //knnClassifier.addExample(features.tolist(), 0);
    }
    currentNumHands = frame.hands.length;
    oldXRange = rawXMax - rawYMin;
    oldYRange = rawYMax - rawYMin;
    clear();
    HandleFrame(frame);
    RecordData();
    previousNumHands = frame.hands.length;
}
);

function Train(){
    for(var t=0; t < train1.shape[3]; t++){
        features = train1.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);
    };
    for(var g=0; g < train2.shape[3]; g++){
        features = train2.pick(null,null,null,g);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 2);
    };
    trainingCompleted = true;
};

function Test(){
    //numSamples = oneFrameOfData.shape[3];
    currentTestSample = oneFrameOfData.pick(null,null, null, 0);
    CenterData();
    currentTestSample = currentTestSample.reshape(120);
    currentTestLabel = 0;
    predictedLabel = knnClassifier.classify(currentTestSample.tolist(), GotResults);
};

function GotResults(err, result){
    predictedClassLabels.set(0, parseInt(result.label));
    predResultCounter++;
    meanPredAccuracy = ((predResultCounter - 1)*meanPredAccuracy + (parseInt(result.label) == 2)) / predResultCounter;
    console.log(predResultCounter, meanPredAccuracy, parseInt(result.label));
};

function HandleFrame(frame){
    hand = frame.hands[0];
    if(frame.hands.length > 0){
        HandleHand(hand, frame.interactionBox);
        //console.log(oneFrameOfData.toString());
        Test();
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

    oneFrameOfData.set(finger_index, bone_index, 0, normalizedPrevJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 1, normalizedPrevJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 2, normalizedPrevJoint[2]);
    oneFrameOfData.set(finger_index, bone_index, 3, normalizedNextJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 4, normalizedNextJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 5,  normalizedNextJoint[2]);


    screenX1 = window.innerWidth * normalizedPrevJoint[0];
    screenY1 = window.innerHeight * (1 - normalizedPrevJoint[1]);
    screenX2 = window.innerWidth * normalizedNextJoint[0];
    screenY2 = window.innerHeight * (1 - normalizedNextJoint[1]);




    //If anyone comes to look at how I did the strokeWeight calculation... I don't really understand why you would need to pass another param
    //in to this function when you have the bone type already accessible, so I just this visual conversion using the bone type... I don't really
    //even see another useful variable within finger that isn't within the bone.
    if (currentNumHands == 1){
        //stroke(0, 180 - bone.type * 60, 0);
        stroke(180 - bone.type * 60);
    } else if (currentNumHands == 2){
        //stroke(180 - bone.type * 60, 0 ,0);
        stroke(180 - bone.type * 60);
    }
    strokeWeight((20 - (5 * bone.type)));
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

function CenterData(){
    var xValues = oneFrameOfData.slice([],[], [0,6,3]);
    var currentMean = xValues.mean();
    console.log(currentMean);
    var horizontalShift = 0.5 - currentMean;
    for(var i = )

};
