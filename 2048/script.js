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
  // addNumMatrix();
  // addNumMatrix();

  matrix[0][0] = 2;
  matrix[0][1] = 4;
  matrix[0][2] = 0;
  matrix[0][3] = 0;

  matrix[1][0] = 2;
  matrix[1][1] = 0;
  matrix[1][2] = 8;
  matrix[1][3] = 0;

  matrix[2][0] = 0;
  matrix[2][1] = 2;
  matrix[2][2] = 8;
  matrix[2][3] = 0;

  matrix[3][0] = 4;
  matrix[3][1] = 2;
  matrix[3][2] = 0;
  matrix[3][3] = 0;

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
  }, 1000);

  () => clearTimeout(timeout);
};

const changeDirection = (e) => {
  const cellNums = [];
  let checkTap = false;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[j][i] !== 0) {
        const num = document.querySelector(`.cell-${j}-${i}`);

        cellNums.push(num);
      }
    }
  }


  switch (e.key) {
    case "ArrowUp": {
      for (let i = 0; i < cellNums.length; i++) {
        let x = +cellNums[i].classList[1].split("-")[1];
        let y = +cellNums[i].classList[1].split("-")[2];
        
        let positionNum = 0;

        while (x > 0) {
          x--;

          if (matrix[x][y] === 0) {
            matrix[x][y] = matrix[x + 1][y];
            matrix[x + 1][y] = 0;
            positionNum -= 115;
            checkTap = true;
          } else if (matrix[x][y] === matrix[x + 1][y]) {
            matrix[x][y] *= 2;
            matrix[x + 1][y] = 0;
            positionNum -= 115;
            checkTap = true;
            break;
          } else {
            break;
          }
        }

        if (positionNum !== 0) {
          cellNums[i].firstChild.style.top = `${positionNum}px`;
        }
      }

      if (checkTap) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "ArrowDown": {
      for (let i = cellNums.length - 1; i >= 0; i--) {
        let x = +cellNums[i].classList[1].split("-")[1];
        let y = +cellNums[i].classList[1].split("-")[2];
        let positionNum = 0;

        while (x < 3) {
          x++;

          if (matrix[x][y] === 0) {
            matrix[x][y] = matrix[x - 1][y];
            matrix[x - 1][y] = 0;
            positionNum += 115;
            checkTap = true;
          } else if (matrix[x][y] === matrix[x - 1][y]) {
            matrix[x][y] *= 2;
            matrix[x - 1][y] = 0;
            positionNum += 115;
            checkTap = true;
            break;
          } else {
            break;
          }
        }

        if (positionNum !== 0) {
          cellNums[i].firstChild.style.top = `${positionNum}px`;
        }
      }

      if (checkTap) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "ArrowLeft": {
      break;
    }
    case "ArrowRight": {
      break;
    }
    case "Default": {
      console.log("Default");
      break;
    }
  }
};

window.onload = gameInit;
