/**
 * Created by santhoshkumar on 01/09/15.
 */

(function () {

    // defaults for canvas graph
    var getDefaults = function () {
        return {
            arrayLimit: 10,
            arrayMinLimit: 4,
            arrayMaxLimit: 50,
            maxValueLimit: 80,
            maxValueMax: 200,
            maxValueMin: 5,
            canvasWidth: 600,
            canvasHeight: 300,
            animationSpeed: 5
        }
    };

    var defaults = getDefaults();
    var randomArr = [], bubbleSortFromStartGraph, bubbleSortFromEndGraph, bubbleSortFromStart, bubbleSortFromEnd;
    var bubbleSortFromStartCanvas = document.getElementById('canvasBubbleSortFromStart');
    var bubbleSortFromEndCanvas = document.getElementById('canvasBubbleSortFromEnd');

    initialize();

    function initialize() {
        // Register an event listener to
        // call the resizeCanvas() function each time
        // the window is resized.
        window.addEventListener('resize', resizeCanvas, false);

        randomArr = generateRandomArray(defaults.arrayLimit,defaults.maxValueLimit);

        // Obtain a graphics context on the canvas element for drawing
        bubbleSortFromStartGraph = new BarGraph(bubbleSortFromStartCanvas.getContext('2d'));
        bubbleSortFromEndGraph = new BarGraph(bubbleSortFromEndCanvas.getContext('2d'));

        bubbleSortFromStart = new BubbleSort();
        bubbleSortFromEnd = new BubbleSort();

        updateCanvasSize();

        bubbleSortFromStart.setArray(randomArr.slice());
        bubbleSortFromStart.setSortFromStart();
        bubbleSortFromStartGraph.setNoOfItems(defaults.arrayLimit);
        bubbleSortFromStartGraph.setMaxValue(defaults.maxValueLimit);
        bubbleSortFromStartGraph.setAnimationSpeed(defaults.animationSpeed);
        bubbleSortFromStartGraph.update(bubbleSortFromStart);
        bubbleSortFromStartGraph.play();

        bubbleSortFromEnd.setArray(randomArr.slice());
        bubbleSortFromEndGraph.setNoOfItems(defaults.arrayLimit);
        bubbleSortFromEndGraph.setMaxValue(defaults.maxValueLimit);
        bubbleSortFromEndGraph.setAnimationSpeed(defaults.animationSpeed);
        bubbleSortFromEndGraph.update(bubbleSortFromEnd);
        bubbleSortFromEndGraph.play();
    }


    function generateRandomArray(noOfItems, maxItemValue){
        var randomised = [];
        for (var l = 0; l < noOfItems; l++){
            randomised.push(parseInt(Math.random()*maxItemValue));
        }
        return randomised;
    }

    function resizeCanvas() {
        updateCanvasSize();
        bubbleSortFromEndGraph.reSize();
        bubbleSortFromStartGraph.reSize();
    }

    function updateCanvasSize() {
        var newWidth = window.innerWidth;
        if (newWidth <= defaults.canvasWidth){
            bubbleSortFromEndGraph.setWidth(newWidth - parseInt(newWidth/10));
            bubbleSortFromStartGraph.setWidth(newWidth - parseInt(newWidth/10));
        }else{
            bubbleSortFromEndGraph.setWidth(defaults.canvasWidth);
            bubbleSortFromStartGraph.setWidth(defaults.canvasWidth);
        }
        var newHeight = window.innerHeight;
        if (newHeight <= defaults.canvasHeight){
            bubbleSortFromEndGraph.setHeight(newHeight - parseInt(newHeight/10));
            bubbleSortFromStartGraph.setHeight(newHeight - parseInt(newHeight/10));
        }else{
            bubbleSortFromEndGraph.setHeight(defaults.canvasHeight);
            bubbleSortFromStartGraph.setHeight(defaults.canvasHeight);
        }
    }

}());