DROP TABLE IF EXISTS images;

CREATE TABLE images (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    processed_image_url TEXT NOT NULL
); 