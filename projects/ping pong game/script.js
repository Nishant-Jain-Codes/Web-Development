(function () {
    'use strict'
//=======setting up all the variables=====================
let gameState = 'off';
let paddle_left = document.getElementById('left-paddle');
let initial_paddle_left = document.getElementById('left-paddle');
let paddle_right = document.getElementById('right-paddle');
let initial_paddle_right = document.getElementById('right-paddle');
let board = document.getElementById('board');
let initial_ball = document.getElementById('ball');
let ball = document.getElementById('ball');
let score_left = document.getElementById('left-score');
let score_right = document.getElementById('right-score');
let game_heading = document.getElementById('game-info-heading');
let paddle_left_coord = paddle_left.getBoundingClientRect();
let initial_paddle_left_coord = paddle_left.getBoundingClientRect();
let paddle_right_coord = paddle_right.getBoundingClientRect();
let initial_paddle_right_coord = paddle_right.getBoundingClientRect();
let initial_ball_coord = initial_ball.getBoundingClientRect();
let ball_coord  = ball.getBoundingClientRect();
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();
let speedX,speedY,directionX,directionY;

//==========================================================
//============ functions ===================================
// function to get random speed
function getRandomSpeed()
{
    return Math.floor(Math.random() * 4) + 3;
}
// function to get random start direction 
function getRandomeStartDir()
{
    return Math.floor(Math.random() * 2);
}
// function to handel game start request
function startTheGame()
{
    headMessage('Game Started')
    requestAnimationFrame(()=>
    {
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
        directionX = getRandomeStartDir();
        directionY = getRandomeStartDir();
        moveBall(speedX,speedY,directionX,directionY);
    });
}
function startGameRequest()
{
    if(gameState=='on')
    {
        return ;
    }
    else if(gameState=='pause')
    {
        requestAnimationFrame(()=>
    {
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
        directionX = getRandomeStartDir();
        directionY = getRandomeStartDir();
        moveBall(speedX,speedY,directionX,directionY);
    });
    }
    else
    {
        let cnt = 3;
        gameState = 'on';
        let x = setInterval(function()
        {
            headMessage(cnt);
            cnt--;
            if(cnt<0)
            {
                clearInterval(x);
                startTheGame();
            }
        },1000);
    }
}
// function to handel game restart request
function reStartGameRequest()
{
    // changing game state
    gameState='off';
    headMessage('Ping Te Pong')
    //resetting paddles
    paddle_left_coord=initial_paddle_left_coord;
    paddle_left.style=initial_paddle_left;
    paddle_left_coord=initial_paddle_right_coord;
    paddle_right.style=initial_paddle_right;
    //resetting ball location
    ball_coord=initial_ball_coord;
    ball.style = initial_ball.style;
    // resetting the scores
    score_left.innerHTML=0;
    score_left.dataset.points="0";
    score_right.innerHTML=0;
    score_right.dataset.points="0";
}
function headMessage(message)
{
    game_heading.innerText=message;
}
function matchEnd(Lscore,Rscore)
{  
    console.log('matchend');
    let time = 1500;
    let x = setInterval(function(){
    if(Lscore>Rscore)
    {
        console.log('p1 won');
        headMessage("Player 1 Wins");
    }
    else
    {
        console.log('p2 won');
        headMessage("Player 2 Wins");
    }
    time-=100;
    if(time<=0)
    {
        clearInterval(x);
        setTimeout(function(){
            reStartGameRequest();
        },1500);
    }
    
    
    },200);
}

function addPoint(player)
{
    if(player == 'left')
    {
        score_left.innerHTML = +score_left.innerHTML + 1;
    }
    else 
    {
        score_right.innerHTML = +score_right.innerHTML + 1;
    }
    if(score_left.innerHTML>5||score_right.innerHTML>5)
    {
        matchEnd(score_left.innerHTML,score_right.innerHTML);
    }
}
// function to move ball
    // y = 1 = down
    // y = 0 = up
    // x = 1 = right
    // y = 0 = left
function moveBall(speedX,speedY,directionX,directionY)
{

    // when ball hits the top borders of the board
    if(ball_coord.top<=board_coord.top)
    {
        directionY=1;
    }
    if(ball_coord.bottom>=board_coord.bottom)
    {
        directionY=0;
    }
    // when ball hits the paddles
    if(ball_coord.left<=paddle_left_coord.right && ball_coord.top>=paddle_left_coord.top && ball_coord.bottom<=paddle_left_coord.bottom)
    {
        directionX = 1;
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
    }
    if(ball_coord.right>=paddle_right_coord.left && ball_coord.top>=paddle_right_coord.top && ball_coord.bottom<=paddle_right_coord.bottom)
    {
        directionX = 0;
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
    }
    // ball misses the paddle and hit the walls
    if(ball_coord.left<=board_coord.left||ball_coord.right>=board_coord.right)
    {
        let prev_ball_coord = ball_coord;
        // after hitting the wall - ball will get reset to center
        gameState='pause';
        ball_coord=initial_ball_coord;
        ball.style = initial_ball.style;
        headMessage('Press Enter');
        // incrementing the points 
        if(prev_ball_coord.left<=board_coord.left)
        {
            addPoint('right');
        }
        else
        {
            addPoint('left');
        }
        return;
    }
    ball.style.top = ball_coord.top + (speedY*(directionY == 0? -1 : 1 ))+'px'; 
    ball.style.left = ball_coord.left + (speedX*(directionX == 0? -1 : 1 ))+'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(()=>{
        moveBall(speedX,speedY,directionX,directionY);
    });
}
// function to handel player movement
function movePlayerRequest(event_key)
{
    //for left paddle
    if(event_key==='w')
    {
        paddle_left.style.top = Math.max(board_coord.top,paddle_left_coord.top - (window.innerHeight*0.04))+7+'px' ;//+ and - 7 to prevent overlapping with border
        paddle_left_coord =paddle_left.getBoundingClientRect();
    }
    if(event_key==='s')
    {
        paddle_left.style.top = Math.min(board_coord.bottom-paddle_common.height,paddle_left_coord.top + (window.innerHeight*0.04))-7+'px';
        paddle_left_coord =paddle_left.getBoundingClientRect();
    }
    // for right paddle 
    if(event_key==='ArrowUp')
    {
        paddle_right.style.top = Math.max(board_coord.top,paddle_right_coord.top - (window.innerHeight*0.04))+7+'px';
        paddle_right_coord =paddle_right.getBoundingClientRect();
    }
    if(event_key==='ArrowDown')
    {
        paddle_right.style.top = Math.min(board_coord.bottom-paddle_common.height,paddle_right_coord.top + (window.innerHeight*0.04))-7+'px';
        paddle_right_coord =paddle_right.getBoundingClientRect();
    }
}
// function to handel key events
function handleInputKeydown(event)
{
    const event_key = event.key;
    if(event_key==='Enter')
    {
        startGameRequest();
    }
    else if(event_key==='Backspace')
    {
        reStartGameRequest();
    }
    else if(event_key=='w'||event_key=='s'||event_key=='ArrowUp'||event_key=='ArrowDown')
    {
        movePlayerRequest(event_key);
    }

}
// function to handel click events
function handleInputClick(event)
{
    const click_target_class = event.target.className;
    if(click_target_class==='start_game')
    {
        startGameRequest();
    }
    else if(click_target_class==='restart_game')
    {
        reStartGameRequest();
    }
}
// function to handel hover events
function handleInputhover(event)
{
    let target_class = event.target.className;
    if(target_class==='start_game')
    {
        if(gameState=='on')
        {
            headMessage('game is running')
        }
        else
        {
            headMessage('Start Game?')
        }
        setTimeout(function(){
            headMessage('Ping Te Pong');
        },1000)
    }
    else if(target_class==='restart_game')
    {
        headMessage('ReStart Game?')
        setTimeout(function(){
            headMessage('Ping Te Pong');
        },1000)
    }


}
// function to start the webapp
function initialiseApp()
{
    document.addEventListener('keydown',handleInputKeydown);
    document.addEventListener('click',handleInputClick);
    document.addEventListener('mouseover',handleInputhover);
}
//==========================================================
//============ function call ===============================
initialiseApp();
//==========================================================
})();
