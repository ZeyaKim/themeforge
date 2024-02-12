const GPT_API_URL = ''

class GPT {
    static current_idx = 0
    constructor() {
        this.palette = [
            "red",
            "green",
            "blue",
        ]    
    }

    change_css_pallette() {
        const color_idx = (GPT.current_idx) % this.palette.length;
        GPT.current_idx += 1;
        return this.palette[color_idx]
    }
}

export default GPT