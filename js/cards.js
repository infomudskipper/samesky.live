/* ─── EXPERIENCE CARD 3D TILT ─── */
(function(){
'use strict';
document.querySelectorAll('.what-card').forEach(function(card){
  card.addEventListener('mousemove',function(e){var rect=card.getBoundingClientRect();var x=(e.clientX-rect.left)/rect.width-.5;var y=(e.clientY-rect.top)/rect.height-.5;card.style.transform='perspective(900px) rotateY('+(x*9)+'deg) rotateX('+(-y*9)+'deg) translateY(-4px)';card.style.setProperty('--mx',(e.clientX-rect.left)+'px');card.style.setProperty('--my',(e.clientY-rect.top)+'px');});
  card.addEventListener('mouseleave',function(){card.style.transform='';});
});
})();
