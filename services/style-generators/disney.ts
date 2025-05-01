import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class DisneyStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.DISNEY);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Classic Disney animation style, characterized by expressive characters, fluid motion, vibrant colors, and a perfect balance between cartoonish charm and artistic sophistication";
    }
} 