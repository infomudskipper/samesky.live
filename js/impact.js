/* ─── IMPACT SPRING POP ─── */
(function(){
'use strict';
var impObs=new IntersectionObserver(function(e){e.forEach(function(n){if(n.isIntersecting){document.querySelectorAll('.impact-item').forEach(function(item,i){setTimeout(function(){item.classList.add('popped');},i*120);});impObs.disconnect();}});},{threshold:.3});
impObs.observe(document.getElementById('impactBar'));
})();
