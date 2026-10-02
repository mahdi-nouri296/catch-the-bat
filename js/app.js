let player = document.querySelector(".player");
let bat = document.querySelector(".bat");
const zombies = document.querySelectorAll('.zombie');
let playground = document.querySelector('.game-area');
let scoreBoard = document.querySelector('#score');
let liveBoard = document.querySelectorAll('.live');
let score;
let lives;
let zombieInterval;
let zombieSpeed;
let zombieStep;
gameStart();
function gameStart() {
    player.style.top = '1rem';
    player.style.left = '1rem';
    score = 0;
    lives = 3;
    zombieSpeed = 300;
    zombieStep = 20;
    clearZombies();
    resetPosition();
    resetScoreBoard();
    updateLivesBoard();
    clearInterval(zombieInterval);
    zombieInterval = setInterval(() => { moveAllZombies(); }, zombieSpeed);
}

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
        touched(bat);
}

function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    const padding = Math.min(aRect.width, aRect.height, bRect.width, bRect.height) * 0.4;

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
    const padding = -30;
    return !(
        aRect.top + aRect.height - padding < bRect.top + padding ||
        aRect.top + padding > bRect.top + bRect.height - padding ||
        aRect.left + aRect.width - padding < bRect.left + padding ||
        aRect.left + padding > bRect.left + bRect.width - padding
    );
}

function resetPosition() {
    do {
        setRandomPosotion(bat);
    }
    while (isNear(player, bat));
    zombies.forEach(currentZombie => {
        do {
            setRandomPosotion(currentZombie);
        } while (
            isNear(player, currentZombie) || isNear(bat, currentZombie) || isNearOtherZombies(currentZombie)
        );
    });

}
function isNearOtherZombies(currentZombie) {
    for (const zombie of zombies) {
        if (getComputedStyle(zombie).display === 'none')
            continue;
        if (zombie === currentZombie)
            continue;
        if (isNear(currentZombie, zombie))
            return true;
    }
    return false;
}
function resetScoreBoard() {
    scoreBoard.textContent = '00000000';
}
function updateLivesBoard() {
    liveBoard.forEach(element => {
        element.style.display = 'block';
    });
}
function touched(touchedObject) {
    if (touchedObject === bat) {
        addScore(5);
        checkScore();
    }
    if (touchedObject.classList.contains('zombie')) {
        liveBoard[lives - 1].style.display = "none";
        lives--;
        if (lives === 0)
            lose();
    }
    resetPosition();
}
function checkScore() {
    function checkScore() {

        if (score >= 20) {
            activateZombie(1);
        }
        if (score >= 40) {
            activateZombie(2);
            zombieStep = 30;
        }
        if (score >= 60 && zombieSpeed === 300) {
            zombieSpeed = 200;
            zombieStep = 40;
            clearInterval(zombieInterval);
            zombieInterval = setInterval(() => {
                moveAllZombies();
            }, zombieSpeed);
        }
        if (score >= 80 && zombieSpeed === 200) {
            zombieSpeed = 100;
            zombieStep = 50;
            clearInterval(zombieInterval);
            zombieInterval = setInterval(() => {
                moveAllZombies();
            }, zombieSpeed);
        }
    }
}
function lose() {
    alert('you lose ');
    gameStart();
}
function clearZombies() {
    for (let i = 1; i < zombies.length; i++) {
        zombies[i].style.display = 'none';
    }
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
// setInterval(moveZombie, 500);
function moveZombie(zombie) {

}
function addScore(points) {
    score += points;
    scoreBoard.textContent = String(score).padStart(8, 0);
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
function moveAllZombies() {
    zombies.forEach(zombie => {
        if (getComputedStyle(zombie).display === 'none')
            return;
        moveZombie(zombie);
    });
}
function moveZombie(zombie) {
    const random = Math.random();
    const zombieLeft = parseFloat(getComputedStyle(zombie).left);
    const zombieTop = parseFloat(getComputedStyle(zombie).top);
    const playerLeft = parseFloat(getComputedStyle(player).left);
    const playerTop = parseFloat(getComputedStyle(player).top);
    const step = zombieStep;
    if (random < 0.3) {
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0:
                if (!isNearBorder(zombie, -step, 'Y'))
                    moveVertical(zombie, -step);
                break;
            case 1:
                if (!isNearBorder(zombie, step, 'Y'))
                    moveVertical(zombie, step);
                break;
            case 2:
                if (!isNearBorder(zombie, -step, 'X')) {
                    moveHorizontal(zombie, -step);
                    zombie.style.transform = 'scale(-1,1)';
                }

                break;
            case 3:
                if (!isNearBorder(zombie, step, 'X')) {
                    moveHorizontal(zombie, step);
                    zombie.style.transform = 'scale(1,1)';
                }

                break;
        }
    } else {
        const xDistance = Math.abs(playerLeft - zombieLeft);
        const yDistance = Math.abs(playerTop - zombieTop);
        if (xDistance > yDistance) {
            if (playerLeft > zombieLeft) {
                if (!isNearBorder(zombie, step, 'X')) {
                    moveHorizontal(zombie, step);
                    zombie.style.transform = 'scale(1,1)';
                }

            } else {
                if (!isNearBorder(zombie, -step, 'X')) {
                    moveHorizontal(zombie, -step);
                    zombie.style.transform = 'scale(-1,1)';
                }

            }
        } else {
            if (playerTop > zombieTop) {
                if (!isNearBorder(zombie, step, 'Y'))
                    moveVertical(zombie, step);
            } else {
                if (!isNearBorder(zombie, -step, 'Y'))
                    moveVertical(zombie, -step);
            }
        }
    }
    if (isTouching(player, zombie))
        touched(zombie);
}
function activateZombie(index) {
    zombies[index].style.display = 'block';
}
