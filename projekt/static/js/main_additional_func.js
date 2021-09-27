const mainHolder = document.querySelector(".chmurka-kacpra");
const cafesHolder = document.querySelector(".cafe-info");
const eventsHolder = document.querySelector(".events-info");

const openInfoBtn = document.querySelector(".open-events-info");
const closeInfoBtn = document.querySelector(".close-events-info");
const dropMenuOpeners = document.querySelectorAll(".drop-menu-opener");
const cafesLinks = document.querySelectorAll(".cafe-link");

let player;

const months = ["Czerwiec", "Lipiec", "Sierpień"]
const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]

const dates = []
const eventsLimit = 5
let lastOpenedEvent = null

document.addEventListener("DOMContentLoaded", () => {
    let tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api"
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    changeDates()
    showPromt(mainHolder)
})


const changeDates = () => {
    let events_date = eventsHolder.querySelectorAll(".date");
    events_date.forEach((event_date) => {
        let date = new Date (event_date.innerText);
        let day = days[date.getDay() - 1];
        let month = months[date.getMonth() - 5];
        if (event_date.classList.contains('date-full')){
            let minutes = date.getMinutes().toString()
            if (minutes.length === 1) {
                minutes = "00"
            }
            event_date.innerText = `${day} ${date.getDate()} ${month} ${date.getFullYear()} o godzinie: ${date.getHours()}:${minutes}`;
        } else {
            event_date.innerText = `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;
            dates.push({"date" : date, "parent" : event_date.parentElement});
        }
    })
    sortDates()
    showDates(eventsLimit)
}

const sortDates = () => {
    dates.sort((a, b) => {
        return a['date'] - b['date'];
    })
}

const showDates = (limit) => {
    let now = new Date();
    let counter = 0;
    for (let i = 0; i < dates.length; i++) {
        if (now - dates[i]["date"] < 0 && counter < limit) {
            counter++;
            dates[i]["parent"].classList.add("active-event");
            dates[i]["parent"].classList.remove("deactivated-event");
        } else {
            if (dates[i]["parent"].classList.contains("active-event")){
                dates[i]["parent"].classList.remove("active-event");
            }
            dates[i]["parent"].classList.add("deactivated-event");
        }
    }
}

function showPromt (promt) {
    promt.classList.add("active-promt")
    console.log("elo")
}

function closePromt (promt) {
    promt.classList.remove("active-promt");
}

// function onYouTubeIframeAPIReady () {
//     player = new YT.Player("yt-player", {
//         "height" : "360",
//         "width" : "640",
//         "videoId" : "M7c1UVf-VE",
//         "events" : {
//             "onReady" : onPlayerReady,
//             "onError" : playerError,
//             "onStateChange" : playerStateChange,
//         }
//     });
// }

// function onPlayerReady (e) {
//     e.target.setVolume(50);
//     e.target.playVideo();
// }

// function playerStateChange (e) {
//     console.log(e.target.getPlayerState);
// }

// function playerError (e) {
//     console.log(e);
// }

// function stopVideo () {
//     player.stopVideo();
// }

const colorCafe = (cafe) => {
    let classes = ["pink", "blue", "yellow"];
    let words = cafe.innerText.split(" ");
    let randomWord = ""
    let colorizedWord = ""
    for (let i = 0; i < words.length; i++) {
        randomWord = words[i]
        colorizedWord = `<span class="${classes[Math.floor(Math.random() * classes.length)]}">${randomWord.slice(0, 1)}</span>${randomWord.slice(1)}`
        words.splice(words.indexOf(randomWord), 1, colorizedWord)
    }
    cafe.innerHTML = words.join(" ")
}

const showDetails = (parentDiv) => {
    
    let detailsDiv = parentDiv.querySelector("div")
    let detailsLinks = detailsDiv.querySelectorAll("p")
    for (let i = 0; i < detailsLinks.length; i++) {
        detailsLinks[i].classList.remove("hidden-element")
        detailsLinks[i].classList.add("active-element")
    }
    parentDiv.classList.add("open")

}
const closeDetails = (parentDiv) => {
    let detailsDiv = parentDiv.querySelector("div")
    let detailsLinks = detailsDiv.querySelectorAll("p")
    for (let i = 0; i < detailsLinks.length; i++) {
        detailsLinks[i].classList.add("hidden-element")
        detailsLinks[i].classList.remove("active-element")
    }
    parentDiv.classList.remove("open")
}

// event listeners 
closeInfoBtn.addEventListener("click", (e) => {
    closePromt(mainHolder);
})

dropMenuOpeners.forEach((opener) => {
    opener.addEventListener('click', (e) => {
        let num = e.target.getAttribute("number")
        let parent = document.querySelector(`div.parent-div[number="${num}"]`)
        if (lastOpenedEvent !== num) {
            showDetails(parent)
            if (lastOpenedEvent !== null) {
                let lastParent = document.querySelector(`div.parent-div[number="${lastOpenedEvent}"]`)
                closeDetails(lastParent)
            }
        } else {
            if (!parent.classList.contains("open")) {
                showDetails(parent)
            } else {
                closeDetails(parent)
            }
        }
        lastOpenedEvent = num
    })
})

cafesLinks.forEach((link) => {
    colorCafe(link)
})

// openInfoBtn.addEventListener("click", (e) => {
//     showPromt(mainHolder);
// })
