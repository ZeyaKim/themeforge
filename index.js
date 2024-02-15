import ChatGPTClient from "./src/chatgpt_client.js";
import ThemeManager from "./src/theme_manager.js";

document.getElementById("keywordSubmitBtn").addEventListener("click", async function(event) {
  event.preventDefault();

  const keywordElement = document.getElementById("keywordInput");
  const keyword = keywordElement.value;
  const count = document.getElementById("countInput").value;

  keywordElement.value = "";

  if (keyword === "") {
    console.log("keyword is empty");
    return;
  }

  const content = await ChatGPTClient.apiPost(keyword, count);
  const jsonThemeData = JSON.parse(content);
  ThemeManager.createExampleThemes(keyword, jsonThemeData);
});

function setEventListenersForExampleThemes(themes) {
  document.addEventListener('DOMContentLoaded', function() {
    const exampleThemeApplyButtons = document.querySelectorAll(".example-theme .save-theme-btn");
    exampleThemeApplyButtons.forEach((button, index) => {
      button.addEventListener("click", function() {
        saveExampleTheme(index);
      });
    });
  });
}

function saveExampleTheme(theme) {
  const savedTheme = ThemeManager.saveExampleTheme(theme);
}