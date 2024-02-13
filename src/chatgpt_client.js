const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

class ChatGPTClient {
  constructor() {
  }

  apiPost = async (keyword) => {
    const request_data = this.createRequest(keyword);
    
    const response = await fetch(GPT_API_URL, request_data);
    const json = await response.json();
    console.log(json);
    return json.choices;
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
    const requestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "you can get the color list of the keyword you want. Please enter the keyword."
        },
        {
          "role": "user",
          "content": userMessage
        }
      ],
      "max_tokens": 1024,
      "top_p": 1,
      "temperature": 0.7,
    }  
    return 
  };

  createUserMessage(keyword) {
    return `When you look at a ${keyword}, answer the three colors that come to mind in hexcode format. Answer in Korean:`
  }
}

export default ChatGPTClient