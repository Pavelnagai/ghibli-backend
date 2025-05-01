import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class PixelArtStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.PIXEL_ART);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Pixel art style, characterized by blocky, low-resolution graphics with limited color palettes, sharp edges, and a nostalgic retro gaming aesthetic";
    }
} 