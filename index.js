// Function to generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

let targetColor = '';

function startGame() {
  document.getElementById("welcomeScreen").style.display = "none";
  let gameScreen = document.getElementById("gameScreen");
  gameScreen.style.display = "block";
  gameScreen.style.height = "auto";
  displayTargetColor();
  createColorButtons();
}

// Function to display the target color
function displayTargetColor() {
  targetColor = getRandomColor();
  const colorDisplay = document.getElementById('colorDisplay');
 
  colorDisplay.style.backgroundColor = targetColor;
}

// Function to create color buttons
function createColorButtons() {
  const colorOptions = document.getElementById('colorOptions');
  colorOptions.innerHTML = '';
  let colors = [targetColor];

  while (colors.length < 6) {
    let newColor = getRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor)
    }
  }
  colors.sort(() => Math.random() - 0.5);

  colors.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener('click', function () {
      const colorBox = document.getElementById("colorBox")
      if (color === targetColor) {
        document.getElementById('gameStatus').textContent = 'Correct!';
        updateScore();
        colorBox.classList.add("correct");
        setTimeout( () =>{
          colorBox.classList.remove('correct');
          newGame();
        }, 1000);
      } else {
        document.getElementById('gameStatus').textContent = 'Oops! Try Again';
        colorBox.classList.add('shake');
        setTimeout(() => colorBox.classList.remove('shake'), 500)
        resetScore();

      }
     
    });
    colorOptions.appendChild(button);
  });
}

// Function to update the score
function updateScore() {
  const scoreElement = document.getElementById('score');
  let score = parseInt(scoreElement.textContent);
  score += 1;
  scoreElement.textContent = score;
}

function resetScore() {
  document.getElementById('score').textContent = '0';
}

// Function to start a new game
function newGame() {
  displayTargetColor();
  createColorButtons();
  document.getElementById('gameStatus').textContent = '';
}

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("newGameButtton").addEventListener("click", function (){
  newGame();
  resetScore();
});

// Function to initialize the game when the page loads
window.onload = function () {
  displayTargetColor();
  createColorButtons();
  
};