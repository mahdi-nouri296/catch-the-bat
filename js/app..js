function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const padding = 65;
    return !(
        aRect.top + aRect.height - padding < bRect.top + padding ||
        aRect.top + padding > bRect.top + bRect.height - padding ||
        aRect.left + aRect.width - padding < bRect.left + padding ||
        aRect.left + padding > bRect.left + bRect.width - padding
    );
}
function isNear(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const padding = -50;
    return !(
        aRect.top + aRect.height - padding < bRect.top + padding ||
        aRect.top + padding > bRect.top + bRect.height - padding ||
        aRect.left + aRect.width - padding < bRect.left + padding ||
        aRect.left + padding > bRect.left + bRect.width - padding
    );
}
let player = document.querySelector(".player");
let bat = document.querySelector(".bat");
let playground = document.querySelector('.game-area');
gameStart();
window.addEventListener("keyup", keyEffect);
function keyEffect(e) {
    if (e.key === 'ArrowUp')
        moveVertical(player, -50)
    else if (e.key === 'ArrowDown')
        moveVertical(player, +50)
    else if (e.key === 'ArrowLeft') {
        moveHorizontal(player, -50)
        player.style.transform = 'scale(-1,1)';
    }
    else if (e.key === 'ArrowRight') {
        moveHorizontal(player, +50)
        player.style.transform = 'scale(1,1)';
    }
    if (isTouching(player, bat)) {
        alert("you win the game!!")
        gameStart(player, bat);
    }
}
function randomForVertical(object) {
    let height = Math.floor(Math.random() * parseFloat(getComputedStyle(playground).height)) - parseFloat(getComputedStyle(object).height);
    if (height < 0)
        height *= -1;
    return height;

}

function randomForHorizan(object) {
    let width = Math.floor(Math.random() * parseFloat(getComputedStyle(playground).width)) - parseFloat(getComputedStyle(object).width);
    if (width < 0)
        width *= -1;
    return width;
}


function moveVertical(object, count) {
    object.style.top = `${parseFloat(getComputedStyle(object).top) + count}px`;
}
function moveHorizontal(object, count) {
    object.style.left = `${parseFloat(getComputedStyle(object).left) + count}px`;
}
function setRandomPosotion(object) {
    object.style.top = `${randomForVertical(object)}px`;
    object.style.left = `${randomForHorizan(object)}px`;
}
function gameStart() {
    player.style.top = '1rem';
    player.style.left = '1rem';
    do {
        setRandomPosotion(bat);
    }
    while (isNear(player, bat));


}
