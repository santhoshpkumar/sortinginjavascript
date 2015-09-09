/**
 * Created by santhoshkumar on 30/08/15.
 */


// Insertion Sort
function InsertionSort(){

    var arr;
    var traceLogger = [];

    // Frame generation helpers
    var generateFrame = function(arr, color){
        var arrayTrace = [];
        for (var i = 0; i < arr.length; i++) {
            arrayTrace.push({value:arr[i],color:color});
        }
        traceLogger.push(arrayTrace);
    };

    var generateDividedFrame = function(arr, divider){
        var arrayTrace = [];
        for (var i = 0; i < divider; i++) {
            arrayTrace.push({value:arr[i],color:"green"});
        }
        for (i = divider; i < arr.length; i++) {
            arrayTrace.push({value:arr[i],color:"red"});
        }
        traceLogger.push(arrayTrace);
    };

    var generateSwappedFrame = function(arr, i, j, divider){
        var arrayTrace = [];
        for (var k = 0; k < arr.length; k++) {
            if ( k <= i && k >= j){
                arrayTrace.push({value: arr[k], color: "blue"})
            }else if (k <= divider){
                arrayTrace.push({value: arr[k], color: "green"});
            }else{
                arrayTrace.push({value: arr[k], color: "red"});
            }
        }
        traceLogger.push(arrayTrace);
    };

    var generateCompareFrame = function(arr, i, j, max){
        var compareTrace = [];
        for (var k = 0; k < arr.length; k++) {
            if ( k === i || k == j){
                compareTrace.push({value: arr[k], color: "yellow"})
            }else if (k <= max){
                compareTrace.push({value: arr[k], color: "green"});
            }else{
                compareTrace.push({value: arr[k], color: "red"});
            }
        }
        traceLogger.push(compareTrace);
    };

    this.setArray = function(newArr){
      arr = newArr;
    };

    this.sort = function()
    {
        traceLogger = [];
        generateFrame(arr,"red");
        for (var i = 1; i < arr.length; i++) {
            generateDividedFrame(arr,i);
            var cmpItm = arr[i];
            var tempArr = arr.slice();
            for (var j = i; j > 0 && cmpItm < arr[j - 1]; j--) {
                generateCompareFrame(tempArr, i, j - 1, i);
                arr[j] = arr[j - 1];
            }
            generateCompareFrame(tempArr, i, j - 1, i);
            arr[j] = cmpItm;
            generateSwappedFrame(tempArr, i, j, i);
        }
        generateFrame(arr,"green");
        return traceLogger;
    };
}







