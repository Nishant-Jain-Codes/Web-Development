(async ()=>{
    const secHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
    const secSound = document.getElementById('ticking-sound');
    const numberClock = document.getElementById('number-clock');
    const defaultHandPos = 90;
    function playAudio(){
        secSound.currentTime = 0;
        secSound.volume = 0.3;
        secSound.play();
        
    }
    function setSec(sec){
        const secDegrees = ((sec/60)*360);
        secHand.style.transform = `rotate(${defaultHandPos + secDegrees}deg)`;
    }
    function setMin(min){
        const minDegrees = ((min/60)*360);
        minHand.style.transform = `rotate(${defaultHandPos + minDegrees}deg)`;
        playAudio();
    }
    function setHour(hour){
        const hourDegrees = ((hour/12)*360);
        hourHand.style.transform = `rotate(${defaultHandPos + hourDegrees}deg)`;
    }
    function setNumberClock(sec,min,hour){
        let suf = (hour<12)?'AM':'PM';
        numberClock.innerHTML = `${hour%12} : ${min} : ${sec} ${suf}`
    }
    function setDate(){
        const now = new Date();
        const sec = now.getSeconds();
        const min = now.getMinutes();
        const hour = now.getHours();
        setSec(sec);
        setMin(min);
        setHour(hour);       
        setNumberClock(sec,min,hour);
    }
    
    setInterval(setDate,1000);
})() 