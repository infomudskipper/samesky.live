/* ─── SCROLL REVEAL ─── */
(function(){
'use strict';
var revObs=new IntersectionObserver(function(e){e.forEach(function(n){if(n.isIntersecting){n.target.classList.add('visible');revObs.unobserve(n.target);}});},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){revObs.observe(el);});
})();
