console.log('Hiiii');
let songs;
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let currentSong = new Audio();
async function getSongs(folder){
    currFolder = folder;
    let a = await fetch(`https://armanbin007.github.io/Spotify-Replica-Project/${currFolder}`)
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("songs")[1]);
        }
    } return songs;
}


const playMusic = (track, pause = false)=>{
    currentSong.src = `/${currFolder}/` + track
    if(!pause){
        currentSong.play()
        play.src = "pause.svg"
    }
        cleanName = decodeURIComponent(track)
        .replaceAll("\\", "")
        .replaceAll("%20", " ")
        .replaceAll(".mp3", "")

    document.querySelector(".songInfo").innerHTML = cleanName
    document.querySelector(".songTime").innerHTML = "00.00/00.00"
}

async function main(){
    songs = await getSongs("songs");
    // console.log(songs);
    playMusic(songs[0], true)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    let cleanName;
    for (const s of songs){
        cleanName = decodeURIComponent(s)
        .replaceAll("\\", "")
        .replaceAll("%20", " ")
        // .replaceAll(".mp3", "")
        songUL.innerHTML += `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${cleanName}</div>
                                <div>Studioz</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }
    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
        // console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
}

    // Attach an event listener to prev,play,next
    play.addEventListener("click", ()=>{
        
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        } else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    prev.addEventListener("click", ()=>{
        // console.log('Prev Clicked');
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        console.log(songs, index);
        if((index - 1) >= 0){
            playMusic(songs[index-1])
        }
        
    })
    next.addEventListener("click", ()=>{
        // console.log('Next Clicked');
        let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
        console.log(songs, index);
        if((index + 1) < songs.length){
            playMusic(songs[index+1])
        }
    })

    // Timeupdate event
    currentSong.addEventListener("timeupdate", ()=>{
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = e.offsetX/e.target.getBoundingClientRect().width * 100;

        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })

    //Event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0%";
    })
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-100%";
    })

    // Volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
        // console.log(e.target.value);
        currentSong.volume = parseInt(e.target.value)/100;
    })
    
    // Playlist

    // Load the playlist whenever a card is clicked
    // Array.from(document.getElementsByClassName("card")).forEach(e => { 
    //     e.addEventListener("click", async item => {
    //         // 1. Get the folder name from the clicked card's data-folder attribute
    //         const folder = item.currentTarget.dataset.folder;
            
    //         // Safety check: if the card doesn't have a folder assigned, do nothing
    //         if (!folder) return;

    //         // 2. Fetch the new songs from that specific folder
    //         songs = await getSongs("songs/"+folder); 

    //         // 3. Clear out the old song list
    //         let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    //         songUL.innerHTML = ""; 
            
    //         // 4. Populate the list with the newly fetched songs
    //         let cleanName;
    //         for (const s of songs){
    //             cleanName = decodeURIComponent(s)
    //             .replaceAll("\\", "")
    //             .replaceAll(`${folder}`, "")
    //             .replaceAll("%20", " ");
                
    //             songUL.innerHTML += `<li>
    //                                 <img class="invert" src="music.svg" alt="">
    //                                 <div class="info">
    //                                     <div>${cleanName}</div>
    //                                     <div>Studioz</div>
    //                                 </div>
    //                                 <div class="playnow">
    //                                     <span>Play Now</span>
    //                                     <img class="invert" src="play.svg" alt="">
    //                                 </div>
    //                             </li>`;
    //         }

    //         // 5. CRITICAL: Attach click listeners to the NEW songs so they actually play!
    //         Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(li => {
    //             li.addEventListener("click", element => {
    //                 playMusic(li.querySelector(".info").firstElementChild.innerHTML.trim());
    //             });
    //         });
            
    //         // Optional: Automatically start playing the first song of the new playlist
    //         // playMusic(songs[0]); 
    //     });
    // });
main();

