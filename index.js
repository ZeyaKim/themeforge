import ChatGPTClient from "./src/chatgpt_client.js";
import ThemeManager from "./src/theme_manager.js";

document.getElementById("changeColorBtn").addEventListener("click", function() {
  const themeManager = new ThemeManager();
  document.getElementById("heading").style.color = themeManager.changeCSSPalette();
});

document.getElementById("keywordSubmitBtn").addEventListener("click", async function(event) {
  console.log("submit");
  event.preventDefault();
  const keyword = document.getElementById("keywordInput").value;
  const gptClient = new ChatGPTClient();
  const themeManager = new ThemeManager();
  const themedataJson = await gptClient.apiPost(keyword);

  themeManager.changeTheme(themedataJson);
  document.getElementById("response").innerText = themedataJson;
});