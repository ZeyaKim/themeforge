const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

class ChatGPTClient {
  constructor() {
  }

  apiPost = async (keyword) => {
    const request_data = this.createRequest(keyword);
    const response = await fetch(GPT_API_URL, request_data);
    const json = await response.json();
    console.log(json);
    return json.choices[0].message.content;
  }

  createRequest(keyword) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.createRequestBody(keyword)),
      redirect: "follow",
    }
  }

  createRequestBody(keyword) {
    const userMessage = this.createUserMessage(keyword);
    const requestBody = [{
          "role": "system",
          "content": "you can get the color list of the keyword you want. Please enter the keyword."
        },
        {
          "role": "user",
          "content": userMessage
        }]
    return requestBody
  };

  createUserMessage(keyword) {
    return `When you look at a ${keyword}, please respond with the three colors that come to mind in lowercase hexcode format for primary-color, secondary-color, and background-color in JSON format.`
  }
}

export default ChatGPTClient