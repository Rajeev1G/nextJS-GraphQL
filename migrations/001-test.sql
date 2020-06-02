-- Up
CREATE TABLE Beer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    alcoholPercent TEXT,
    description TEXT
);

INSERT INTO Beer (name, alcoholPercent, description) values ('Tusker', '4.2','This is a beer description');
INSERT INTO Beer (name, alcoholPercent, description) values ('WhiteCap', '4.5','This is a beer description');

-- Down
DROP TABLE Beer;