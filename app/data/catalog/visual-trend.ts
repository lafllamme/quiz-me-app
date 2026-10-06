import { v, type QuestionSeed } from './seed'

// Schematic monthly search interest (0-100), one value per month starting January of `from`.
export const trendQuestions: readonly QuestionSeed[] = [
  v('trend-internet-01', 'internet', 2, 'Wonach wurde hier gegoogelt?', 'Pokémon GO', ['Pokémon GO', 'Fidget Spinner', 'Ice Bucket Challenge', 'Harlem Shake'], {
    kind: 'trend',
    from: 2015,
    values: [3, 2, 3, 4, 4, 3, 4, 4, 2, 4, 2, 2, 4, 2, 3, 2, 4, 6, 100, 68, 34, 20, 16, 16, 14, 13, 12, 9, 9, 9, 7, 9, 7, 9, 7, 6, 8, 8, 8, 8, 8, 8, 6, 7, 6, 7, 7, 6],
  }, ['nostalgia']),
  v('trend-internet-02', 'internet', 3, 'Welcher Hype war das?', 'Harlem Shake', ['Harlem Shake', 'Gangnam Style', 'Ice Bucket Challenge', 'Pokémon GO'], {
    kind: 'trend',
    from: 2012,
    values: [3, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 100, 38, 14, 13, 10, 8, 7, 5, 4, 5, 4, 4, 3, 4, 3, 4, 2, 2, 4, 3, 3, 4, 2, 3, 3, 3, 4, 2, 2, 3, 2, 2, 4, 4, 3],
  }, ['nostalgia']),
  v('trend-internet-03', 'internet', 2, 'Wonach wurde hier gegoogelt?', 'Among Us', ['Among Us', 'Squid Game', 'Clubhouse', 'BeReal'], {
    kind: 'trend',
    from: 2019,
    values: [3, 3, 2, 2, 4, 2, 3, 2, 4, 4, 3, 2, 4, 2, 2, 3, 4, 3, 6, 22, 68, 100, 74, 48, 38, 33, 26, 24, 19, 18, 16, 15, 14, 13, 10, 10, 11, 10, 11, 10, 11, 10, 9, 10, 9, 9, 10, 9],
  }, ['current']),
  v('trend-internet-04', 'internet', 3, 'Welcher Hype war das?', 'Wordle', ['Wordle', 'Clubhouse', 'Dalgona Coffee', 'Squid Game'], {
    kind: 'trend',
    from: 2020,
    values: [2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 2, 3, 4, 72, 100, 74, 52, 46, 40, 38, 33, 32, 28, 25, 25, 23, 22, 22, 20, 20, 18, 18, 18, 17, 17, 18, 17],
  }, ['current']),
  v('trend-internet-05', 'internet', 1, 'Wonach wurde hier gegoogelt?', 'Dubai-Schokolade', ['Dubai-Schokolade', 'Labubu', 'BeReal', 'Wordle'], {
    kind: 'trend',
    from: 2022,
    values: [2, 3, 2, 2, 3, 3, 2, 3, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 5, 22, 74, 100, 56, 38, 31, 28, 24, 22, 18, 17, 16, 15, 16, 14],
  }, ['current']),
  v('trend-knowledge-01', 'knowledge', 1, 'Wonach wurde hier gegoogelt?', 'Glühwein', ['Glühwein', 'Sonnencreme', 'Spargel', 'Kürbis'], {
    kind: 'trend',
    from: 2021,
    values: [8, 3, 2, 2, 2, 2, 2, 5, 6, 12, 36, 86, 5, 3, 4, 4, 2, 2, 3, 4, 3, 10, 39, 94, 5, 3, 2, 4, 2, 3, 2, 4, 5, 11, 42, 100, 7, 4, 3, 4, 4, 2, 3, 5, 4, 14, 41, 97],
  }, ['classic']),
  v('trend-knowledge-02', 'knowledge', 3, 'Welches Saisongemüse wird hier gesucht?', 'Spargel', ['Spargel', 'Bärlauch', 'Erdbeeren', 'Pfifferlinge'], {
    kind: 'trend',
    from: 2021,
    values: [4, 7, 15, 64, 92, 39, 10, 5, 3, 2, 4, 2, 4, 3, 15, 70, 100, 42, 6, 5, 4, 2, 3, 2, 4, 3, 12, 67, 95, 40, 7, 4, 4, 4, 5, 3, 5, 5, 13, 68, 97, 41, 7, 4, 3, 2, 2, 2],
  }, ['classic']),
  v('trend-knowledge-03', 'knowledge', 2, 'Wonach wurde hier gegoogelt?', 'Heuschnupfen', ['Heuschnupfen', 'Grippeimpfung', 'Sonnenbrand', 'Glatteis'], {
    kind: 'trend',
    from: 2021,
    values: [3, 5, 25, 67, 90, 63, 27, 13, 7, 6, 3, 3, 6, 8, 27, 72, 97, 68, 29, 16, 7, 5, 2, 2, 4, 8, 28, 74, 100, 70, 30, 15, 5, 3, 4, 4, 5, 7, 26, 70, 94, 66, 28, 14, 5, 3, 4, 4],
  }, ['classic']),
  v('trend-knowledge-04', 'knowledge', 1, 'Wonach wurde hier gegoogelt?', 'Kürbis schnitzen', ['Kürbis schnitzen', 'Ostereier färben', 'Plätzchen backen', 'Grillen'], {
    kind: 'trend',
    from: 2021,
    values: [2, 2, 2, 2, 2, 4, 4, 2, 19, 88, 6, 2, 3, 4, 2, 2, 2, 3, 2, 3, 21, 95, 8, 2, 3, 4, 4, 3, 3, 2, 3, 4, 21, 97, 6, 3, 2, 2, 2, 4, 3, 4, 3, 2, 22, 100, 7, 2],
  }, ['classic']),
  v('trend-knowledge-05', 'knowledge', 2, 'Was sucht Deutschland zweimal im Jahr?', 'Zeitumstellung', ['Zeitumstellung', 'Heuschnupfen', 'Glühwein', 'Sommerferien'], {
    kind: 'trend',
    from: 2021,
    values: [6, 7, 70, 8, 5, 3, 2, 4, 4, 90, 8, 2, 5, 7, 73, 8, 3, 3, 3, 2, 6, 94, 9, 2, 5, 5, 75, 8, 2, 4, 3, 4, 8, 96, 12, 2, 6, 5, 78, 9, 2, 3, 2, 2, 6, 100, 9, 5],
  }, ['odd']),
  v('trend-cologne-01', 'cologne', 1, 'Wonach wurde hier gegoogelt?', 'Karnevalskostüm', ['Karnevalskostüm', 'Halloweenkostüm', 'Weihnachtsmarkt', 'Freibad'], {
    kind: 'trend',
    from: 2022,
    values: [21, 62, 7, 3, 2, 2, 2, 2, 2, 7, 13, 4, 34, 100, 7, 3, 2, 2, 2, 2, 2, 4, 13, 4, 31, 90, 4, 2, 2, 4, 2, 2, 2, 8, 16, 2, 32, 95, 6, 3, 2, 2, 4, 4, 3, 7, 15, 5],
  }, ['local']),
  v('trend-cologne-02', 'cologne', 3, 'Welches Kölner Event ist das?', 'Gamescom', ['Gamescom', 'Kölner Lichter', 'Rosenmontag', 'Weihnachtsmarkt'], {
    kind: 'trend',
    from: 2022,
    values: [4, 4, 2, 4, 3, 6, 16, 82, 11, 6, 2, 2, 2, 3, 4, 3, 5, 9, 18, 92, 9, 6, 4, 3, 2, 5, 3, 2, 3, 6, 20, 100, 10, 6, 3, 4, 4, 2, 5, 3, 4, 5, 19, 97, 8, 4, 2, 4],
  }, ['local']),
  v('trend-cologne-03', 'cologne', 2, 'Wonach wurde hier gegoogelt?', '9-Euro-Ticket', ['9-Euro-Ticket', 'Deutschlandticket', 'Corona-Warn-App', 'Heizungsgesetz'], {
    kind: 'trend',
    from: 2020,
    values: [3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 3, 4, 28, 30, 72, 100, 62, 64, 14, 8, 5, 5, 4, 5, 3, 5, 5, 4, 4, 3, 3, 5, 5, 4],
  }, ['current']),
  v('trend-nostalgia-01', 'nostalgia', 3, 'Welcher Hit ging hier viral?', 'Gangnam Style', ['Gangnam Style', 'Call Me Maybe', 'Harlem Shake', 'Ice Bucket Challenge'], {
    kind: 'trend',
    from: 2011,
    values: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 62, 100, 70, 48, 37, 29, 23, 20, 17, 13, 11, 10, 9, 10, 9, 9, 8, 8, 6, 7, 7, 7, 6, 8, 7, 6, 7, 7],
  }, ['nostalgia']),
  v('trend-nostalgia-02', 'nostalgia', 2, 'Welcher Hype war das?', 'Fidget Spinner', ['Fidget Spinner', 'Pokémon GO', 'Mannequin Challenge', 'Loom Bands'], {
    kind: 'trend',
    from: 2015,
    values: [2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 2, 3, 2, 3, 2, 2, 2, 3, 5, 26, 100, 78, 34, 18, 15, 12, 11, 8, 7, 7, 5, 5, 5, 5, 6, 5, 4, 6, 6, 6],
  }, ['nostalgia']),
  v('trend-nostalgia-03', 'nostalgia', 2, 'Wonach wurde hier gegoogelt?', 'Panini-Album', ['Panini-Album', 'Adventskalender', 'Schultüte', 'Oktoberfest'], {
    kind: 'trend',
    from: 2012,
    values: [6, 7, 9, 32, 62, 72, 16, 5, 3, 5, 4, 5, 4, 3, 3, 2, 3, 4, 3, 2, 3, 3, 2, 4, 6, 8, 14, 52, 86, 100, 44, 8, 5, 4, 3, 4, 5, 4, 3, 3, 3, 5, 3, 4, 3, 2, 2, 3],
  }, ['nostalgia', 'classic']),
]
