// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function BarGraph(ctx) {

  	// Private properties and methods
	var noOfFrames = 0;
	var allFrames = [];
	var currentFrame = [];
	var currentFrameIndex = 0;
	var width = 600; // width of the graph
	var height = 300; //heigh of the graph
	var maxValue = 100;
	var margin = 2; // margin between bars
	var backgroundColor = "#fff";
	var inAnimatioin = false;
	var animationSpeed = 5;
	var animationInterval = 800;
	var noOfItems = 20;
	var timer;

	var animationIntervals = [
		2000,
		1700,
		1500,
		1200,
		1000,
		800,
		600,
		400,
		200,
		100,
		50
	];

	var Bar = function(){
		this.ratio = 0;
		this.w = 0;
		this.h = 0;
		this.x = 0;
		this.y = 0;
		this.graphHeight = 0;
		this.graphWidth = 0;
		this.value = 0;
		this.color = 0;
	};

	var drawCanvas = function(){
		// Update the dimensions of the canvas if they have changed
		if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
			ctx.canvas.width = width;
			ctx.canvas.height = height;
		}

		// Draw the background color
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, width, height);
	};

	var drawBar = function(bar){
		var border = 1;
		var gradient;

		// Turn on shadow
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.shadowColor = "#999";

		// Draw bar background
		ctx.fillStyle = "#333";
		ctx.fillRect(bar.x,
			bar.y,
			bar.w,
			bar.h);

		// Turn off shadow
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;

		// Draw bar color if it is large enough to be visible
		if (bar.h > border * 2) {
			// Create gradient
			gradient = ctx.createLinearGradient(0, 0, 0, bar.graphHeight);
			gradient.addColorStop(1-bar.ratio, bar.color);
			gradient.addColorStop(1, "#ffffff");

			ctx.fillStyle = gradient;
			// Fill rectangle with gradient
			ctx.fillRect(bar.x + border,
				bar.y + border,
				bar.w - border * 2,
				bar.h - border * 2);
		}

		// Write bar value
		ctx.fillStyle = "#333";
		ctx.font = "bold 12px sans-serif";
		ctx.textAlign = "center";
		// Use try / catch to stop IE 8 from throwing error
		try {
			ctx.fillText(bar.value, bar.x+bar.w/2, height - bar.h -10);
		} catch (ex) {}

	};

	var draw = function(arr) {

		var numOfBars = arr.length;
		var maxBarWidth;
		var maxBarHeight;
		var graphWidth = width;
		var graphHeight = height;

		drawCanvas();

		// Calculate dimensions of the bar
		maxBarWidth = graphWidth / numOfBars - margin * 2;
		maxBarHeight = graphHeight - 25;

		var bar;
		// For each bar
		for (var i = 0; i < arr.length; i += 1) {
			bar = new Bar();
			bar.color = arr[i].color;
			bar.value = arr[i].value;
			bar.ratio = arr[i].value / maxValue;
			bar.h = bar.ratio * maxBarHeight;
			bar.w = maxBarWidth;
			bar.y = graphHeight - bar.h;
			bar.x = margin + i * width / numOfBars;
			bar.graphHeight = graphHeight;
			bar.graphWidth = graphWidth;
			drawBar(bar)
	  	}
	};

	var animate = function(){
		currentFrame = allFrames[currentFrameIndex++];
		draw(currentFrame);

		if (currentFrameIndex < noOfFrames && inAnimatioin){
			timer = setTimeout(animate, animationInterval);
		}else{
			inAnimatioin = false;
			clearTimeout(timer);
		}
	};

	var findMax = function(arr){
		var largestValue = 0;
		// Determine the largest value in the bar array
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].value > largestValue) {
				largestValue = arr[i].value;
			}
		}
		return largestValue;
	};

	// Public API methods

	this.findMaxValue = function(arr){
		return findMax(arr);
	};

	this.setBackgroundColor = function(color){
		backgroundColor = color;
	};

	this.setMargin = function(value){
		margin = value
	};

	this.setMaxValue = function(max){
		maxValue = max;
	};

	this.getMaxValue = function(){
		return maxValue;
	};

	this.setWidth = function(value){
		width = value;
	};

	this.setHeight = function(value){
		height = value;
	};

	this.setAnimationSpeed = function(speed){
		if (speed < 0 || speed >= animationIntervals.length) return;
		animationInterval = animationIntervals[speed]
	};

	this.increaseAnimationSpeed = function(){
		if (animationSpeed > 0 ) {
			animationInterval = animationIntervals[--animationSpeed];
		}
	};

	this.decreaseAnimationSpeed = function(){
		if (animationSpeed < animationIntervals.length-1) {
			animationInterval = animationIntervals[++animationSpeed]
		}
	};

	this.getAnimationSpeed = function(){
		return animationSpeed;
	}

  	// Update method sets the animation frames
	this.update = function (fn) {
		if (fn){
			allFrames = fn.sort();
			noOfFrames = allFrames.length;
			currentFrameIndex = 0;
			if (timer) clearTimeout(timer);
		}
	};


	this.reset = function(){
		inAnimatioin = false;
		currentFrameIndex = 0;
		currentFrame = allFrames[0];
		if (timer) clearTimeout(timer);
		draw(currentFrame);
	};

	this.fin = function(){
		inAnimatioin = false;
		currentFrameIndex = noOfFrames-1;
		currentFrame = allFrames[currentFrameIndex];
		if (timer) clearTimeout(timer);
		draw(currentFrame);
	};

	this.pause = function(){
		inAnimatioin = false;
		if (timer) clearTimeout(timer);
	};

	this.play = function(){
		if(!inAnimatioin){
			inAnimatioin = true;
			animate();
		}
	};

	this.previous = function(){
		if (inAnimatioin){
			inAnimatioin = false;
			currentFrameIndex--;
		}
		if (currentFrameIndex > 0){
			currentFrameIndex--;
			currentFrame = allFrames[currentFrameIndex];
			draw(currentFrame);
		}
	};

	this.setNoOfItems = function(value){
		noOfItems =  value;
	};

	this.getNoOfItems = function(){
		return noOfItems;
	};

	this.next = function(){
		inAnimatioin = false;
		if (currentFrameIndex < noOfFrames-1){
			currentFrameIndex++;
			currentFrame = allFrames[currentFrameIndex];
			draw(currentFrame);
		}
	};

	this.reSize = function(){
		if (!inAnimatioin){
			draw(currentFrame);
		}
	};
}