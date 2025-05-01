import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { imagesRouter } from './routes/images';

export const app = new Hono();

app.use('*', logger());
app.use('*', cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get("/", (c) => {
    return c.text("browser ok");
});
app.route('/api/images', imagesRouter);

app.onError((err, c) => {
    console.error(`${err}`);
    return c.json({ error: 'Internal Server Error' }, 500);
}); 