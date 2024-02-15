/**
 * Theme 클래스는 디자인 테마의 구성요소를 관리합니다.
 * 각 테마는 고유 ID, 키워드, 그리고 네 가지 색상(기본 색상, 액션 색상, 배경 색상, 글꼴 색상)으로 구성됩니다.
 * 
 * @class
 * @param {string} [themeId=undefined] - 테마의 고유 식별자. 지정하지 않을 경우 무작위로 생성됩니다.
 * @param {string} [keyword="default"] - 테마와 관련된 키워드.
 * @param {Object} [colors={primary_color: "#e1574f", action_color: "#7fffd4", background_color: "#fff7e1", font_color: "#333333"}] - 테마를 구성하는 색상들.
 * @param {string} colors.primary_color - 테마의 기본 색상.
 * @param {string} colors.action_color - 테마의 액션 색상. 버튼이나 링크 같은 인터랙티브 요소에 사용됩니다.
 * @param {string} colors.background_color - 테마의 배경 색상.
 * @param {string} colors.font_color - 테마의 글꼴 색상.
 */
class Theme {
  constructor(
    themeId = undefined,
    keyword = "default",
    colors = {
      primary_color: "#e1574f",
      action_color: "#7fffd4",
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
  
  /**
   * 이 Theme 인스턴스를 JSON 객체로 변환합니다.
   * 
   * @returns {Object} 현재 Theme 인스턴스의 상태를 나타내는 JSON 객체.
   */
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