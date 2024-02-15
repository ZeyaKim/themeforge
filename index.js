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

  await submitInput(keyword, count);
});

async function submitInput(keyword, count) {
  const content = await ChatGPTClient.apiPost(keyword, count);
  const jsonThemeData = JSON.parse(content);
  const exampleThemes = ThemeManager.createExampleThemes(keyword, jsonThemeData);
  const exampleThemesListElement = document.getElementById("exampleThemesList");

  clearExampleThemesList(exampleThemesListElement);
  insertThemesInList(exampleThemes, exampleThemesListElement);
}

function clearExampleThemesList(listElement) {
  listElement.innerHTML = "";
  ThemeManager.clearExampleThemes();
}

function insertThemesInList(themes, listElement) {
  for (const theme of themes) {
    const listItemHtml = theme.html;
    listElement.insertAdjacentHTML('beforeend', listItemHtml);
  }
}
