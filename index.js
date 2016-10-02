var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
canvas.width = 800; //document.width is obsolete
canvas.height = 800;
ctx.lineWidth = 3;

var fps = 120;
var n = 0;
animate();

function centerAmplitude(x,xs){
	var temp =  Math.min(Math.pow((.5 / Math.abs(x - canvas.width/2)),1.075), 0.01);
	return temp;

}
var mouseDown = 0;
document.body.onmousedown = function() { 
	  ++mouseDown;
}
document.body.onmouseup = function() {
	  --mouseDown;
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
	waves.push(new Wave(dumbrandom,coordAmplitude,(canvas.width/num)*i));
}
function color(evt) {
	var rect = canvas.getBoundingClientRect();
	x= evt.clientX - rect.left;
	y= evt.clientY - rect.top;
	var number = Math.round(y/(canvas.width/num) );
	if(mouseDown){
		waves[number-3].xs.push(x);;
	}
}
function animate() {
  setTimeout(function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i=0; i<num-3*excluded;i++){
			waves[i].draw();
		}


  }, 100 / fps);
}

