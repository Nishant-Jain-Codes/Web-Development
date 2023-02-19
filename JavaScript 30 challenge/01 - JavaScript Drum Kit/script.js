(()=>{
    const hihat_top = document.getElementById('hihat-top');
    const crash_ride = document.getElementById('crash-ride');
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key=>{
        key.addEventListener('transitionend',removeTransitionKey);
    })
    function changeCrashStyle(){
        crash_ride.style.transform = 'rotate(0deg) scale(1.5)';
    }
    function  changeHiHatStyle(){
        hihat_top.style.top = '171px';
    }
    function removeTransitionKey(event){
        if(event.propertyName !== 'transform') return;
        event.target.classList.remove('playing');
    }
    function removeTransitionCrash_ride(event){
        console.log(event);
        if(event.propertyName !== 'transform') return;
        event.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
    }
    function removeTransitionHiHat_top(event){
        console.log(event);
        if(event.propertyName !== 'top') return;
        event.target.style.top = '166px';
    }
    function handelKeyEvents(event){
       const keyPressed = event.keyCode;
       const keyElement = document.querySelector(`div[data-key="${keyPressed}"]`);
       const audio = document.querySelector(`audio[data-key="${keyPressed}"]`);
       if(!audio)
            return;
        audio.currentTime = 0;
        audio.play();
        if(event.key == 'e' || event.key == 'E'||event.key == 'r' || event.key == 'R'){
            changeCrashStyle();
        }
        if(event.key == 'k' || event.key == 'K'){
            changeHiHatStyle();
        }
        keyElement.classList.add('playing');
    }
    hihat_top.addEventListener('transitionend',removeTransitionHiHat_top); 
    crash_ride.addEventListener('transitionend',removeTransitionCrash_ride);
    window.addEventListener('keydown',handelKeyEvents);


})()