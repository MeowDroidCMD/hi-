const questions = [
    {
        question: "What's the best way to make me smile? 😁",
        answers: ["Give me food 🍕", "Surprise me with a hug 🤗", "Send me 100 memes 🤣", "Do a silly dance 🕺💃"],
        colors: ["#FF5733", "#FFD700", "#6A5ACD", "#FF69B4"]
    },
    {
        question: "If I were a dessert, what would I be? 🍰",
        answers: ["Chocolate Lava Cake 🍫", "Fluffy Cotton Candy ☁️", "A Sweet Donut 🍩", "A Whole Buffet 🤪"],
        colors: ["#8B4513", "#FFB6C1", "#FFD700", "#ADFF2F"]
    },
    {
        question: "If we were in an anime, what would our theme song be? 🎶",
        answers: ["Romantic Opening ✨", "Chaotic Battle Song ⚔️", "Cute Slice-of-Life Tune 🍡", "Weird Sound Effects 🎤"],
        colors: ["#FF69B4", "#DC143C", "#ADD8E6", "#FFFF00"]
    },
    {
        question: "What's my reaction when you steal my food? 🍟",
        answers: ["Silent stare of doom 😐", "Fine, but I'll remember this 😈", "Okay, but you owe me 5 more fries 🍟", "Cry dramatically 😭"],
        colors: ["#000000", "#8B0000", "#FFA500", "#00FFFF"]
    },
    {
        question: "If you knew me well enough how would I love you? 🦸",
        answers: ["Idk", "revive you", "be your guardian", "Worship you"],
        colors: ["#808080", "#FFD700", "#FF1493", "#8A2BE2"]
    }
];

let currentQuestion = 0;
let colorChoices = [];
let userAnswers = [];

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    if (currentQuestion < questions.length) {
        const questionData = questions[currentQuestion];

        const questionElement = document.createElement("h2");
        questionElement.className = "question";
        questionElement.textContent = questionData.question;
        quizContainer.appendChild(questionElement);

        questionData.answers.forEach((answer, index) => {
            const answerButton = document.createElement("button");
            answerButton.className = "answer";
            answerButton.textContent = answer;
            answerButton.onclick = () => selectAnswer(index);
            quizContainer.appendChild(answerButton);
        });

    } else {
        displayFinalResult();
    }
}

function selectAnswer(index) {
    const selectedColor = questions[currentQuestion].colors[index];
    colorChoices.push(selectedColor);
    userAnswers.push(questions[currentQuestion].answers[index]);

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        displayFinalResult();
    }
}

function displayFinalResult() {
    document.getElementById("quiz").innerHTML = "";
    document.getElementById("result-message").textContent = "Your final color is... 🎨";

    const finalColor = calculateFinalColor();
    document.body.style.backgroundColor = finalColor;

    // Create a color preview box
    const colorBox = document.createElement("div");
    colorBox.style.width = "100px";
    colorBox.style.height = "100px";
    colorBox.style.margin = "20px auto";
    colorBox.style.borderRadius = "50%";
    colorBox.style.backgroundColor = finalColor;
    document.getElementById("quiz-container").appendChild(colorBox);

    // Get and display the closest color name
    const colorName = getClosestColorName(finalColor);
    const colorText = document.createElement("p");
    colorText.style.fontSize = "1.2rem";
    colorText.style.fontWeight = "bold";
    colorText.style.color = "#333";
    colorText.textContent = `Color Name: ${colorName}`;
    document.getElementById("quiz-container").appendChild(colorText);

    localStorage.setItem("finalColor", finalColor);
    localStorage.setItem("colorName", colorName);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    document.getElementById("admin-btn").style.display = "block";
}

function calculateFinalColor() {
    let totalRed = 0, totalGreen = 0, totalBlue = 0;

    colorChoices.forEach(color => {
        const rgb = hexToRgb(color);
        totalRed += rgb.r;
        totalGreen += rgb.g;
        totalBlue += rgb.b;
    });

    const avgRed = Math.round(totalRed / colorChoices.length);
    const avgGreen = Math.round(totalGreen / colorChoices.length);
    const avgBlue = Math.round(totalBlue / colorChoices.length);

    return `rgb(${avgRed}, ${avgGreen}, ${avgBlue})`;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Expanded color list for better accuracy
function getClosestColorName(rgbColor) {
    const colorNames = {
        "Red": [255, 0, 0],
        "Dark Red": [139, 0, 0],
        "Orange": [255, 165, 0],
        "Dark Orange": [255, 140, 0],
        "Yellow": [255, 255, 0],
        "Gold": [255, 215, 0],
        "Green": [0, 255, 0],
        "Dark Green": [0, 100, 0],
        "Lime Green": [50, 205, 50],
        "Teal": [0, 128, 128],
        "Cyan": [0, 255, 255],
        "Sky Blue": [135, 206, 235],
        "Royal Blue": [65, 105, 225],
        "Blue": [0, 0, 255],
        "Navy Blue": [0, 0, 128],
        "Purple": [128, 0, 128],
        "Magenta": [255, 0, 255],
        "Pink": [255, 192, 203],
        "Hot Pink": [255, 105, 180],
        "Brown": [165, 42, 42],
        "Beige": [245, 245, 220],
        "Black": [0, 0, 0],
        "Gray": [128, 128, 128],
        "Dark Gray": [169, 169, 169],
        "White": [255, 255, 255]
    };

    const rgb = rgbColor.match(/\d+/g).map(Number);
    let closestColor = "Unknown";
    let minDistance = Number.MAX_VALUE;

    for (const [name, [r, g, b]] of Object.entries(colorNames)) {
        const distance = Math.sqrt((rgb[0] - r) ** 2 + (rgb[1] - g) ** 2 + (rgb[2] - b) ** 2);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = name;
        }
    }

    return closestColor;
}

function goToAdminPage() {
    window.location.href = "Admin_Page.html";
}

window.onload = loadQuestion;
