let result = document.querySelector('.result');
let uploadMoves = document.querySelector('.uploadMoves');
let uploadScore = document.querySelector('.uploadScore');


let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0 };
uploadScore.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`


document.querySelector('.rock').addEventListener('click', () => {
  playGame('rock')
});
document.querySelector('.paper').addEventListener('click', () => {
  playGame('paper')
});
document.querySelector('.scissors').addEventListener('click', () => {
  playGame('scissors')
});


document.body.addEventListener('keydown', (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame('rock')
  } else if (event.key === "p" || event.key === "P") {
     playGame('paper')
  } else if (event.key  === "s" || event.key  === "S") {
     playGame('scissors')
  } else if (event.key === 'a' || event.key === 'A') {
    autoPlay()
  } else if (event.key === ' ') {
    resetScore()
  }
  console.log(event);
})


function playGame (playerMove) {
  const computerRandomMove = pickComputerMove();

  if (playerMove === 'rock') {
    if (computerRandomMove === 'scissors') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You win.';
    } else if (computerRandomMove === 'paper') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You lose.';
    } else {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerRandomMove === 'scissors') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You lose.';
    } else if (computerRandomMove === 'rock') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You win.';
    } else {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'Tie.';
    }
  } else if (playerMove === 'scissors') {
    if (computerRandomMove === 'paper') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You win.';
    } else if (computerRandomMove === 'rock') {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'You lose.';
    } else {
      uploadMoves.innerHTML = `You <img src="./images/${playerMove}-emoji.png"> <img src="./images/${computerRandomMove}-emoji.png">Computer`;
      result.innerHTML = 'Tie.';
    }
  }

  if (result.innerHTML === 'You win.') {
    score.wins += 1;
  } else if (result.innerHTML === 'You lose.') {
    score.losses += 1
  } else if (result.innerHTML === 'Tie.') {
    score.ties += 1
  }

  uploadScore.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`

  localStorage.setItem('score', JSON.stringify(score))

}


function pickComputerMove(){
  const randomNumber = Math.floor(Math.random() * 3);
  const game = ['rock', 'paper', 'scissors'];
  return game[randomNumber]
}
pickComputerMove()






// AUTO-PLAY
function pickPlayerMove(){
  const randomNumber = Math.floor(Math.random() * 3);
  const game = ['rock', 'paper', 'scissors'];
  return game[randomNumber]
}
pickPlayerMove()

document.querySelector('.autoplay-btn').addEventListener('click', ()=>{
  autoPlay()
})

let isautoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isautoPlaying) {
    intervalId = setInterval(() => {
      const playerRandomMove = pickPlayerMove()
      playGame(playerRandomMove)
      document.querySelector('.autoplay-btn').innerHTML = 'Stop Play';
    },1000);
    isautoPlaying = true
  } else{
    clearInterval(intervalId)
    isautoPlaying = false
    document.querySelector('.autoplay-btn').innerHTML = 'Auto Play';
  }
}





// RESET
document.querySelector('.reset-btn').addEventListener('click', ()=>{
  resetScore()
})

function resetScore(){
  let confirmationToReset = document.querySelector('.confirmationToReset')

  confirmationToReset.innerHTML = 
    `
    Are you sure you want to reset the score?
      <button id="yes">Yes</button>
      <button id="no">No</button>
  `;

  document.getElementById('yes').addEventListener('click', () =>{
    confirm('yes')
  })

  document.getElementById('no').addEventListener('click', () =>{
    confirm('no')
  })

  function confirm (answer){
    if (answer === 'yes') {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0
      result.innerHTML = '';
      uploadMoves.innerHTML = '';
      uploadScore.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`
     localStorage.removeItem('score')
     confirmationToReset.innerHTML = ''

    } else if (answer === 'no') {
      confirmationToReset.innerHTML = ' '
    }
  }
}
