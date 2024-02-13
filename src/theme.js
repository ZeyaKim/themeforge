class Theme {
  constructor(keyword, themeDataJson) {
    this.keyword = keyword;

    this.primaryColor = themeDataJson.primary_color;
    this.secondaryColor = themeDataJson.secondary_color;
    this.backgroundColor = themeDataJson.background_color;
    this.fontColor = themeDataJson.font_color;

    this.html = `<li class="theme" id="${this.keyword}">
      <p>${this.keyword}</p>
    </li>`
  }
}

export default Theme;