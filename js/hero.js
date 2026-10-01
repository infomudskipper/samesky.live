/* ─── HERO: exit detection + parallax ─── */
(function(){
'use strict';
var SS=window.SameSky=window.SameSky||{};

/* Show passport + sound btn after hero scrolls out */
var heroEl=document.getElementById('heroSection');
var ppWidget=document.getElementById('passport-widget');
var soundBtnEl=SS.audio&&SS.audio.buttonEl;
new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    var gone=!entry.isIntersecting;
    if(ppWidget)ppWidget.classList.toggle('visible',gone);
    if(soundBtnEl)soundBtnEl.classList.toggle('visible',gone);
  });
},{threshold:.15}).observe(heroEl);

/* Parallax */
var heroInner=document.getElementById('heroInner');
window.addEventListener('scroll',function(){var y=window.scrollY,vh=window.innerHeight;if(y<vh&&heroInner){heroInner.style.transform='translateY('+(y*.28)+'px)';heroInner.style.opacity=Math.max(0,1-y/vh*1.4);}},{passive:true});
})();
