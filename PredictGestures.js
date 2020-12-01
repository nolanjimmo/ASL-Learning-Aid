const knnClassifier = ml5.KNNClassifier();
const net = new brain.NeuralNetwork();

var controllerOptions ={};
var trainingCompleted = false;
var numSamples = 2;
var features = [];
var currentLabel;
var predictedLabel;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(numSamples);
var programState = 0;

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
//var oneFrameOfData = nj.zeros([5,4,6,numSamples]);
var oneFrameOfData = nj.zeros([5,4,6]);
var predResultCounter = 0;
var meanPredAccuracy = 0;
var digitToShow = 1;
var timeSinceLastDigitChange = new Date();
var timeInterval0 = 4;
var timeInterval1 = 4;
var timeInterval2 = 4;
var timeInterval3 = 4;
var timeInterval4 = 4;
var timeInterval5 = 4;
var timeInterval6 = 4;
var timeInterval7 = 4;
var timeInterval8 = 4;
var timeInterval9 = 4;
var speed0Done = false;
var speed1Done = false;
var speed2Done = false;
var speed3Done = false;
var speed4Done = false;
var speed5Done = false;
var speed6Done = false;
var speed7Done = false;
var speed8Done = false;
var speed9Done = false;
var firstSignCorrect = false;
var timerStart;
var timerEnd;
var timerOn = false;
var timerStopped = true;
var timerStarted = false;
var currentUsername;
var list;
var lessonMode = false;
var speedTestMode = false;
var navigationTimer;
var navTimerOn = false;

Leap.loop(controllerOptions, function(frame)
{
    clear();
    currentNumHands = frame.hands.length;
    oldXRange = rawXMax - rawYMin;
    oldYRange = rawYMax - rawYMin;
    clear();
    if(lessonMode == false && speedTestMode == false){
        image(lessons, 0, window.innerHeight/2, window.innerWidth/4, window.innerHeight/2);
        image(speedTest, window.innerWidth/4, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    } else if (lessonMode && !speedTestMode)
        image(lessons, 0, window.innerHeight/2, window.innerWidth/4, window.innerHeight/2);
     else if (speedTestMode && !lessonMode)
        image(speedTest, window.innerWidth/4, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    DetermineState(frame);
    if (programState == 0){
        HandleState0(frame);
    } else if (programState == 1){
        HandleState1(frame);
    } else {
        HandleState2(frame);
    }
    previousNumHands = frame.hands.length;
    checkStartTimer();
    checkEndTimer();

}
);

function checkStartTimer(){
    if (timerStopped == true && timerOn == true){
        timerStart = new Date();
        timerStarted = true;
        timerStopped = false;
    }
};

function checkEndTimer(){
    if(speed2Done && timerOn==true && timerStarted && timerStopped==false){
        timerEnd = new Date();
        console.log(timerStart, timerEnd);
        var differentialInMilliseconds = -1*(timerStart - timerEnd);
        var differentialInSeconds = differentialInMilliseconds/1000;
        updateFastestSpeed(currentUsername, differentialInSeconds);
        timerOn = false;
        firstSignCorrect = false;
        timerStopped = true;
        timerStarted = false;
        //modSpeedValue(currentUsername, differentialInSeconds);
    }
};

function Train(){
    //var trainingData = [];
    for(var t=0; t < train0.shape[3]; t++){
        features = train0.pick(null,null,null,t);
        features = features.reshape(120);
        //knnClassifier.addExample(features.tolist(), 0);
        //console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [0]}]);
        //trainingData.push({input: features.selection.data, output: [0]});

        features = train1.pick(null,null,null,t);
        features = features.reshape(120);
        //knnClassifier.addExample(features.toList(), 1);
        //Trying out the Brain.js ML algo
        //console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [1]}]);
        //trainingData.push({input: features.selection.data, output: [1]});

        features = train1Second.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);
        //Brain.js
        //console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [1]}]);
        //trainingData.push({input: features.selection.data, output: [1]});


        features = train1Bongard.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);
        //Brain.js
        //console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [1]}]);
        //trainingData.push({input: features.selection.data, output: [1]});

        features = train1Davis.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);

        features = train2.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 2);
        //Brain.js
        //console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [2]}]);
        //trainingData.push({input: features.selection.data, output: [2]});

        features = train2Second.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 2);
        //Brain.js
        console.log(features.selection.data);
        //net.train([{input: features.selection.data, output: [2]}]);
        //trainingData.push({input: features.selection.data, output: [2]});

        //features = train2Rielly.pick(null,null,null,t);
        //features = features.reshape(120);
        //knnClassifier.addExample(features.tolist(), 2);

        features = train3.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 3);


        features = train3Jing.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 3);

        //features = train3Luksevish.pick(null,null,null,t);
        //features = features.reshape(120);
        //trainingData.push({input: features.selection.data, output: [3]});

        features = train4.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);
        //trainingData.push({input: features.selection.data, output: [4]});
        //console.log("We are here");

        //features = train4Bongard.pick(null,null,null,t);
        //features = features.reshape(120);
        //knnClassifier.addExample(features.tolist(), 4);

        features = train4Me.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);

        features = train5.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 5);

        features = train5Manian.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 5);

        //features = train5Kiely.pick(null,null,null,t);
        //features = features.reshape(120);
        //knnClassifier.addExample(features.tolist(), 5);


        features = train6.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 6);

        features = myTrain6.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 6);

        features = train7.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = myTrain7.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = myTrain8.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 8);

        features = train9.pick(null,null,null,t);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 9);
    };
    //net.train(trainingData);
    trainingCompleted = true;
    console.log("training is done");
};

