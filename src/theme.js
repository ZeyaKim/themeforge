class Theme {
  constructor(keyword, themeDataJson) {
    this.themeId = Math.random().toString(36).substring(2, 9);
    this.keyword = keyword;
    this.primaryColor = themeDataJson.primary_color;
    this.actionColor = themeDataJson.action_color;
    this.backgroundColor = themeDataJson.background_color;
    this.fontColor = themeDataJson.font_color;
  }
}

export default Theme;