var waves= [];
function createCanvas(){
	if(document.getElementById("canvas")){
		document.body.removeChild(document.getElementById("canvas"));
	}

	canvas = document.createElement('canvas');
	canvas.id = "canvas";
	document.body.appendChild(canvas);

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		if(window.clientHeight < window.clientWidth){
			canvas.height= window.clientHeight;
			canvas.width = canvas.height;
		}
		else{
			canvas.width= window.clientWidth;
			canvas.height = canvas.width;
	
		}
	}
	else{
		if(window.innerHeight < window.innerWidth){
			canvas.height= window.innerHeight;
			canvas.width = canvas.height;
		}
		else{
			canvas.width= window.innerWidth;
			canvas.height = canvas.width;
	
		}
	}
	ctx = canvas.getContext("2d"); 
}
requestid= null;
createCanvas();
function drawable(){
	document.getElementById("drawable").style.color = "orange";
	document.getElementById("OG").style.color = "white";
	if(requestid){
		window.cancelAnimationFrame(requestid);
	}
	canvas.onmousemove = function (evt) {
		var rect = canvas.getBoundingClientRect();
		x= evt.clientX - rect.left;
		y= evt.clientY - rect.top;
		var number = Math.round(y/(canvas.width/num) );
		if(mouseDown){
			waves[number-3].xs.push(x);;
		}
	}
	//canvas.ontouchmove = canvas.onmousemove;
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
		return 300 * amplitude * (5 * Math.sin(.1 * (x + a)) + 3 * Math.sin(0.3333333 * (x + b)) + 0.25 * Math.sin(0.2 * (x + c)));
	}

	var num=60;
	var excluded = 2;
	waves = [];
	for(var i=excluded; i<num-2*excluded;i++){
		waves.push(new Wave(dumbrandom,coordAmplitude,(canvas.height/num)*i));
	}

	function animate() {
		requestid = requestAnimationFrame(animate);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i=0; i<num-3*excluded;i++){
			waves[i].draw();
		}
	}
	animate();
}
function OG(){
	document.getElementById("drawable").style.color = "white";
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
		return 300 * amplitude * (5 * Math.sin(.1 * (x + a)) + 3 * Math.sin(0.3333333 * (x + b)) + 0.25 * Math.sin(0.2 * (x + c)));
	}

	var waves= [];
	var num=60;
	var excluded = 2;
	for(var i=excluded; i<num-2*excluded;i++){
		waves.push(new Wave(dumbrandom,centerAmplitude	,(canvas.width/num)*i));
	}

	function animate() {
			requestid = requestAnimationFrame(animate);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0; i<num-3*excluded;i++){
				waves[i].draw();
			}
	}
	animate();
}

OG();
