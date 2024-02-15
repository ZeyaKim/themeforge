import Theme from './theme.js';
import ExampleTheme from './example_theme.js';
import SavedTheme from './saved_theme.js';

const ThemeManager = (function() {
  let exampleThemes = [];
  let savedThemes = [];
  const defaultTheme = new Theme('default', {
    primary_color: "#e1574f",
    action_color: "#121100",
    background_color: "#fff7e1",
    font_color: "#333333"
  });

  return {
    createExampleThemes: function(keyword, jsonThemeData) {
      if (this.is_already_saved(keyword)) {
        return;
      }

      this.clearExampleThemesList();

      for (const themeData of jsonThemeData) {
        const newExampleTheme = new ExampleTheme(keyword, themeData);
        exampleThemes.push(newExampleTheme);
      }
      
      const exampleThemesListElement = document.getElementById("exampleThemesList");
      this.insertThemesInList(exampleThemes, exampleThemesListElement);
      this.setEventListenersForExampleThemes(exampleThemes);
      for (const theme of exampleThemes) {
        this.setStyleForThemeItem(theme);
      }
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

    setStyleForThemeItem: function(theme) {
      const themeItemElement = document.getElementById(theme.themeId);
      themeItemElement.style.setProperty("--primary-color", theme.primaryColor);
      themeItemElement.style.setProperty("--action-color", theme.actionColor);
      themeItemElement.style.setProperty("--background-color", theme.backgroundColor);
      themeItemElement.style.setProperty("--font-color", theme.fontColor);
    },

    saveExampleTheme: function(exampleThemeId) {
      const exampleTheme = exampleThemes.find(theme => theme.themeId === exampleThemeId);
      const newSavedTheme = new SavedTheme(exampleTheme);
      savedThemes.push(newSavedTheme);

      const savedThemesListElement = document.getElementById("savedThemesList");
      this.insertThemesInList([newSavedTheme], savedThemesListElement);
      this.setEventListenersForSavedThemes(newSavedTheme);
      this.setStyleForThemeItem(newSavedTheme);
      this.clearExampleThemesList();
    },

    setEventListenersForSavedThemes: function(theme) {
      const savedThemeElement = document.getElementById(theme.themeId);
      console.log(savedThemeElement);
      const applyButton = savedThemeElement.querySelector(".apply-theme-btn");
      const deleteButton = savedThemeElement.querySelector(".delete-theme-btn");
      applyButton.addEventListener("click", () => {
        this.applyTheme(theme);
      });

      deleteButton.addEventListener("click", () => {
        this.deleteSavedTheme(theme);
      });
    },

    applyTheme: function(theme) {
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
    },

    resetTheme: function() {
      this.applyTheme(defaultTheme);
    }
  }
})();

export default ThemeManager;