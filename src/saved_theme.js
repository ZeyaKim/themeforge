import Theme from './theme.js';

class SavedTheme extends Theme {
  constructor(themeId = undefined, keyword, colors) {
    super(themeId, keyword, colors);

    this.html = `<li id=${this.themeId} class="theme-item saved-theme">
        <div class="theme-item-header">
          <h3>${this.keyword}</h3>
        </div>
        <div class="theme-item-body">
        </div>
        <div class="theme-item-footer">
          <button class="apply-theme-btn" type="button">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="delete-theme-btn" type="button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>`
  }
}

export default SavedTheme;