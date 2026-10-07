import { v, type QuestionSeed } from './seed'

// Generated outlines from app/data/geo/shapes.ts. `focus` picks the detail the zoom starts on.
export const silhouetteQuestions: readonly QuestionSeed[] = [
  // World – easy
  v('silhouette-world-01', 'world', 1, 'Welches Land ist das?', 'Italien', ['Italien', 'Griechenland', 'Kroatien', 'Spanien'], { kind: 'silhouette', shape: 'ITA', focus: [0.25, 0.68] }, ['classic']),
  v('silhouette-world-02', 'world', 1, 'Zu welchem Land gehört dieser Umriss?', 'Australien', ['Australien', 'Neuseeland', 'Madagaskar', 'Indonesien'], { kind: 'silhouette', shape: 'AUS', focus: [0.82, 0.9] }, ['classic']),
  v('silhouette-world-03', 'world', 1, 'Welches Land versteckt sich hier?', 'Indien', ['Indien', 'Pakistan', 'Sri Lanka', 'Bangladesch'], { kind: 'silhouette', shape: 'IND', focus: [0.3, 0.85] }, ['classic']),
  v('silhouette-world-04', 'world', 1, 'Welches Land hat diese Form?', 'Vereinigtes Königreich', ['Vereinigtes Königreich', 'Irland', 'Island', 'Neuseeland'], { kind: 'silhouette', shape: 'GBR', focus: [0.6, 0.45] }, ['classic']),
  v('silhouette-world-05', 'world', 1, 'Welches Land beginnt mit diesem Zipfel?', 'USA', ['USA', 'Kanada', 'Mexiko', 'Australien'], { kind: 'silhouette', shape: 'USA', focus: [0.82, 0.9] }, ['classic']),
  v('silhouette-world-06', 'world', 1, 'Welches Land sieht aus wie ein Sechseck?', 'Frankreich', ['Frankreich', 'Spanien', 'Deutschland', 'Polen'], { kind: 'silhouette', shape: 'FRA', focus: [0.95, 0.9] }, ['classic']),

  // World – medium
  v('silhouette-world-07', 'world', 2, 'Welches Land zerfranst hier so schön?', 'Norwegen', ['Norwegen', 'Chile', 'Schweden', 'Finnland'], { kind: 'silhouette', shape: 'NOR', focus: [0.15, 0.85] }, ['classic']),
  v('silhouette-world-08', 'world', 2, 'Welches Land ist so lang und dünn?', 'Chile', ['Chile', 'Norwegen', 'Argentinien', 'Peru'], { kind: 'silhouette', shape: 'CHL', focus: [0.55, 0.92] }, ['classic']),
  v('silhouette-world-09', 'world', 2, 'Wessen Küste ist das? Urlaubsgefühle!', 'Kroatien', ['Kroatien', 'Slowenien', 'Albanien', 'Montenegro'], { kind: 'silhouette', shape: 'HRV', focus: [0.7, 0.85] }, ['classic']),
  v('silhouette-world-10', 'world', 2, 'Welcher Inselstaat ist das?', 'Japan', ['Japan', 'Philippinen', 'Südkorea', 'Taiwan'], { kind: 'silhouette', shape: 'JPN', focus: [0.12, 0.88] }, ['classic']),
  v('silhouette-world-11', 'world', 2, 'Zu welchem Land gehören diese Finger?', 'Griechenland', ['Griechenland', 'Albanien', 'Türkei', 'Zypern'], { kind: 'silhouette', shape: 'GRC', focus: [0.32, 0.68] }, ['classic']),
  v('silhouette-world-12', 'world', 2, 'Welches Land hat diese lange Halbinsel?', 'Mexiko', ['Mexiko', 'Kuba', 'Guatemala', 'Kolumbien'], { kind: 'silhouette', shape: 'MEX', focus: [0.12, 0.3] }, ['classic']),
  v('silhouette-world-13', 'world', 2, 'Welche Insel ist das? Rum und Zigarren …', 'Kuba', ['Kuba', 'Jamaika', 'Dominikanische Republik', 'Puerto Rico'], { kind: 'silhouette', shape: 'CUB', focus: [0.05, 0.3] }, ['classic']),

  // World – hard
  v('silhouette-world-14', 'world', 3, 'Welches Land in Südostasien ist das?', 'Laos', ['Laos', 'Kambodscha', 'Myanmar', 'Vietnam'], { kind: 'silhouette', shape: 'LAO', focus: [0.7, 0.85] }, ['odd']),
  v('silhouette-world-15', 'world', 3, 'Welche Insel hat die Form einer Träne?', 'Sri Lanka', ['Sri Lanka', 'Madagaskar', 'Taiwan', 'Zypern'], { kind: 'silhouette', shape: 'LKA', focus: [0.35, 0.08] }, ['odd']),
  v('silhouette-world-16', 'world', 3, 'Welches mittelamerikanische Land ist das?', 'Panama', ['Panama', 'Costa Rica', 'Nicaragua', 'Honduras'], { kind: 'silhouette', shape: 'PAN', focus: [0.9, 0.65] }, ['odd']),
  v('silhouette-world-17', 'world', 3, 'Zu welchem Land gehört dieser Stiel?', 'Österreich', ['Österreich', 'Schweiz', 'Tschechien', 'Ungarn'], { kind: 'silhouette', shape: 'AUT', focus: [0.05, 0.6] }, ['odd']),
  v('silhouette-world-18', 'world', 3, 'Welches Land in Ostafrika ist das?', 'Somalia', ['Somalia', 'Eritrea', 'Kenia', 'Äthiopien'], { kind: 'silhouette', shape: 'SOM', focus: [0.72, 0.1] }, ['odd']),

  // Cologne & Germany – German states
  v('silhouette-cologne-01', 'cologne', 1, 'Welches Bundesland ist das? Heimspiel!', 'Nordrhein-Westfalen', ['Nordrhein-Westfalen', 'Niedersachsen', 'Hessen', 'Rheinland-Pfalz'], { kind: 'silhouette', shape: 'DE-NW', focus: [0.2, 0.65] }, ['local']),
  v('silhouette-cologne-02', 'cologne', 1, 'Welches Bundesland ist das?', 'Bayern', ['Bayern', 'Baden-Württemberg', 'Sachsen', 'Thüringen'], { kind: 'silhouette', shape: 'DE-BY', focus: [0.5, 0.5] }, ['local']),
  v('silhouette-cologne-03', 'cologne', 2, 'Welches Bundesland hat diese Form?', 'Schleswig-Holstein', ['Schleswig-Holstein', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Hamburg'], { kind: 'silhouette', shape: 'DE-SH', focus: [0.05, 0.1] }, ['local']),
  v('silhouette-cologne-04', 'cologne', 2, 'Welches Bundesland hat ein Loch in der Mitte?', 'Brandenburg', ['Brandenburg', 'Sachsen-Anhalt', 'Mecklenburg-Vorpommern', 'Sachsen'], { kind: 'silhouette', shape: 'DE-BB', focus: [0.55, 0.45] }, ['local', 'odd']),
  v('silhouette-cologne-05', 'cologne', 2, 'Zu welchem Bundesland gehört diese Küste?', 'Mecklenburg-Vorpommern', ['Mecklenburg-Vorpommern', 'Schleswig-Holstein', 'Brandenburg', 'Niedersachsen'], { kind: 'silhouette', shape: 'DE-MV', focus: [0.75, 0.2] }, ['local']),
  v('silhouette-cologne-06', 'cologne', 3, 'Welches Bundesland versteckt sich hier?', 'Sachsen', ['Sachsen', 'Thüringen', 'Sachsen-Anhalt', 'Brandenburg'], { kind: 'silhouette', shape: 'DE-SN', focus: [0.1, 0.8] }, ['local']),
  v('silhouette-cologne-07', 'cologne', 3, 'Welches Bundesland ist so schmal?', 'Sachsen-Anhalt', ['Sachsen-Anhalt', 'Hessen', 'Thüringen', 'Rheinland-Pfalz'], { kind: 'silhouette', shape: 'DE-ST', focus: [0.5, 0.15] }, ['local']),
  v('silhouette-cologne-08', 'cologne', 3, 'Welches kleine Bundesland ist das?', 'Saarland', ['Saarland', 'Berlin', 'Hamburg', 'Bremen'], { kind: 'silhouette', shape: 'DE-SL', focus: [0.05, 0.3] }, ['local']),
]
