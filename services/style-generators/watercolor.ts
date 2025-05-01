import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class WatercolorStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.WATERCOLOR);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Watercolor painting style, characterized by soft edges, transparent layers, flowing colors, and a delicate, ethereal quality with visible brush strokes and color bleeding";
    }
} 