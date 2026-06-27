let songs = [
    {
        title: "Song One",
        artist: "Unknown Artist",
        file: "songs/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Unknown Artist",
        file: "songs/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Unknown Artist",
        file: "songs/song3.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;

let audio = document.getElementById("audio");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let playBtn = document.getElementById("play-btn");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");
let currentTimeText = document.getElementById("current-time");
let durationText = document.getElementById("duration");

function loadSong(index) {
    songTitle.innerText = songs[index].title;
    songArtist.innerText = songs[index].artist;
    audio.src = songs[index].file;
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "Play";
        isPlaying = false;
    } else {
        audio.play();
        playBtn.innerText = "Pause";
        isPlaying = true;
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    if (isPlaying) {
        audio.play();
    }
}

function previousSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    if (isPlaying) {
        audio.play();
    }
}

audio.addEventListener("timeupdate", function() {
    if (audio.duration) {
        let progressValue = (audio.currentTime / audio.duration) * 100;
        progress.value = progressValue;

        currentTimeText.innerText = formatTime(audio.currentTime);
        durationText.innerText = formatTime(audio.duration);
    }
});

progress.addEventListener("input", function() {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", function() {
    audio.volume = volume.value;
});

audio.addEventListener("ended", function() {
    nextSong();
});

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

loadSong(currentSong);