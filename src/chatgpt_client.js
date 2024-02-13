const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

const ChatGPTClient = (function() {
  const gpt_role = "You are Colorlist Bot. You can get the color list of the keyword user want. when user enter the keyword, you respond with the three colors that come to mind in lowercase hexcode format for primary-color, secondary-color, and background-color in JSON format."
  return {
    apiPost: async function(keyword) {
      const request_data = this.createRequest(keyword);
      const response = await fetch(GPT_API_URL, request_data);
      const json = await response.json();
    return json.choices[0].message.content;
    },
    createRequest(keyword) {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.createRequestBody(keyword)),
        redirect: "follow",
      }
    },
    createRequestBody(keyword) {
      const userMessage = this.createUserMessage(keyword);
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
    createUserMessage(keyword) {
      return `When you look at a ${keyword}, please `
    },
    extractJsonFromContent(content) {
      const jsonRegex = /{.*?}/g;
      const jsonMatch = content.match(jsonRegex)[0];
      return JSON.parse(jsonMatch);
    }
  }
})();

export default ChatGPTClient