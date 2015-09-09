/**
 * Created by santhoshkumar on 07/09/15.
 */

function ShellSort(){
    var arr = [];
    var traceLogger = [];

    var generateFrame = function(color){
        var arrayTrace = [];
        for (var i = 0; i < arr.length; i++) {
            arrayTrace.push({value:arr[i],color:color});
        }
        traceLogger.push(arrayTrace);
    };

    this.setArray = function(input){
        arr = input;
    };

    var generateGapFrame = function(start, gap){
        var arrayTrace = [];
        var index = start;

        while (index-gap >= 0){
            index -=gap;
        }

        for (var i = 0; i < arr.length; i++) {
            if(i === index) {
                index+=gap;
                arrayTrace.push({value: arr[i], color: "red"});
            }else{
                arrayTrace.push({value: arr[i], color: "grey"});
            }
        }
        traceLogger.push(arrayTrace);
    };

    var generateCompareFrame = function(arr,gap,right,left){
        var arrayTrace = [];
        var index = right;

        while (index-gap >= 0){
            index -=gap;
        }

        for (var i = 0; i < arr.length; i++) {
            if(i === index) {
                if (index === right || index === left) {
                    arrayTrace.push({value: arr[i], color: "yellow"});
                }else if (index <= right) {
                    arrayTrace.push({value: arr[i], color: "green"});
                } else {
                    arrayTrace.push({value: arr[i], color: "red"});
                }
                index+=gap;
            }else{
                arrayTrace.push({value: arr[i], color: "grey"});
            }
        }
        traceLogger.push(arrayTrace);
    };

    var generateSwapFrame = function(arr,gap,right,left){
        var arrayTrace = [];
        var index = right;

        while (index-gap >= 0){
            index -=gap;
        }

        for (var i = 0; i < arr.length; i++) {
            if(i === index) {
                if (index <= right && index >= left) {
                    arrayTrace.push({value: arr[i], color: "blue"});
                }else if (index <= right) {
                    arrayTrace.push({value: arr[i], color: "green"});
                } else {
                    arrayTrace.push({value: arr[i], color: "red"});
                }
                index+=gap;
            }else{
                arrayTrace.push({value: arr[i], color: "grey"});
            }
        }
        traceLogger.push(arrayTrace);
    };

    this.sort = function(){
        traceLogger = [];
        generateFrame("red");
        for(var h = arr.length; h = (Math.ceil(h/3)); ){
            for(var i = h ; i < arr.length ; i++ ){
                if(h!==1){
                    generateGapFrame(i, h);
                }
                var cmpItm = arr[i];
                var tempArr = arr.slice();
                var j = i;
                while(true){
                    if(j >= h) {
                        generateCompareFrame(tempArr, h, i, j - h);
                    }
                    if(j >= h && cmpItm < arr [j-h]){
                        arr[j]= arr[j-h];
                        j-=h;
                    }else{
                        break;
                    }
                }

                if (i !== j) {
                    generateSwapFrame(tempArr,h,i,j);
                    arr[j] = cmpItm;
                    generateSwapFrame(arr,h,i,j);
                }
            }
            if (h===1) {
                break;
            }
        }
        generateFrame("Green");
        return traceLogger;
    };

}