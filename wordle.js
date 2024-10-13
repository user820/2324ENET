var height = 6; // number of guesses
var width = 5; // number of letters

var row = 0; // current guess (attempt)
var col = 0; // current letter for that attempt


const halloweenWordlist = [
    "BATTY",
    "BONES",
    "BRAIN",
    "CANDY",
    "CLOWN",
    "CURSE",
    "DEATH",
    "DEMON",
    "DEVIL",
    "FANGS",
    "GHOST",
    "GHOUL",
    "GRAVE",
    "HAUNT",
    "HEADS",
    "HEART",
    "KNIFE",
    "MAGIC",
    "MUMMY",
    "NIGHT",
    "NURSE",
    "PASTE",
    "RAVEN",
    "RULER",
    "SCARE",
    "SKULL",
    "SNAKE",
    "SPELL",
    "SPINE",
    "STAKE",
    "STONE",
    "TOMBS",
    "TOXIC",
    "VENOM",
    "WITCH",
    "WOUND",
    "BLOOD",
    "BROOM",
    "COVEN",
    "CREEP",
    "CRYPT",
    "DANCE",
    "DARKY",
    "DREAD",
    "FEARS",
    "FIEND",
    "GNOME"
];
const halloweenDefList = [
    "A flying mammal, often associated with vampires and darkness.", // BATTY
    "The skeletal remains of a dead body.", // BONES
    "The organ of the body that controls thought, emotion, and behavior.", // BRAIN
    "A sweet food, often given out to children on Halloween.", // CANDY
    "A person who wears a costume and makeup to entertain or scare others.", // CLOWN
    "A magical spell or incantation, often used to harm or control others.", // CURSE
    "The end of life, often associated with the supernatural and the afterlife.", // DEATH
    "A malevolent spirit or supernatural being, often depicted as evil or unclean.", // DEMON
    "The ruler of hell, often depicted as a horned, pitchfork-wielding figure.", // DEVIL
    "Sharp, pointed teeth, often associated with vampires and other supernatural creatures.", // FANGS
    "A spirit or specter, often believed to haunt a particular place or location.", // GHOST
    "A creature from folklore, often depicted as a monster or evil being.", // GHOUL
    "A place where dead bodies are buried, often associated with the supernatural and the afterlife.", // GRAVE
    "To visit or inhabit a place, often in a supernatural or ghostly manner.", // HAUNT
    "The upper part of the human body, often associated with the brain and the senses.", // HEADS
    "A vital organ that pumps blood through the body, often associated with love and emotion.", // HEART
    "A sharp, pointed object used for cutting or stabbing, often associated with violence and harm.", // KNIFE
    "A mysterious or supernatural power, often used for good or evil.", // MAGIC
    "A creature from ancient Egyptian folklore, often depicted as a wrapped, bandaged figure.", // MUMMY
    "The time of day when the sun is below the horizon, often associated with darkness and the supernatural.", // NIGHT
    "A person who cares for the sick or injured, often in a hospital or medical setting.", // NURSE
    "A sticky, adhesive substance, often used to attach or bond objects together.", // PASTE
    "A large, black bird, often associated with death and the supernatural.", // RAVEN
    "A person who has power or authority over others, often in a government or leadership role.", // RULER
    "To frighten or intimidate someone, often in a playful or joking manner.", // SCARE
    "The bony structure of the head, often associated with death and the supernatural.", // SKULL
    "A long, slender, legless reptile, often associated with danger and venom.", // SNAKE
    "A magical or supernatural formula, often used to achieve a specific goal or outcome.", // SPELL
    "The series of bones that extend from the base of the skull to the tailbone, often associated with the nervous system.", // SPINE
    "A sharp, pointed object used for piercing or stabbing, often associated with vampires and other supernatural creatures.", // STAKE
    "A hard, rocky substance, often used for building or construction.", // STONE
    "A place where dead bodies are buried, often associated with the supernatural and the afterlife.", // TOMBS
    "A poisonous or deadly substance, often used to harm or kill others.", // TOXIC
    "A poisonous or deadly substance, often used to harm or kill others.", // VENOM
    "A person, often a woman, who practices magic or witchcraft, often in a supernatural or occult manner.", // WITCH
    "An injury or hurt, often physical or emotional.", // WOUND
    "A vital fluid that circulates through the body, often associated with life and vitality.", // BLOOD
    "A household object used for sweeping or cleaning, often associated with witches and magic.", // BROOM
    "A group of witches or people who practice magic or witchcraft, often in a supernatural or occult manner.", // COVEN
    "To move slowly and quietly, often in a sneaky or stealthy manner.", // CREEP
    "A place where dead bodies are buried, often associated with the supernatural and the afterlife.", // CRYPT
    "To move one's body in a rhythmic or expressive manner, often to music or in celebration.", // DANCE
    "Having a dark or gloomy quality, often associated with the supernatural or the unknown.", // DARKY
    "A feeling of fear or anxiety, often in anticipation of something bad or unpleasant.", // DREAD
    "A strong feeling of fear or anxiety, often in anticipation of something bad or unpleasant.", // FEARS
    "A wicked or evil spirit, often depicted as a monster or supernatural being.", // FIEND
    "A small, mischievous supernatural being, often depicted as a short, ugly creature.", // GNOME
];

var gameOver = false;
let randomIndex = Math.floor(Math.random() * halloweenWordlist.length);
let word = halloweenWordlist[randomIndex];
//!Random word chosen already from here

console.log(word);
console.log(randomIndex+1)



window.onload = function() {
    initialize();
}

function initialize() {
    // Create the game board
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1; //start new row
            col = 0; //start at 0 for new row
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}







function initialize() {
    // ... existing code ...
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
    // Add event listeners for virtual keyboard
    document.querySelectorAll('.keyboard-button').forEach(button => {
        button.addEventListener('click', function() {
            if (gameOver) return;

            let letter = this.textContent;

            if (letter === '⌫') {
                deleteLetter();
            } else if (letter === 'Enter') {
                checkGuess();
            } else if (/^[A-Z]$/.test(letter)) {
                addLetter(letter);
            }
        });
    });
}

function addLetter(letter) {
    if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
            currTile.innerText = letter;
            col += 1;
        }
    }
}

function deleteLetter() {
    if (0 < col && col <= width) {
        col -= 1;
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }
}

function checkGuess() {
    if (col === width) {
        update();
        row += 1;
        col = 0;
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

let attempts = 0;

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    attempts++;

    if (attempts >= 3 && !gameOver) {
        let hintIndex = halloweenWordlist.indexOf(word);
        let hint = halloweenDefList[hintIndex];
        document.getElementById("hint").innerText = "Hint: " + hint;
    }
}