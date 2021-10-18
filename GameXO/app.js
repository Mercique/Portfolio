var area = document.getElementById('area'),
    step = document.getElementById('player__step'),
    stat = document.getElementById('stat'),
    nullCount = 9,
    player = true, // X = true, 0 = False
    winOption = [[null, null, null],[null, null, null],[null, null, null]],
    x = y = z = 0;

document.getElementById('btn').onclick = clearField;
window.onload = function() {
    for (var i = 1; i <= 9; i++) {
        var cell = document.createElement('div');
    
        cell.className = 'cell';
        cell.id = i;
        area.append(cell);
    
        cell.onclick = fillCell;
    }
}

function fillCell() {
    if (!this.innerHTML) {
        this.innerHTML = player ? 'X' : '0';
        writeArrGame(this.id, player);
        switch(checkWin(player, --nullCount)) {
            case 0:
                stat.innerHTML = 'Статистика игр:<br>X - ' + x + '<br>0 - ' + ++y + '<br>Ничья - ' + z;
                clearField();
                break;
            case 1:
                stat.innerHTML = 'Статистика игр:<br>X - ' + ++x + '<br>0 - ' + y + '<br>Ничья - ' + z;
                clearField();
                break;
            case 2:
                stat.innerHTML = 'Статистика игр:<br>X - ' + x + '<br>0 - ' + y + '<br>Ничья - ' + ++z;
                clearField();
                break;
            default:
                if (player == true) {
                    player = false;
                    step.innerText = 'Сейчас ходит "0"';
                } else {
                    player = true;
                    step.innerText = 'Сейчас ходит "X"';
                }
                break;
        }
    } else {
        alert('Ячейка занята!');
    }
}

function writeArrGame(id, player) {
    if (id >= 1 && id < 4) {
        winOption[0][id - 1] = player;
    } else if (id > 3 && id < 7) {
        winOption[1][id - 4] = player;
    } else {
        winOption[2][id - 7] = player;
    }
}

function checkWin(player, countStep) {
    if ((player == winOption[0][0] && player == winOption[0][1] && player == winOption[0][2]) ||
        (player == winOption[1][0] && player == winOption[1][1] && player == winOption[1][2]) ||
        (player == winOption[2][0] && player == winOption[2][1] && player == winOption[2][2]) ||
        (player == winOption[0][0] && player == winOption[1][0] && player == winOption[2][0]) ||
        (player == winOption[0][1] && player == winOption[1][1] && player == winOption[2][1]) ||
        (player == winOption[0][2] && player == winOption[1][2] && player == winOption[2][2]) ||
        (player == winOption[0][0] && player == winOption[1][1] && player == winOption[2][2]) ||
        (player == winOption[0][2] && player == winOption[1][1] && player == winOption[2][0])) {
        if (player) {
            alert('Победил игрок "X"');
            return 1;
        } else {
            alert('Победил игрок "0"');
            return 0;
        }
    } else if (countStep == 0) {
        alert('Ничья!');
        return 2;
    } else {
        return false;
    }
}

function clearField() {
    winOption = [[null, null, null],[null, null, null],[null, null, null]];
    nullCount = 9;
    player = true;
    step.innerText = 'Сейчас ходит "X"';
    for (var i = 0; i < document.getElementsByClassName('cell').length; i++) {
        document.getElementsByClassName('cell')[i].innerHTML = '';
    }

    if (this.id == 'btn') {
        if (confirm('Вы точно хотите завершить игру и обнулить статистику?')) {
            x = y = z = 0;
            stat.innerHTML = 'Статистика игр:<br>X - ' + x + '<br>0 - ' + y + '<br>Ничья - ' + z;
        }
    }
}