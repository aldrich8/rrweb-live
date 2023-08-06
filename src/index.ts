console.log("app is running ...")

import * as rrweb from "rrweb";

let stopFn = null;

const events = [];

function init() {
    console.log("init rrweb ...");
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
    replayer.start();
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