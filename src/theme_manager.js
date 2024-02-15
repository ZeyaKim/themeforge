import ExampleTheme from './example_theme.js';
import SavedTheme from './saved_theme.js';

const ThemeManager = (function() {
  let exampleThemes = [];
  let savedThemes = [];

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
      });
    },
    saveExampleTheme: function(exampleThemeId) {
      const exampleTheme = exampleThemes.find(theme => theme.themeId === exampleThemeId);
      const newSavedTheme = new SavedTheme(exampleTheme);
      savedThemes.push(newSavedTheme);

      const savedThemesListElement = document.getElementById("savedThemesList");
      this.insertThemesInList([newSavedTheme], savedThemesListElement);
      this.clearExampleThemesList();
    },
    getSavedThemes: function() {
      return savedThemes;
    },
    changeTheme: function(theme) {

    },
    is_already_saved: function(keyword) {
      for (const theme of savedThemes) {
        if (theme.keyword === keyword) {
          return true;
        }
      }
      return false;
    }
  }
})();

export default ThemeManager;