import { v, type QuestionSeed } from './seed'

export const quartetQuestions: readonly QuestionSeed[] = [
  // animals
  v('quartet-animals-01', 'animals', 1, 'Wer ist auf dieser Karte so gemütlich?', 'Faultier', ['Faultier', 'Koala', 'Plumplori', 'Lemur'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'ca. 4 kg' },
    { label: 'Luft anhalten', value: 'bis ca. 40 Min.' },
    { label: 'Im Fell', value: 'wachsen Algen' },
    { label: 'Tempo', value: 'unter 0,3 km/h' },
  ] }, ['odd']),
  v('quartet-animals-02', 'animals', 1, 'Wer steht auf dieser Karte?', 'Giraffe', ['Giraffe', 'Okapi', 'Kamel', 'Elefant'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'bis ca. 1,9 t' },
    { label: 'Schlaf pro Tag', value: 'unter 2 Std.' },
    { label: 'Zunge', value: 'ca. 50 cm lang' },
    { label: 'Größe', value: 'bis ca. 5,5 m' },
  ] }, ['classic']),
  v('quartet-animals-03', 'animals', 1, 'Welche Raubkatze hat diese Werte?', 'Gepard', ['Gepard', 'Leopard', 'Jaguar', 'Puma'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'ca. 20–70 kg' },
    { label: 'Lebenserwartung', value: 'ca. 10–12 Jahre' },
    { label: 'Brüllen', value: 'kann er nicht' },
    { label: 'Höchsttempo', value: 'ca. 100 km/h' },
  ] }, ['classic']),
  v('quartet-animals-04', 'animals', 2, 'Welcher Vogel ist das?', 'Kolibri', ['Kolibri', 'Zaunkönig', 'Mauersegler', 'Eisvogel'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'ca. 2 bis 20 g' },
    { label: 'Laufen', value: 'kann er kaum' },
    { label: 'Herzschlag', value: 'bis ca. 1.200/Min.' },
    { label: 'Flügelschlag', value: 'bis 80 pro Sek.' },
  ] }, ['odd']),
  v('quartet-animals-05', 'animals', 2, 'Wer versteckt sich hinter dieser Karte?', 'Blauwal', ['Blauwal', 'Pottwal', 'Finnwal', 'Walhai'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Länge', value: 'bis ca. 30 m' },
    { label: 'Gewicht', value: 'weit über 100 t' },
    { label: 'Herzschlag', value: 'ab 2 pro Minute' },
    { label: 'Herz wiegt', value: 'ca. 180 kg' },
  ] }, ['classic']),
  v('quartet-animals-06', 'animals', 2, 'Welcher Koloss ist das?', 'Flusspferd', ['Flusspferd', 'Nashorn', 'Tapir', 'Seekuh'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'bis ca. 3 t' },
    { label: 'Lebenserwartung', value: 'ca. 40 Jahre' },
    { label: 'Höchsttempo', value: 'ca. 30 km/h' },
    { label: 'Sonnencreme', value: 'schwitzt es selbst' },
  ] }, ['odd']),
  v('quartet-animals-07', 'animals', 2, 'Welches Schwergewicht ist das?', 'Elefant', ['Elefant', 'Nashorn', 'Flusspferd', 'Walross'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'bis ca. 6 t' },
    { label: 'Lebenserwartung', value: 'ca. 60–70 Jahre' },
    { label: 'Schwangerschaft', value: 'ca. 22 Monate' },
    { label: 'Springen', value: 'kann er nicht' },
  ] }, ['classic']),
  v('quartet-animals-08', 'animals', 3, 'Welches Meerestier ist das?', 'Krake', ['Krake', 'Kalmar', 'Sepia', 'Nautilus'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Lebenserwartung', value: 'ca. 1–2 Jahre' },
    { label: 'Knochen', value: 'keine' },
    { label: 'Nervenzellen', value: 'ca. ⅔ in den Armen' },
    { label: 'Arme', value: '8' },
  ] }, ['odd']),
  v('quartet-animals-09', 'animals', 3, 'Wer buddelt sich durch dieses Quartett?', 'Wombat', ['Wombat', 'Dachs', 'Biber', 'Murmeltier'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Gewicht', value: 'ca. 20–35 kg' },
    { label: 'Höchsttempo', value: 'bis ca. 40 km/h' },
    { label: 'Beutel', value: 'öffnet nach hinten' },
    { label: 'Geheimwaffe', value: 'sein harter Po' },
  ] }, ['odd']),
  v('quartet-animals-10', 'animals', 3, 'Welcher Vogel hat diese Werte?', 'Kaiserpinguin', ['Kaiserpinguin', 'Königspinguin', 'Eselspinguin', 'Albatros'], { kind: 'quartet', heading: 'Tier', stats: [
    { label: 'Größe', value: 'ca. 1,2 m' },
    { label: 'Gewicht', value: 'bis ca. 45 kg' },
    { label: 'Tauchtiefe', value: 'über 500 m' },
    { label: 'Brütet das Ei', value: 'Papa, ca. 2 Monate' },
  ] }, ['odd']),

  // world
  v('quartet-world-01', 'world', 1, 'Welches Land hat diese Werte?', 'Australien', ['Australien', 'Kanada', 'Neuseeland', 'Südafrika'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'ca. 27 Mio.' },
    { label: 'Fläche', value: 'ca. 7,7 Mio. km²' },
    { label: 'Landnachbarn', value: '0' },
    { label: 'Kängurus', value: 'mehr als Menschen' },
  ] }, ['classic']),
  v('quartet-world-02', 'world', 1, 'Welches Land steht auf dieser Karte?', 'Vatikanstadt', ['Vatikanstadt', 'Monaco', 'San Marino', 'Liechtenstein'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'unter 1.000' },
    { label: 'Fläche', value: 'ca. 0,44 km²' },
    { label: 'Nachbarländer', value: '1' },
    { label: 'Geldautomat', value: 'auf Latein' },
  ] }, ['odd']),
  v('quartet-world-03', 'world', 2, 'Welcher Riese ist das?', 'Kanada', ['Kanada', 'Russland', 'USA', 'Schweden'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'ca. 41 Mio.' },
    { label: 'Fläche', value: 'ca. 10 Mio. km²' },
    { label: 'Nachbarländer', value: '1' },
    { label: 'Küstenlinie', value: 'längste der Welt' },
    { label: 'Nationalgericht', value: 'Poutine' },
  ] }, ['classic']),
  v('quartet-world-04', 'world', 2, 'Welches Land gewinnt dieses Quartett?', 'Brasilien', ['Brasilien', 'Argentinien', 'Mexiko', 'Kolumbien'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'über 200 Mio.' },
    { label: 'Fläche', value: 'ca. 8,5 Mio. km²' },
    { label: 'Nachbarländer', value: '10' },
    { label: 'Nationalgericht', value: 'Feijoada' },
    { label: 'WM-Titel', value: '5' },
  ] }, ['classic']),
  v('quartet-world-05', 'world', 2, 'Welche Stadt versteckt sich hier?', 'Venedig', ['Venedig', 'Amsterdam', 'Brügge', 'Hamburg'], { kind: 'quartet', heading: 'Stadt', stats: [
    { label: 'Einw. Altstadt', value: 'unter 50.000' },
    { label: 'Inseln', value: 'ca. 120' },
    { label: 'Brücken', value: 'über 400' },
    { label: 'Eintritt', value: 'für Tagesgäste' },
  ] }, ['current']),
  v('quartet-world-06', 'world', 3, 'Welches Land steckt in diesem Quartett?', 'Island', ['Island', 'Irland', 'Norwegen', 'Neuseeland'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'unter 400.000' },
    { label: 'Fläche', value: 'ca. 103.000 km²' },
    { label: 'Nachbarländer', value: '0' },
    { label: 'Armee', value: 'gibt es keine' },
    { label: 'Spezialität', value: 'fermentierter Hai' },
  ] }, ['odd']),
  v('quartet-world-07', 'world', 3, 'Welches Land versteckt sich hier?', 'Mongolei', ['Mongolei', 'Kasachstan', 'Nepal', 'Bolivien'], { kind: 'quartet', heading: 'Land', stats: [
    { label: 'Einwohner', value: 'ca. 3,5 Mio.' },
    { label: 'Fläche', value: 'ca. 1,6 Mio. km²' },
    { label: 'Nachbarländer', value: '2' },
    { label: 'Hauptstadt', value: 'kälteste der Welt' },
  ] }, ['odd']),

  // food
  v('quartet-food-01', 'food', 1, 'Welches Gericht ist das?', 'Currywurst', ['Currywurst', 'Döner Kebab', 'Bratwurst', 'Frikadelle'], { kind: 'quartet', heading: 'Gericht', stats: [
    { label: 'Erfunden', value: '1949' },
    { label: 'Herkunft', value: 'Berlin' },
    { label: 'Hauptzutat', value: 'Brühwurst' },
    { label: 'Besonderheit', value: 'hat VW-Teilenummer' },
  ] }, ['classic']),
  v('quartet-food-02', 'food', 1, 'Welches Dessert steht auf dieser Karte?', 'Tiramisu', ['Tiramisu', 'Panna Cotta', 'Zabaione', 'Cannoli'], { kind: 'quartet', heading: 'Gericht', stats: [
    { label: 'Herkunft', value: 'Venetien' },
    { label: 'Erfunden', value: 'um 1970' },
    { label: 'Hauptzutat', value: 'Mascarpone' },
    { label: 'Übersetzt', value: '„Zieh mich hoch“' },
  ] }, ['classic']),
  v('quartet-food-03', 'food', 2, 'Welche Pizza ist das?', 'Pizza Hawaii', ['Pizza Hawaii', 'Pizza Tonno', 'Pizza Funghi', 'Pizza Salami'], { kind: 'quartet', heading: 'Gericht', stats: [
    { label: 'Erfunden', value: '1962' },
    { label: 'Herkunft', value: 'Kanada' },
    { label: 'Erfinder', value: 'ein Grieche' },
    { label: 'Streitpunkt', value: 'Obst obendrauf' },
  ] }, ['odd']),
  v('quartet-food-04', 'food', 2, 'Welcher Cocktail ist das?', 'Piña Colada', ['Piña Colada', 'Mojito', 'Caipirinha', 'Daiquiri'], { kind: 'quartet', heading: 'Getränk', stats: [
    { label: 'Hauptzutat', value: 'Rum' },
    { label: 'Nationaldrink', value: 'seit 1978' },
    { label: 'Herkunft', value: 'Puerto Rico' },
    { label: 'Außerdem drin', value: 'Kokos + Ananas' },
  ] }, ['classic']),
  v('quartet-food-05', 'food', 3, 'Welcher Drink hat diese Werte?', 'Gin Tonic', ['Gin Tonic', 'Cuba Libre', 'Moscow Mule', 'Aperol Spritz'], { kind: 'quartet', heading: 'Getränk', stats: [
    { label: 'Erfunden', value: '19. Jahrhundert' },
    { label: 'Herkunft', value: 'Britisch-Indien' },
    { label: 'Ursprünglich', value: 'gegen Malaria' },
    { label: 'Unter UV-Licht', value: 'leuchtet er' },
  ] }, ['odd']),
  v('quartet-food-06', 'food', 3, 'Welcher Salat steht auf dieser Karte?', 'Caesar Salad', ['Caesar Salad', 'Waldorfsalat', 'Cobb Salad', 'Salat Nizza'], { kind: 'quartet', heading: 'Gericht', stats: [
    { label: 'Erfunden', value: '1924' },
    { label: 'Herkunft', value: 'Tijuana, Mexiko' },
    { label: 'Hauptzutat', value: 'Romanasalat' },
    { label: 'Namensgeber', value: 'Koch, kein Kaiser' },
  ] }, ['odd']),

  // brands
  v('quartet-brands-01', 'brands', 1, 'Welche Marke ist das?', 'IKEA', ['IKEA', 'H&M', 'Volvo', 'Spotify'], { kind: 'quartet', heading: 'Marke', stats: [
    { label: 'Gegründet', value: '1943' },
    { label: 'Herkunft', value: 'Schweden' },
    { label: 'Gründer', value: 'Kamprad' },
    { label: 'Kantine', value: 'Köttbullar' },
  ] }, ['classic']),
  v('quartet-brands-02', 'brands', 1, 'Welche Sportmarke ist das?', 'Adidas', ['Adidas', 'Puma', 'Nike', 'Reebok'], { kind: 'quartet', heading: 'Marke', stats: [
    { label: 'Gegründet', value: '1949' },
    { label: 'Hauptsitz', value: 'Herzogenaurach' },
    { label: 'Gründer', value: 'Dassler' },
    { label: 'Streifen', value: '3' },
  ] }, ['classic']),
  v('quartet-brands-03', 'brands', 2, 'Welche Marke hat diese Werte?', 'Nivea', ['Nivea', 'Penaten', 'Bebe', 'Labello'], { kind: 'quartet', heading: 'Marke', stats: [
    { label: 'Creme seit', value: '1911' },
    { label: 'Hauptsitz', value: 'Hamburg' },
    { label: 'Name', value: 'lat. für „Schnee“' },
    { label: 'Klassiker', value: 'blaue Dose' },
  ] }, ['classic']),
  v('quartet-brands-04', 'brands', 2, 'Welche Marke versteckt sich hier?', 'Lego', ['Lego', 'Playmobil', 'Ravensburger', 'Mattel'], { kind: 'quartet', heading: 'Marke', stats: [
    { label: 'Gegründet', value: '1932' },
    { label: 'Herkunft', value: 'Dänemark' },
    { label: 'Name', value: 'aus „leg godt“' },
    { label: 'Kurios', value: 'baut meiste Reifen' },
    { label: 'Barfuß drauf', value: 'tut höllisch weh' },
  ] }, ['odd']),
  v('quartet-brands-05', 'brands', 3, 'Welcher Energydrink ist das?', 'Red Bull', ['Red Bull', 'Monster', 'Rockstar', 'Burn'], { kind: 'quartet', heading: 'Marke', stats: [
    { label: 'Marktstart', value: '1987' },
    { label: 'Hauptsitz', value: 'Fuschl am See' },
    { label: 'Gründer', value: 'Mateschitz' },
    { label: 'Vorbild', value: 'Drink aus Thailand' },
  ] }, ['odd']),

  // cologne
  v('quartet-cologne-01', 'cologne', 1, 'Welches Bauwerk ist das?', 'Neuschwanstein', ['Neuschwanstein', 'Burg Hohenzollern', 'Schloss Linderhof', 'Wartburg'], { kind: 'quartet', heading: 'Bauwerk', stats: [
    { label: 'Baubeginn', value: '1869' },
    { label: 'Bauherr', value: 'ein König' },
    { label: 'Fertig', value: 'nie ganz' },
    { label: 'Vorbild für', value: 'Disney-Schloss' },
  ] }, ['classic']),
  v('quartet-cologne-02', 'cologne', 2, 'Welche Stadt hat diese Werte?', 'Düsseldorf', ['Düsseldorf', 'Köln', 'Duisburg', 'Bonn'], { kind: 'quartet', heading: 'Stadt', stats: [
    { label: 'Einwohner', value: 'ca. 630.000' },
    { label: 'Fluss', value: 'Rhein' },
    { label: 'Bier', value: 'Alt' },
    { label: 'Altstadt', value: '„längste Theke“' },
  ] }, ['local', 'chat']),
  v('quartet-cologne-03', 'cologne', 2, 'Welches Bauwerk steht auf dieser Karte?', 'Elbphilharmonie', ['Elbphilharmonie', 'Hamburger Michel', 'Kölner Philharmonie', 'Berliner Philharmonie'], { kind: 'quartet', heading: 'Bauwerk', stats: [
    { label: 'Eröffnet', value: '2017' },
    { label: 'Höhe', value: 'ca. 110 m' },
    { label: 'Steht auf', value: 'altem Speicher' },
    { label: 'Kosten', value: 'ca. 866 Mio. €' },
  ] }, ['current']),
  v('quartet-cologne-04', 'cologne', 3, 'Welcher Turm ist das?', 'Berliner Fernsehturm', ['Berliner Fernsehturm', 'Colonius', 'Rheinturm', 'Olympiaturm'], { kind: 'quartet', heading: 'Bauwerk', stats: [
    { label: 'Eröffnet', value: '1969' },
    { label: 'Höhe', value: 'ca. 368 m' },
    { label: 'Bei Sonne', value: 'Kreuz auf Kugel' },
    { label: 'Rekord', value: 'höchster in DE' },
  ] }, ['classic']),
]
