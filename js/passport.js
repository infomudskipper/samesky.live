/* ─── SKY PASSPORT: hidden objects, stamps, particle burst ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};
var audio=SS.audio;

/* ─── PARTICLE BURST ─── */
var BCOLORS=[['#FFD700','#FFA500','#FF6B00'],['#FF80C8','#80C0FF','#FF80FF'],['#D0EEFF','#FFFFFF','#FFD97E'],['#80FF90','#40CC60','#B7E4C7'],['#FFB347','#FF9F1C','#FFD060']];
function burst(x,y,ci){for(var i=0;i<9;i++){var p=document.createElement('div');p.className='particle';var ang=(i/9)*Math.PI*2,dist=44+Math.random()*40,col=BCOLORS[ci%BCOLORS.length][i%3];p.style.cssText='left:'+(x-3.5)+'px;top:'+(y-3.5)+'px;background:'+col+';--dx:'+(Math.cos(ang)*dist)+'px;--dy:'+(Math.sin(ang)*dist)+'px;';document.body.appendChild(p);setTimeout(function(p){p.parentNode&&p.parentNode.removeChild(p);},820,p);}}

/* ─── PASSPORT LOGIC ─── */
var stamps=[false,false,false,false,false];
var SDATA=[{icon:'⭐',flag:'🇩🇪',name:'Star'},{icon:'🦋',flag:'🇮🇳',name:'Butterfly'},{icon:'🌙',flag:'🌍',name:'Crescent'},{icon:'🌿',flag:'🇩🇪',name:'Leaf'},{icon:'🪁',flag:'🇮🇳',name:'Kite'}];
try{var sv=localStorage.getItem('utss-stamps');if(sv)stamps=JSON.parse(sv);}catch(e){}
function saveStamps(){try{localStorage.setItem('utss-stamps',JSON.stringify(stamps));}catch(e){}}
function renderStamps(){
  var cnt=0;
  stamps.forEach(function(earned,i){var sl=document.getElementById('slot'+i);if(!sl)return;if(earned){cnt++;var d=SDATA[i];sl.classList.add('earned');sl.innerHTML='<span class="s-icon">'+d.icon+'</span><span style="font-size:12px;">'+d.flag+'</span><span class="s-name">'+d.name+'</span>';}});
  document.getElementById('ppCount').textContent=cnt+'/5';
  if(cnt===5){document.getElementById('ppToggle').classList.add('all-done');document.getElementById('ppDone').classList.add('show');audio.ascend();}
}
renderStamps();
var ppOpen=false;
document.getElementById('ppToggle').addEventListener('click',function(e){e.stopPropagation();ppOpen=!ppOpen;document.getElementById('ppPanel').classList.toggle('open',ppOpen);document.getElementById('ppToggle').setAttribute('aria-expanded',String(ppOpen));});
document.addEventListener('click',function(e){var w=document.getElementById('passport-widget');if(ppOpen&&w&&!w.contains(e.target)){ppOpen=false;document.getElementById('ppPanel').classList.remove('open');document.getElementById('ppToggle').setAttribute('aria-expanded','false');}});

/* ─── HIDDEN OBJECT CLICKS ─── */
document.querySelectorAll('.hidden-obj').forEach(function(el){el.addEventListener('click',function(e){e.stopPropagation();var idx=parseInt(el.dataset.stamp),freq=parseInt(el.dataset.freq);var rect=el.getBoundingClientRect();audio.chime(freq);burst(rect.left+rect.width/2,rect.top+rect.height/2,idx);el.classList.add('pop');setTimeout(function(){el.classList.remove('pop');},520);if(!stamps[idx]){stamps[idx]=true;saveStamps();renderStamps();if(!ppOpen){ppOpen=true;document.getElementById('ppPanel').classList.add('open');}}});});
})();
