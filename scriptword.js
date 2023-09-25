       
    document.addEventListener("DOMContentLoaded", () => {
        const wordInput = document.getElementById("wordInput");
        const hintInput = document.getElementById("hintInput");
        const dailyNumberInput = document.getElementById("dailyNumberInput");
        const submitBtn = document.getElementById("submitBtn");
        const wordDisplay = document.getElementById("wordDisplay");
        const hintDisplay = document.getElementById("hintDisplay");
        const dailyNumberDisplay = document.getElementById("dailyNumberDisplay");
    
        submitBtn.addEventListener("click", () => {
            const word = wordInput.value;
            const hint = hintInput.value;
            const dailyNumber = dailyNumberInput.value;
    
            // Create an object to send to the server
            const data = { word, hint, dailyNumber };
    
            // Make a POST request to the server to save data
            fetch("/save-wordle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((result) => {
                console.log(result.message);
                
                // Display the saved values to the user
                wordDisplay.textContent = `Word: ${word}`;
                hintDisplay.textContent = `Hint: ${hint}`;
                dailyNumberDisplay.textContent = `Daily Number: ${dailyNumber}`;
    
                // Show the result section
                document.querySelector(".result-section").style.display = "block";
            })
            .catch((error) => {
                console.error("Error saving Wordle data:", error);
            });
        });
    
        // Fetch and display the latest Wordle data when the page loads
        fetch("/get-wordle")
            .then((response) => response.json())
            .then((wordleData) => {
                if (wordleData) {
                    wordDisplay.textContent = `Word: ${wordleData.word}`;
                    hintDisplay.textContent = `Hint: ${wordleData.hint}`;
                    dailyNumberDisplay.textContent = `Daily Number: ${wordleData.dailyNumber}`;
                    document.querySelector(".result-section").style.display = "block";
                }
            })
            .catch((error) => {
                console.error("Error fetching Wordle data:", error);
            });
    });