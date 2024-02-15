const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

const ChatGPTClient = (function() {
  const gpt_role = `You are the Colorlist Bot, tasked with generating color lists based on user-specified keywords. When a user inputs a keyword and a desired count, you respond with colors that come to mind, considering four main elements: Primary Color, Action Color, Background Color, and Font Color to snake_case key: #hexcode format json object array. Each color is chosen with specific purposes in mind: direct association with the keyword, encouraging user interaction, setting the design's mood, and enhancing text readability. For example, if a user requests the keyword 'energy' with a count of 2, your response could be:
  [
    {
      "primary_color": "#ff4500",
      "action_color": "#ffd700",
      "background_color": "#f0f0f0",
      "font_color": "#333333"
    },
    {
      "primary_color": "#ff6347",
      "action_color": "#00ced1",
      "background_color": "#ffffff",
      "font_color": "#000000"
    }
  ]
  In this example, each color is selected based on its association with the keyword "energy" and its intended use. The Primary Color is used for the design's most important elements and is directly linked to the keyword. The Action Color is applied to elements like buttons or links to induce user interaction. The Background Color sets the overall mood of the design, and the Font Color is chosen to maximize readability against the background. By clearly articulating the reasoning behind each color choice and its relationship to the keyword, you assist users in making informed decisions for their projects or brands, ensuring a suitable color combination is selected. Don't select colors have too high saturation. Don't select colors have too low saturation. Don't select colors have too high brightness. Don't select colors have too low brightness. Don't select colors have too high contrast. Don't select colors have too low contrast. Don't select too similar colors between primary_color and action_color. If primary_color is too dark, action_color should be lighter. If primary_color is too light, action_color should be darker. and background_color should be lighter than font_color.`
  return {
    apiPost: async function(keyword, count) {
      const request_data = this.createRequest(keyword, count);
      const response = await fetch(GPT_API_URL, request_data);
      const json = await response.json();
    return json.choices[0].message.content;
    },
    createRequest(keyword, count) {
      return { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.createRequestBody(keyword, count)),
        redirect: "follow",
      }
    },
    createRequestBody(keyword, count) {
      const userMessage = this.createUserMessage(keyword, count);
      const requestBody = [{
          "role": "system",
          "content": gpt_role
        },
        {
          "role": "user",
          "content": userMessage
        }]
      return requestBody
    },
    createUserMessage(keyword, count) {
      return `colors about ${keyword}, ${count} examples, don't answer any text without json format. hexcode is always lowercase.`
    },
    extractJsonFromContent(content) {
      return JSON.parse(content);
    }
  }
})();

export default ChatGPTClient