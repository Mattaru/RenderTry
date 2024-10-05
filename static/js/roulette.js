document.addEventListener('DOMContentLoaded', function() {
    const rouletteForm = document.getElementById('rangeForm');
    const settingsBtn = document.getElementById('settings');
    const getWinnerBtn = document.getElementById('getWinner');
    const winnerNameField = document.getElementById('winnerName');
    const winnerNumberField = document.getElementById('winner');
    let numbersArray = [];
    let activeIndex = 2; 
    
    settingsBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        sidebar.classList.toggle('open');
        content.classList.toggle('with-sidebar');
    });

    rouletteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const maxCount = parseInt(document.getElementById('participants').value);

        numbersArray = Array.from({ length: maxCount }, (_, i) => i + 1);

        updateNumberDisplay(numbersArray.slice(0, 5));
    });

    getWinnerBtn.addEventListener('click', () => {
        if (numbersArray.length > 0) startRoulette();
    });

    const updateNumberDisplay = (displayNumbers) => {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`number${i + 1}`).textContent = displayNumbers[i];
        }
    }

    const clearWinner = () => {
        winnerNameField.textContent = "";
        winnerNumberField.textContent = "";
    };

    const setWinner = (winnerNumber, winnerName) => {
        winnerNameField.textContent = winnerName;
        winnerNumberField.textContent = winnerNumber;
    };

    const startRoulette = () => {
        let acceleration = Number(document.getElementById("acceleration").value);
        let guessedName = document.getElementById("guessedName").value;
        let guessedNumber = Number(document.getElementById("guessedNumber").value);
        let maxIterations = Number(document.getElementById("maxIterations").value);
        let rotationSpeed = Number(document.getElementById("rotationSpeed").value);
        let previousIteration = 0;
        let iteration = 0;
        
        clearWinner();

        const runRoulette = () => {
            console.log(`Iter N${iteration}`);

            const activeField = Number(document.getElementById("number3").textContent); /// +1
            if (activeField === 1) iteration++;

            const shiftedArray = numbersArray.slice(1).concat(numbersArray[0]);
            numbersArray = shiftedArray;
            updateNumberDisplay(numbersArray.slice(0, 5));
    
            if (iteration < maxIterations && previousIteration !== iteration) {
                previousIteration++;
                rotationSpeed += acceleration;
                setTimeout(runRoulette, rotationSpeed); 
            } else if (iteration === maxIterations && activeField === guessedNumber - 1) {
                const winnerNumber = numbersArray[activeIndex];

                setWinner(winnerNumber, guessedName)
            } else {
                setTimeout(runRoulette, rotationSpeed);
            }
        };
    
        runRoulette();
    };
});