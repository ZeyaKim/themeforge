import GPT from "./src/gpt.js";

document.getElementById("changeColorBtn").addEventListener("click", function() {
    const gpt = new GPT();
    document.getElementById("heading").style.color = gpt.change_css_pallette();
});

document.getElementById("keywordSubmitBtn").addEventListener("submit", function() {
    const keyword = document.getElementById("keywordInput").value;
});