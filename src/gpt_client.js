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

    make_request_body(keyword) {
        return {
            "keyword": keyword
        }
    }

    change_css_pallette() {
        const color_idx = (ChatGPTClient.current_idx) % this.palette.length;
        ChatGPTClient.current_idx += 1;
        return this.palette[color_idx]
    }
}

export default ChatGPTClient