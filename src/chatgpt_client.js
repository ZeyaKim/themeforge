/**
 * @fileoverview 이 파일은 사용자가 지정한 키워드와 원하는 개수에 따라 색상 목록을 생성하는 Colorlist Bot의 구현을 포함합니다.
 * Colorlist Bot은 키워드와 직접 연관된 색상을 선택하고, 사용자 상호작용을 장려하며, 디자인의 분위기를 설정하고,
 * 텍스트 가독성을 향상시키는 데 특정 목적을 두고 각 색상을 선택합니다. 사용자가 프로젝트나 브랜드에 적합한 색상 조합을 선택할 수 있도록 돕는 것이 목표입니다.
 * @module ChatGPTClient
 */

/**
 * @namespace ChatGPTClient
 * @description Colorlist Bot API와 통신하는 클라이언트입니다.
 */
const ChatGPTClient = (function() {
  const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/';
  const gpt_role = `I'm the Colorlist Bot, designed to generate color lists based on user-specified keywords and desired counts. Each color is chosen with specific purposes in mind: direct association with the keyword, encouraging user interaction, setting the design's mood, and enhancing text readability. My goal is to assist users in making informed decisions for their projects or brands by ensuring a suitable color combination is selected.

  Restrictions:

  - Primary Color:
  The Primary Color is used for the most important elements of the design and is directly linked to the keyword.
  If Primary Color is too dark, the Font Color and background_color must be lighter than the primary color.
  If Primary Color is too light, the Font Color and background_color must be darker than the primary color.

  - Action Color:
  The Action Color is applied to interactive elements like buttons or links to encourage user interaction and support the Primary Color.
  action color is similar complementary color with primary color.
  action color should be more saturated than primary color but not too much.
  action color never be similar with font color.

  - Background Color:
  The Background Color sets the overall mood of the design.
  The Background Color must be distinct from the Primary Color and have sufficient contrast with the Font Color.
  The saturation of the Background Color should not be too high, but this does not necessarily mean it always has to be a light white.

  - Font Color:
  The Font Color is chosen to ensure maximum readability against the background.
  The Font Color should be darker than the Background Color and have sufficient saturation.
  Font have reverse Shading by background color and action color.
  font color always isn't similary with action color.
  font color isn't too much constrast with action color.

  - Color Rules:
  Avoid complementary colors between the Primary Color with Background Color and Action Color.
  except action_color, all colors should not have too much saturation.
  When a keyword with a dark theme is entered, consider including examples that combine a dark background color with a light primary color.
  When creating multiple examples, try varying the Primary Color or Background Color but not should be too much different.
  If the requested count exceeds 2, the response should include both a lighter and a darker example
  [
    {
      "primary_color": "#ff4500",
      "action_color": "#ffd700",
      "background_color": "#f0f0f0",
      "font_color": "#333333"
    },
    {
      "primary_color": "#326347",
      "action_color": "#00ced1",
      "background_color": "#333333",
      "font_color": "#ffffff"
    }
  ]
  respond must be json array format even count is 1. hexcode is always lowercase. don't answer any text without json array format.
  `;

  /**
   * 비동기적으로 API에 POST 요청을 보내고 응답을 받습니다.
   * @async
   * @function apiPost
   * @param {string} keyword - 사용자가 지정한 키워드
   * @param {number} count - 요청할 색상의 개수
   * @returns {Promise<string>} API 응답으로부터 추출된 색상 정보가 담긴 JSON 문자열
   */
  const apiPost = async function(keyword, count) {
    const request_data = createRequest(keyword, count);
    const response = await fetch(GPT_API_URL, request_data);
    const json = await response.json();
    return json.choices[0].message.content;
  };

  /**
   * API 요청 본문을 생성합니다.
   * @function createRequestBody
   * @param {string} keyword - 사용자가 지정한 키워드
   * @param {number} count - 요청할 색상의 개수
   * @returns {Object} API 요청 본문
   */
  const createRequest = function(keyword, count) {
    return { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createRequestBody(keyword, count)),
      redirect: "follow",
    };
  };

  /**
   * API 요청 본문을 생성합니다.
   * @function createRequestBody
   * @param {string} keyword - 사용자가 지정한 키워드
   * @param {number} count - 요청할 색상의 개수
   * @returns {Object[]} 시스템 메시지와 사용자 메시지를 포함하는 객체 배열
   */
  const createRequestBody = function(keyword, count) {
    const userMessage = createUserMessage(keyword, count);
    const requestBody = [{
        "role": "system",
        "content": gpt_role
      },
      {
        "role": "user",
        "content": userMessage
      }];
    return requestBody;
  };

  /**
   * 사용자 메시지를 생성합니다. 이 메시지는 색상에 대한 정보를 요청하는 데 사용됩니다.
   * @function createUserMessage
   * @param {string} keyword - 사용자가 지정한 키워드
   * @param {number} count - 요청할 색상의 개수
   * @returns {string} 사용자 메시지
   */
  const createUserMessage = function(keyword, count) {
    return `colors about ${keyword}, ${count} examples, don't answer any text without json array format. hexcode is always lowercase.`;
  };

  return {
    apiPost,
    createRequest,
    createRequestBody,
    createUserMessage,
  };
})();

export default ChatGPTClient;
