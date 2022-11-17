var ball = document.getElementById('ball');
var topM=0;
var left=0;
ball.marginTop =( Math.random()*90) +'%';
ball.marginLeft = (Math.random()*90 )+'%';
window.addEventListener('keydown',function(event)
{
    var keypressd = event.key;
    switch(keypressd)
    {
        case 'w':{
            topM-=3;
            ball.style.marginTop = topM+'%';
            
            break;
        }
        case 'a':{
            left-=3;
            ball.style.marginLeft = left+'%';
            
            break;
        }
        case 's':{

            topM+=3;
            ball.style.marginTop = topM+'%';
            
            break;
        }
        case 'd':{
            left+=3;
            ball.style.marginLeft = left+'%';
            
            break;
        }
        default : {
            console.log('default');
            break;
        }
    }
});