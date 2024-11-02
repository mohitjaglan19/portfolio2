let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
    setNavigation(); // Initialize navigation click event
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score-value").innerText = score.toString();

        // Enable navigation if score is 50 or more
        if (score >= 50) {
            document.querySelectorAll("nav a").forEach(link => {
                link.classList.remove('hidden'); // Show navigation links
            });
        }
    } else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}

function setNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent the default link behavior
            const targetSection = document.querySelector(this.getAttribute("href"));
            showOverlay(targetSection.innerHTML); // Show the section in overlay
        });
    });

    document.getElementById("close-overlay").addEventListener("click", closeOverlay);
}

function showOverlay(content) {
    document.getElementById("overlay-content").innerHTML = content;
    document.getElementById("overlay").style.visibility = 'visible';
}

function closeOverlay() {
    document.getElementById("overlay").style.visibility = 'hidden';
}
