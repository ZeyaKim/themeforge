class ThemeManager {
  static current_idx = 0;
  constructor() {
    this.palette = [
      "red",
      "green",
      "blue",
    ]
  }

  changeCSSPalette() {
    const color_idx = (ThemeManager.current_idx) % this.palette.length;
    ThemeManager.current_idx += 1;
    console.log(this.palette[color_idx]);
    return this.palette[color_idx]
  }

  // TODO change theme data using input themedataJson
  changeTheme(themeDataJson) {
  }
}

export default ThemeManager