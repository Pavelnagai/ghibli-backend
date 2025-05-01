import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class PixarStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.PIXAR);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Pixar's distinctive 3D animation style, characterized by vibrant colors, smooth textures, expressive characters, and a perfect balance between realism and stylization";
    }
} 