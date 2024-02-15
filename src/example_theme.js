import Theme from './theme.js';

class ExampleTheme extends Theme {
  constructor(keyword, themeDataJson) {
    super(keyword, themeDataJson);
    this.html = `<li id=${this.themeId} class="theme-item example-theme">
        <div class="theme-item-header">
          <h3>${keyword}</h3>
        </div>
        <div class="theme-item-body">
        </div>
        <div class="theme-item-footer">
          <button class="save-theme-btn" type="button">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </li>`
  }
}


export default ExampleTheme;