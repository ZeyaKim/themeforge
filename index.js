import ChatGPTClient from "./src/chatgpt_client.js";
import ThemeManager from "./src/theme_manager.js";

/**
 * DOM이 완전히 로드된 후 초기 테마를 적용하고 저장된 테마를 로드합니다.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  ThemeManager.applyLastSelectedTheme();
  ThemeManager.loadSavedThemes();
});

/**
 * 키워드 제출 버튼 클릭 이벤트를 처리합니다. 사용자가 입력한 키워드와 개수에 따라 테마를 생성합니다.
 */
document.getElementById("keywordSubmitBtn").addEventListener("click", async function(event) {
  event.preventDefault();

  const keyword = document.getElementById("keywordInput").value;
  const count = document.getElementById("countInput").value;

  // 입력 필드 초기화
  document.getElementById("keywordInput").value = "";

  // 키워드 유효성 검사
  if (keyword === "") {
    console.log("keyword is empty");
    return;
  }

  // ChatGPTClient를 통해 테마 데이터 요청
  try {
    const content = await ChatGPTClient.apiPost(keyword, count);
    const jsonThemeData = JSON.parse(content);
    ThemeManager.createExampleThemes(keyword, jsonThemeData);
  } catch (error) {
    console.error("Failed to fetch theme data:", error);
  }
});

/**
 * 테마 리셋 버튼 클릭 이벤트를 처리합니다. 기본 테마로 리셋합니다.
 */
document.getElementById("resetBtn").addEventListener("click", function() {
  ThemeManager.resetTheme();
}); 
