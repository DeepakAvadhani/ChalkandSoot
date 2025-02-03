gsap.set('.cursor',{xPercent:-50,yPercent:-50});

var cur = document.querySelector('.cursor');

window.addEventListener('mousemove',e => {
    gsap.to(cur,0.2,{x:e.clientX,y:e.clientY});
});