/**
 * Created by santhoshkumar on 30/08/15.
 */


// Bubble Sort
function BubbleSort(){

    var traceLogger = [];
    var arr = [];
    var LOGIC = {START:0, END:1};
    var sortLogic = LOGIC.END;
    // Frame generation helpers
    var generateFrame = function(color){
        var arrayTrace = [];
        for (var i = 0; i < arr.length; i++) {
            arrayTrace.push({value:arr[i],color:color});
        }
        traceLogger.push(arrayTrace);
    };

    // compare and swap functions can be clubbed but keeping it separate for readability
    var generateSwapFrame = function(i,j,divider){
        var swapTrace = [];
        var colorOne;
        var colorTwo;

        if (sortLogic == LOGIC.END){
            colorOne = "green";
            colorTwo = "red";
        }else{
            colorOne = "red";
            colorTwo = "green";
        }

        for (var k = 0; k < arr.length; k++) {
            if ( k === i || k === j){
                swapTrace.push({value: arr[k], color: "purple"})
            }else if (k < divider || (k === divider && (sortLogic == LOGIC.START))){
                swapTrace.push({value: arr[k], color: colorOne});
            }else{
                swapTrace.push({value: arr[k], color: colorTwo});
            }
        }
        traceLogger.push(swapTrace);
    };

    // compare and swap function can be clubbed but keeping it separate for readability
    var generateCompareFrame = function(i,j,divider){
        var compareTrace = [];
        var colorOne;
        var colorTwo;

        if (sortLogic == LOGIC.END){
            colorOne = "green";
            colorTwo = "red";
        }else{
            colorOne = "red";
            colorTwo = "green";
        }

        for (var k = 0; k < arr.length; k++) {
            if ( k === i || k === j){
                compareTrace.push({value: arr[k], color: "yellow"})
            }else if (k < divider || (k === divider && (sortLogic == LOGIC.START))){
                compareTrace.push({value: arr[k], color: colorOne});
            }else {
                compareTrace.push({value: arr[k], color: colorTwo});
            }
        }
        traceLogger.push(compareTrace);
    };

    var sortFromStart = function(){
        traceLogger = [];
        generateFrame("red");
        for (var i = arr.length -1; i > 0; i--) { // don't have to loop through the last element
            for (var j = 0; j < i; j++){
                generateCompareFrame( j, j + 1, i);
                if (arr[j] > arr[j+1]){
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    generateSwapFrame(j, j + 1, i);
                }
            }
        }
        generateFrame("green");
    };

    var sortFromEnd = function(){
        traceLogger = [];
        generateFrame("red");
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = arr.length - 1; j > i; j--) {
                generateCompareFrame( j, j - 1, i);
                if (arr[j] < arr[j - 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                    generateSwapFrame(j, j - 1, i);
                }
            }
        }
        generateFrame("green");
    };

    //Public API
    this.sort = function() {
        if(sortLogic == LOGIC.START){
            sortFromStart();
        }else{
            sortFromEnd();
        }
        return traceLogger;
    };

    this.setSortFromStart = function(){
        sortLogic = LOGIC.START;
    };

    this.setSortFromEnd = function(){
        sortLogic = LOGIC.END;
    };

    this.setArray = function(newArr){
        arr = newArr;
    };
}
