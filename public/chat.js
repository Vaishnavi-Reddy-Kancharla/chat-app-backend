var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        m=input.value
        socket.emit('sendMessage', m);
        input.value = '';
    }
});

socket.on('message', function(msg) {
    console.log('message in html ',msg)
    var item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
socket.on('connect_error', (error) => {
    console.log('Connection failed:', error);
});