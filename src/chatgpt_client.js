const GPT_API_URL = 'https://open-api.jejucodingcamp.workers.dev/'

class ChatGPTClient {
    static current_idx = 0

    constructor() {
        this.palette = [
            "red",
            "green",
            "blue",
        ]
        
    }

    request(keyword) {
        request_data = this.make_request(keyword);
        
        const response = fetch(GPT_API_URL, request_data)
            .then(response => response.json())
            .then(json => {return json})
            .catch(error => console.log(error))

        return response.data
    }

    make_request(keyword) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.GPT_API_URL}`
            },
            body: JSON.stringify(this.create_request_body(keyword))
        }
    }

    create_request_body(keyword) {
        
    };

    change_css_pallette() {
        const color_idx = (ChatGPTClient.current_idx) % this.palette.length;
        ChatGPTClient.current_idx += 1;
        return this.palette[color_idx]
    }
}

export default ChatGPTClient