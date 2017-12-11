// Make connection
const socket = io.connect('http://localhost:4000');


let message   = document.getElementById('message');
let handle    = document.getElementById('handle');
let btn       = document.getElementById('send');
let output    = document.getElementById('chat-messages-output');
let feedback  = document.getElementById('chat-messages-feedback') || "";

window.addEventListener('keydown', function() {
    let e = window.event || e;
    if (e.keyCode == 13) {

        if ( message.value == "" ) {

            return false;

        } else {
            socket.emit('chat', {
                message: message.value,
                handle: handle.value
            });

            message.value = "";
        }
    }
})
/*
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});
*/
message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
})

// listen for events
socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<div class="p"> <div class="flexy"> <span class="handle"></span> <ul> <li> <span class="user-name"> ' + data.handle + '</span></li> <li> <span class="date-time" data-message-date>Dec 10/2017</span> </li> </ul> </div> <div class="message-block">' + data.message + '</div> </div>';
});


socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + 'is typing a message...' + '</em></p>';
});