function Test(){
    //numSamples = oneFrameOfData.shape[3];
    currentTestSample = oneFrameOfData.pick(null,null, null, 0);
    CenterData();
    currentTestSample = currentTestSample.reshape(120);
    currentTestLabel = 0;
    predictedLabel = knnClassifier.classify(currentTestSample.tolist(), GotResults);
    //console.log(currentTestSample.toList.toString);
    //var brainPred = net.run(currentTestSample.selection.data);
    //console.log(brainPred);
};

function GotResults(err, result){
    var HCD = 9;
    predictedClassLabels.set(0, parseInt(result.label));
    predResultCounter++;
    meanPredAccuracy = ((predResultCounter - 1)*meanPredAccuracy + (parseInt(result.label) == digitToShow)) / predResultCounter;
    //console.log(parseInt(result.label), meanPredAccuracy);
};

function DetermineState(frame){
    if(frame.hands.length == 0){
        programState = 0;
    } else if (HandIsUncentered()) {
        programState = 1;
    } else {
        programState = 2;
    }
};

function TrainKNNIfNotDoneYet(){
    if (trainingCompleted == false){
        Train();
    }
}

function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
};

function HandleState1(frame){
    HandleFrame(frame);
    if (HandIsToFarToTheLeft())
        DrawArrowRight();
    if (HandIsToFarToTheRight())
        DrawArrowLeft();
    if (HandIsToFarUp())
        DrawArrowDown();
    if (HandIsToFarDown())
        DrawArrowUp();
    if (HandIsToClose())
        DrawArrowAway();
    if (HandIsToFarAway())
        DrawArrowTowards();
};

function HandleState2(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    Test();
};

function Lessons(){
    lessonMode = true;
    timerOn = false;
    speedTestMode = false;
};

function SpeedTest(){
    speedTestMode = true;
    timerOn = true;
    lessonMode = false;
};

function HandIsUncentered(){
    return HandIsToFarToTheLeft();
};

