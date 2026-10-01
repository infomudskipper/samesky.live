/* ─── THEME TOGGLE — clean two-state ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};

var curTheme='light';
var htmlEl=document.documentElement;
var tbtn=document.getElementById('themeToggle');
var ticon=document.getElementById('toggleIcon');
var tlabel=document.getElementById('toggleLabel');
var rippleEl=document.getElementById('theme-ripple');
var goldenEl=document.getElementById('golden-overlay');

function applyTheme(t){
  curTheme=t;
  htmlEl.setAttribute('data-theme',t);
  if(t==='dark'){
    ticon.textContent='☀️';tlabel.textContent='Day';
    SS.stars.start();
    if(SS.audio.isOn())SS.audio.startNightAmb();
  } else {
    ticon.textContent='🌙';tlabel.textContent='Night';
    SS.stars.stop();
    if(SS.audio.isOn())SS.audio.startDayAmb();
  }
  try{localStorage.setItem('utss-theme',t);}catch(e){}
}

tbtn.addEventListener('click',function(){
  var next=curTheme==='light'?'dark':'light';
  var rect=tbtn.getBoundingClientRect();
  var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
  // Golden hour flash
  if(goldenEl){goldenEl.classList.remove('fade');goldenEl.classList.add('flash');setTimeout(function(){goldenEl.classList.remove('flash');goldenEl.classList.add('fade');setTimeout(function(){goldenEl.classList.remove('fade');},500);},180);}
  // Ripple
  rippleEl.style.left=cx+'px';rippleEl.style.top=cy+'px';
  rippleEl.style.background=next==='dark'?'#020810':'#5CCEEE';
  rippleEl.style.transform='scale(0)';rippleEl.style.opacity='0';rippleEl.style.transition='none';
  void rippleEl.offsetWidth;
  rippleEl.classList.remove('expand','fade');void rippleEl.offsetWidth;
  rippleEl.classList.add('expand');
  setTimeout(function(){applyTheme(next);rippleEl.classList.add('fade');},280);
  setTimeout(function(){rippleEl.classList.remove('expand','fade');rippleEl.style.transform='scale(0)';rippleEl.style.opacity='0';},720);
});

// Restore saved theme
try{var saved=localStorage.getItem('utss-theme');applyTheme(saved==='dark'?'dark':'light');}catch(e){applyTheme('light');}
})();
