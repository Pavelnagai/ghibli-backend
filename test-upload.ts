import { readFileSync } from 'fs';
import { join } from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function testUpload() {
    try {
        // Читаем тестовое изображение
        const imagePath = join(__dirname, 'test-image.jpg');
        const imageBuffer = readFileSync(imagePath);

        // Создаем FormData
        const formData = new FormData();
        formData.append('file', imageBuffer, {
            filename: 'test-image.jpg',
            contentType: 'image/jpeg'
        });
        formData.append('style', 'ghibli');

        // Отправляем запрос
        const response = await fetch('http://localhost:3000/images', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

testUpload(); 