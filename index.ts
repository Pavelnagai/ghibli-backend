import { Hono } from "hono";
import { cors } from "hono/cors";
import { checkConnection as checkMinioConnection } from "./db/upload/src/minio";
import { HTTPException } from "hono/http-exception";
import { config } from "./db/config";
import { imagesRouter } from "./api/routes/images";
import { serve } from '@hono/node-server';

const app = new Hono();

const initialize = async () => {
	try {
		await checkMinioConnection();
		console.log("MinIO connection established");
	} catch (error) {
		console.error("Failed to connect to MinIO:", error);
	}
};

app.use(
	"*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.get("/", c => {
	return c.text("Hello, i am alive!");
});

app.route('/api/images', imagesRouter);

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		const status = err.status;
		const message = err.message || "Server Error";

		if (status === 400 && err.cause) {
			return c.json({ message, errors: err.cause }, status);
		}

		return c.json({ message }, status);
	}

	return c.json({ message: "Internal Server Error", error: err }, 500);
});

// Initialize connections
initialize();

// Start the server
const port = config.app.port;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port
});
