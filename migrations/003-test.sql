-- Up
UPDATE Beer SET countryOfOrigin = 'Kenya' WHERE name = 'Tusker';
UPDATE Beer SET countryOfOrigin = 'Kenya' WHERE name = 'WhiteCap';
-- Down
DROP IF EXISTS TABLE Beer;