var kaAudio = new Audio("/sounds/ka.wav")
var donAudio = new Audio("/sounds/don.wav")

const KaKey: Array<string> = ["KeyD", "KeyK"];
const DonKey: Array<string> = ["KeyF", "KeyJ"];

window.addEventListener("keydown", (event) => {
    if (KaKey.includes(event.code)) {
        resetAudio();
        kaAudio.play();
    } else if (DonKey.includes(event.code)) {
        resetAudio();
        donAudio.play();
    }
})

function resetAudio() {
    kaAudio.pause()
    donAudio.pause()
    kaAudio.currentTime = 0;
    donAudio.currentTime = 0;
}