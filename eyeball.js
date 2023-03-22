let eyeBall = document.querySelector(".eyeball")
let pupil = document.querySelector(".pupil")
let eyeArea = eyeBall.getBoundingClientRect()
let pupilArea = pupil.getBoundingClientRect()
let R = eyeArea.width / 2
let r = pupilArea.width / 2
let centerX = eyeArea.left + R
let centerY = eyeArea.top + R

document.addEventListener("mousemove", (e) => {
    let x = e.clientX - centerX
    let y = e.clientY - centerY
    let theta = Math.atan2(y, x)
    let angle = theta * 180 / Math.PI + 360;

    pupil.style.transform = `translateX(${R - r + "px"}) rotate(${angle + "deg"})`;
    pupil.style.transformOrigin = `${r + "px"} center`;
});