import { v, type QuestionSeed } from './seed'

// Crude line drawings: every path is stroked (never filled) and drawn in one after another,
// so each list runs from context to the giveaway detail.
const box = '0 0 200 140'

export const doodleQuestions: readonly QuestionSeed[] = [
  // Cologne & Germany
  v('doodle-cologne-01', 'cologne', 1, 'Was soll das sein?', 'Kölner Dom', ['Kölner Dom', 'Ulmer Münster', 'Notre-Dame de Paris', 'Sagrada Família'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M12 128 Q100 125 188 128',
      'M84 128 L84 88 Q92 80 100 74 Q108 80 116 88 L116 128',
      'M92 128 L92 106 Q100 94 108 106 L108 128',
      'M55 128 Q53 95 56 62 L84 62 Q86 95 84 128',
      'M116 128 Q114 95 117 62 L145 62 Q147 95 145 128',
      'M63 112 L63 92 Q70 82 77 92 L77 112',
      'M124 112 L124 92 Q131 82 138 92 L138 112',
      'M56 62 Q64 38 70 12 Q76 38 84 62',
      'M117 62 Q125 38 131 12 Q137 38 145 62',
      'M61 46 L79 46 M65 31 L75 31',
      'M122 46 L140 46 M126 31 L136 31',
      'M70 12 L70 5 M66 8 L74 8 M131 12 L131 5 M127 8 L135 8',
    ],
  }, ['local']),
  v('doodle-cologne-02', 'cologne', 2, 'Welche Kölner Brücke ist das?', 'Hohenzollernbrücke', ['Hohenzollernbrücke', 'Deutzer Brücke', 'Severinsbrücke', 'Mülheimer Brücke'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 124 Q20 119 30 124 Q40 129 50 124 Q60 119 70 124 Q80 129 90 124 Q100 119 110 124 Q120 129 130 124 Q140 119 150 124 Q160 129 170 124 Q180 119 190 124',
      'M10 101 Q100 99 190 101',
      'M68 101 L68 118 L74 118 L74 101 M126 101 L126 118 L132 118 L132 101',
      'M12 101 Q41 4 70 101',
      'M72 101 Q100 4 128 101',
      'M130 101 Q159 4 188 101',
      'M24 98 L24 84 Q26 79 33 79 L166 79 Q175 80 178 90 L178 98 Z',
      'M38 85 L50 85 M64 85 L76 85 M90 85 L102 85 M116 85 L128 85 M142 85 L154 85',
      'M100 112 Q96 106 100 106 Q102 106 102 108 Q102 106 104 106 Q108 106 104 112 L102 115 Z',
    ],
  }, ['local']),
  v('doodle-cologne-03', 'cologne', 1, 'Welches Bauwerk soll das sein?', 'Brandenburger Tor', ['Brandenburger Tor', 'Siegestor München', 'Arc de Triomphe', 'Holstentor'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 129 Q100 126 190 129',
      'M28 129 L29 122 L171 122 L172 129',
      'M36 122 Q35 96 36 70 M58 122 Q59 96 58 70 M82 122 Q81 96 82 70 M118 122 Q119 96 118 70 M142 122 Q141 96 142 70 M164 122 Q165 96 164 70',
      'M26 70 L174 70 L173 59 L27 59 Z',
      'M66 59 L68 47 L132 47 L134 59',
      'M76 47 Q78 37 83 34 Q87 33 88 37 M84 47 Q86 37 91 34 Q95 33 96 37 M92 47 Q94 37 99 34 Q103 33 104 37',
      'M104 47 Q108 38 118 40 L118 47',
      'M112 40 L112 24 M112 30 L120 17 M117 13 Q122 10 124 15 Q122 19 118 17',
    ],
  }, ['classic']),
  v('doodle-cologne-04', 'cologne', 3, 'Welche Kölner Gebäude sind das?', 'Kranhäuser', ['Kranhäuser', 'KölnTriangle', 'Colonius', 'Uni-Center'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 124 Q20 120 30 124 Q40 128 50 124 Q60 120 70 124 Q80 128 90 124 Q100 120 110 124 Q120 128 130 124 Q140 120 150 124 Q160 128 170 124 Q180 120 190 124',
      'M10 112 Q100 110 190 112',
      'M28 112 Q27 80 28 50 L20 50 L20 30 L68 30 L68 50 L40 50 Q41 80 40 112',
      'M86 112 Q85 80 86 50 L78 50 L78 30 L126 30 L126 50 L98 50 Q99 80 98 112',
      'M144 112 Q143 80 144 50 L136 50 L136 30 L184 30 L184 50 L156 50 Q157 80 156 112',
      'M24 40 L64 40 M82 40 L122 40 M140 40 L180 40',
      'M34 60 L34 104 M92 60 L92 104 M150 60 L150 104',
    ],
  }, ['local']),

  // Film & series
  v('doodle-screen-01', 'screen', 1, 'Welche Filmszene?', 'Titanic', ['Titanic', 'Fluch der Karibik', 'Life of Pi', 'Poseidon'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 122 Q22 116 34 122 Q46 128 58 122 Q70 116 82 122 Q94 128 106 122 Q118 116 130 122 Q142 128 154 122 Q166 116 178 122 Q184 125 190 122',
      'M14 70 Q50 104 76 116 L190 116',
      'M14 70 Q100 63 190 56',
      'M14 70 L26 69 M90 63 L90 68 M130 60 L130 65 M170 57 L170 62',
      'M52 22 A6 6 0 1 0 64 22 A6 6 0 1 0 52 22 M58 28 L58 58 L54 65 M58 58 L62 65 M58 38 L46 48',
      'M38 26 A6 6 0 1 0 50 26 A6 6 0 1 0 38 26 M44 32 L44 60 L40 67 M44 60 L48 67',
      'M44 39 Q30 35 14 33 M44 39 Q58 35 74 33',
    ],
  }, ['classic']),
  v('doodle-screen-02', 'screen', 2, 'Welche Filmszene?', 'E.T. – Der Außerirdische', ['E.T. – Der Außerirdische', 'Zurück in die Zukunft', 'Die Goonies', 'Stranger Things'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 132 L18 114 L26 132 M24 132 L34 106 L44 132 M150 132 L160 110 L170 132 M166 132 L178 100 L190 132',
      'M65 60 A45 45 0 1 1 155 60 A45 45 0 1 1 65 60',
      'M79 80 A9 9 0 1 0 97 80 A9 9 0 1 0 79 80 M121 80 A9 9 0 1 0 139 80 A9 9 0 1 0 121 80',
      'M88 80 L104 67 L122 67 L130 80 M104 67 L110 80 L122 67 M122 67 L124 58 L130 56',
      'M105 40 A5 5 0 1 0 115 40 A5 5 0 1 0 105 40 M110 45 Q108 55 106 64 L112 78 M109 50 L127 57',
      'M126 57 L146 57 L142 67 L130 67 Z',
      'M131 57 Q129 46 137 46 Q144 47 141 57 M134 50 L135 50 M139 50 L140 50',
    ],
  }, ['classic']),
  v('doodle-screen-03', 'screen', 2, 'Welcher Film?', 'Der weiße Hai', ['Der weiße Hai', 'Free Willy', 'Deep Blue Sea', 'Findet Nemo'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 70 Q20 66 30 70 Q40 74 50 70 Q60 66 70 70 Q80 74 90 70 Q100 66 110 70 Q120 74 130 70 Q140 66 150 70 Q160 74 170 70 Q180 66 190 70',
      'M146 64 A4 4 0 1 0 154 64 A4 4 0 1 0 146 64 M140 68 Q144 60 148 62 M156 64 Q162 58 170 66',
      'M58 136 Q70 104 100 92 Q130 104 142 136',
      'M76 122 Q100 102 124 122 Q100 134 76 122 Z',
      'M80 119 L84 124 L88 113 L92 122 L96 110 L100 121 L104 110 L108 122 L112 113 L116 124 L120 119',
      'M54 70 Q68 52 86 34 Q84 56 94 70',
    ],
  }, ['classic']),
  v('doodle-screen-04', 'screen', 2, 'Welcher Film?', 'Oben', ['Oben', 'Der Zauberer von Oz', 'Coco', 'Die Monster AG'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M18 124 Q22 114 32 117 Q38 108 48 116 Q58 116 56 124 Z M146 128 Q150 118 160 121 Q168 112 178 120 Q186 121 184 128 Z',
      'M76 128 L76 102 L124 102 L124 128 Z',
      'M71 102 L100 82 L129 102 M110 89 L110 78 L116 78 L116 93',
      'M84 128 L84 114 L94 114 L94 128 M104 110 L116 110 L116 120 L104 120 Z',
      'M113 78 L96 52 M113 78 L112 51 M113 78 L126 54 M113 78 L88 39 M113 78 L133 41 M113 78 L103 37',
      'M73 20 A7 7 0 1 0 87 20 A7 7 0 1 0 73 20 M88 14 A7 7 0 1 0 102 14 A7 7 0 1 0 88 14 M103 18 A7 7 0 1 0 117 18 A7 7 0 1 0 103 18 M118 14 A7 7 0 1 0 132 14 A7 7 0 1 0 118 14 M133 22 A7 7 0 1 0 147 22 A7 7 0 1 0 133 22 M81 32 A7 7 0 1 0 95 32 A7 7 0 1 0 81 32',
      'M96 30 A7 7 0 1 0 110 30 A7 7 0 1 0 96 30 M111 30 A7 7 0 1 0 125 30 A7 7 0 1 0 111 30 M126 34 A7 7 0 1 0 140 34 A7 7 0 1 0 126 34 M89 45 A7 7 0 1 0 103 45 A7 7 0 1 0 89 45 M105 44 A7 7 0 1 0 119 44 A7 7 0 1 0 105 44 M119 47 A7 7 0 1 0 133 47 A7 7 0 1 0 119 47',
    ],
  }, ['classic']),

  // Music: album covers
  v('doodle-music-01', 'music', 2, 'Welches Albumcover?', 'Abbey Road', ['Abbey Road', 'Thriller', 'Rumours', 'Born in the U.S.A.'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 104 Q100 102 190 104 M10 132 Q100 130 190 132',
      'M14 103 Q15 90 27 88 Q38 88 41 103 M19 103 A3 3 0 0 0 25 103 M31 103 A3 3 0 0 0 37 103',
      'M30 114 L40 114 L38 128 L28 128 Z M50 114 L60 114 L58 128 L48 128 Z M70 114 L80 114 L78 128 L68 128 Z M90 114 L100 114 L98 128 L88 128 Z M110 114 L120 114 L118 128 L108 128 Z M130 114 L140 114 L138 128 L128 128 Z M150 114 L160 114 L158 128 L148 128 Z M170 114 L180 114 L178 128 L168 128 Z',
      'M45 58 A6 6 0 1 0 57 58 A6 6 0 1 0 45 58 M51 64 L51 92 L43 112 M51 92 L59 112 M51 72 L43 88 M51 72 L58 86',
      'M80 58 A6 6 0 1 0 92 58 A6 6 0 1 0 80 58 M86 64 L86 92 L78 112 M86 92 L94 112 M86 72 L78 88 M86 72 L93 86',
      'M115 58 A6 6 0 1 0 127 58 A6 6 0 1 0 115 58 M121 64 L121 92 L113 112 M121 92 L129 112 M121 72 L113 88 M121 72 L128 86',
      'M150 58 A6 6 0 1 0 162 58 A6 6 0 1 0 150 58 M156 64 L156 92 L148 112 M156 92 L164 112 M156 72 L148 88 M156 72 L163 86',
    ],
  }, ['classic']),
  v('doodle-music-02', 'music', 3, 'Welches Albumcover?', 'Nevermind', ['Nevermind', 'In Utero', 'Ten', 'Dookie'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 16 Q25 10 40 16 Q55 22 70 16 Q85 10 100 16 Q115 22 130 16 Q145 10 160 16 Q175 22 190 16',
      'M160 40 A3 3 0 1 0 166 40 A3 3 0 1 0 160 40 M168 28 A2 2 0 1 0 172 28 A2 2 0 1 0 168 28',
      'M83 72 A12 12 0 1 0 107 72 A12 12 0 1 0 83 72',
      'M106 78 Q122 88 142 86 L162 78 M142 86 L160 98 M104 85 L114 102',
      'M86 80 Q72 78 60 74',
      'M46 8 L46 56 Q46 64 40 62',
      'M32 60 L60 60 L60 76 L32 76 Z M49 63 Q42 62 42 65 Q42 68 46 68 Q50 68 50 71 Q50 74 42 73 M46 61 L46 75',
    ],
  }, ['classic']),
  v('doodle-music-03', 'music', 3, 'Welches Albumcover?', 'The Dark Side of the Moon', ['The Dark Side of the Moon', 'The Wall', 'Wish You Were Here', 'OK Computer'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M100 22 Q120 62 141 106 Q100 104 59 106 Q80 62 100 22 Z',
      'M10 90 L83 60',
      'M83 60 L118 63',
      'M118 63 L190 64',
      'M119 65 L190 72',
      'M120 67 L190 80',
      'M121 69 L190 88',
      'M122 71 L190 96',
      'M123 73 L190 104',
    ],
  }, ['classic']),

  // Nostalgia
  v('doodle-nostalgia-01', 'nostalgia', 1, 'Welches Spiel?', 'Pac-Man', ['Pac-Man', 'Space Invaders', 'Donkey Kong', 'Frogger'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 28 Q100 26 190 28 M10 112 Q100 114 190 112',
      'M92 70 A3 3 0 1 0 98 70 A3 3 0 1 0 92 70 M112 70 A3 3 0 1 0 118 70 A3 3 0 1 0 112 70',
      'M140 100 L140 70 A20 20 0 0 1 180 70 L180 100 L173 93 L167 100 L160 93 L153 100 L147 93 Z',
      'M147 68 A4 4 0 1 0 155 68 A4 4 0 1 0 147 68 M162 68 A4 4 0 1 0 170 68 A4 4 0 1 0 162 68',
      'M50 70 L75 58 A28 28 0 1 0 75 82 Z',
      'M50 55 A2 2 0 1 0 54 55 A2 2 0 1 0 50 55',
    ],
  }, ['nostalgia']),
  v('doodle-nostalgia-02', 'nostalgia', 1, 'Welches Gerät?', 'Game Boy', ['Game Boy', 'Game Boy Advance', 'Nintendo DS', 'Tamagotchi'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M64 10 L140 10 Q146 10 146 16 L146 114 Q146 132 126 132 L68 132 Q62 132 62 126 L62 16 Q62 10 64 10 Z',
      'M70 18 L138 18 L138 62 Q138 72 126 72 L70 72 Z',
      'M82 24 L126 24 L126 64 L82 64 Z',
      'M74 84 L82 84 L82 88 L86 88 L86 96 L82 96 L82 100 L74 100 L74 96 L70 96 L70 88 L74 88 Z',
      'M117 88 A5 5 0 1 0 127 88 A5 5 0 1 0 117 88 M105 95 A5 5 0 1 0 115 95 A5 5 0 1 0 105 95',
      'M90 112 L98 109 M102 112 L110 109',
      'M118 124 L128 114 M124 127 L134 117 M130 128 L140 118',
      'M98 32 L110 32 L110 38 L98 38 Z M100 56 L124 56 M100 50 L112 50 L112 56',
    ],
  }, ['nostalgia']),
  v('doodle-nostalgia-03', 'nostalgia', 2, 'Welches Handy?', 'Nokia 3310', ['Nokia 3310', 'Motorola Razr', 'Siemens S55', 'Sony Ericsson K750i'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M80 10 Q100 6 120 10 Q126 12 126 22 L126 120 Q126 132 100 132 Q74 132 74 120 L74 22 Q74 12 80 10 Z',
      'M82 22 L118 22 L118 52 L82 52 Z',
      'M84 60 Q100 68 116 60 L116 66 Q100 74 84 66 Z',
      'M84 80 L90 80 M97 80 L103 80 M110 80 L116 80 M84 90 L90 90 M97 90 L103 90 M110 90 L116 90 M84 100 L90 100 M97 100 L103 100 M110 100 L116 100 M84 110 L90 110 M97 110 L103 110 M110 110 L116 110',
      'M86 46 L100 46 L100 34 L108 34',
      'M112 30 L113 30',
    ],
  }, ['nostalgia']),

  // animals
  v('doodle-animals-01', 'animals', 1, 'Welches Tier ist das?', 'Giraffe', ['Giraffe', 'Okapi', 'Lama', 'Kamel'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 130 Q100 127 190 130',
      'M52 80 Q54 68 72 68 L102 66 Q114 68 112 82 Q110 95 98 96 L62 96 Q50 95 52 80 Z',
      'M60 96 L57 128 M68 96 L68 128 M98 96 L99 128 M106 94 L109 128',
      'M101 67 L127 24 M112 74 L138 30',
      'M125 24 Q127 14 138 15 L156 21 Q161 27 154 30 L138 31 Q128 31 125 24 Z',
      'M134 16 L132 6 M141 16 L141 6 M130 5 L134 5 M139 5 L143 5',
      'M146 21 L147 21',
      'M66 80 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
      'M82 76 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
      'M96 84 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0',
      'M75 89 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
      'M114 50 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
      'M124 38 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
      'M52 76 Q42 86 44 104 M41 104 L47 104',
    ],
  }, ['classic']),
  v('doodle-animals-02', 'animals', 2, 'Welcher Vogel ist das?', 'Flamingo', ['Flamingo', 'Storch', 'Kranich', 'Reiher'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M20 128 Q35 124 50 128 M150 128 Q165 124 180 128',
      'M62 60 Q72 42 100 46 Q124 50 120 64 Q112 78 90 77 Q70 76 62 60 Z',
      'M62 60 L52 54 M64 64 L52 66',
      'M96 77 L96 128 M96 128 L106 128',
      'M100 77 L106 98 L90 92',
      'M118 58 Q138 40 122 28 Q106 16 118 8 Q132 2 142 12',
      'M142 12 Q152 16 150 28 Q148 32 144 30',
      'M132 10 L133 10',
    ],
  }, ['classic']),
  v('doodle-animals-03', 'animals', 2, 'Wer trägt hier einen Apfel?', 'Igel', ['Igel', 'Stachelschwein', 'Ameisenigel', 'Gürteltier'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M30 120 Q100 124 176 118',
      'M38 112 L25.4 104.5 L39.8 99.8 L29.7 90 L45.1 88.4 L38.2 76.9 L53.6 78.4 L50.2 65.8 L64.7 70.4 L65.1 57.5 L77.8 64.9 L82 52.5 L92.2 62.2 L99.9 51 L106.9 62.6 L117.6 53.2 L121 65.8 L134.2 59 L133.8 71.9 L148.6 67.9 L144.4 80.3 L159.9 79.5 L152.3 90.7',
      'M38 112 Q100 118 156 104',
      'M152 98 Q166 92 184 106 Q176 116 154 114',
      'M184 104 L188 107',
      'M164 100 L165 100',
      'M80 116 L80 122 M128 113 L128 120',
      'M86 50 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0',
      'M95 41 L97 34 M97 37 Q104 32 106 38',
    ],
  }, ['odd']),
  v('doodle-animals-04', 'animals', 3, 'Welches Tier ist das?', 'Seepferdchen', ['Seepferdchen', 'Seenadel', 'Fetzenfisch', 'Kugelfisch'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M100 30 Q112 22 122 28 L150 30 L150 38 L124 40 Q118 46 120 56',
      'M100 30 Q86 44 92 62 Q98 80 90 96 Q84 110 96 118 Q110 124 112 110 Q112 100 102 102 Q96 106 100 110',
      'M120 56 Q128 72 118 88 Q110 100 104 102',
      'M112 32 L113 32',
      'M100 28 L96 18 L104 22 L106 14 L110 24',
      'M92 50 L82 46 L88 58 L80 62 L92 66',
      'M101 66 L110 68 M100 78 L112 78 M98 88 L108 92',
      'M30 128 Q40 120 34 110 Q28 100 36 92 M170 128 Q162 116 168 104 Q174 94 166 86',
    ],
  }, ['classic']),

  // food
  v('doodle-food-01', 'food', 1, 'Welches Gebäck ist das?', 'Brezel', ['Brezel', 'Croissant', 'Franzbrötchen', 'Laugenstange'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M72 106 Q84 92 100 74 Q120 50 126 40 Q140 24 156 40 Q168 60 158 88 Q142 120 100 120 Q58 120 42 88 Q32 60 44 40 Q60 24 74 40 Q80 50 100 74 Q116 92 128 106',
      'M64 108 L80 104 M120 104 L136 108',
      'M60 48 L62 50 M140 48 L138 50 M100 112 L101 112 M80 112 L81 112 M120 112 L121 112 M50 72 L51 74 M150 72 L149 74',
    ],
  }, ['classic']),
  v('doodle-food-02', 'food', 1, 'Was dreht sich hier?', 'Döner', ['Döner', 'Schaschlik', 'Spanferkel', 'Rollbraten'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 130 L190 130',
      'M100 6 L100 128',
      'M74 20 Q100 12 126 20 Q120 66 110 108 Q100 114 90 108 Q80 66 74 20 Z',
      'M76 36 L124 40 M80 56 L120 60 M84 76 L116 80 M88 94 L112 97',
      'M40 18 L56 18 L56 112 L40 112 Z M40 40 L56 40 M40 62 L56 62 M40 84 L56 84',
      'M66 116 Q100 128 134 116 M128 112 L134 116 L128 121',
      'M146 30 L146 84 Q152 90 158 84 L158 30 Z M152 84 L152 102',
    ],
  }, ['local']),
  v('doodle-food-03', 'food', 2, 'Welche Frucht ist das?', 'Ananas', ['Ananas', 'Drachenfrucht', 'Artischocke', 'Mango'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M70 80 Q70 50 100 48 Q130 50 130 80 Q132 118 100 124 Q68 118 70 80 Z',
      'M76 62 L124 110 M72 84 L106 122 M90 50 L130 92 M124 62 L76 110 M128 84 L94 122 M110 50 L70 92',
      'M100 48 L92 22 L100 36 L102 8 L106 34 L118 16 L110 46',
      'M100 48 L78 30 L94 44 M110 46 L130 32',
    ],
  }, ['classic']),

  // world
  v('doodle-world-01', 'world', 1, 'Welches Bauwerk soll das sein?', 'Eiffelturm', ['Eiffelturm', 'Tokyo Tower', 'Berliner Fernsehturm', 'Blackpool Tower'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 130 Q100 127 190 130',
      'M60 128 Q84 90 92 50 Q96 26 99 8 M140 128 Q116 90 108 50 Q104 26 101 8',
      'M99 8 L99 2 M101 8 L101 2',
      'M76 106 L124 106 M76 106 Q100 86 124 106',
      'M88 74 L112 74 M92 50 L108 50 M96 28 L104 28',
      'M80 100 L120 78 M80 78 L120 100 M90 70 L110 54 M90 54 L110 70 M94 46 L106 32 M94 32 L106 46',
    ],
  }, ['classic']),
  v('doodle-world-02', 'world', 2, 'Wo steht das?', 'Gizeh, Ägypten', ['Gizeh, Ägypten', 'Teotihuacán, Mexiko', 'Chichén Itzá, Mexiko', 'Tikal, Guatemala'], {
    kind: 'doodle',
    viewBox: box,
    paths: [
      'M10 126 Q100 122 190 126',
      'M18 126 L66 52 L114 126',
      'M66 52 L78 126',
      'M108 116 L140 68 L172 126',
      'M140 68 L148 126',
      'M166 118 L178 102 L192 126',
      'M150 26 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0',
    ],
  }, ['classic']),
]
