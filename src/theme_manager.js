import Theme from "./theme.js";

const ThemeManager = (function() {
  const currentTheme = new Theme({
    primary_color: "red",
    secondary_color: "green",
    background_color: "blue",
    font_color: "white",
  })

  return {
    extractThemeDataFromJson: function(jsonData) {

    },
    createTheme: function(keyword, themeDataJson) {

    },
    deleteTheme: function(index) {

    },
    changeTheme: function(theme) {

    },
  }
})();

export default ThemeManager;