function DrawLowerRightPanel(){
    if (lessonMode == true){
        if(digitToShow == 0){
            image(number0, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval0 > 2)
                image(digit0, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 1){
            image(number1, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval1 > 2)
                image(digit1, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 2){
            image(number2, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval2 > 2)
                image(digit2, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 3){
            image(number3, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval3 > 2)
                image(digit3, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 4){
            image(number4, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval4 > 2)
                image(digit4, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 5){
            image(number5, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval5 > 2)
                image(digit5, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 6){
            image(number6, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval6 > 2)
                image(digit6, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 7){
            image(number7, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval7 > 2)
                image(digit7, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 8){
            image(number8, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval8 > 2)
                image(digit8, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        } else if(digitToShow == 9){
            image(number9, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
            if(timeInterval9 > 2)
                image(digit9, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/1.5);
        };
    } else if (speedTestMode == true){
        if(digitToShow == 0){
            speed9Done = true;
            image(number0, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 1){
            image(number1, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 2){
            speed1Done = true;
            image(number2, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 3){
            speed2Done = true;
            image(number3, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 4){
            speed3Done = true;
            image(number4, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 5){
            speed4Done = true;
            image(number5, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 6){
            speed5Done = true;
            image(number6, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 7){
            speed6Done = true;
            image(number7, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 8){
            speed7Done = true;
            image(number8, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        } else if(digitToShow == 9){
            speed8Done = true;
            image(number9, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
        }
    }
    DetermineWhetherToSwitchDigits();
};

function DetermineWhetherToSwitchDigits(){
    if(TimeToSwitchDigits())
        SwitchDigits();
};

function TimeToSwitchDigits(){
    var currentTime = new Date();
    var difInMilliseconds = -1*(timeSinceLastDigitChange - currentTime);
    var difInSeconds = difInMilliseconds/1000;
    if(lessonMode == true){
        if(digitToShow == 0 && difInSeconds > timeInterval0)
            return true;
        else if(digitToShow == 1 && difInSeconds > timeInterval1)
            return true;
        else if(digitToShow == 2 && difInSeconds > timeInterval2)
            return true;
        else if(digitToShow == 3 && difInSeconds > timeInterval3)
            return true;
        else if(digitToShow == 4 && difInSeconds > timeInterval4)
            return true;
        else if(digitToShow == 5 && difInSeconds > timeInterval5)
            return true;
        else if(digitToShow == 6 && difInSeconds > timeInterval6)
            return true;
        else if(digitToShow == 7 && difInSeconds > timeInterval7)
            return true;
        else if(digitToShow == 8 && difInSeconds > timeInterval8)
            return true;
        else if(digitToShow == 9 && difInSeconds > timeInterval9)
            return true;
        else return false;
    } else if(speedTestMode == true){
        if (meanPredAccuracy > .5){
            return true;
        }
        return false;
    }
}

function SwitchDigits(){
    if (digitToShow == 0){
        if(meanPredAccuracy > .5 && timeInterval0 > 0){
            --timeInterval0;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 1;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
    } else if (digitToShow == 1){
        if(meanPredAccuracy > .5 && timeInterval1 > 0){
            --timeInterval1;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 2;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval1);
    } else if (digitToShow == 2){
        if(meanPredAccuracy > .5 && timeInterval2 > 0){
            --timeInterval2;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 3;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval2);
    } else if (digitToShow == 3){
        if(meanPredAccuracy > .5 && timeInterval3 > 0){
            --timeInterval3;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 4;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval3);
    } else if (digitToShow == 4){
        if(meanPredAccuracy > .5 && timeInterval4 > 0){
            --timeInterval4;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 5;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval4);
    } else if (digitToShow == 5){
        if(meanPredAccuracy > .5 && timeInterval5 > 0){
            --timeInterval5;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 6;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval5);
    } else if (digitToShow == 6){
        if(meanPredAccuracy > .5 && timeInterval6 > 0){
            --timeInterval6;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 7;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval7);
    } else if (digitToShow == 7){
        if(meanPredAccuracy > .5 && timeInterval7 > 0){
            --timeInterval7;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 8;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval7);
    } else if (digitToShow == 8){
        if(meanPredAccuracy > .5 && timeInterval8 > 0){
            --timeInterval8;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 9;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval8);
    } else if (digitToShow == 9){
        if(meanPredAccuracy > .5 && timeInterval9 > 0){
            --timeInterval9;
            addCorrectValue(currentUsername);
            if(firstSignCorrect == false)
                firstSignCorrect = true;
        } else {
            addWrongValue(currentUsername);
        }
        digitToShow = 0;
        predResultCounter = 0;
        timeSinceLastDigitChange = new Date();
        //console.log(timeInterval9);
    }
}

function HandIsToFarToTheLeft(){
    var xValues = oneFrameOfData.slice([],[], [0,6,3]);
    var currentXMean = xValues.mean();
    if (currentXMean < .25)
        return true;
    return false;
};

function HandIsToFarToTheRight(){
    var xValues = oneFrameOfData.slice([],[], [0,6,3]);
    var currentXMean = xValues.mean();
    if (currentXMean > .75)
        return true;
    return false;
};

function HandIsToFarUp(){
    var YValues = oneFrameOfData.slice([],[], [1,6,4]);
    var currentYMean = YValues.mean();
    if (currentYMean > .65)
        return true;
    return false;
};

function HandIsToFarDown(){
    var YValues = oneFrameOfData.slice([],[], [1,6,4]);
    var currentYMean = YValues.mean();
    if (currentYMean < .4)
        return true;
    return false;
};

function HandIsToFarAway(){
    var ZValues = oneFrameOfData.slice([],[], [2,6,5]);
    var currentZMean = ZValues.mean();
    if (currentZMean < .2)
        return true;
    return false;
};

function HandIsToClose(){
    var ZValues = oneFrameOfData.slice([],[], [2,6,5]);
    var currentZMean = ZValues.mean();
    if (currentZMean > .9)
        return true;
    return false;
};

function DrawArrowRight(){
    image(arrowR, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawArrowLeft(){
    image(arrowL, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawArrowUp(){
    image(arrowU, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawArrowDown(){
    image(arrowD, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawArrowTowards(){
    image(arrowT, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawArrowAway(){
    image(arrowA, 0, 0, window.innerWidth/2, window.innerHeight/2);
};

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img, 0, 0, window.innerWidth/2, window.innerHeight/2);
}

function HandleFrame(frame){
    if(frame.hands.length == 1){
        HandleHand(frame.hands[0], frame.interactionBox, 1);
    } else if (frame.hands.length == 2){
        var palmPosition = frame.hands[1].palmPosition;
        console.log(palmPosition);
        HandleHand(frame.hands[0], frame.interactionBox, 1);
        HandleHand(frame.hands[1], frame.interactionBox, 2);

        if(palmPosition[0] < 1 && palmPosition[0] > -1){
            navigationTimer = new Date();
        }
        var tEnd = new Date()
        if((-1*(navigationTimer - tEnd)/1000) > 3){
            if(palmPosition[0] < 0)
                Lessons();
            else
                SpeedTest();
        }
    }
};

function HandleHand(hand, InteractionBox, handNum){
    fingers = hand.fingers;
        for (var f=fingers.length-1; f>=0; f--) {
            for (var b=fingers[f].bones.length-1; b>=0; b--)  {
                HandleBone(fingers[f].bones[b], f, InteractionBox, handNum);
            }
        };
};

function HandleBone(bone, finger_index, InteractionBox, handNum){
    var bone_index = bone.type;
    var normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true);
    var normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true);

    oneFrameOfData.set(finger_index, bone_index, 0, normalizedPrevJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 1, normalizedPrevJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 2, normalizedPrevJoint[2]);
    oneFrameOfData.set(finger_index, bone_index, 3, normalizedNextJoint[0]);
    oneFrameOfData.set(finger_index, bone_index, 4, normalizedNextJoint[1]);
    oneFrameOfData.set(finger_index, bone_index, 5,  normalizedNextJoint[2]);

    if(handNum == 1){
        screenX1 = (window.innerWidth/2) * normalizedPrevJoint[0];
        screenY1 = (window.innerHeight/2) * (1 - normalizedPrevJoint[1]);
        screenX2 = (window.innerWidth/2) * normalizedNextJoint[0];
        screenY2 = (window.innerHeight/2) * (1 - normalizedNextJoint[1]);
    } else if(handNum == 2){
        screenX1 = (window.innerWidth/2) * (normalizedPrevJoint[0]);
        screenY1 = (window.innerHeight) * (1 - normalizedPrevJoint[1]);
        screenX2 = (window.innerWidth/2) * (normalizedNextJoint[0]);
        screenY2 = (window.innerHeight) * (1 - normalizedNextJoint[1]);
    }



    //If anyone comes to look at how I did the strokeWeight calculation... I don't really understand why you would need to pass another param
    //in to this function when you have the bone type already accessible, so I just this visual conversion using the bone type... I don't really
    //even see another useful variable within finger that isn't within the bone.
    if (handNum == 1){
        stroke(120-(meanPredAccuracy*120), meanPredAccuracy*120, 0);
        //stroke(180 - bone.type * 60);
    } else if (handNum == 2){
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

function CenterData(){
    var xValues = oneFrameOfData.slice([],[], [0,6,3]);
    var currentXMean = xValues.mean();
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

function SignIn(){
    var username = document.getElementById('username').value;
    currentUsername = username;
    list = document.getElementById('users');
    if (IsNewUser(username, list)){
        createNewUser(username, list);
    } else
        updateAndClearPrevious(username);
    //This console log is for seeing the ul within the html at the end of each "session"
    console.log(list.innerHTML);
    var li = document.getElementsByTagName("li");
    for(var i = 0; i < li.length; i++){
        if(li[i].id != String(username)+"_name" && li[i].id != String(username)+"_correct" && li[i].id != String(username)+"_wrong" && li[i].id != String(username)+"_speed" && li[i].id !=
        String(username)+"_previous"){
            li[i].style = 'color:white';
        } else {
            li[i].style = 'color:black';
        }
    }
    return false;
};

function createNewUser(username, list){
    var item1 = document.createElement('li');
    item1.innerHTML = String(username);
    item1.id = String(username) + "_name";
    item1.style = "color:white";
    list.appendChild(item1);
    var item2 = document.createElement('li');
    item2.innerHTML = 0;
    item2.id = String(username) + "_correct";
    item2.style = "color:white";
    list.appendChild(item2);
    var item3 = document.createElement('li');
    item3.innerHTML = 0;
    item3.id = String(username) + "_wrong";
    item3.style = "color:white";
    list.appendChild(item3);
    var item4 = document.createElement('li');
    item4.innerHTML = 0;
    item4.id = String(username) + "_speed";
    item4.style = "color:white";
    list.appendChild(item4);
    var item5 = document.createElement('li');
    item5.innerHTML = "0/0";
    item5.id = String(username) + "_previous";
    item5.style = "color:white";
    list.appendChild(item5);
};

function addCorrectValue(username){
    var ID = String(username) + "_correct";
    var listItem = document.getElementById(ID);
    listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
};

function addWrongValue(username){
    var ID = String(username) + "_wrong";
    var listItem = document.getElementById(ID);
    listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
};

function updateFastestSpeed(username, speedValue){
    var ID = String(username) + "_speed";
    var listItem = document.getElementById(ID);
    if (speedValue < parseInt(listItem.innerHTML)){
        listItem.innerHTML = speedValue;
    } else if (parseInt(listItem.innerHTML) == 0){
        listItem.innerHTML = speedValue;
    }
};

function updateAndClearPrevious(username){
    var pID = String(username) + "_previous";
    var cID = String(username) + "_correct";
    var wID = String(username) + "_wrong";
    var pListItem = document.getElementById(pID);
    var cListItem = document.getElementById(cID);
    var wListItem = document.getElementById(wID);
    pListItem.innerHTML = String(cListItem.innerHTML) + "/" + String(wListItem.innerHTML)
    cListItem.innerHTML = 0;
    wListItem.innerHTML = 0;
}

function IsNewUser(username, list){
    var users = list.children;
    var usernameFound = false;
    for (var i = 0; i < users.length; i++){
        if (users[i].innerHTML == username){
            usernameFound = true;
        }
    }
    return usernameFound == false;
};
