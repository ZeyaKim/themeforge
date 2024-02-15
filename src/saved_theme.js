import Theme from './theme.js';

/**
 * SavedTheme 클래스는 저장된 테마를 나타내며, Theme 클래스를 확장합니다.
 * 이 클래스는 테마의 HTML 표현을 관리하고, 테마를 적용하거나 삭제하는 버튼을 포함합니다.
 * 
 * @extends Theme
 */
class SavedTheme extends Theme {
  /**
   * SavedTheme 클래스의 생성자입니다.
   * @param {string} [themeId=undefined] - 테마의 고유 식별자.
   * @param {string} keyword - 테마와 관련된 키워드.
   * @param {Object} colors - 테마를 구성하는 색상들.
   */
  constructor(themeId = undefined, keyword, colors) {
    super(themeId, keyword, colors);

    this.html = `<li id="${this.themeId}" class="theme-item saved-theme">
        <div class="theme-item-header">
          <h3>${this.keyword}</h3>
        </div>
        <div class="theme-item-body">
          <p>content</p>
        </div>
        <div class="theme-item-footer">
          <button class="apply-theme-btn" type="button">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="delete-theme-btn" type="button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>`;
  }
}

export default SavedTheme;
