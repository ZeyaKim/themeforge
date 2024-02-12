import ChatGPTClient from "./src/gpt_client.js";

document.getElementById("changeColorBtn").addEventListener("click", function() {
    const gptClient = new ChatGPTClient();
    document.getElementById("heading").style.color = gptClient.change_css_pallette();
});

document.getElementById("keywordSubmitBtn").addEventListener("submit", function() {
    const keyword = document.getElementById("keywordInput").value;
});