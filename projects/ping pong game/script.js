(function () {
    'use strict'
//=======setting up all the variables=====================
let gameState = 'off';
let paddle_left = document.getElementById('left-paddle');
let paddle_right = document.getElementById('right-paddle');
let board = document.getElementById('board');
let initial_ball = document.getElementById('ball');
let ball = document.getElementById('ball');
let score_1 = document.getElementById('left-score');
let score_2 = document.getElementById('right-score');
let game_heading = document.getElementById('game-info-heading');
let paddle_left_coord = paddle_left.getBoundingClientRect();
let paddle_right_coord = paddle_right.getBoundingClientRect();
let initial_ball_coord = initial_ball.getBoundingClientRect();
let ball_coord  = ball.getBoundingClientRect();
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();
let speedX = getRandomSpeed();
let speedY = getRandomSpeed();
let directionX = getRandomeStartDir();
let directionY = getRandomeStartDir();
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
function startGameRequest()
{
    console.log('start game');
}
// function to handel game restart request
function reStartGameRequest()
{
    console.log('restart game');
}
// function to move ball
function moveBall(speedX,speedY,directionX,directionY)
{

}
//function to move paddle 
function movePaddleUp(paddle) // for upward
{

}
function movePaddleDown(paddle) // for downward
{
    
}
// function to handel player movement
function movePlayerRequest(paddle,event_key)
{
    if(event_key === 'w' || event_key==='ArrowUp')
    {
        movePaddleUp(paddle);
    }
    else 
    {
        movePaddleDown(paddle);
    }
}
// function to handel key events
function handleInputKeydown(event)
{
    const event_key = event.key;
    console.log(event_key);
    if(event_key==='enter')
    {
        startGameRequest();
    }
    else if(event_key==='Backspace')
    {
        reStartGameRequest();
    }
    else if(event_key=='w'||event_key=='s')
    {
        movePlayerRequest(paddle_left,event_key);
    }
    else if(event_key=='ArrowUp'||event_key=='ArrowDown')
    {
        movePlayerRequest(paddle_right,event_key);
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
// function to start the webapp
function initialiseApp()
{
    document.addEventListener('keydown',handleInputKeydown);
    document.addEventListener('click',handleInputClick);
}
//==========================================================
//============ function call ===============================
initialiseApp();
//==========================================================
})();
