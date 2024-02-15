class Theme {
  constructor(
    themeId = undefined,
    keyword = "default",
    colors = {
      primary_color: "#e1574f",
      action_color: "#121100",
      background_color: "#fff7e1",
      font_color: "#333333"
    }
  ) {
    this.themeId = themeId ? themeId : Math.random().toString(36).substring(2, 9);
    this.keyword = keyword
    this.primaryColor = colors.primary_color
    this.actionColor = colors.action_color
    this.backgroundColor = colors.background_color
    this.fontColor = colors.font_color
  }

  toJson() {
    return {
      "themeId": this.themeId,
      "keyword": this.keyword,
      "colors": {
        "primary_color": this.primaryColor,
        "action_color": this.actionColor,
        "background_color": this.backgroundColor,
        "font_color": this.fontColor
      }
    }
  }
}

export default Theme;