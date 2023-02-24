
document.addEventListener("DOMContentLoaded", function (event) {
    createSquares();
    dict_word = "";
    hint = "";
    globdict = {};
    const fetchword = async () => {
        const res = await fetch("https://api.masoudkf.com/v1/wordle", {
            headers: {
                "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
            },
        });
        let json = await res.json();
        let { dictionary } = json;
        globdict = dictionary;
        getword();

    }
    fetchword();


    function createSquares() {
        const layout = document.getElementById("board");
        for (j = 1; j < 5; j++) {
            let row = document.createElement("div");
            row.classList.add("row")
            row.setAttribute("id", j + 1);
            layout.appendChild(row);
            for (let i = 0; i < 4; i++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.setAttribute("id", (j * 10) + i + 1);
                row.appendChild(tile);
            }
        }
    }

    function winscreen() {
        const layout = document.getElementById("board");
        const win = document.getElementById("win");
        layout.classList.toggle("hidden");
        win.classList.toggle("hidden");
    }


    function checkword(currentword, k) {
        for (i = 0; i < 4; i++) {

            const tile = document.getElementById(((k) * 10) + i + 1);
            if (currentword[i] == dict_word[i]) {
                tile.style.backgroundColor = "green";
            }
            else if (dict_word.includes(currentword[i]) == true) {
                tile.style.backgroundColor = "yellow";

            }
            else {
                tile.style.backgroundColor = "gray";
            }
        }
        if (currentword == dict_word) {
            winscreen();
        }
    }





    let k = 1;
    let l = 1;
    let currentword = "";

    document.onkeyup = function (event) {
        {
            let input = event.key;
            if (input == "Enter" && l ==5) {
                checkword(currentword, k);
                l = 1;
                k++;
                currentword = "";
            }

            else if (input == "Enter" && l !=5) {
                window.alert("Please enter 4 letters before submiting");
            }

            let indexer = (k * 10) + l;
            if (input != "Enter" && (input.length == 1) && (currentword.length < 4)) {
                let result = currentword.concat(input);
                currentword = result.toUpperCase();
                const newkey = document.getElementById(indexer);
                newkey.style.borderColor = "black";
                newkey.innerText = input.toUpperCase();
                l++;
            }

            if (input == "Backspace") {

                delindex = indexer - 1;
                const deletekey = document.getElementById(delindex);
                deletekey.innerText = "";
                l--;
                currentword = currentword.substring(0,currentword.length-1);
            }

        }
    };


    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
        l = 1;
        k = 1;
        currentword = "";
        const board = document.getElementById("board");
        const board_container = document.getElementById("board-container");
        board.remove();
        let board1 = document.createElement("div");
        board1.setAttribute("id", "board");
        board_container.appendChild(board1);
        const layout = document.getElementById("board");
        const win = document.getElementById("win");
        win.classList.add("hidden");
        createSquares();
        getword();


    });

    const hintcon = document.getElementById("hintcon");
    hintcon.addEventListener("click", () => 
    {
        const hintel = document.getElementById("hint")
        hintel.classList.toggle("hidden");
    })


    const darkmode = document.getElementById("darkmode");
    darkmode.addEventListener("click", () => 
    {
        const entirepage = document.getElementById("entirepage");
        entirepage.classList.toggle("darkmode");
    })

    const info = document.getElementById("info");
    info.addEventListener("click", () => 
    {
        const infop = document.getElementById("infop");
        infop.classList.toggle("hidden");
    })



    function getword() {
        let randint = Number.parseInt(Math.random() * 20);
        let word = (globdict[randint]["word"]).toUpperCase();
        dict_word = word;
        let hint = (globdict[randint]["hint"]);

        const hintp = document.getElementById("hintp")
        hintp.innerText = "Hint: " + hint;

    }


});