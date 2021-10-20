var FIELD_SIZE_X = 21,
    FIELD_SIZE_Y = 21,
    SNAKE_SPEED,
    gameIsRunning = false,
    direction = 'y+',
    snake = [],
    snake_timer,
    food_timer,
    score = 0,
    time = 0;

var level = document.querySelectorAll('.level'),
    btn_start = document.getElementById('game__btn-start'),
    btn_renew = document.getElementById('game__btn-renew');

function init() {
    prepareGameField();

    btn_start.setAttribute('disabled', '');
    btn_start.classList.add('disabled');
    btn_renew.setAttribute('disabled', '');
    btn_renew.classList.add('disabled');

    btn_start.addEventListener('click', startGame);
    btn_renew.addEventListener('click', refreshGame);

    for (var i = 0; i < level.length; i++) {
        level[i].id = i + 1;
        level[i].addEventListener('click', checkLevel);
    }

    addEventListener('keydown', changeDirection);
}

function checkLevel() {
    for (var i = 0; i < level.length; i++) {
        if (level[i].classList.contains('level-checked'))
            level[i].classList.remove('level-checked')
    }
    this.classList.add('level-checked');
    document.getElementById('level__text').style.display = 'none';
    
    btn_start.removeAttribute('disabled', '');
    btn_start.classList.remove('disabled');
    btn_renew.removeAttribute('disabled', '');
    btn_renew.classList.remove('disabled');
}

function prepareGameField() {
    var snakeField = document.getElementById('game__field'),
        gameField = document.createElement('table');
    
    gameField.className = 'snake__field';
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        var row = document.createElement('tr');

        row.className = 'snake__field-row row-' + i;
        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell = document.createElement('td');

            cell.className = 'snake__field-cell cell-' + i + '-' + j;

            row.append(cell);
        }
        gameField.append(row);
    }
    snakeField.append(gameField);
}

function startGame() {
    for (var i = 0; i < level.length; i++) {
        if (level[i].classList.contains('level-checked')) {
            switch(+level[i].id) {
                case 1:
                    SNAKE_SPEED = 200;
                    break;
                case 2:
                    SNAKE_SPEED = 100;
                    break;
                case 3:
                    SNAKE_SPEED = 50;
                    break;
            }
        }
    }

    gameIsRunning = true;
    score = 0;
    respawnSnake();

    btn_start.setAttribute('disabled', '');
    btn_start.classList.add('disabled');

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
    setTimeout(createBarrier, 5000);
}

function respawnSnake() {
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2),
        start_coord_y = Math.floor(FIELD_SIZE_Y / 2),
        snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0],
        snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    
    snake_head.classList.add('snake');
    snake_tail.classList.add('snake');

    snake.push(snake_tail);
    snake.push(snake_head);
}

function move() {
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' '),
        snake_coords = snake_head_classes[1].split('-'),
        coord_y = parseInt(snake_coords[1]),
        coord_x = parseInt(snake_coords[2]),
        new_unit;

    time += SNAKE_SPEED;

    switch(direction) {
        case 'x-':
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
            new_unit == undefined ? new_unit = checkUndefined(coord_y, FIELD_SIZE_X - 1) : 0;
            break;
        case 'x+':
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
            new_unit == undefined ? new_unit = checkUndefined(coord_y, 0) : 0;
            break;
        case 'y+':
            new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
            new_unit == undefined ? new_unit = checkUndefined(FIELD_SIZE_X - 1, coord_x) : 0;
            break;
        case 'y-':
            new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
            new_unit == undefined ? new_unit = checkUndefined(0, coord_x) : 0;
            break;
    }

    if (time % 20000 == 0) createBarrier();
    
    if (!isSnakeUnit(new_unit) && new_unit !== undefined && !snake_head_classes.includes('barrier')) {
        new_unit.classList.add('snake');
        snake.push(new_unit);

        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0],
                classes = removed.getAttribute('class').split(' ');

            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    } else {
        finishTheGame();
    }
    document.getElementById('game__header-counter').innerText = score;
}

function checkUndefined(row, cell) {
    return document.getElementsByClassName('cell-' + row + '-' + cell)[0];
}

function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}

function haveFood(unit) {
    var check = false,
        unit_classes = unit.getAttribute('class').split(' ');

    if (unit_classes.includes('food')) {
        check = true;
        createFood();
        score++;
    }

    return check;
}

function createFood() {
    var foodCreated = false;

    while (!foodCreated) {
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X),
            food_y = Math.floor(Math.random() * FIELD_SIZE_Y),
            food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0],
            food_cell_classes = food_cell.getAttribute('class').split(' ');

        if (!food_cell_classes.includes('snake') && !food_cell_classes.includes('barrier')) {
            var classes = '';

            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.classList.add('food');
            foodCreated = true;
        }
    }
}

function createBarrier() {
    var barrierCreated = false;

    while (!barrierCreated) {
        var barrier_x = Math.floor(Math.random() * FIELD_SIZE_X),
            barrier_y = Math.floor(Math.random() * FIELD_SIZE_Y),
            barrier_cell = document.getElementsByClassName('cell-' + barrier_y + '-' + barrier_x)[0],
            barrier_cell_classes = barrier_cell.getAttribute('class').split(' ');

        if (!barrier_cell_classes.includes('snake') && !barrier_cell_classes.includes('food')) {
            var classes = '';

            for (var i = 0; i < barrier_cell_classes.length; i++) {
                classes += barrier_cell_classes[i] + ' ';
            }

            barrier_cell.classList.add('barrier');
            barrierCreated = true;
        }
    }
}

function changeDirection(e) {
    console.log(e);
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') direction = 'x-';
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') direction = 'y+';
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') direction = 'x+';
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') direction = 'y-';
            break;
    }
}

function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

function refreshGame() {
    location.reload();
}

window.onload = init;