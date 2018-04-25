var songs = [
    {
        url: 'http://d.zaix.ru/6Gsj.mp3',
        title: 'Ben Howard - Diamonds'
    },
    {
        url: 'http://d.zaix.ru/6Gtt.mp3',
        title: 'Ben Howard - In Dreams'
    },
    {
        url: 'http://d.zaix.ru/6Guo.mp3',
        title: 'Ben Howard - Under The Same Sun'
    },
    {
        url: 'http://d.zaix.ru/XkQ.mp3',
        title: 'Owl City - Fireflies'
    },
    {
        url: 'http://d.zaix.ru/6GuA.mp3',
        title: 'Ben Howard - Burgh Island'
    },
    {
        url: 'http://d.zaix.ru/6GuC.mp3',
        title: 'Ben Howard - Depth over distance'
    }
];
var currentSong = 0;
var context = new window.AudioContext();
let buffer = context.createBufferSource();
let loaderX = document.getElementById('loader');
window.onload = loadSong();
function loadSong() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', songs[currentSong].url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
        if(!loaderX.classList.contains('done')) {
            loaderX.classList.add('done');
        }
        context.decodeAudioData(xhr.response, function (audio) {
            buffer = context.createBufferSource();
            buffer.connect(context.destination);
            buffer.buffer = audio;
            loaderX.classList.remove('done');
            buffer.start(0);
            //loaderX.classList.remove('done');
        });
    };
    xhr.send();
};

function nextSong() {
    buffer.stop(0);
    currentSong = (currentSong + 1 <= songs.length - 1) ? currentSong + 1 : 0;
    loadSong();
};

function previousSong() {
    buffer.stop(0);
    currentSong -= 1;
    currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
    loadSong();
};

function stopPlay() {
    buffer.stop(0);
    buffer = 0;
};
(function () {
    let playlist = document.getElementById('playlist');
    for (let i = 0, max = songs.length - 1; i <= max; i++) {
        let node = document.createElement('p');
        let title = document.createTextNode(songs[i].title);
        node.appendChild(title);
        playlist.appendChild(node);

    }

})();
