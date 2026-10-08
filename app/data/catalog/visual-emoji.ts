import { v, type QuestionSeed } from './seed'

export const emojiQuestions: readonly QuestionSeed[] = [
  // screen
  v('emoji-screen-01', 'screen', 1, 'Welcher Film ist das?', 'Oben', ['Oben', 'Der Zauberer von Oz', 'Kevin – Allein zu Haus', 'Es'], { kind: 'emoji', symbols: '👴🎈🏠' }, ['classic']),
  v('emoji-screen-02', 'screen', 1, 'Welcher Film ist das?', 'Titanic', ['Titanic', 'Life of Pi', 'Die Eiskönigin', 'Fluch der Karibik'], { kind: 'emoji', symbols: '🚢🧊💔🎻' }, ['classic']),
  v('emoji-screen-03', 'screen', 2, 'Welcher Film ist das?', 'Ghostbusters', ['Ghostbusters', 'Casper', 'Scary Movie', 'Poltergeist'], { kind: 'emoji', symbols: '👻🚫🚒' }, ['classic']),
  v('emoji-screen-04', 'screen', 2, 'Welche Serie ist das?', 'Stranger Things', ['Stranger Things', 'E.T. – Der Außerirdische', 'Dark', 'Die Goonies'], { kind: 'emoji', symbols: '🚲🧇🔦👾' }, ['current']),
  v('emoji-screen-05', 'screen', 3, 'Welcher Film ist das?', 'Forrest Gump', ['Forrest Gump', 'Rain Man', 'Big Fish', 'Catch Me If You Can'], { kind: 'emoji', symbols: '🏃🍫🦐🪶' }, ['classic']),
  v('emoji-screen-06', 'screen', 3, 'Welcher Film ist das?', 'Inception', ['Inception', 'Tenet', 'Interstellar', 'Shutter Island'], { kind: 'emoji', symbols: '😴🪆🌀' }, ['classic']),

  // music
  v('emoji-music-01', 'music', 1, 'Welcher Song ist das?', 'Watermelon Sugar', ['Watermelon Sugar', 'Sugar', 'Peaches', 'Cake by the Ocean'], { kind: 'emoji', symbols: '🍉🍬' }, ['current']),
  v('emoji-music-02', 'music', 1, 'Welche Band ist das?', 'Red Hot Chili Peppers', ['Red Hot Chili Peppers', 'Black Eyed Peas', 'Arctic Monkeys', 'Foo Fighters'], { kind: 'emoji', symbols: '🔴🔥🌶️🌶️' }, ['classic']),
  v('emoji-music-03', 'music', 2, 'Welcher Song ist das?', 'Atemlos durch die Nacht', ['Atemlos durch die Nacht', 'Durch die Nacht', 'Wind of Change', 'Tage wie diese'], { kind: 'emoji', symbols: '🚫😮💨🌙' }, ['classic']),
  v('emoji-music-04', 'music', 2, 'Welche Band ist das?', 'Die Ärzte', ['Die Ärzte', 'Die Toten Hosen', 'Die Prinzen', 'Wir sind Helden'], { kind: 'emoji', symbols: '👨‍⚕️👩‍⚕️👨‍⚕️' }, ['classic']),
  v('emoji-music-05', 'music', 3, 'Welcher Song ist das?', 'Hotel California', ['Hotel California', 'Californication', 'Heartbreak Hotel', 'California Love'], { kind: 'emoji', symbols: '🏨🌴☀️🎸' }, ['classic']),

  // knowledge: German idioms
  v('emoji-knowledge-01', 'knowledge', 1, 'Welches Sprichwort ist das?', 'Lieber den Spatz in der Hand …', ['Lieber den Spatz in der Hand …', 'Der frühe Vogel fängt den Wurm', 'Einen Vogel haben', 'Zwei Fliegen mit einer Klappe'], { kind: 'emoji', symbols: '✋🐦👍🏠🕊️' }, ['classic']),
  v('emoji-knowledge-02', 'knowledge', 2, 'Welche Redewendung ist das?', 'Da liegt der Hund begraben', ['Da liegt der Hund begraben', 'Den Letzten beißen die Hunde', 'Schlafende Hunde wecken', 'Bekannt wie ein bunter Hund'], { kind: 'emoji', symbols: '🐕⚰️📍' }, ['classic']),
  v('emoji-knowledge-03', 'knowledge', 2, 'Welche Redewendung ist das?', 'Ich verstehe nur Bahnhof', ['Ich verstehe nur Bahnhof', 'Der Zug ist abgefahren', 'Auf dem Holzweg sein', 'Auf dem Abstellgleis stehen'], { kind: 'emoji', symbols: '👂🚉🤷' }, ['chat']),
  v('emoji-knowledge-04', 'knowledge', 3, 'Welche Redewendung ist das?', 'Ich glaub, mein Schwein pfeift', ['Ich glaub, mein Schwein pfeift', 'Schwein gehabt', 'Perlen vor die Säue werfen', 'Die Spatzen pfeifen es …'], { kind: 'emoji', symbols: '🐷😗🎶😳' }, ['odd']),

  // cologne
  v('emoji-cologne-01', 'cologne', 1, 'Welcher Karnevalsbegriff ist das?', 'Kamelle', ['Kamelle', 'Strüßjer', 'Bützje', 'Alaaf'], { kind: 'emoji', symbols: '🐪🐪🍬🎭' }, ['local']),
  v('emoji-cologne-02', 'cologne', 2, 'Welcher Kölner Ort ist das?', 'Hohenzollernbrücke', ['Hohenzollernbrücke', 'Severinsbrücke', 'Deutzer Brücke', 'Rheinauhafen'], { kind: 'emoji', symbols: '❤️🔒🌉🚆' }, ['local']),

  // animals: German idioms with animals
  v('emoji-animals-01', 'animals', 1, 'Welche Redewendung ist das?', 'Schwein gehabt', ['Schwein gehabt', 'Die Sau rauslassen', 'Kein Schwein ruft an', 'Perlen vor die Säue'], { kind: 'emoji', symbols: '🐷🍀' }, ['classic']),
  v('emoji-animals-02', 'animals', 2, 'Welche Redewendung ist das?', 'Einen Kater haben', ['Einen Kater haben', 'Sich einen Affen antrinken', 'Einen Vogel haben', 'Einen Frosch im Hals haben'], { kind: 'emoji', symbols: '🐈🍻🤕' }, ['chat']),
  v('emoji-animals-03', 'animals', 2, 'Welche Redewendung ist das?', 'Die Katze im Sack kaufen', ['Die Katze im Sack kaufen', 'Die Katze aus dem Sack lassen', 'Wie die Katze um den Brei', 'Für die Katz sein'], { kind: 'emoji', symbols: '💶👜🐈❓' }, ['classic']),
  v('emoji-animals-04', 'animals', 3, 'Welche Redewendung ist das?', 'Eulen nach Athen tragen', ['Eulen nach Athen tragen', 'Den Bock zum Gärtner machen', 'Das Pferd von hinten aufzäumen', 'Mit den Hühnern aufstehen'], { kind: 'emoji', symbols: '🦉➡️🏛️🇬🇷' }, ['odd']),

  // world
  v('emoji-world-01', 'world', 1, 'Welche Stadt ist das?', 'New York', ['New York', 'Washington', 'Chicago', 'Boston'], { kind: 'emoji', symbols: '🍎🗽🚕' }, ['classic']),
  v('emoji-world-02', 'world', 2, 'Welche Stadt ist das?', 'Salzburg', ['Salzburg', 'Innsbruck', 'Hallstatt', 'Linz'], { kind: 'emoji', symbols: '🧂🏰🎹' }, ['classic']),
  v('emoji-world-03', 'world', 3, 'Welche Stadt ist das?', 'Bern', ['Bern', 'Zürich', 'Basel', 'Genf'], { kind: 'emoji', symbols: '🐻🏔️🧀🏛️' }, ['odd']),

  // food
  v('emoji-food-01', 'food', 1, 'Welches Essen ist das?', 'Hot Dog', ['Hot Dog', 'Currywurst', 'Corn Dog', 'Bratwurst'], { kind: 'emoji', symbols: '🔥🐶' }, ['classic']),
  v('emoji-food-02', 'food', 2, 'Welcher Kuchen ist das?', 'Bienenstich', ['Bienenstich', 'Honigkuchen', 'Donauwelle', 'Zuckerkuchen'], { kind: 'emoji', symbols: '🐝💉🍰' }, ['classic']),
  v('emoji-food-03', 'food', 2, 'Welches Gericht ist das?', 'Kaiserschmarrn', ['Kaiserschmarrn', 'Königsberger Klopse', 'Prinzregententorte', 'Arme Ritter'], { kind: 'emoji', symbols: '👑🥞🤪' }, ['classic']),
  v('emoji-food-04', 'food', 3, 'Welches kölsche Gericht ist das?', 'Himmel un Ääd', ['Himmel un Ääd', 'Halve Hahn', 'Kölsche Kaviar', 'Rievkooche'], { kind: 'emoji', symbols: '☁️🌍🍎🥔' }, ['local']),

  // brands
  v('emoji-brands-01', 'brands', 1, 'Welche Marke ist das?', 'Red Bull', ['Red Bull', 'Monster Energy', 'Rockstar', 'Burn'], { kind: 'emoji', symbols: '🔴🐂' }, ['classic']),
  v('emoji-brands-02', 'brands', 2, 'Welche Marke ist das?', 'Jägermeister', ['Jägermeister', 'Kleiner Feigling', 'Ramazzotti', 'Berentzen'], { kind: 'emoji', symbols: '🏹🦌🥇' }, ['classic']),
  v('emoji-brands-03', 'brands', 3, 'Welche Marke ist das?', 'Schwarzkopf', ['Schwarzkopf', 'Wella', 'Garnier', 'L’Oréal'], { kind: 'emoji', symbols: '⚫👤💇‍♀️' }, ['odd']),

  // screen (batch 2)
  v('emoji-screen-07', 'screen', 1, 'Welcher Film ist das?', 'Der König der Löwen', ['Der König der Löwen', 'Madagascar', 'Das Dschungelbuch', 'Bambi'], { kind: 'emoji', symbols: '🦁👑🌅🐗' }, ['classic']),
  v('emoji-screen-08', 'screen', 2, 'Welcher Film ist das?', 'Jurassic Park', ['Jurassic Park', 'Ice Age', 'King Kong', 'Godzilla'], { kind: 'emoji', symbols: '🦖🏝️🚙🦟' }, ['classic']),
  v('emoji-screen-09', 'screen', 3, 'Welcher Film ist das?', 'Die Truman Show', ['Die Truman Show', 'Und täglich grüßt das Murmeltier', 'Matrix', 'Pleasantville'], { kind: 'emoji', symbols: '📺🧍🌊🚪' }, ['classic']),
  v('emoji-screen-10', 'screen', 2, 'Welcher Film ist das?', 'Zurück in die Zukunft', ['Zurück in die Zukunft', 'Terminator', 'Interstellar', 'Looper'], { kind: 'emoji', symbols: '🚗⚡🕰️🔙' }, ['classic']),
  v('emoji-screen-11', 'screen', 1, 'Welche Serie ist das?', 'Haus des Geldes', ['Haus des Geldes', 'Narcos', 'Prison Break', 'Breaking Bad'], { kind: 'emoji', symbols: '🎭💰🏦🔴' }, ['current']),
  v('emoji-screen-12', 'screen', 3, 'Welcher Film ist das?', 'Das Schweigen der Lämmer', ['Das Schweigen der Lämmer', 'Sieben', 'Hannibal Rising', 'Psycho'], { kind: 'emoji', symbols: '🤫🐑🐑🍷' }, ['classic']),
  v('emoji-screen-13', 'screen', 2, 'Welche Serie ist das?', 'Squid Game', ['Squid Game', 'Alice in Borderland', 'The Walking Dead', 'Dark'], { kind: 'emoji', symbols: '🦑🎮⭕🔺🟥' }, ['current']),

  // music (batch 2)
  v('emoji-music-06', 'music', 2, 'Welcher Song ist das?', 'Purple Rain', ['Purple Rain', 'November Rain', 'Singin’ in the Rain', 'Here Comes the Rain Again'], { kind: 'emoji', symbols: '🟣🌧️' }, ['classic']),
  v('emoji-music-07', 'music', 1, 'Welcher Song ist das?', 'Highway to Hell', ['Highway to Hell', 'Stairway to Heaven', 'Hells Bells', 'Born to Be Wild'], { kind: 'emoji', symbols: '🛣️➡️🔥😈' }, ['classic']),
  v('emoji-music-08', 'music', 1, 'Welcher Song ist das?', '99 Luftballons', ['99 Luftballons', 'Major Tom', 'Da Da Da', 'Sternenhimmel'], { kind: 'emoji', symbols: '9️⃣9️⃣🎈' }, ['classic']),
  v('emoji-music-09', 'music', 3, 'Welcher Song ist das?', 'Smells Like Teen Spirit', ['Smells Like Teen Spirit', 'Come as You Are', 'Teenage Dirtbag', 'Basket Case'], { kind: 'emoji', symbols: '👃🧒👻' }, ['classic']),
  v('emoji-music-10', 'music', 2, 'Welche Band ist das?', 'Coldplay', ['Coldplay', 'Snow Patrol', 'Keane', 'Imagine Dragons'], { kind: 'emoji', symbols: '🥶▶️' }, ['current']),
  v('emoji-music-11', 'music', 3, 'Welcher Song ist das?', 'Total Eclipse of the Heart', ['Total Eclipse of the Heart', 'Heart of Glass', 'Moonlight Shadow', 'Heartbreaker'], { kind: 'emoji', symbols: '🌑☀️❤️' }, ['classic']),

  // knowledge: German idioms (batch 2)
  v('emoji-knowledge-05', 'knowledge', 2, 'Welche Redewendung ist das?', 'Tomaten auf den Augen haben', ['Tomaten auf den Augen haben', 'Rot sehen', 'Ein Auge zudrücken', 'Ins Auge gehen'], { kind: 'emoji', symbols: '🍅🍅👀' }, ['classic']),
  v('emoji-knowledge-06', 'knowledge', 3, 'Welche Redewendung ist das?', 'Den Nagel auf den Kopf treffen', ['Den Nagel auf den Kopf treffen', 'Nägel mit Köpfen machen', 'Den Kopf in den Sand stecken', 'Auf dem Holzweg sein'], { kind: 'emoji', symbols: '🔨📌🧠🎯' }, ['classic']),
  v('emoji-knowledge-07', 'knowledge', 3, 'Welche Redewendung ist das?', 'Jemandem einen Bären aufbinden', ['Jemandem einen Bären aufbinden', 'Jemandem einen Bärendienst erweisen', 'Jemandem auf den Leim gehen', 'Jemandem die Leviten lesen'], { kind: 'emoji', symbols: '🐻🎀🧍🤥' }, ['odd']),
  v('emoji-knowledge-08', 'knowledge', 2, 'Welche Redewendung ist das?', 'Tote Hose', ['Tote Hose', 'Die Hosen anhaben', 'In die Hose gehen', 'Das Herz rutscht in die Hose'], { kind: 'emoji', symbols: '💀👖' }, ['chat']),
  v('emoji-knowledge-09', 'knowledge', 1, 'Welche Redewendung ist das?', 'Das ist nicht mein Bier', ['Das ist nicht mein Bier', 'Bier auf Wein, das lass sein', 'Ein Fass aufmachen', 'Hopfen und Malz verloren'], { kind: 'emoji', symbols: '🚫🙋🍺' }, ['chat']),

  // animals: German idioms with animals (batch 2)
  v('emoji-animals-05', 'animals', 1, 'Welche Redewendung ist das?', 'Einen Frosch im Hals haben', ['Einen Frosch im Hals haben', 'Sei kein Frosch', 'Die Kröte schlucken', 'Einen Kloß im Hals haben'], { kind: 'emoji', symbols: '🐸🗣️😮‍💨' }, ['classic']),
  v('emoji-animals-06', 'animals', 2, 'Welche Redewendung ist das?', 'Da steppt der Bär', ['Da steppt der Bär', 'Der Bär ist los', 'Einen Bärenhunger haben', 'Bärenstark sein'], { kind: 'emoji', symbols: '🐻🕺🎉' }, ['chat']),
  v('emoji-animals-07', 'animals', 2, 'Welche Redewendung ist das?', 'Aus einer Mücke einen Elefanten machen', ['Aus einer Mücke einen Elefanten machen', 'Wie ein Elefant im Porzellanladen', 'Die Fliege machen', 'Zwei Fliegen mit einer Klappe schlagen'], { kind: 'emoji', symbols: '🦟➡️🐘' }, ['classic']),
  v('emoji-animals-08', 'animals', 3, 'Welche Redewendung ist das?', 'Hahn im Korb', ['Hahn im Korb', 'Danach kräht kein Hahn', 'Ein blindes Huhn findet auch mal ein Korn', 'Mit den Hühnern aufstehen'], { kind: 'emoji', symbols: '🐓🧺👩👩👩' }, ['odd']),

  // world (batch 2)
  v('emoji-world-04', 'world', 1, 'Welche Stadt ist das?', 'Paris', ['Paris', 'Lyon', 'Brüssel', 'Rom'], { kind: 'emoji', symbols: '🗼🥖🍷' }, ['classic']),
  v('emoji-world-05', 'world', 2, 'Welche Stadt ist das?', 'Hamburg', ['Hamburg', 'Bremen', 'Kiel', 'Rostock'], { kind: 'emoji', symbols: '⚓🐟🍔' }, ['classic']),
  v('emoji-world-06', 'world', 3, 'Welche Stadt ist das?', 'Kopenhagen', ['Kopenhagen', 'Oslo', 'Stockholm', 'Amsterdam'], { kind: 'emoji', symbols: '🧜‍♀️🚲🎡🇩🇰' }, ['classic']),
  v('emoji-world-07', 'world', 2, 'Welches Land ist das?', 'Island', ['Island', 'Norwegen', 'Grönland', 'Finnland'], { kind: 'emoji', symbols: '🧊🌋🐴♨️' }, ['classic']),

  // food (batch 2)
  v('emoji-food-05', 'food', 3, 'Welches Gericht ist das?', 'Strammer Max', ['Strammer Max', 'Bauernfrühstück', 'Hoppel-Poppel', 'Arme Ritter'], { kind: 'emoji', symbols: '💪👨🍞🍳' }, ['classic']),
  v('emoji-food-06', 'food', 2, 'Welches Gericht ist das?', 'Falscher Hase', ['Falscher Hase', 'Hasenpfeffer', 'Königsberger Klopse', 'Leberkäse'], { kind: 'emoji', symbols: '🤥🐇🍖' }, ['classic']),
  v('emoji-food-07', 'food', 1, 'Welcher Cocktail ist das?', 'Sex on the Beach', ['Sex on the Beach', 'Tequila Sunrise', 'Piña Colada', 'Swimming Pool'], { kind: 'emoji', symbols: '🔞🏖️🍹' }, ['chat']),
  v('emoji-food-08', 'food', 2, 'Welcher Cocktail ist das?', 'Tequila Sunrise', ['Tequila Sunrise', 'Mai Tai', 'Bloody Mary', 'Planter’s Punch'], { kind: 'emoji', symbols: '🌵🥃🌅' }, ['classic']),

  // brands (batch 2)
  v('emoji-brands-04', 'brands', 1, 'Welche Marke ist das?', 'Puma', ['Puma', 'Lacoste', 'Fila', 'Jaguar'], { kind: 'emoji', symbols: '🐆👟' }, ['classic']),
  v('emoji-brands-05', 'brands', 2, 'Welche Marke ist das?', 'Lacoste', ['Lacoste', 'Fred Perry', 'Ralph Lauren', 'Tommy Hilfiger'], { kind: 'emoji', symbols: '🐊👕🎾' }, ['classic']),
  v('emoji-brands-06', 'brands', 2, 'Welche Marke ist das?', 'Shell', ['Shell', 'BP', 'Aral', 'Total'], { kind: 'emoji', symbols: '🐚⛽' }, ['classic']),
  v('emoji-brands-07', 'brands', 3, 'Welche Marke ist das?', 'Rotkäppchen', ['Rotkäppchen', 'Mumm', 'Freixenet', 'Henkell'], { kind: 'emoji', symbols: '🔴🧢👧🥂' }, ['odd']),

  // cologne (batch 2)
  v('emoji-cologne-03', 'cologne', 1, 'Welcher Kölner Ort ist das?', 'Schokoladenmuseum', ['Schokoladenmuseum', 'Duftmuseum', 'Museum Ludwig', 'Römisch-Germanisches Museum'], { kind: 'emoji', symbols: '🍫🏛️🌊' }, ['local']),
  v('emoji-cologne-04', 'cologne', 2, 'Welche Kölner Sage ist das?', 'Heinzelmännchen', ['Heinzelmännchen', 'Tünnes und Schäl', 'Kallendresser', 'Jan von Werth'], { kind: 'emoji', symbols: '🧝🧝🌙🧹' }, ['local']),
  v('emoji-cologne-05', 'cologne', 3, 'Welcher Karnevalsbegriff ist das?', 'Strüßjer', ['Strüßjer', 'Bützje', 'Kamelle', 'Fastelovend'], { kind: 'emoji', symbols: '💐💐🎉🚃' }, ['local']),

  // gaming
  v('emoji-gaming-01', 'gaming', 1, 'Welches Spiel ist das?', 'Angry Birds', ['Angry Birds', 'Flappy Bird', 'Cut the Rope', 'Fruit Ninja'], { kind: 'emoji', symbols: '😡🐦🐷🏗️' }, ['classic']),
  v('emoji-gaming-02', 'gaming', 1, 'Welches Spiel ist das?', 'Minecraft', ['Minecraft', 'Roblox', 'Terraria', 'Fortnite'], { kind: 'emoji', symbols: '⛏️🧱🟩💥' }, ['classic']),
  v('emoji-gaming-03', 'gaming', 2, 'Welches Spiel ist das?', 'Fruit Ninja', ['Fruit Ninja', 'Candy Crush', 'Temple Run', 'Subway Surfers'], { kind: 'emoji', symbols: '🍉🔪🥷' }, ['nostalgia']),
  v('emoji-gaming-04', 'gaming', 2, 'Welches Spiel ist das?', 'Among Us', ['Among Us', 'Fall Guys', 'Phasmophobia', 'Lethal Company'], { kind: 'emoji', symbols: '🧑‍🚀🔪🚨🗳️' }, ['current']),
  v('emoji-gaming-05', 'gaming', 3, 'Welches Spiel ist das?', 'Untitled Goose Game', ['Untitled Goose Game', 'Goat Simulator', 'Stray', 'Duck Game'], { kind: 'emoji', symbols: '🪿😈🏡🔔' }, ['odd']),
  v('emoji-gaming-06', 'gaming', 3, 'Welches Spiel ist das?', 'Portal', ['Portal', 'Half-Life', 'The Talos Principle', 'Antichamber'], { kind: 'emoji', symbols: '🔵🟠🍰🤖' }, ['classic']),

  // nostalgia
  v('emoji-nostalgia-01', 'nostalgia', 1, 'Welches Spielzeug ist das?', 'Tamagotchi', ['Tamagotchi', 'Furby', 'Game Boy', 'Pokémon-Karten'], { kind: 'emoji', symbols: '🥚📟🐣' }, ['nostalgia']),
  v('emoji-nostalgia-02', 'nostalgia', 1, 'Welche Sendung ist das?', 'Wer wird Millionär?', ['Wer wird Millionär?', 'Glücksrad', 'Der Preis ist heiß', 'Schlag den Raab'], { kind: 'emoji', symbols: '❓💶💶💶🎙️' }, ['nostalgia']),
  v('emoji-nostalgia-03', 'nostalgia', 2, 'Welcher Internet-Trend ist das?', 'Ice Bucket Challenge', ['Ice Bucket Challenge', 'Harlem Shake', 'Mannequin Challenge', 'Planking'], { kind: 'emoji', symbols: '🧊🪣🥶📹' }, ['nostalgia']),
  v('emoji-nostalgia-04', 'nostalgia', 3, 'Welcher Internet-Trend ist das?', 'Mannequin Challenge', ['Mannequin Challenge', 'Harlem Shake', 'Planking', 'Ice Bucket Challenge'], { kind: 'emoji', symbols: '🧍🧍‍♀️⏸️📹🎶' }, ['nostalgia']),
]
