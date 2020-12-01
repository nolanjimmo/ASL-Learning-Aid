var oneFrameOfData = nj.array([[[0.32153,0.32153,0.2083,0.17855],
        [0.37135,0.34296,0.35545,0.35234],
        [0.42052,0.43163,0.46915,0.46604],
        [0.46841,0.51557,0.5609,0.56035],
        [0.50922,0.5858,0.64091,0.6428]],
       [[0.38144,0.38144,0.53838,0.6491],
        [0.44069,0.70846,0.86441,0.9138],
        [0.4466,0.6986,0.87071,0.9298],
        [0.4422,0.66126,0.81925,0.88098],
        [0.4175,0.61379,0.73323,0.77838]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]],
       [[0.32153,0.2083,0.17855,0.13251],
        [0.34296,0.35545,0.35234,0.34482],
        [0.43163,0.46915,0.46604,0.45065],
        [0.51557,0.5609,0.56035,0.54393],
        [0.5858,0.64091,0.6428,0.6229]],
       [[0.38144,0.53838,0.6491,0.72464],
        [0.70846,0.86441,0.9138,0.91739],
        [0.6986,0.87071,0.9298,0.93447],
        [0.66126,0.81925,0.88098,0.8912],
        [0.61379,0.73323,0.77838,0.79106]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]]]);

var anotherFrameOfData = nj.array([[[0.2935,0.2935,0.16261,0.13857],
        [0.34542,0.28314,0.2827,0.27033],
        [0.39492,0.37436,0.39324,0.37682],
        [0.44315,0.4629,0.49259,0.48268],
        [0.48377,0.53691,0.57505,0.56857]],
       [[0.37533,0.37533,0.52747,0.63395],
        [0.43951,0.71449,0.87675,0.92836],
        [0.44958,0.71148,0.88911,0.9477],
        [0.44903,0.67981,0.84131,0.90617],
        [0.42732,0.6368,0.76423,0.81393]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]],
       [[0.2935,0.16261,0.13857,0.09955],
        [0.28314,0.2827,0.27033,0.25682],
        [0.37436,0.39324,0.37682,0.35387],
        [0.4629,0.49259,0.48268,0.46171],
        [0.53691,0.57505,0.56857,0.54414]],
       [[0.37533,0.52747,0.63395,0.70965],
        [0.71449,0.87675,0.92836,0.93222],
        [0.71148,0.88911,0.9477,0.95062],
        [0.67981,0.84131,0.90617,0.92146],
        [0.6368,0.76423,0.81393,0.83257]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]]]);

var xStart;
var yStart;
var zStart;
var xEnd;
var yEnd;
var zEnd;
var screenX1;
var screenY1;
var screenX2;
var screenY2;
var frameRateIndex = 0;
var frameRateSwitch = 0;
function draw(){
    if(frameRateIndex === 100){
        frameRateIndex = 0;
    };
    if (frameRateIndex === 0 && frameRateSwitch === 0){
        frameRateSwitch = 1;
    } else if(frameRateIndex === 0 && frameRateSwitch ===1){
        frameRateSwitch = 0;
    };
    clear();
    //console.log(oneFrameOfData.get(1,0,2));
    for(var f = 0; f<5; f++){
        for(var b = 0; b<4; b++){

            if(frameRateSwitch % 2 === 0){
                xStart = train5.get(0,f,b);
                yStart = train5.get(1,f,b);
                zStart = train5.get(2,f,b);
                xEnd = train5.get(3,f,b);
                yEnd = train5.get(4,f,b);
                zEnd = train5.get(5,f,b);

                screenX1 = window.innerWidth * xStart;
                screenY1 = window.innerHeight * (1 - yStart);
                screenX2 = window.innerWidth * xEnd;
                screenY2 = window.innerHeight * (1 - yEnd);
                line(screenX1, screenY1, screenX2, screenY2);
            } else{
                xStart = anotherFrameOfData.get(0,f,b);
                yStart = anotherFrameOfData.get(1,f,b);
                zStart = anotherFrameOfData.get(2,f,b);
                xEnd = anotherFrameOfData.get(3,f,b);
                yEnd = anotherFrameOfData.get(4,f,b);
                zEnd = anotherFrameOfData.get(5,f,b);

                screenX1 = window.innerWidth * xStart;
                screenY1 = window.innerHeight * (1 - yStart);
                screenX2 = window.innerWidth * xEnd;
                screenY2 = window.innerHeight * (1 - yEnd);
                line(screenX1, screenY1, screenX2, screenY2);
             };
        };
    };

    frameRateIndex++;
};