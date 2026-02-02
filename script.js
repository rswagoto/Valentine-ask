// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const noWrapper = document.querySelector(".no-wrapper");
const buttonArea = document.getElementById("letter-buttons");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const letterWindow = document.querySelector(".letter-window");
const loveRain = document.getElementById("love-rain");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
        positionNoAfterAssets();
    },50);
});

// Logic to move the NO btn

const positionNoButton = (x, y) => {
    if (!noWrapper) return;
    noWrapper.style.transform = `translate(${x}px, ${y}px)`;
};

const positionNoAtYesLevel = () => {
    if (!buttonArea || !noWrapper || !yesBtn) return;
    const areaRect = buttonArea.getBoundingClientRect();
    const noRect = noWrapper.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const startX = Math.max(5, areaRect.width - noRect.width - 50);
    const startY = Math.max(6, yesRect.top - areaRect.top + (yesRect.height - noRect.height) / 2);

    positionNoButton(startX, startY);
};

const positionNoAfterAssets = () => {
    if (!yesBtn || !noBtn) return;
    const yesImgReady = yesBtn.complete && yesBtn.naturalHeight > 0;
    const noImgReady = noBtn.complete && noBtn.naturalHeight > 0;

    if (yesImgReady && noImgReady) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                positionNoAtYesLevel();
            });
        });
        return;
    }

    const onReady = () => positionNoAtYesLevel();
    yesBtn.addEventListener("load", onReady, { once: true });
    noBtn.addEventListener("load", onReady, { once: true });
};

const moveNoButton = () => {
    if (!buttonArea || !noWrapper) return;

    const areaRect = buttonArea.getBoundingClientRect();
    const noRect = noWrapper.getBoundingClientRect();

    const minX = 5;
    const maxX = Math.max(minX, areaRect.width - noRect.width - 5);
    const maxY = Math.max(0, areaRect.height - noRect.height - 10);

    const nextX = Math.random() * (maxX - minX) + minX;
    const nextY = Math.random() * maxY + 5;

    positionNoButton(nextX, nextY);
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", moveNoButton);
noBtn.addEventListener("mousedown", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

window.addEventListener("load", () => {
    positionNoAfterAssets();
});

window.addEventListener("resize", () => {
    positionNoAtYesLevel();
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";

    startLoveRain();
});

const startLoveRain = () => {
    const container = loveRain || document.getElementById("love-rain");
    if (!container) return;
    container.style.display = "block";
    container.innerHTML = "";
    const emojis = ["💗", "💖", "💘", "💕", "💞", "❤️"];
    let count = 0;
    const total = 80;

    const interval = setInterval(() => {
        const emoji = document.createElement("span");
        emoji.className = "love-emoji";
        const inner = document.createElement("span");
        inner.className = "love-inner";
        inner.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.appendChild(inner);
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.fontSize = `${20 + Math.random() * 18}px`;
        emoji.style.animationDuration = `${3 + Math.random() * 2.5}s`;

        container.appendChild(emoji);
        setTimeout(() => emoji.remove(), 5000);

        count += 1;
        if (count >= total) {
            clearInterval(interval);
        }
    }, 80);
};
