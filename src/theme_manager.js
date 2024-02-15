import Theme from './theme.js';
import ExampleTheme from './example_theme.js';
import SavedTheme from './saved_theme.js';

const ThemeManager = (function() {
  let exampleThemes = [];
  let savedThemes = [];
  const defaultTheme = new Theme();
  return {
    applyLastSelectedTheme: function() {
      const lastSelectedTheme = sessionStorage.getItem('lastSelectedTheme');
      if (lastSelectedTheme === undefined) {
        ThemeManager.resetTheme();
      } else {
        const lastSelectedThemeData = JSON.parse(lastSelectedTheme);
        ThemeManager.applyTheme(new Theme(
          lastSelectedThemeData.themeId,
          lastSelectedThemeData.keyword,
          lastSelectedThemeData.colors
        ));
      }
    },

    loadSavedThemes: function() {

      const storedSavedThemes = sessionStorage.getItem('savedThemes');
      if (storedSavedThemes === undefined) {
        return;
      }
      const parsedSavedThemesData = JSON.parse(storedSavedThemes);
      for (const savedThemeData of parsedSavedThemesData) {
        const savedTheme = new SavedTheme(
          savedThemeData.themeId,
          savedThemeData.keyword,
          savedThemeData.colors
        );
        savedThemes.push(savedTheme);
      }

      const savedThemesListElement = document.getElementById("savedThemesList");
      this.insertThemesInList(savedThemes, savedThemesListElement);
      this.setEventListenersForSavedThemes(savedThemes);
      this.setStyleForThemeItems(savedThemes);
      this.clearExampleThemesList();
    },

    createExampleThemes: function(keyword, jsonColorData) {
      if (this.is_already_saved(keyword)) {
        return;
      }

      this.clearExampleThemesList();

      for (const colorData of jsonColorData) {
        const newExampleTheme = new ExampleTheme(undefined, keyword, colorData);
        exampleThemes.push(newExampleTheme);
      }
      
      const exampleThemesListElement = document.getElementById("exampleThemesList");
      this.insertThemesInList(exampleThemes, exampleThemesListElement);
      this.setEventListenersForExampleThemes(exampleThemes);
      this.setStyleForThemeItems(exampleThemes);
    },

    is_already_saved: function(keyword) {
      for (const theme of savedThemes) {
        if (theme.keyword === keyword) {
          return true;
        }
      }
      return false;
    },

    clearExampleThemesList: function() {
      exampleThemes = [];
      const exampleThemesListElement = document.getElementById("exampleThemesList");
      exampleThemesListElement.innerHTML = "";
    },

    insertThemesInList(themes, listElement) {
      for (const theme of themes) {
        const listItemHtml = theme.html;
        listElement.insertAdjacentHTML('beforeend', listItemHtml);
      }
    },

    setEventListenersForExampleThemes: function(themes) {
      themes.forEach(theme => {
        const saveButton = document.getElementById(theme.themeId).querySelector(".save-theme-btn");
        saveButton.addEventListener("click", () => {
          this.saveExampleTheme(theme.themeId);
        });

        const applyButton = document.getElementById(theme.themeId).querySelector(".apply-theme-btn");
        applyButton.addEventListener("click", () => {
          this.applyTheme(theme);
        });
      });
    },

    setStyleForThemeItems: function(themes) {
      themes.forEach(theme => {
        const themeItemElement = document.getElementById(theme.themeId);
        themeItemElement.style.setProperty("--primary-color", theme.primaryColor);
        themeItemElement.style.setProperty("--action-color", theme.actionColor);
        themeItemElement.style.setProperty("--background-color", theme.backgroundColor);
        themeItemElement.style.setProperty("--font-color", theme.fontColor);
      });
    },

    saveExampleTheme: function(exampleThemeId) {
      const exampleTheme = exampleThemes.find(theme => theme.themeId === exampleThemeId);
      const exampleThemeJson = exampleTheme.toJson();
      const newSavedTheme = new SavedTheme(undefined, exampleThemeJson.keyword, exampleThemeJson.colors);

      savedThemes.push(newSavedTheme);

      const savedThemesJsonList = []
      savedThemes.forEach(theme => {
        savedThemesJsonList.push(theme.toJson());
      });
      
      sessionStorage.setItem('savedThemes', JSON.stringify(savedThemesJsonList));

      const savedThemesListElement = document.getElementById("savedThemesList");
      this.insertThemesInList([newSavedTheme], savedThemesListElement);
      this.setEventListenersForSavedThemes([newSavedTheme]);
      this.setStyleForThemeItems([newSavedTheme]);
      this.clearExampleThemesList();
    },

    setEventListenersForSavedThemes: function(themes) {
      themes.forEach(theme => {
        const savedThemeElement = document.getElementById(theme.themeId);

        const applyButton = savedThemeElement.querySelector(".apply-theme-btn");
        const deleteButton = savedThemeElement.querySelector(".delete-theme-btn");

        applyButton.addEventListener("click", () => {
          this.applyTheme(theme);
        });

        deleteButton.addEventListener("click", () => {
          this.deleteSavedTheme(theme);
        });
      });
    },

    applyTheme: function(theme = defaultTheme) {
      sessionStorage.setItem('lastSelectedTheme', JSON.stringify(theme.toJson()));

      document.body.style.setProperty("--primary-color", theme.primaryColor);
      document.body.style.setProperty("--action-color", theme.actionColor);
      document.body.style.setProperty("--background-color", theme.backgroundColor);
      document.body.style.setProperty("--font-color", theme.fontColor);
    },

    deleteSavedTheme: function(theme) {
      const savedThemesListElement = document.getElementById("savedThemesList");
      savedThemesListElement.removeChild(document.getElementById(theme.themeId));
      savedThemes = savedThemes.filter(savedTheme => savedTheme.themeId !== theme.themeId);
      this.resetTheme();

      const savedThemesJsonList = []
      savedThemes.forEach(theme => {
        savedThemesJsonList.push(theme.toJson());
      });

      sessionStorage.setItem('savedThemes', JSON.stringify(savedThemesJsonList));
    },
    resetTheme: function() {
      this.applyTheme(defaultTheme);
    }
  }
})();

export default ThemeManager;