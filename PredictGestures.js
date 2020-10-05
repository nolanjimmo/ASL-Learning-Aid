const knnClassifier = ml5.KNNClassifier();

var trainingCompleted = false;
var numSamples = 2;
var features;
var currentLabel;
var predictedLabel;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(numSamples);

function draw(){

    clear();
    if (trainingCompleted == false){
        Train();
        //knnClassifier.addExample(features.tolist(), 0);
    }
    Test();
};

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
    numSamples = test.shape[3];
    currentTestSample = test.pick(null,null,null,testingSampleIndex);
    currentTestSample = currentTestSample.reshape(120);
    currentTestLabel = 0;
    predictedLabel = knnClassifier.classify(currentTestSample.tolist(), GotResults);
};

function GotResults(err, result){
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    console.log(testingSampleIndex, predictedClassLabels.get(testingSampleIndex));
    testingSampleIndex ++;
    if(testingSampleIndex >= 100){
        testingSampleIndex = 0;
    };
};
