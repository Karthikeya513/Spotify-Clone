console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let searchel = document.getElementById("searchInput");
let main=document.getElementById("maincon");
let sidebar=document.getElementById("Sidebar");

let songs = [
    {id:1,songName: "Bhairava", filePath: "songs/1.mp3", coverPath: "https://c.saavncdn.com/509/Bhairava-Anthem-From-Kalki-2898-Ad-Telugu-Telugu-2024-20240616063600-500x500.jpg"},
    {id:2,songName: "Theme of Kalki", filePath: "songs/2.mp3", coverPath: "https://s.saregama.tech/image/c/fw_485/d/4f/09/theme_of_kalki_tamil_ott_1440_1719236936.jpg"},
    {id:3,songName: "Veera Dheera", filePath: "songs/3.mp3", coverPath: "https://m.media-amazon.com/images/I/51XxdQPU-6L._UXNaN_FMjpg_QL85_.jpg"},
    {id:4,songName: "Bujji", filePath: "songs/4.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b273e1eeb91da851ef1188a2c492"},
    {id:5,songName: "Ta Takkara", filePath: "songs/5.mp3", coverPath: "https://i.scdn.co/image/ab67616d00001e02254746f3002a2f42273ba7dd"},
    {id:6,songName: "Ordinary", filePath: "songs/6.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b27329369874cd836dc35a40a980"},
    {id:7,songName: "Badasss ", filePath: "songs/7.mp3", coverPath: "https://c.saavncdn.com/544/Badass-From-Leo-Tamil-2023-20230928162246-150x150.jpg"},
    {id:8,songName: "I'm Scared ", filePath: "songs/8.mp3", coverPath: "https://c.saavncdn.com/005/I-m-Scared-From-Leo-Tamil-2023-20231027154923-500x500.jpg"},
    {id:9,songName: "Leo Das Entry", filePath: "songs/9.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b273ce9c65e63d5469894b95b4ba"},
    {id:10,songName: "Ratata ", filePath: "songs/10.mp3", coverPath: "https://c.saavncdn.com/036/Ratata-From-Leo-Tamil-2023-20231109190209-500x500.jpg"},
    {id:11,songName: "Bloody sweet ", filePath: "songs/11.mp3", coverPath: "https://c.saavncdn.com/494/Bloody-Sweet-From-Leo-English-2023-20230203203312-500x500.jpg"},
    {id:12,songName: "Souraa", filePath: "songs/12.mp3", coverPath: "https://c.saavncdn.com/792/Souraa-From-Bharateeyudu-2-Telugu-2024-20240522145709-500x500.jpg"}
];

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.src=songs[songIndex].coverPath;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

audioElement.addEventListener("ended", () => {
    // Increment the track index
    songIndex++;
    // If the current track index is greater than the playlist length, reset it to 0
    if (songIndex > 11) {
        songIndex = 0;
    }
    // Load and play the next track
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.src=songs[songIndex].coverPath;
    masterSongName.innerText = songs[songIndex].songName;
});


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.src=songs[songIndex].coverPath;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=11){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.src=songs[songIndex].coverPath;
    makeAllPlays();

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.src=songs[songIndex].coverPath;
    makeAllPlays();
})

function getinput(event) {
    if (event.key === "Enter") {
        let searchvalue = (searchel.value).toLowerCase();
        main.innerHTML='';
        const filteredsongs=songs.filter((each)=>each.songName.toLowerCase().includes(searchvalue))
        console.log(filteredsongs)
        sidebar.classList.add("exapmle")
        main.classList.add("example2","songItemContainer")

        if(filteredsongs.length>0){
            filteredsongs.forEach((element)=>{
                const resultItem=document.createElement('div');
                resultItem.classList.add("songItem2")
                main.appendChild(resultItem)
            
                let imgel = document.createElement("img");
                imgel.src = element.coverPath;
                resultItem.appendChild(imgel);

                let divel=document.createElement("div");
                divel.classList.add("Item");
                resultItem.appendChild(divel)
            
                let titleel = document.createElement("span");
                titleel.textContent = element.songName;
                titleel.classList.add("songName")
                divel.appendChild(titleel);

                let spanel=document.createElement("span");
                spanel.classList.add("songlistplay")
                divel.appendChild(spanel);

                let spanel2=document.createElement("span");
                spanel2.classList.add("timestamp")
                spanel.appendChild(spanel2);

                let listel=document.createElement("i");
                listel.classList.add("far", "fa-play-circle","songItemPlay")
                listel.id=element.id;
                spanel2.appendChild(listel);
                Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                    element.addEventListener('click', (e)=>{
                        makeAllPlays();
                        songIndex = parseInt(e.target.id);
                        e.target.classList.remove('fa-play-circle');
                        e.target.classList.add('fa-pause-circle');
                        audioElement.src = `songs/${songIndex}.mp3`;
                        audioElement.currentTime = 0;
                        audioElement.play();
                        masterPlay.classList.remove('fa-play-circle');
                        masterPlay.classList.add('fa-pause-circle');
                    })
                })
            })
        }else{
            main.innerHTML="No Results Found";
        }
        
    }
}

searchel.addEventListener("keydown", getinput);