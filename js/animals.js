/* ─── ANIMALS: reveal, deer/owl interactions, fireflies ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};
var audio=SS.audio;

/* ─── ANIMALS REVEAL ─── */
var animalsObs=new IntersectionObserver(function(e){e.forEach(function(n){if(n.isIntersecting){document.getElementById('midDeer').classList.add('active');document.getElementById('midOwl').classList.add('active');animalsObs.disconnect();}});},{threshold:.25});
animalsObs.observe(document.getElementById('animalsSection'));

/* ─── DEER / OWL ─── */
var deerEl=document.getElementById('midDeer');
if(deerEl){deerEl.addEventListener('mouseenter',audio.rustle);deerEl.addEventListener('click',function(){audio.rustle();var sp=document.createElement('span');sp.className='sparkle';sp.textContent='✨';sp.style.cssText='top:0;left:50%;transform:translateX(-50%);';deerEl.appendChild(sp);setTimeout(function(){sp.parentNode&&sp.parentNode.removeChild(sp);},1000);});}
var owlEl=document.getElementById('midOwl');
if(owlEl){owlEl.addEventListener('click',audio.hoot);}

/* ─── FIREFLY CANVAS (animals section) ─── */
var ffCv=document.getElementById('ffCanvas');
if(ffCv){
  var ffCtx=ffCv.getContext('2d');
  var ffFlies=[];
  function resizeFF(){ffCv.width=ffCv.offsetWidth||400;ffCv.height=ffCv.offsetHeight||280;}
  var ffStarted=false;
  var ffAnimObs=new IntersectionObserver(function(e){e.forEach(function(n){if(n.isIntersecting&&!ffStarted){ffStarted=true;resizeFF();for(var i=0;i<6;i++)ffFlies.push({x:ffCv.width*.1+Math.random()*ffCv.width*.8,y:ffCv.height*.5+Math.random()*ffCv.height*.4,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.4,ph:Math.random()*Math.PI*2});(function loop(){ffCtx.clearRect(0,0,ffCv.width,ffCv.height);var t=performance.now();ffFlies.forEach(function(f){f.x+=f.vx+Math.sin(t*.0009+f.ph)*.35;f.y+=f.vy+Math.cos(t*.0011+f.ph)*.28;if(f.x<20)f.x=ffCv.width-40;if(f.x>ffCv.width-20)f.x=40;if(f.y<ffCv.height*.3)f.y=ffCv.height*.3;if(f.y>ffCv.height*.88)f.y=ffCv.height*.32;var fa=.3+.7*Math.abs(Math.sin(t*.0016+f.ph));var fg=ffCtx.createRadialGradient(f.x,f.y,0,f.x,f.y,10);fg.addColorStop(0,'rgba(190,255,60,'+fa+')');fg.addColorStop(1,'rgba(190,255,60,0)');ffCtx.beginPath();ffCtx.arc(f.x,f.y,10,0,Math.PI*2);ffCtx.fillStyle=fg;ffCtx.fill();ffCtx.beginPath();ffCtx.arc(f.x,f.y,2.5,0,Math.PI*2);ffCtx.fillStyle='rgba(210,255,80,'+fa+')';ffCtx.fill();});requestAnimationFrame(loop);})();}});},{threshold:.2});
  ffAnimObs.observe(ffCv.parentElement.parentElement);
}
})();
