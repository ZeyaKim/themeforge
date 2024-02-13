class ThemeManager {
  static current_idx = 0;
  constructor() {
    this.palette = [
      "red",
      "green",
      "blue",
    ]
  }

  change_css_pallette() {
    const color_idx = (ThemeManager.current_idx) % this.palette.length;
    ThemeManager.current_idx += 1;
    console.log(this.palette[color_idx]);
    return this.palette[color_idx]
  }
}

export default ThemeManager