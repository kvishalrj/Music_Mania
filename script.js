// variable declaration
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('play');
let masterPrev = document.getElementById('prev');
let masterNext = document.getElementById('next');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Chori Chori Dil...", filePath: "/songs/1.mp3", coverPath: "/images/1.jpg"},
    {songName: "Dekhun Tujhe Toh...", filePath: "/songs/2.mp3", coverPath: "/images/2.jpg"},
    {songName: "Dilbar-Dilbar...", filePath: "/songs/3.mp3", coverPath: "/images/3.jpg"},
    {songName: "Aap Ki Nazaron...", filePath: "/songs/4.mp3", coverPath: "/images/4.jpg"},
    {songName: "Tujhse Naraz Nahi...", filePath: "/songs/5.mp3", coverPath: "/images/5.jpg"},
    {songName: "Tor Bindiya...", filePath: "/songs/6.mp3", coverPath: "/images/6.jpg"},
    {songName: "Mai Duniya Bhula...", filePath: "/songs/7.mp3", coverPath: "/images/7.jpg"},
    {songName: "O Sathi Re...", filePath: "/songs/8.mp3", coverPath: "/images/8.webp"},
    {songName: "Shape Of You...", filePath: "/songs/9.mp3", coverPath: "/images/9.jpeg"},
    {songName: "Let Me Love You...", filePath: "/songs/10.mp3", coverPath: "/images/10.jpg"}
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// handle play/pause and next/prev
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songItemPlay[songIndex].classList.add('fa-circle-pause');
        songItemPlay[songIndex].classList.remove('fa-circle-play');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        songItemPlay[songIndex].classList.remove('fa-circle-pause');
        songItemPlay[songIndex].classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

masterNext.addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    document.getElementById('singerName').innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex-1].classList.add('fa-circle-play');
    gif.style.opacity = 1;
})

masterPrev.addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    document.getElementById('singerName').innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    songItemPlay[songIndex].classList.add('fa-circle-pause');
    songItemPlay[songIndex].classList.remove('fa-circle-play');
    songItemPlay[songIndex+1].classList.add('fa-circle-play');
    gif.style.opacity = 1;
})

// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

songItem.forEach((element,i)=>{
    element.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.src = songs[i].filePath;
            document.getElementById('singerName').innerText = songs[i].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            songItemPlay[i].classList.add('fa-circle-pause');
            songItemPlay[i].classList.remove('fa-circle-play');
            gif.style.opacity = 1; 
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            songItemPlay[i].classList.remove('fa-circle-pause');
            songItemPlay[i].classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }      
    })
})
