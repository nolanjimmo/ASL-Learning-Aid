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
    for(var t=0; t < train0.shape[3]; t++){
        features = train0.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 0);
    };
    for(t=0; t < train1.shape[3]; t++){
        features = train1.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);
    };
    for(t=0; t < train2.shape[3]; t++){
        features = train2.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 2);
    };
    for(t=0; t < train3.shape[3]; t++){
        features = train3.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 3);
    };
    for(t=0; t < train4.shape[3]; t++){
        features = train4.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);
    };
    for(t=0; t < train5.shape[3]; t++){
        features = train5.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 5);
    };
    for(t=0; t < train6.shape[3]; t++){
        features = train6.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 6);
    };
    for(t=0; t < train7.shape[3]; t++){
        features = train7.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);
    };
    for(t=0; t< train8.shape[3]; t++){
        features = train8.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 8);
    };
    for(t=0; t < train9.shape[3]; t++){
        features = train9.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 9);
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
    var HCD = 9;
    predictedClassLabels.set(0, parseInt(result.label));
    predResultCounter++;
    meanPredAccuracy = ((predResultCounter - 1)*meanPredAccuracy + (parseInt(result.label) == HCD)) / predResultCounter;
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
            for (var b=fingers[f].bones.length-1; b>=0; b--)  {
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
    var currentXMean = xValues.mean();
    //console.log(currentMean);
    var horizontalXShift = 0.5 - currentXMean;
    var shiftedX;
    var currentX;
    //These are the nested loops for X
    for(var r = 0; r<5; r++){
        for(var c = 0; c<4; c++){
            currentX = oneFrameOfData.get(r, c, 0);
            shiftedX = currentX + horizontalXShift;
            oneFrameOfData.set(r, c, 0, shiftedX);
            currentX = oneFrameOfData.get(r, c, 3);
            shiftedX = currentX + horizontalXShift;
            oneFrameOfData.set(r, c, 3, shiftedX);
        }
    }
    //This is the section for Y values
    var yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentYMean = yValues.mean();
    var horizontalYShift = 0.5 - currentYMean;
    var shiftedY;
    var currentY;
    for(r = 0; r<5; r++){
        for(c = 0; c<4; c++){
            currentY = oneFrameOfData.get(r,c,1);
            shiftedY = currentY + horizontalYShift;
            oneFrameOfData.set(r,c,1,shiftedY);
            currentY = oneFrameOfData.get(r,c,4);
            shiftedY = currentY + horizontalYShift;
            oneFrameOfData.set(r,c,4,shiftedY);
        }
    }
    //This is the section for Z Values
    var zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentZMean = zValues.mean();
    var horizontalZShift = 0.5 - currentZMean;
    var shiftedZ;
    var currentZ;
    for(r = 0; r<5; r++){
        for(c = 0; c<4; c++){
            currentZ = oneFrameOfData.get(r,c,2);
            shiftedZ = currentZ + horizontalZShift;
            oneFrameOfData.set(r,c,2,shiftedZ);
            currentZ = oneFrameOfData.get(r,c,5);
            shiftedZ = currentZ + horizontalZShift;
            oneFrameOfData.set(r,c,5,shiftedZ);
        }
    }
};
