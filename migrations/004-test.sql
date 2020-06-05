-- Up
ALTER TABLE Beer ADD COLUMN price TEXT;

UPDATE Beer SET price = '3.00', description = 'Tusker is a pale lager from Kenya made from the highest quality malt barley grown in the Rift Valley. Medium to gold in colour with a white head, giving crisp and clean aromas with a touch of citrus. On the palate it is clean and refreshing with a hint of razor-sharp citrus.' WHERE name = 'Tusker';
UPDATE Beer SET price = '2.50', description = 'A refreshing Kenyan no frills lager. White Cap Lager is a clean, thirst quenching beer with light sweet hops notes in a malt rich body.' WHERE name = 'WhiteCap';

INSERT INTO Beer (name, alcoholPercent, description, countryOfOrigin, price) values ('Fosters', '4','Fosters is a light, golden lager with a medium malt character. An easy-drinking lager with a delicate fruity hop aroma and a balanced taste, Fosters rolls of the tongue leaving a clean crisp finish. An easy drinking lager, Fosters is relevant across a range of occasions. Pop it in the fridge and serve cold', 'Australia', '2.75');
INSERT INTO Beer (name, alcoholPercent, description, countryOfOrigin, price) values ('Stella Artois', '5','Stella Artois is a classic Belgian lager, golden in color with a floral, hop aroma, well-balanced fruity malty sweetness, crisp hop bitterness', 'Belgium', '4.20');
INSERT INTO Beer (name, alcoholPercent, description, countryOfOrigin, price) values ('Kronenburg', '4.8','Kronenbourg 1664 is a Premium Lager at 5.0%. It is brewed with the aromatic Strisselspalt hop from Alsace, which gives it a unique aroma and satisfying taste. All of which makes it the superior tasting premium lager. Kronenbourg 1664 is a full bodied, golden, bittersweet lager with a distinct citrus hop flavour', 'France', '3.50');
-- Down
DROP IF EXISTS TABLE Beer;