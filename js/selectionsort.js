/**
 * Created by santhoshkumar on 30/08/15.
 */

// Selection Sort
function SelectionSort(){
    var arr = [];
    var traceLogger = [];

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
        for (var k = 0; k < arr.length; k++) {
            if ( k === i || k == j){
                swapTrace.push({value: arr[k], color: "purple"})
            }else if (k <= divider){
                swapTrace.push({value: arr[k], color: "green"});
            }else{
                swapTrace.push({value: arr[k], color: "red"});
            }
        }
        traceLogger.push(swapTrace);
    };
    // compare and swap function can be clubbed but keeping it separate for readability
    var generateCompareFrame = function(i,j,divider){
        var compareTrace = [];
        for (var k = 0; k < arr.length; k++) {
            if ( k === i || k == j){
                compareTrace.push({value: arr[k], color: "yellow"})
            }else if (k <= divider){
                compareTrace.push({value: arr[k], color: "green"});
            }else{
                compareTrace.push({value: arr[k], color: "red"});
            }
        }
        traceLogger.push(compareTrace);
    };

    this.sort = function() {
        traceLogger = [];
        generateFrame("red");
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i; j < arr.length; j++) {
                generateCompareFrame(i, j, i);
                if (arr[i] > arr[j]) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    generateSwapFrame(j, i, i);
                }
            }
        }
        generateFrame("green");
        return traceLogger;
    };

    this.setArray = function(newArr){
        arr =newArr;
    };
}