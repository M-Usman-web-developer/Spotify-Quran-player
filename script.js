let current_play = new Audio()

let frame = document.querySelector('.frame')
let quran;

// second to minutes
function convertSecondsToMinutes(seconds) {
    // Ensure the input is a number
    if (typeof seconds !== 'number' || seconds < 0) {
        throw new Error('Input must be a non-negative number');
    }

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60); // Round down remaining seconds

    // Format minutes and seconds to ensure two digits
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted time
    return `${formattedMinutes}:${formattedSeconds}`;
}






addEventListener('click', () => { })

async function main() {

    let a = await fetch('http://127.0.0.1:3000/quran/');
    let response = await a.text();
    // console.log(response)

    let div = document.createElement('div')
    div.innerHTML = response;
    let b = div.getElementsByTagName('a')
    let quranfolder = []
    for (let index = 0; index < b.length; index++) {
        const element = b[index];
        if (element.href.endsWith('.mp3')) {
            quranfolder.push(element.href.split('/quran/')[1])
        }
    }
    return quranfolder
}


let play_butn = document.querySelector(".Play2")

const play_quran = (track) => {
    current_play.src = "/quran/" + track;
    current_play.play();
    play_butn.src = 'imges/pause.svg';

    document.getElementById("surat_info").innerHTML = track;
    document.getElementById("time").innerHTML = "00:00 / 00:00";

}




async function get_quran() {

    quran = await main()
    var audio = new Audio(quran[0]);

    // Show quran on the menu-box 
    let quran_list = document.querySelector('.menu-box').getElementsByTagName('ol')[0]
    for (const qurans of quran) {
        quran_list.innerHTML = quran_list.innerHTML + `<li> ${qurans.replaceAll("%20", " ")}  <li>`
    }


    // Attach event listener to every surat
    Array.from(document.querySelector('.menu-box').getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', element => {
            console.log(e.innerHTML)
            play_quran(e.innerHTML.trim())

        })
    })

    // Attach event listener to play
    // let play_butn = document.querySelector(".Play2")
    play_butn.addEventListener("click", () => {
        if (current_play.paused) {
            current_play.play();
            play_butn.src = "imges/pause.svg";
        } else {
            current_play.pause();
            play_butn.src = "imges/play.svg";
        }
    })



    current_play.addEventListener("timeupdate", () => {
        console.log(current_play.currentTime, current_play.duration);
        document.querySelector('#time').innerHTML = `${convertSecondsToMinutes(current_play.currentTime)} / ${convertSecondsToMinutes(current_play.duration)}`

        // for seek bar circle 
        document.querySelector(".circle").style.left = (current_play.currentTime / current_play.duration) * 100 + "%";
    })


    // event listerner on seek bar 
    document.querySelector(".seek-bar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        current_play.currentTime = ((current_play.duration) * percent) / 100;
    })

    // add addEventListener on hamberger
    document.querySelector(".hamberger").addEventListener("click", () => {
        document.querySelector(".left-box").style.left = "0"
    })

    // add addEventListener on close
    document.querySelector(".close_up").addEventListener("click", () => {
        document.querySelector(".left-box").style.left = "-330px"
    })



    
    // addEventListener on next
    let next = document.querySelector(".Next2")
    next.addEventListener("click" , ()=>{

        let index = quran.indexOf(current_play.src.split("/").slice(-1)[0])
        console.log(quran , index)
        if((index+1) >= length){
            play_quran(quran[index+1])
        }
    })


    // addEventListener on previous
    let previous = document.querySelector(".previous2")
    previous.addEventListener("click", () => {

        let index = quran.indexOf(current_play.src.split("/").slice(-1)[0])
        console.log(quran, index)
        if ((index - 1) >= 0) {
            play_quran(quran[index - 1])
        }
    })

}
get_quran()

