var img = document.querySelector('#img'),
    arrImg = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
    count = 0;

document.getElementById('prev').addEventListener('click', function() {
    count--;
    if (count < 0) {
        count = arrImg.length - 1;
    }

    img.src = 'img/' + arrImg[count];
    document.getElementById('count').innerText = count + 1;
});

document.getElementById('next').addEventListener('click', function() {
    count++;
    if (count > arrImg.length - 1) {
        count = 0;
    }

    img.src = 'img/' + arrImg[count];
    document.getElementById('count').innerText = count + 1;
});