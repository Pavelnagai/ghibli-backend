import { Hono } from 'hono';
import { 
    getImage, 
    getImages, 
    postCreateImage, 
    deleteImage 
} from '../../db/data/images';
import { ImageStyle, StyleGenerationResponse } from '../../types/styles';
import { StyleGeneratorFactory } from '../../services/style-generators/factory';

const imagesRouter = new Hono();

imagesRouter.get('/', async (c) => {
    try {
        const images = await getImages();
        return c.json(images);
    } catch (error) {
        console.error('Error getting images:', error);
        return c.json({ 
            error: error instanceof Error ? error.message : 'Failed to get images' 
        }, 500);
    }
});

imagesRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const image = await getImage(id);
        
        if (!image) {
            return c.json({ error: 'Image not found' }, 404);
        }
        
        return c.json(image);
    } catch (error) {
        console.error('Error getting image:', error);
        return c.json({ 
            error: error instanceof Error ? error.message : 'Failed to get image' 
        }, 500);
    }
});

imagesRouter.post('/', async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get('file') as File;
        const style = formData.get('style') as ImageStyle;
        
        if (!file) {
            return c.json({ error: 'No file provided' }, 400);
        }

        if (!style || !Object.values(ImageStyle).includes(style)) {
            return c.json({ error: 'Invalid or missing style' }, 400);
        }

        const styleGenerator = StyleGeneratorFactory.createGenerator(style);
        
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        
        const styledImage = await styleGenerator.generateStyle(base64);

        
        const image = await postCreateImage({ 
            file, 
            processedImage: new File([Buffer.from(styledImage, 'base64')], file.name, { type: file.type })
        });

        const result: StyleGenerationResponse = {
            id: image.id,
            url: image.url,
            processedImageUrl: image.processedImageUrl,
        };

        return c.json(result, 201);
    } catch (error) {
        console.error('Error creating image:', error);
        return c.json({ 
            error: error instanceof Error ? error.message : 'Failed to create image' 
        }, 500);
    }
});

imagesRouter.delete('/:id', async (c) => {
    try {
        await deleteImage(c.req.param('id'));
        return c.json({ message: 'Image deleted successfully' });
    } catch (error) {
        if (error instanceof Error && error.message === 'Image not found') {
            return c.json({ error: 'Image not found' }, 404);
        } else {
            console.error('Error deleting image:', error);
            return c.json({ 
                error: error instanceof Error ? error.message : 'Failed to delete image' 
            }, 500);
        }
    }
});

export { imagesRouter }; 