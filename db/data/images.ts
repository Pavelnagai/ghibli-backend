import {
    eq,
} from "drizzle-orm";
import {
    db,
    images
} from "..";
import { uploadFile } from "../upload/src/minio";
import { nanoid } from "nanoid";

export type Image = {
    id: string;
    url: string;
    processedImageUrl: string;
};

export type CreateImageInput = {
    file: File;
    processedImage: File;
};

export async function postCreateImage({ file, processedImage }: CreateImageInput): Promise<Image> {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const processedImageBuffer = Buffer.from(await processedImage.arrayBuffer());
    
    const originalId = nanoid();
    const processedId = nanoid();
    
    const originalExtension = file.name.split('.').pop();
    const processedExtension = processedImage.name.split('.').pop();
    
    const originalFilename = `${originalId}.${originalExtension}`;
    const processedFilename = `${processedId}.${processedExtension}`;
    
    const imageUrl = await uploadFile(
        'images',
        originalFilename,
        fileBuffer,
        file.size,
        file.type
    );
    const processedImageUrl = await uploadFile(
        'images',
        processedFilename,
        processedImageBuffer,
        processedImage.size,
        processedImage.type
    );
    
    const id = nanoid();
    const [image] = await db.insert(images).values({
        id,
        url: imageUrl,
        processedImageUrl,
    }).returning();
    
    return image;
}

export async function getImage(id: string): Promise<Image | null> {
    const result = await db.query.images.findFirst({
        where: eq(images.id, id),
    });
    return result || null;
}

export async function getImages(): Promise<Image[]> {
    return await db.query.images.findMany();
}

export async function deleteImage(id: string): Promise<void> {
    const image = await getImage(id);
    if (!image) {
        throw new Error('Image not found');
    }
    await db.delete(images).where(eq(images.id, id));
}
 