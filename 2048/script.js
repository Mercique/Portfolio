const app = document.querySelector("#app");
const score = document.querySelector("#score");
const game = document.createElement("div");
let gameScore = 0;

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
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement("div");

      cell.className = `app__game-cell cell-${i}-${j}`;
      field.appendChild(cell);

      if (matrix[i][j] === '0') {
        matrix[i][j] = 0;
      }

      if (matrix[i][j] !== 0) {
        cell.innerHTML = getCellNum(matrix[i][j]);
      }
    }
  }
};

const addNumMatrix = () => {
  const randomNum = getRandomNumber(1, 10);
  const emptyCells = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  const emptyRandom = getRandomNumber(0, emptyCells.length - 1);

  if (randomNum !== 1) {
    matrix[emptyCells[emptyRandom][0]][emptyCells[emptyRandom][1]] = 2;
  } else {
    matrix[emptyCells[emptyRandom][0]][emptyCells[emptyRandom][1]] = 4;
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

const getCollectionNums = (key) => {
  const collection = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let left = key === "ArrowUp" || "ArrowDown" ? i : j;
      let right = key === "ArrowLeft" || "ArrowRight" ? j : i;

      if (matrix[left][right] !== 0) {
        const num = document.querySelector(`.cell-${left}-${right}`);

        collection.push(num);
      }
    }
  }

  return collection;
};

const changeDirection = (e) => {
  const cellNums = getCollectionNums(e.code);
  let checkTap = false;

  switch (e.key) {
    case "ArrowUp": {
      for (let i = 0; i < cellNums.length; i++) {
        let x = +cellNums[i].classList[1].split("-")[1];
        let y = +cellNums[i].classList[1].split("-")[2];
        
        let positionNum = 0;

        while (x > 0) {
          x--;

          if (matrix[x][y] == 0) {
            let checkLastSum = matrix[x][y];
            matrix[x][y] = matrix[x + 1][y];
            matrix[x + 1][y] = 0;
            positionNum -= 115;
            checkTap = true;
            if (checkLastSum) break;
          } else if (matrix[x][y] === matrix[x + 1][y]) {
            matrix[x][y] *= 2;
            gameScore += matrix[x][y];
            matrix[x + 1][y] = '0';
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
            gameScore += matrix[x][y];
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
      for (let i = 0; i < cellNums.length; i++) {
        let x = +cellNums[i].classList[1].split("-")[1];
        let y = +cellNums[i].classList[1].split("-")[2];
        
        let positionNum = 0;

        while (y > 0) {
          y--;

          if (matrix[x][y] == 0) {
            let checkLastSum = matrix[x][y];
            matrix[x][y] = matrix[x][y + 1];
            matrix[x][y + 1] = 0;
            positionNum -= 115;
            checkTap = true;
            if (checkLastSum) break;
          } else if (matrix[x][y] === matrix[x][y + 1]) {
            matrix[x][y] *= 2;
            gameScore += matrix[x][y];
            matrix[x][y + 1] = '0';
            positionNum -= 115;
            checkTap = true;
            break;
          } else {
            break;
          }
        }

        if (positionNum !== 0) {
          cellNums[i].firstChild.style.left = `${positionNum}px`;
        }
      }

      if (checkTap) {
        addNumMatrix();
      }

      updateData();
      break;
    }
    case "ArrowRight": {
      for (let i = cellNums.length - 1; i >= 0; i--) {
        let x = +cellNums[i].classList[1].split("-")[1];
        let y = +cellNums[i].classList[1].split("-")[2];
        let positionNum = 0;

        while (y < 3) {
          y++;

          if (matrix[x][y] === 0) {
            matrix[x][y] = matrix[x][y - 1];
            matrix[x][y - 1] = 0;
            positionNum += 115;
            checkTap = true;
          } else if (matrix[x][y] === matrix[x][y - 1]) {
            matrix[x][y] *= 2;
            gameScore += matrix[x][y];
            matrix[x][y - 1] = 0;
            positionNum += 115;
            checkTap = true;
            break;
          } else {
            break;
          }
        }

        if (positionNum !== 0) {
          cellNums[i].firstChild.style.left = `${positionNum}px`;
        }
      }

      if (checkTap) {
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

  score.innerHTML = `Score: ${gameScore}`;
};

window.onload = gameInit;
