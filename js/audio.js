/* ─── AUDIO: sound effects + ambient soundscape ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};

/* ─── AUDIO HELPERS ─── */
var AC=null;
function getAC(){if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return AC;}
function tone(f,d,t,v){try{var a=getAC();if(!a)return;var o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.type=t||'sine';o.frequency.value=f;g.gain.setValueAtTime(v||.15,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+(d||.4));o.start();o.stop(a.currentTime+(d||.4));}catch(e){}}
function chime(f){tone(f,.45,'sine',.17);}
function ascend(){[523,659,784,1047].forEach(function(n,i){setTimeout(function(){tone(n,.22,'sine',.14);},i*155);});}
function rustle(){try{var a=getAC();if(!a)return;var b=a.createBuffer(1,a.sampleRate*.28,a.sampleRate),d=b.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*.26;var s=a.createBufferSource();s.buffer=b;var fi=a.createBiquadFilter();fi.type='lowpass';fi.frequency.value=360;var g=a.createGain();g.gain.setValueAtTime(.07,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.28);s.connect(fi);fi.connect(g);g.connect(a.destination);s.start();s.stop(a.currentTime+.28);}catch(e){}}
function hoot(){tone(220,.65,'sine',.1);setTimeout(function(){tone(330,.45,'sine',.07);},110);}

/* ─── AMBIENT SOUND ─── */
var soundOn=false;
var ambNodes=[];
function stopAmb(){ambNodes.forEach(function(n){try{n.stop();}catch(e){}});ambNodes=[];}
function startDayAmb(){
  stopAmb();
  try{
    var a=getAC();if(!a)return;
    // Wind noise
    var buf=a.createBuffer(1,a.sampleRate*3,a.sampleRate);
    var d=buf.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1);
    var src=a.createBufferSource();src.buffer=buf;src.loop=true;
    var bp=a.createBiquadFilter();bp.type='bandpass';bp.frequency.value=400;bp.Q.value=.8;
    var gw=a.createGain();gw.gain.value=.04;
    src.connect(bp);bp.connect(gw);gw.connect(a.destination);src.start();ambNodes.push(src);
    // Bird chirps
    function chirp(){
      if(!soundOn)return;
      try{var o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);
      var bf=1200+Math.random()*600;o.frequency.setValueAtTime(bf,a.currentTime);
      o.frequency.linearRampToValueAtTime(bf*1.4,a.currentTime+.08);
      o.frequency.linearRampToValueAtTime(bf*.9,a.currentTime+.16);
      g.gain.setValueAtTime(.06,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.22);
      o.type='sine';o.start();o.stop(a.currentTime+.22);}catch(e){}
      setTimeout(chirp,3500+Math.random()*5000);
    }
    setTimeout(chirp,1500);
  }catch(e){}
}
function startNightAmb(){
  stopAmb();
  try{
    var a=getAC();if(!a)return;
    [4200,4420,4580,4800].forEach(function(f,i){
      var o=a.createOscillator(),lfo=a.createOscillator(),g=a.createGain(),lg=a.createGain();
      o.type='sine';o.frequency.value=f;lfo.type='sine';lfo.frequency.value=12+i;
      lg.gain.value=.015;lfo.connect(lg);lg.connect(g.gain);g.gain.value=.022;
      o.connect(g);g.connect(a.destination);o.start();lfo.start();
      ambNodes.push(o);ambNodes.push(lfo);
    });
    function schedOwl(){if(!soundOn)return;hoot();setTimeout(schedOwl,26000+Math.random()*10000);}
    setTimeout(schedOwl,5000);
  }catch(e){}
}
var soundBtnEl=document.getElementById('soundBtn');
var soundIconEl=document.getElementById('soundIcon');
if(soundBtnEl){
  soundBtnEl.addEventListener('click',function(){
    soundOn=!soundOn;
    soundIconEl.textContent=soundOn?'🔊':'🔇';
    if(soundOn){var t=document.documentElement.getAttribute('data-theme');if(t==='dark')startNightAmb();else startDayAmb();}
    else stopAmb();
  });
}

SS.audio={
  chime:chime, ascend:ascend, rustle:rustle, hoot:hoot,
  startDayAmb:startDayAmb, startNightAmb:startNightAmb,
  isOn:function(){return soundOn;},
  buttonEl:soundBtnEl
};
})();
