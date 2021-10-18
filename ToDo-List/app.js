var btn = document.querySelector('.todo__btn'),
    svg = document.getElementsByTagName('svg'),
    menu = document.querySelector('#todo__menu'),
    clear = document.querySelector('.clear__btn'),
    countP = document.querySelector('.todo__counter'),
    spanCheck = document.querySelector('.todo__check-clear'),
    counterCheckColor = document.querySelector('.todo__counter-color-check'),
    input = document.querySelector('.todo__input'),
    count = degCount = 0;

function addTask() {
    var div = document.createElement('div'),
        p = document.createElement('p'),
        spanDel = document.createElement('span');
    
    if (input.value != '') {
        div.className = 'menu__task';
        p.className = 'task';
        spanDel.className = 'task-del';
        
        menu.appendChild(div);
        div.appendChild(p);
        div.appendChild(spanDel);
        p.innerHTML = input.value;

        input.value = '';

        spanDel.innerHTML = '<img src="task-del.png" alt="del">';

        input.classList.remove('todo__input-place__color');
        input.placeholder = 'Write your task';

        degCount += 360;
        svg[0].style.transform = 'rotate(' + degCount + 'deg)';
        countP.innerHTML = 'Counter tasks: ' + ++count;

        countP.style.color = '#260026';
        clear.style.background = '#260026';
        spanCheck.style.display = 'none';

        div.onclick = function () {
            if (this.className != 'menu__task checked') {
                this.classList.add('checked');
                countP.innerHTML = 'Counter tasks: ' + count;
            } else {
                this.classList.remove('checked');
            }
        };

        spanDel.onclick = function() {
            div.remove();
            countP.innerHTML = 'Counter tasks: ' + --count;
        };
    } else {
        input.classList.add('todo__input-place__color');
        input.placeholder = 'ERROR! Write task!';
    }
}

clear.addEventListener('click', function() {
    var allLists = document.querySelectorAll('.menu__task');
    if (count != 0) {
        for (var i = allLists.length - 1; i >= 0; i--) {
            allLists[i].remove();
        }
        count = 0;
        countP.innerHTML = 'Counter tasks: ' + count;
    } else {
        countP.style.color = '#f00';
        clear.style.background = '#f00';
        spanCheck.style.display = 'block';
    }
});