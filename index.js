const $startGame = document.getElementById('start');
const $game = document.getElementById('game');
const $time = document.getElementById('time');
const $timeHeader = document.getElementById('time-header');
const $resultHeader = document.getElementById('result-header');
const $result = document.getElementById('result');
const $gameTime = document.getElementById('game-time');

let score = 0;
let isGameStarted = false;
const color  = ['red','green','blue'];

$startGame.addEventListener('click',startGame);
$game.addEventListener('click',handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el){
 $el.classList.add('hide');
};

function hide($el){
  $el.classList.remove('hide');
};


function startGame () {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled','true');
  hide($timeHeader);
  show($resultHeader);

  isGameStarted = true;
  show($startGame);
  $game.style.backgroundColor = '#fff';

  let interval = setInterval( ()=>{
  let time = parseFloat($time.textContent);
  if(time <= 0) {
    clearInterval(interval);
    endGame();   
   }else{
    $time.textContent = (time - 0.1).toFixed(1);
   }
  } ,100)

  renderBox();
};

function handleBoxClick(event){
 if(!isGameStarted){
  return
 }
 if (event.target.dataset.box){
  score++;
  renderBox();
  
  }
};

function renderBox(){
  $game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(20, 90);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let randomColorIndex = getRandom(0, color.length);

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = color[randomColorIndex];
  box.style.top = getRandom(0, maxTop)+'px';
  box.style.left = getRandom(0, maxLeft)+'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box','true');

  $game.insertAdjacentElement('afterbegin',box);
 
};

function getRandom(min, max){
 return Math.floor(Math.random() * (max - min) + min);
};

function setGameScore(){
  result.textContent = score.toString();
};

function setGameTime(){
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
};

function endGame(){
  isGameStarted = false;
  setGameScore();

  $gameTime.removeAttribute('disabled');
  hide($startGame);
  $game.innerHTML = '';
  $game.style.backgroundColor = 'ccc';
  show($timeHeader);
  hide($resultHeader);
};