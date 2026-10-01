/* ─── STAR CANVAS (night hero) ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};

var canvas=document.getElementById('star-canvas');
var ctx=canvas.getContext('2d');
var stars=[],milky=[],shooters=[],animating=false,sRaf;

function resize(){
  var h=document.getElementById('heroSection');
  canvas.width=h?h.offsetWidth:window.innerWidth;
  canvas.height=h?h.offsetHeight:window.innerHeight;
}
window.addEventListener('resize',resize,{passive:true});
document.fonts.ready.then(resize);

function mkStars(){
  stars=[];milky=[];
  // Stars across full height — opacity encodes depth, fade applied per-star
  var n=Math.floor((canvas.width*canvas.height)/420);
  for(var i=0;i<n;i++){
    var cls=Math.random();
    var r=cls<.55?(Math.random()*.3+.1):cls<.85?(Math.random()*.75+.45):(Math.random()*1.4+1.2);
    // yFrac 0=top, 1=bottom — exponential bias toward top
    var yFrac=1-Math.pow(Math.random(),1.6);
    var y=yFrac*canvas.height*0.92;
    // Stars near bottom get lower max-opacity — graceful fade, no hard line
    var maxAlpha=Math.max(0.05, 1-(yFrac*yFrac*1.1));
    stars.push({x:Math.random()*canvas.width,y:y,r:r,
      a:Math.random()*maxAlpha,da:(Math.random()-.5)*(.003+Math.random()*.016),
      maxA:maxAlpha,glow:r>1.2&&yFrac<0.55});
  }
  var cx=canvas.width*.5,cy=canvas.height*.38,ang=-.32;
  for(var j=0;j<540;j++){
    var al=(Math.random()-.5)*canvas.width*1.1;
    var ac=(Math.random()-.5)*88*Math.exp(-Math.abs(al)/(canvas.width*.38));
    milky.push({x:cx+al*Math.cos(ang)-ac*Math.sin(ang),y:cy+al*Math.sin(ang)+ac*Math.cos(ang),r:Math.random()*.65+.1,a:Math.random()*.26+.05});
  }
}
function mkShot(){
  var slow=Math.random()<.18;
  return{x:Math.random()*canvas.width*.8+canvas.width*.1,y:Math.random()*canvas.height*.3,
    len:slow?Math.random()*200+180:Math.random()*120+60,
    speed:slow?Math.random()*2+1.2:Math.random()*6+4,
    angle:Math.PI*.75+(Math.random()-.5)*.3,life:1,
    decay:slow?Math.random()*.005+.004:Math.random()*.018+.012};
}
var stimer=0;
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // Nebula patches
  var gn1=ctx.createRadialGradient(canvas.width*.18,canvas.height*.2,0,canvas.width*.18,canvas.height*.2,200);
  gn1.addColorStop(0,'rgba(55,15,110,.08)');gn1.addColorStop(1,'rgba(55,15,110,0)');
  ctx.fillStyle=gn1;ctx.fillRect(0,0,canvas.width,canvas.height*.6);
  var gn2=ctx.createRadialGradient(canvas.width*.82,canvas.height*.12,0,canvas.width*.82,canvas.height*.12,165);
  gn2.addColorStop(0,'rgba(10,38,145,.06)');gn2.addColorStop(1,'rgba(10,38,145,0)');
  ctx.fillStyle=gn2;ctx.fillRect(canvas.width*.5,0,canvas.width*.5,canvas.height*.5);
  // Milky Way
  milky.forEach(function(s){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,'+s.a.toFixed(2)+')';ctx.fill();});
  // Stars with individual twinkling
  stars.forEach(function(s){
    s.a+=s.da;if(s.a>s.maxA)s.da=-Math.abs(s.da);if(s.a<.04)s.da=Math.abs(s.da);
    if(s.glow){ctx.shadowBlur=4;ctx.shadowColor='rgba(200,220,255,.65)';}
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,'+s.a.toFixed(2)+')';ctx.fill();
    if(s.glow)ctx.shadowBlur=0;
  });
  // More frequent shooting stars
  stimer++;
  if(stimer>40){stimer=0;
    if(Math.random()<.95)shooters.push(mkShot());
    // Occasional burst of 2 fast meteors together
    if(Math.random()<.18){
      var s2=mkShot();s2.speed*=1.4;s2.y+=20;s2.x+=40;
      shooters.push(s2);
    }
  }
  shooters=shooters.filter(function(s){return s.life>0;});
  shooters.forEach(function(s){
    ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-Math.cos(s.angle)*s.len,s.y-Math.sin(s.angle)*s.len);
    var gr=ctx.createLinearGradient(s.x,s.y,s.x-Math.cos(s.angle)*s.len,s.y-Math.sin(s.angle)*s.len);
    gr.addColorStop(0,'rgba(255,255,255,'+s.life.toFixed(2)+')');gr.addColorStop(1,'rgba(255,255,255,0)');
    ctx.strokeStyle=gr;ctx.lineWidth=1.5;ctx.stroke();
    s.x+=Math.cos(s.angle)*s.speed;s.y+=Math.sin(s.angle)*s.speed;s.life-=s.decay;
  });
  if(animating)sRaf=requestAnimationFrame(drawStars);
}
function startStars(){if(animating)return;animating=true;mkStars();sRaf=requestAnimationFrame(drawStars);}
function stopStars(){animating=false;cancelAnimationFrame(sRaf);ctx.clearRect(0,0,canvas.width,canvas.height);}

SS.stars={start:startStars, stop:stopStars};
})();
