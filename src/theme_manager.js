import ExampleTheme from './example_theme.js';
import SavedTheme from './saved_theme.js';

const ThemeManager = (function() {
  /*
  const currentTheme = new Theme({
    primary_color: "red",
    secondary_color: "green",
    background_color: "blue",
    font_color: "white",
  })
  */
  let exampleThemes = [];
  let savedThemes = [];

  return {
    deleteTheme: function(index) {
    },
    createExampleThemes: function(keyword, jsonThemeData) {
      for (const themeData of jsonThemeData) {
        if (this.is_already_saved(keyword)) {
          return;
        }
        exampleThemes.push(new ExampleTheme(keyword, themeData));
      }
      return exampleThemes;
    },
    getExampleThemes: function() {
      return exampleThemes;
    },
    clearExampleThemes: function() {
      exampleThemes = [];
    },
    saveTheme: function(theme) {
      savedThemes.push(theme);
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