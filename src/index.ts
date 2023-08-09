console.log("app is running ...")

import * as rrweb from "rrweb";

let stopFn = null;

const events = [];

function init() {
    console.log("init rrweb ...");
    if(localStorage.getItem("events")) {
        localStorage.removeItem("events")
    }
    stopFn = rrweb.record({
        emit(event) {
            console.log(event);
            events.push(event);
        }
    })
}

function stop() {
    if (stopFn) {
        stopFn();
        console.log("stop rrweb...");
        console.log("events: ", events);

        localStorage.setItem("events", JSON.stringify(events))
        document.getElementById("actions").style.display = 'block';
        document.getElementById('replay-container').style.display = 'block';
        document.getElementById("container").style.display = 'none';
    }
}

let replayer = null
function initReplay() {
    replayer = new rrweb.Replayer(events, {
        root: document.getElementById("replay-container"),
        liveMode: true
    });
    console.log(replayer)
}

function startReplay() {
    replayer.play();
}

function stopReplay() {
    replayer.stop();
}

function initUIEvents() {
    document.getElementById("start").addEventListener("click", init);
    document.getElementById("stop").addEventListener("click", stop);

    document.getElementById('replay').addEventListener("click", initReplay);

    document.getElementById("startreplay").addEventListener("click", startReplay);
    document.getElementById("stopreplay").addEventListener("click", stopReplay);
}

initUIEvents();