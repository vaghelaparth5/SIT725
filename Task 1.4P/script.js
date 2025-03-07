/**
 * Random Number Button element
 */
var randomNumberButton = document.getElementById("randomNumber");

/**
 * Button click listener
 */
randomNumberButton.onclick = generateRandomNumber;

/**
 * This function will generate a random number when the generate random number button is clicked.
 */
function generateRandomNumber() {
    var number = Math.floor((Math.random() * 100) + 1);
    var displayRandomNumber = document.getElementById("displayRandomNumber");
    displayRandomNumber.innerText = number;
}
