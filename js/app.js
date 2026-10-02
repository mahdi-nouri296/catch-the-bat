let player = document.querySelector(".player");
let bat = document.querySelector(".bat");
let playground = document.querySelector('.game-area');
let scoreBoard = document.querySelector('#score');
let score = 0;
gameStart();
window.addEventListener("keyup", keyEffect);
function keyEffect(e) {
    if (e.key === 'ArrowUp') {
        if (!isNearBorder(player, -50, 'Y'))
            moveVertical(player, -50)
    }
    else if (e.key === 'ArrowDown') {
        if (!isNearBorder(player, +50, 'Y'))
            moveVertical(player, +50)
    }
    else if (e.key === 'ArrowLeft') {
        if (!isNearBorder(player, -50, 'X'))
            moveHorizontal(player, -50)
        player.style.transform = 'scale(-1,1)';
    }
    else if (e.key === 'ArrowRight') {
        if (!isNearBorder(player, +50, 'X'))
            moveHorizontal(player, +50)
        player.style.transform = 'scale(1,1)';
    }
    if (isTouching(player, bat))
        touched(bat)
}
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

function touched(touchedObject) {
    alert("you win the game!!");
    addScore(5);
    gameStart(player, bat);

}
function isNearBorder(object, moveValue, direction) {

    const nextPosition =
        direction === 'X'
            ? parseFloat(getComputedStyle(object).left) + moveValue
            : parseFloat(getComputedStyle(object).top) + moveValue;
    if (nextPosition < 0)
        return true;
    if (direction === 'X' && nextPosition + object.clientWidth > playground.clientWidth)
        return true;
    if (direction === 'Y' && nextPosition + object.clientHeight > playground.clientHeight)
        return true;

    return false;
}
function addScore(points) {
    score += points;
    scoreBoard.textContent = String(score).padStart(7, 0);
}
function randomForVertical(object) {
    const margin = 30;
    const max = playground.clientHeight - object.clientHeight - margin;
    return Math.floor(Math.random() * (max - margin)) + margin;
}

function randomForHorizan(object) {
    const margin = 30;
    const max = playground.clientWidth - object.clientWidth - margin;
    return Math.floor(Math.random() * (max - margin)) + margin;
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
