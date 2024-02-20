function Clock(){
  this.centerXY = 350;
  this.CtxSize = 700;
  this.time = '';

  this.init = function() {

      document.getElementById('clock').innerHTML = `
          <canvas id="clockCanvas"></canvas>
          <div id="clockTime">Juhu</div>
      `;

      this.timeDiv = document.getElementById('clockTime');
      this.timeCanvas = document.getElementById('clockCanvas');
      this.Ctx = this.timeCanvas.getContext('2d');
      this.timeCanvas.width = this.CtxSize;
      this.timeCanvas.height = this.CtxSize;

      this.tick();
  }

  this.tick = function() {

      this.now = new Date();
      this.S = parseInt(this.now.getSeconds());
      this.M = parseInt(this.now.getMinutes());
      this.H = parseInt(this.now.getHours());

      this.showTime();
      this.drawClock();
      setTimeout(this._tick, 1);
  }
  this._tick = () => { this.tick(); }

  var fii = x => `${x<10?'0':''}${x}`
  this.showTime = function() {
      var time = this.H*100- -this.M;
      if (this.time !== time) {
          this.timeDiv.innerHTML = `${fii(this.H)}:${fii(this.M)}`;
          document.title = `Tasks ${fii(this.H)}:${fii(this.M)}`;
      }
      this.time = time;
  }
  this.drawClock = function() {
      var HS = (this.M*60- -this.S)/3600;
      var DS = (this.H%12- -HS)/12;


      this.Ctx.clearRect(0,0,this.CtxSize,this.CtxSize);

      this.drawCircle('black', 38);
      this.drawLine('black', 100, 300, 0, Math.PI*2);

      this.Ctx.setLineDash([10, (Math.PI*2*300/12) - 10]);
      this.drawLine('#bb0044', 90, 300, -0.018, Math.PI*2);


      this.Ctx.setLineDash([4,(Math.PI*280*2/60)-4]);
      this.drawLine('#bb0044', 40, 280, -.008, Math.PI*2);
      this.Ctx.setLineDash([]);
      
      // this.drawLine('#220044', 30, 280, -Math.PI/2, Math.PI*2*HS-Math.PI/2);
      this.drawLine('rgba(255,255,255,0.6)', 30, 280, -Math.PI/2, Math.PI*2*HS-Math.PI/2);
      this.drawLine('#220044', 30, 320, -Math.PI/2, Math.PI*2*DS-Math.PI/2);

      this.drawSeconds[this.M % 2]();

  }

  this.drawLine = function(color, width, radius, a, b) {
      this.Ctx.strokeStyle = color;
      this.Ctx.lineWidth = width;
      this.Ctx.beginPath();
      this.Ctx.arc(this.centerXY, this.centerXY, radius, a, b);
      this.Ctx.stroke();
  }
  this.drawCircle = function(color, radius) {
      this.Ctx.fillStyle = color;
      this.Ctx.beginPath();
      this.Ctx.arc(this.centerXY, this.centerXY, radius, 0, Math.PI*2);
      this.Ctx.fill();
  }

  this.drawSeconds = [
      () => {
          this.drawSecond(this.S, 0, 1-this.now.getMilliseconds()/1000);
          for (var s=0; s < this.S; ++s) {
              this.drawSecond(s);
          }
      },
      () => {
          this.drawSecond(this.S, this.now.getMilliseconds()/1000);
          for (var s = this.S- -1; s < 60; ++s) {
              this.drawSecond(s);
          }
      },
  ];

  this.drawSecond = function(s, prc1=0, prc2=0) {
      var f = (Math.PI*2)/12*Math.floor(s/5)- -0.25-Math.PI/2;
      var A = 200 - 40*(s % 5);
      var B = 100 - 12*(7- Math.abs(Math.floor((s-25)/5)));
      this.drawLine(
          `#${A.toString(16)}00${B.toString(16)}`, 
          38, 
          60- -40*(s%5), 
          f - 0.25- -prc1*0.5, 
          f- -0.25 - prc2*0.5
      );
  }

  this.init();
}

new Clock();
