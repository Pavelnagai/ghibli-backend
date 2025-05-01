import { StyleGenerator, ImageStyle } from '../../types/styles';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import OpenAI from 'openai';

export abstract class BaseStyleGenerator implements StyleGenerator {
    protected openai: ReturnType<typeof createOpenAI>;
    protected openaiImage: OpenAI;
    protected style: ImageStyle;

    constructor(style: ImageStyle) {
        this.openai = createOpenAI({
            compatibility: 'strict',
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openaiImage = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.style = style;
    }

    abstract generateStyle(imageUrl: string): Promise<string>;
    abstract getStyleDescription(): string;

    protected async generatePrompt(imageUrl: string, styleDescription: string): Promise<string> {
        const { text } = await generateText({
            model: this.openai('gpt-4o-mini'),
            messages: [
                {
                    role: 'user',
                    content: [
                        { 
                            type: 'text', 
                            text: `Please generate a detailed prompt for creating an image in ${styleDescription} style. The prompt should be suitable for an image generation model and should capture the essence of this art style. Focus on maintaining the original composition while transforming it into the target style.`
                        },
                        {
                            type: 'image',
                            image: imageUrl
                        }
                    ]
                }
            ]
        });

        return text;
    }

    protected async generateImage(prompt: string, image: File): Promise<string> {
        const response = await this.openaiImage.images.generate({
            model: "gpt-image-1",
            prompt: `${prompt}. The image should be in ${this.getStyleDescription()} style.`,
            n: 1,
            size: "1024x1024",
        }, {
            query: {
                image: image,
            }
        });

        if (!response.data?.[0]?.b64_json) {
            throw new Error('Failed to generate image');
        }

        return response.data[0].b64_json;
    }
} 