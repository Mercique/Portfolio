const app = document.querySelector("#app");
const game = document.createElement("div");

game.className = "app__game";
app.appendChild(game);

const matrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const gameInit = () => {
  addNumMatrix();
  addNumMatrix();

  draftMatrix(game);

  addEventListener("keyup", changeDirection);
};

const draftMatrix = (field) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      const cell = document.createElement("div");

      cell.className = `app__game-cell cell-${i}-${j}`;
      field.appendChild(cell);

      if (matrix[i][j] !== 0) {
        cell.innerHTML = getCellNum(matrix[i][j]);
      }
    }
  }
};

const addNumMatrix = () => {
  while (true) {
    let first = getRandomNumber(0, 3);
    let second = getRandomNumber(0, 3);
    let randomNum = getRandomNumber(1, 10);

    if (matrix[first][second] === 0) {
      if (randomNum > 2) {
        matrix[first][second] = 2;
      } else {
        matrix[first][second] = 4;
      }
      break;
    }
  }
};

const getCellNum = (num) => {
  return `<div class="cell-num cell-${num}">${num}</div>`;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const updateData = () => {
  let timeout;

  timeout = setTimeout(() => {
    game.innerHTML = "";
    draftMatrix(game);
  }, 100);

  () => clearTimeout(timeout);
};

const changeDirection = (e) => {
  const cellNums = document.querySelectorAll(".cell-num");
  let checkSlide = false;

  switch (e.key) {
    case "ArrowUp": {
      for (let i = 0; i < cellNums.length; i++) {
        let x = +cellNums[i].parentElement.classList[1].split("-")[1];
        let y = +cellNums[i].parentElement.classList[1].split("-")[2];
        let positionNum = 0;
        let checkSum = false;

        while (x > 0) {
          x--;

          if (matrix[x][y] === 0) {
            matrix[x][y] = +cellNums[i].innerHTML;
          } else if (matrix[x][y] === matrix[x + 1][y] && !checkSum) {
            matrix[x][y] *= 2;
            checkSum = true;
          } else {
            break;
          }

          checkSlide = true;
          matrix[x + 1][y] = 0;
          positionNum -= 115;
        }

        cellNums[i].style.top = `${positionNum}px`;
      }

      if (checkSlide) {
        addNumMatrix();
      }
      
      updateData();
      break;
    }
    case "ArrowDown": {
      for (let i = cellNums.length - 1; i >= 0; i--) {
        let x = +cellNums[i].parentElement.classList[1].split("-")[1];
        let y = +cellNums[i].parentElement.classList[1].split("-")[2];
        let positionNum = 0;
        let checkSum = false;

        while (x < 3) {
          x++;

          if (matrix[x][y] === 0) {
            matrix[x][y] = +cellNums[i].innerHTML;
          } else if (matrix[x][y] === matrix[x - 1][y] && !checkSum) {
            matrix[x][y] *= 2;
            checkSum = true;
          } else {
            break;
          }

          checkSlide = true;
          matrix[x - 1][y] = 0;
          positionNum += 115;
        }

        cellNums[i].style.top = `${positionNum}px`;
      }

      if (checkSlide) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "ArrowLeft": {
      for (let i = 0; i < cellNums.length; i++) {
        let x = +cellNums[i].parentElement.classList[1].split("-")[1];
        let y = +cellNums[i].parentElement.classList[1].split("-")[2];
        let positionNum = 0;
        let checkSum = false;

        while (y > 0) {
          y--;

          if (matrix[x][y] === 0) {
            matrix[x][y] = +cellNums[i].innerHTML;
          } else if (matrix[x][y] === matrix[x][y + 1] && !checkSum) {
            matrix[x][y] *= 2;
            checkSum = true;
          } else {
            break;
          }

          checkSlide = true;
          matrix[x][y + 1] = 0;
          positionNum -= 115;
        }

        cellNums[i].style.left = `${positionNum}px`;
      }

      if (checkSlide) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "ArrowRight": {
      for (let i = cellNums.length - 1; i >= 0; i--) {
        let x = +cellNums[i].parentElement.classList[1].split("-")[1];
        let y = +cellNums[i].parentElement.classList[1].split("-")[2];
        let positionNum = 0;
        let checkSum = false;

        while (y < 3) {
          y++;

          if (matrix[x][y] === 0) {
            matrix[x][y] = +cellNums[i].innerHTML;
          } else if (matrix[x][y] === matrix[x][y - 1] && !checkSum) {
            matrix[x][y] *= 2;
            checkSum = true;
          } else {
            break;
          }

          checkSlide = true;
          matrix[x][y - 1] = 0;
          positionNum += 115;
        }

        cellNums[i].style.left = `${positionNum}px`;
      }

      if (checkSlide) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "Default": {
      console.log("Default");
      break;
    }
  }
};

window.onload = gameInit;
