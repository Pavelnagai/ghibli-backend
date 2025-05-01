import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class OilPaintingStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.OIL_PAINTING);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Classic oil painting style, characterized by rich textures, visible brush strokes, deep colors, and a sense of depth and volume with dramatic lighting and shadows";
    }
} 