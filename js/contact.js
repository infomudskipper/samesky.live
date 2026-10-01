/* ─── CONTACT EMAIL PICKER ─── */
(function(){
'use strict';
var EMAIL='Annisa@indiverse.live';
var ICON_COPY='<span class="mail-icon">📋</span> Copy email address';
var ICON_DONE='<span class="mail-icon">✓</span> Copied!';

var btn = document.getElementById('contactBtn');
var picker = document.getElementById('mailPicker');
var copyBtn = document.getElementById('copyEmailBtn');
if(!btn || !picker) return;

btn.addEventListener('click', function(e){
  e.stopPropagation();
  var open = picker.style.display === 'block';
  picker.style.display = open ? 'none' : 'block';
});

// Close when clicking outside
document.addEventListener('click', function(e){
  if(!picker.contains(e.target) && e.target !== btn){
    picker.style.display = 'none';
  }
});

// Copy to clipboard
if(copyBtn){
  copyBtn.addEventListener('click', function(){
    navigator.clipboard.writeText(EMAIL).then(function(){
      copyBtn.querySelector('span:last-child') && (copyBtn.innerHTML = ICON_DONE);
      setTimeout(function(){
        copyBtn.innerHTML = ICON_COPY;
      }, 2000);
    }).catch(function(){
      // Fallback for older browsers
      var ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      copyBtn.textContent = '✓ Copied!';
      setTimeout(function(){ copyBtn.textContent = '📋 Copy email address'; }, 2000);
    });
    picker.style.display = 'none';
  });
}
})();
