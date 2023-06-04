DROP TABLE IF EXISTS image_files; 

-- Table Definition
CREATE TABLE image_files (
    id SERIAL NOT NULL PRIMARY KEY,
    date date,
    filename text NOT NULL,
    description text NOT NULL,
    path text NOT NULL
);

-- Seeding data

-- INSERT INTO image_files ("name", "description") VALUES
-- ('Raaya', 'Rock'),
-- ('ABBA', 'Pop'),
-- ('Taylor Swift', 'Pop'),
-- ('Nina Simone', 'Pop');