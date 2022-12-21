(function () {
    'use strict'
//=======setting up all the variables=====================
let gameState = 'off';
let paddle_left = document.getElementById('left-paddle');
let paddle_right = document.getElementById('right-paddle');
let board = document.getElementById('board');
let initial_ball = document.getElementById('ball');
let ball = document.getElementById('ball');
let score_left = document.getElementById('left-score');
let score_right = document.getElementById('right-score');
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
function headMessage(message)
{
    game_heading.innerText=message;
}
function matchEnd(Lscore,Rscore)
{
    if(Lscore>Rscore)
    {
        headMessage('!!Player 1 Wins !!')
    }
    else
    {
        headMessage('!!Player 2 Wins !!')
    }
}
function addPoint(player)
{
    var curscoreL = parseInt(score_left.dataset.points) ;//gets the points of the player from data-points attribute 
    var curscoreR = parseInt(score_right.dataset.points) ;
    if(player == 'left')
    {
        
        curscoreL++;
        score_left.innerText=curscoreL;
    }
    else 
    {
        curscoreR++;
        score_right.innerText=curscoreR;
    }
    if(cursoreL>5||curscoreR>=5)
    {
        matchEnd(curscoreL,curscoreR);
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
    if(ball_coord.left<=paddle_left_coord.right && ball_coord.top<=paddle_left_coord.top && ball_coord.bottom>=paddle_left_coord.bottom)
    {
        directionX = 1;
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
    }
    if(ball_coord.right>=paddle_right_coord.left && ball_coord.top<=paddle_right_coord.top && ball_coord.bottom>=paddle_right_coord.bottom)
    {
        directionX = 1;
        speedX = getRandomSpeed();
        speedY = getRandomSpeed();
    }
    // ball misses the paddle and hit the walls
    if(ball_coord.left<=board_coord.left)
    {
        addPoint('right');
    }
    if(ball_coord.right>=board_coord.right)
    {
        addPoint('left');
    }
}
// function to handel player movement
function movePlayerRequest(event_key)
{
    //for left paddle
    if(event_key==='w')
    {
        paddle_left.style.top = Math.max(board_coord.top,paddle_left_coord.top - (window.innerHeight*0.02))+7+'px' ;//+ and - 7 to prevent overlapping with border
        paddle_left_coord =paddle_left.getBoundingClientRect();
    }
    if(event_key==='s')
    {
        paddle_left.style.top = Math.min(board_coord.bottom-paddle_common.height,paddle_left_coord.top + (window.innerHeight*0.02))-7+'px';
        paddle_left_coord =paddle_left.getBoundingClientRect();
    }
    // for right paddle 
    if(event_key==='ArrowUp')
    {
        paddle_right.style.top = Math.max(board_coord.top,paddle_right_coord.top - (window.innerHeight*0.02))+7+'px';
        paddle_right_coord =paddle_right.getBoundingClientRect();
    }
    if(event_key==='ArrowDown')
    {
        paddle_right.style.top = Math.min(board_coord.bottom-paddle_common.height,paddle_right_coord.top + (window.innerHeight*0.02))-7+'px';
        paddle_right_coord =paddle_right.getBoundingClientRect();
    }
}
// function to handel key events
function handleInputKeydown(event)
{
    const event_key = event.key;
    if(event_key==='enter')
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
