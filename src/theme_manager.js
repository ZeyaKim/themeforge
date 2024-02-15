/**
 * @fileoverview 이 파일은 애플리케이션에서 테마를 관리하는 ThemeManager 모듈의 구현을 포함합니다.
 * ThemeManager 모듈은 테마 적용, 저장, 삭제 및 초기화 기능을 제공합니다.
 * 모듈은 또한 예제 테마를 로드하고 UI에 표시하는 역할을 합니다.
 * @module ThemeManager
 */

/**
 * ThemeManager 모듈은 애플리케이션 내의 테마를 관리합니다.
 * @namespace ThemeManager
 */
import Theme from './theme.js';
import ExampleTheme from './example_theme.js';
import SavedTheme from './saved_theme.js';

const ThemeManager = (function() {
  let exampleThemes = [];
  let savedThemes = [];
  const defaultTheme = new Theme();

  /**
   * 마지막으로 선택된 테마를 적용합니다. 세션 스토리지에서 테마 정보를 읽어와 적용하며,
   * 정보가 없는 경우 기본 테마로 리셋합니다.
   */
  const applyLastSelectedTheme = function() {
    const lastSelectedTheme = sessionStorage.getItem('lastSelectedTheme');
    if (lastSelectedTheme === undefined) {
      this.resetTheme();
    } else {
      const lastSelectedThemeData = JSON.parse(lastSelectedTheme);
      this.applyTheme(new Theme(
        lastSelectedThemeData.themeId,
        lastSelectedThemeData.keyword,
        lastSelectedThemeData.colors
      ));
    }
  }

  /**
   * 저장된 테마들을 로드합니다. 세션 스토리지에서 저장된 테마 목록을 읽어와
   * 애플리케이션에 로드합니다.
   */
  const loadSavedThemes = function() {
    const storedSavedThemes = sessionStorage.getItem('savedThemes');
    if (storedSavedThemes === undefined) {
      return;
    }
    const parsedSavedThemesData = JSON.parse(storedSavedThemes);
    parsedSavedThemesData.forEach(savedThemeData => {
      const savedTheme = new SavedTheme(
        savedThemeData.themeId,
        savedThemeData.keyword,
        savedThemeData.colors
      );
      savedThemes.push(savedTheme);
    });

    
    const savedThemesListElement = document.getElementById("savedThemesList");
    insertThemesInList(savedThemes, savedThemesListElement);
    setEventListenersForSavedThemes(savedThemes);
    setStyleForThemeItems(savedThemes);
    clearExampleThemesList();
  };

  /**
   * 주어진 키워드와 색상 데이터를 기반으로 예제 테마들을 생성합니다.
   * 이미 저장된 키워드에 대해서는 새로운 예제 테마를 생성하지 않습니다.
   * @param {string} keyword 테마 키워드
   * @param {Array} jsonColorData 색상 데이터 배열
   */
  const createExampleThemes = function(keyword, jsonColorData) {
    if (isAlreadySaved(keyword)) {
      return;
    }

    clearExampleThemesList();

    jsonColorData.forEach(colorData => {
      const newExampleTheme = new ExampleTheme(undefined, keyword, colorData);
      exampleThemes.push(newExampleTheme);
    });

    const exampleThemesListElement = document.getElementById("exampleThemesList");
    insertThemesInList(exampleThemes, exampleThemesListElement);
    setEventListenersForExampleThemes(exampleThemes);
    setStyleForThemeItems(exampleThemes);
  };

  /**
   * 주어진 키워드가 이미 저장된 테마인지 확인합니다.
   * @param {string} keyword 확인할 키워드
   * @returns {boolean} 이미 저장되었으면 true, 그렇지 않으면 false
   */
  const isAlreadySaved = function(keyword) {
    return savedThemes.some(theme => theme.keyword === keyword);
  };


  /**
   * 예제 테마 목록을 클리어합니다.
   */  
  const clearExampleThemesList = function() {
    exampleThemes = [];
    const exampleThemesListElement = document.getElementById("exampleThemesList");
    exampleThemesListElement.innerHTML = "";
  };

  /**
   * 주어진 테마 목록을 UI 리스트 요소에 삽입합니다.
   * @param {Array} themes 테마 객체 배열
   * @param {HTMLElement} listElement 테마를 삽입할 리스트 DOM 요소
   */
  const insertThemesInList = function(themes, listElement) {
    themes.forEach(theme => {
      const listItemHtml = theme.html;
      listElement.insertAdjacentHTML('beforeend', listItemHtml);
    });
  };

  /**
   * 예제 테마들에 대한 이벤트 리스너를 설정합니다. 각 테마 항목에 저장 및 적용 버튼에 대한 클릭 이벤트를 추가합니다.
   * @param {Array<Theme>} themes 예제 테마 객체 배열
   */
  const setEventListenersForExampleThemes = function(themes) {
    themes.forEach(theme => {
      const saveButton = document.getElementById(theme.themeId).querySelector(".save-theme-btn");
      saveButton.addEventListener("click", () => {
        saveExampleTheme(theme.themeId);
      });

      const applyButton = document.getElementById(theme.themeId).querySelector(".apply-theme-btn");
      applyButton.addEventListener("click", () => {
        applyTheme(theme);
      });
    });
  };

  /**
   * 주어진 테마 항목들에 스타일을 설정합니다. 각 테마에 정의된 색상 값을 이용하여 CSS 변수를 업데이트합니다.
   * @param {Array<Theme>} themes 스타일을 적용할 테마 객체 배열
   */
  const setStyleForThemeItems = function(themes) {
    themes.forEach(theme => {
      const themeItemElement = document.getElementById(theme.themeId);
      themeItemElement.style.setProperty("--primary-color", theme.primaryColor);
      themeItemElement.style.setProperty("--action-color", theme.actionColor);
      themeItemElement.style.setProperty("--background-color", theme.backgroundColor);
      themeItemElement.style.setProperty("--font-color", theme.fontColor);
    });
  };

  /**
   * 선택된 예제 테마를 저장합니다. 예제 테마를 새로운 저장된 테마로 변환하고 세션 스토리지에 저장합니다.
   * @param {string} exampleThemeId 저장할 예제 테마의 ID
   */
  const saveExampleTheme = function(exampleThemeId) {
    const exampleTheme = exampleThemes.find(theme => theme.themeId === exampleThemeId);
    const exampleThemeJson = exampleTheme.toJson();
    const newSavedTheme = new SavedTheme(undefined, exampleThemeJson.keyword, exampleThemeJson.colors);

    savedThemes.push(newSavedTheme);

    sessionStorage.setItem('savedThemes', JSON.stringify(savedThemes.map(theme => theme.toJson())));

    const savedThemesListElement = document.getElementById("savedThemesList");
    insertThemesInList([newSavedTheme], savedThemesListElement);
    setEventListenersForSavedThemes([newSavedTheme]);
    setStyleForThemeItems([newSavedTheme]);
    clearExampleThemesList();
  };

  /**
   * 저장된 테마들에 이벤트 리스너를 설정합니다. 각 저장된 테마 항목에 적용 및 삭제 버튼에 대한 클릭 이벤트를 추가합니다.
   * @param {Array<Theme>} themes 저장된 테마 객체 배열
   */
  const setEventListenersForSavedThemes = function(themes) {
    themes.forEach(theme => {
      const savedThemeElement = document.getElementById(theme.themeId);

      const applyButton = savedThemeElement.querySelector(".apply-theme-btn");
      applyButton.addEventListener("click", () => {
        applyTheme(theme);
      });

      const deleteButton = savedThemeElement.querySelector(".delete-theme-btn");
      deleteButton.addEventListener("click", () => {
        deleteSavedTheme(theme);
      });
    });
  };

  /**
   * 지정된 테마를 적용합니다. 테마의 색상 값을 문서의 CSS 변수로 설정하고, 현재 선택된 테마로 세션 스토리지에 저장합니다.
   * @param {Theme} theme 적용할 테마 객체 (기본값은 defaultTheme)
   */
  const applyTheme = function(theme = defaultTheme) {
    sessionStorage.setItem('lastSelectedTheme', JSON.stringify(theme.toJson()));

    document.body.style.setProperty("--primary-color", theme.primaryColor);
    document.body.style.setProperty("--action-color", theme.actionColor);
    document.body.style.setProperty("--background-color", theme.backgroundColor);
    document.body.style.setProperty("--font-color", theme.fontColor);
  };

  /**
   * 지정된 저장된 테마를 삭제합니다. UI에서 테마를 제거하고, 내부 목록 및 세션 스토리지에서 테마를 삭제한 후 기본 테마로 리셋합니다.
   * @param {Theme} theme 삭제할 저장된 테마 객체
   */
  const deleteSavedTheme = function(theme) {
    const savedThemesListElement = document.getElementById("savedThemesList");
    savedThemesListElement.removeChild(document.getElementById(theme.themeId));
    savedThemes = savedThemes.filter(savedTheme => savedTheme.themeId !== theme.themeId);
    resetTheme();

    sessionStorage.setItem('savedThemes', JSON.stringify(savedThemes.map(theme => theme.toJson())));
  };

  /**
   * 기본 테마로 리셋합니다. 세션 스토리지에 저장된 마지막 선택된 테마를 기본 테마로 대체하고, 문서의 스타일을 기본 테마의 색상 값으로 업데이트합니다.
   */
  const resetTheme = function() {
    applyTheme(defaultTheme);
  };

  return {
    applyLastSelectedTheme,
    loadSavedThemes,
    createExampleThemes,
    clearExampleThemesList,
    saveExampleTheme,
    deleteSavedTheme,
    resetTheme
  }
})();

export default ThemeManager;