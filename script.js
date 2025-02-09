const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pipoo please...",
    "Just think about it!",
    "Think again",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    // Update "No" button text
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Increase "Yes" button size smoothly
    yesButton.style.transition = "font-size 0.3s ease-in-out";
    yesButton.style.fontSize = `${parseFloat(getComputedStyle(yesButton).fontSize) * 1.5}px`;
    
    // Prevent text from getting too small inside the button
    yesButton.style.whiteSpace = "nowrap";
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
