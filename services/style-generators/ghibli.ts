import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class GhibliStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.GHIBLI);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Studio Ghibli's distinctive hand-drawn animation style, characterized by detailed backgrounds, soft color palettes, and a magical, dreamlike quality";
    }
} 