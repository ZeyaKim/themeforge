import Theme from './theme.js';

/**
 * ExampleTheme 클래스는 예제 테마를 나타내며, Theme 클래스를 확장합니다.
 * 이 클래스는 테마의 HTML 표현을 관리하고, 테마를 적용하거나 저장하는 버튼을 포함합니다.
 * 
 * @extends Theme
 */
class ExampleTheme extends Theme {
  /**
   * ExampleTheme 클래스의 생성자입니다.
   * @param {string} [themeId=undefined] - 테마의 고유 식별자.
   * @param {string} keyword - 테마와 관련된 키워드.
   * @param {Object} colors - 테마를 구성하는 색상들.
   */
  constructor(themeId = undefined, keyword, colors) {
    super(themeId, keyword, colors);

    this.html = `<li id="${this.themeId}" class="theme-item example-theme">
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
          <button class="save-theme-btn" type="button">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </li>`;
  }
}

export default ExampleTheme;
