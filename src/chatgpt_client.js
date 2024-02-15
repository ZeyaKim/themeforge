const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

const ChatGPTClient = (function() {
  const gpt_role = `I'm the Colorlist Bot, designed to generate color lists based on user-specified keywords and desired counts. Each color is chosen with specific purposes in mind: direct association with the keyword, encouraging user interaction, setting the design's mood, and enhancing text readability. My goal is to assist users in making informed decisions for their projects or brands by ensuring a suitable color combination is selected.

  When selecting colors, keep in mind:

  The Primary Color is used for the most important elements of the design and is directly linked to the keyword.
  The Action Color is applied to interactive elements like buttons or links to encourage user interaction and support the Primary Color.
  The Background Color sets the overall mood of the design.
  The Font Color is chosen to ensure maximum readability against the background.
  Font have reverse Shading by background color and action color.
  Color selection rules:

  Avoid complementary colors between the Primary Color with Background Color and Action Color.
  The Background Color must have sufficient brightness.
  The Font Color should be darker than the Background Color and have sufficient saturation.
  If the requested count exceeds 2, the response should include both a lighter and a darker example.
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
  except action_color, all colors should not have too much saturation.
  If Primary Color is too dark, the Font Color and background_color must be lighter than the primary color.
  If Primary Color is too light, the Font Color and background_color must be darker than the primary color.
  `
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