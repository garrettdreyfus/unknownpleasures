function Wave(wav, amp, placement) {
  this.Aoffset = Math.random()*20;
  this.Boffset = Math.random()*30;
  this.Coffset = Math.random()*20;
  this.shift = 0;
  this.edge = 100;
  this.wave = wav;
  this.amplitude = amp;
  this.placement = placement;
  this.color = "white";
  this.draw = function(){
    // Drawing code goes here
    n = canvas.width;
    this.shift++;

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    for (var x = this.edge; x < n-this.edge; x++) {
      var y = this.wave((x - this.shift)/2, this.Aoffset, this.Boffset, this.Coffset, this.amplitude(x));
      ctx.lineTo(x, y + this.placement + 50 * (Math.abs(x - canvas.width/2) / n));
    }
    ctx.stroke();
  }
}
