import { ImageStyle } from '../../types/styles';
import { BaseStyleGenerator } from './base';

export class AnimeStyleGenerator extends BaseStyleGenerator {
    constructor() {
        super(ImageStyle.ANIME);
    }

    async generateStyle(imageUrl: string): Promise<string> {
        const prompt = await this.generatePrompt(imageUrl, this.getStyleDescription());
        const image = new File([Buffer.from(imageUrl, 'base64')], 'input.jpg', { type: 'image/jpeg' });
        return this.generateImage(prompt, image);
    }

    getStyleDescription(): string {
        return "Traditional Japanese anime style, characterized by large expressive eyes, dynamic poses, dramatic lighting, and a unique blend of detailed backgrounds with stylized characters";
    }
} 