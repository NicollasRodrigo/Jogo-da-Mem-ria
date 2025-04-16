// Class to manage board actions
class BoardManager {
    // Attributes

    // Dependencies
    cardManager; // Object to manipulate cards inside the board

    // DOM elements
    node; // The DOM element referring to the board

    // Number
    numImgs; // Number of different images in the library
    curNumCards; // Current number of cards in the board

    // Constructor
    constructor(id, numImgs, cardManager) {
        // Get the board node using the received id
        this.node = document.getElementById(id);

        // Set the other attributes
        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    // Clear the board removing all cards
    clear() {
        this.node.innerHTML = "";
    }

    // Add the received number of cards to the board
    fill(numberCards) {
        // Test if there aren't enough images
        if (numberCards > 2 * this.numImgs) {
            // Show error message
            console.error(`Error: Not enough images for ${numberCards} cards.`);
            // Adjust the number of cards and continue the game
            numberCards = 2 * this.numImgs;
        }
        // numberCards should be an integer
        numberCards = parseInt(numberCards);
        // Setting curNumCards
        this.curNumCards = numberCards;

        this.clear(); // Reset the board

        this.genRandomList(numberCards).forEach((number) => {
            // Place one card in the board based on the card number
            this.addCard(this.cardManager.gen(number));
        });

        this.adjustCss();
    }

    // Adjust the CSS to fit all cards in the board
    adjustCss() {
        // Calculating the number of columns
        let cols = Math.sqrt(this.curNumCards);
        // Calculating the card size
        let size = (100 / cols - 1);
        // Turning the size into a CSS string
        size += 'vmin';

        // Setting the CSS properties
        document.documentElement.style.setProperty("--numCols", cols);
        document.documentElement.style.setProperty("--size", size);
    }

    // Add one card to the board
    addCard(card) {
        this.node.appendChild(card); // Append card to the board
    }

    // Generate random list
    genRandomList(size) {
        // Create a list with the numbers 1 to size
        let list = Array(size / 2).fill().map((_, i) => i + 1);
        // Double that list and shuffle it
        list = [...list, ...list].sort(() => Math.random() - 0.5);
        return list;
    }

    // Check if all cards are found
    check() {
        // Get all found cards
        let flipped = document.getElementsByClassName('matched');
        return flipped.length >= this.curNumCards;
    }
}
