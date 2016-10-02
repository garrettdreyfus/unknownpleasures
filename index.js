var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
canvas.width = 800; //document.width is obsolete
canvas.height = 800;
ctx.lineWidth = 3;

var fps = 120;
var n = 0;
animate();

function centerAmplitude(x){
      var temp =  Math.min(Math.pow((.5 / Math.abs(x - canvas.width/2)),1.075), 0.01);
			return temp;

}
// sawtooth sine
function dumbrandom(x, a, b, c, amplitude) {
  return 300 * amplitude * (5 * Math.sin(.1 * (x + a)) + 3 * Math.sin(0.3333333 * (x + b)) + 0.25 * Math.sin(0.2 * (x + c)));
}

var waves= [];
var num=60;
var excluded = 2;
for(var i=excluded; i<num-excluded;i++){
	waves.push(new Wave(dumbrandom,centerAmplitude,(canvas.width/num)*i));
}
function animate() {
  setTimeout(function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i=0; i<num-2*excluded;i++){
			waves[i].draw();
		}


  }, 100 / fps);
}

