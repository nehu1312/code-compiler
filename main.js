document.addEventListener("DOMContentLoaded", () => {
    const compileButton = document.getElementById("compile-button");
    const codeInput = document.getElementById("code-input");
    const languageSelect = document.getElementById("language-select");
    const outputDisplay = document.getElementById("output-display");

    compileButton.addEventListener("click", async () => {
        const code = codeInput.value.trim();
        const language = languageSelect.value;

        if (!code) {
            alert("Please enter some code to compile.");
            return;
        }

        try {
            // Step 1: Send code to the API for compilation
            const response = await fetch("https://api.codequotient.com/api/v1/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                    language: language,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send code for compilation");
            }

            const { codeId } = await response.json();

            // Step 2: Fetch the result using the codeId
            setTimeout(async () => {
                const resultResponse = await fetch(`https://api.codequotient.com/api/v1/fetch-result/${codeId}`);
                if (!resultResponse.ok) {
                    throw new Error("Failed to fetch compilation result");
                }

                const result = await resultResponse.json();
                outputDisplay.textContent = result.output;
            }, 3000); // Small delay to ensure compilation completes

        } catch (error) {
            outputDisplay.textContent = `Error: ${error.message}`;
        }
    });
});
