const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let beanX, beanY, playerX, score, playerSpeed, level = 1, beanSpeed;
let playerWidth = 70;
let gameRunning = false;
const alertBox = document.getElementById("alert");
let mode = "classic"


const mugImage = new Image();
mugImage.src = "mug.png"; 

const beanImage = new Image();
beanImage.src = "bean.png"; 

function initializeGame() {
    beanX = Math.random() * canvas.width;
    beanY = 0;
    playerX = canvas.width / 2;
    score = 0;
    playerSpeed = 50;
    beanSpeed = 3 + (level - 1);
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    canvas.style.display = "block";

    window.scrollTo(0, document.body.scrollHeight);
}

document.addEventListener("keydown", function(event) {
    if (!gameRunning) return;
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
});

function drawMug() {
    if(mode == "classic") {
        ctx.fillStyle = "black";
        ctx.fillRect(playerX, canvas.height - 20, playerWidth, 10);
    }

    if(mode == "plus") {
        ctx.drawImage(mugImage, playerX, canvas.height - 50, playerWidth, 50);
    }
}

function drawBean() {
    if(mode == "classic") {
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(beanX, beanY, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    if(mode == "plus") {
        ctx.drawImage(beanImage, beanX, beanY, 35, 30);
    }
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBean()
    drawMug()
    /*
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.arc(beanX, beanY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "black";
    ctx.fillRect(playerX, canvas.height - 20, playerWidth, 10);
    */
    
    beanY += beanSpeed;
    if (beanY > canvas.height - 20 && beanX > playerX && beanX < playerX + playerWidth) {
        beanY = 0;
        beanX = Math.random() * canvas.width;
        score++;
        document.getElementById("score").innerText = score;
        if (score >= 10) {
            level++;
            score = 0;
            document.getElementById("level").innerText = level;
            beanSpeed += 1;
            playerSpeed += 5;
        }
    } else if (beanY > canvas.height) {
        showAlert("Game over!\nYour final score: " + score);
        //alert("Game Over! Your Final Score: " + score + " Level: " + level);
        gameRunning = false;

        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);
        return;
    }
    requestAnimationFrame(gameLoop);
}

document.getElementById("classicButton").addEventListener("click", function() {
    if (!gameRunning) {
        mode = "classic";
        playerWidth = 70;
        gameRunning = true;
        initializeGame();
        gameLoop();
    }
});

document.getElementById("plusButton").addEventListener("click", function() {
    if (!gameRunning) {
        mode = "plus";
        playerWidth = 120;
        gameRunning = true;
        initializeGame();
        gameLoop();
    }
});

// Function to show alert box
function showAlert(text) {
    alertBox.classList.remove("hidden");
    document.getElementById("alertText").innerText = text
}

// Handle alert box close button event
document.getElementById("alertCloseBtn").addEventListener("click", function () {
    alertBox.classList.add("hidden");
});