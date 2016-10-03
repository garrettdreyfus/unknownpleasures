var waves= [];
function createCanvas(){
	if(document.getElementById("canvas")){
		document.body.removeChild(document.getElementById("canvas"));
	}

	canvas = document.createElement('canvas');
	canvas.id = "canvas";
	document.body.appendChild(canvas);


		if(window.innerHeight < window.innerWidth){
			canvas.height= window.innerHeight;
			canvas.width = canvas.height;
		}
		else{
			canvas.width= window.innerWidth;
			canvas.height = canvas.width;
	
		}
	ctx = canvas.getContext("2d"); 
	OG();
}
requestid= null;
createCanvas();
function drawable(){

	document.getElementById("draw").style.color = "orange";
	document.getElementById("OG").style.color = "white";
	if(requestid){
		window.cancelAnimationFrame(requestid);
	}
	canvas.onmousemove = function (evt) {
		evt.preventDefault();
		var rect = canvas.getBoundingClientRect();
		x= evt.clientX - rect.left;
		y= evt.clientY - rect.top;
		var number = Math.round(y/(canvas.width/num) );
		if(mouseDown){
			waves[number-3].xs.push(x);
		}
	}
	canvas.ontouchmove = function (evt) {
		evt.preventDefault();
		var rect = canvas.getBoundingClientRect();
		x= evt.touches[0].clientX - rect.left;
		y= evt.touches[0].clientY - rect.top;
		var number = Math.round(y/(canvas.width/num) );
		if(mouseDown){
			waves[number-3].xs.push(x);
		}
	}
	//}
	ctx.lineWidth = 3;

	var fps = 120;
	var n = 0;
	function centerAmplitude(x,xs){
		var temp =  Math.min(Math.pow((.5 / Math.abs(x - canvas.width/2)),1.075), 0.01);
		return temp;

	}
	var mouseDown = 0;
	document.onmousedown = function() { 
			++mouseDown;
	}
	document.ontouchstart = document.onmousedown;
	document.onmouseup = function() {
			--mouseDown;
	}
	document.ontouchend = document.onmouseup;
	function coordAmplitude(x,xs){
		var max = 0.001;
		for(var i=0; i<xs.length;i++){
			max = Math.max(Math.min(Math.pow((.6 / Math.abs(x - xs[i])),2), 0.01),max);
		}
		return max;
	}

	// sawtooth sine
	function dumbrandom(x, a, b, c, amplitude) {
		return 300 * amplitude * (5 * Math.sin(.1 * (x + a)) + 4 * Math.sin(0.25 * (x + b)) + 0.25 * Math.sin(0.2 * (x + c)));
	}

	var num=60;
	var excluded = 2;
	waves = [];
	for(var i=excluded; i<num-2*excluded;i++){
		waves.push(new Wave(dumbrandom,coordAmplitude,(canvas.height/num)*i));
	}
	gif = new GIF({
			workers: 10,
			quality: 128,
		  workerScript: 'gif.js/dist/gif.worker.js',
	});
	gif.on('finished', function(blob) {
						download(blob,"unknownpleasures.gif", "image/gif");
						document.getElementById("gifit").className = "";	
						document.getElementById("gifit").style.color = "white";	
				});

	frame =1001;
	function animate() {
			if(frame<64){
				gif.addFrame(canvas, {delay: 25,copy:true});
				frame++;
			}
			if(frame==64){
							gif.render();
				frame =1001;
			}
			if(frame!=1001){
				document.getElementById("gifit").className = "blink";	
				document.getElementById("gifit").style.color = "red";	
			}

			requestid = requestAnimationFrame(animate);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0; i<num-3*excluded;i++){
				waves[i].draw();
			}
	}
	animate();
}
function OG(){

	document.getElementById("draw").style.color = "white";
	document.getElementById("OG").style.color = "orange";
	if(requestid){
		window.cancelAnimationFrame(requestid);
	}
	ctx.lineWidth = 3;

	var fps = 120;
	var n = 0;

	function centerAmplitude(x,xs){
		var temp =  Math.min(Math.pow((.5 / Math.abs(x - canvas.width/2)),1.075), 0.01);
		return temp;

	}

	function coordAmplitude(x,xs){
		var max = 0.001;
		for(var i=0; i<xs.length;i++){
			max = Math.max(Math.min(Math.pow((.6 / Math.abs(x - xs[i])),2), 0.01),max);
		}
		return max;
	}

	// sawtooth sine
	function dumbrandom(x, a, b, c, amplitude) {
		return 300 * amplitude * (5 * Math.sin(.1 * (x + a)) + 4 * Math.sin(0.25 * (x + b)) + 0.25 * Math.sin(0.2 * (x + c)));
	}

	var waves= [];
	var num=60;
	var excluded = 2;
	for(var i=excluded; i<num-2*excluded;i++){
		waves.push(new Wave(dumbrandom,centerAmplitude	,(canvas.width/num)*i));
	}

	gif = new GIF({
			workers: 10,
			quality: 128,
		  workerScript: 'gif.js/dist/gif.worker.js',
	});
	gif.on('finished', function(blob) {
						console.log("hi");
						download(blob,"unknownpleasures.gif", "image/gif");
						document.getElementById("gifit").className = "";	
						document.getElementById("gifit").style.color = "white";	
				});

	frame =1001;
	function animate() {
			if(frame<63){
				gif.addFrame(canvas, {delay: 25,copy:true});
				frame++;
			}
			if(frame==63){
							gif.render();
				frame =1001;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0; i<num-3*excluded;i++){
				waves[i].draw();
			}
			if(frame!=1001){
				document.getElementById("gifit").className = "blink";	
				document.getElementById("gifit").style.color = "red";	
			}
			requestid = requestAnimationFrame(animate);
	}
	animate();
}

