import Theme from './theme.js';

class SavedTheme extends Theme {
  constructor(exampleTheme) {
    super(exampleTheme.keyword, {
      primary_color: exampleTheme.primaryColor,
      action_color: exampleTheme.actionColor,
      background_color: exampleTheme.backgroundColor,
      font_color: exampleTheme.fontColor
    });

    this.html = `<li class="theme-item saved-theme">
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