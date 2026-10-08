# Quiz Me App

`quiz-me-app` ist ein kleiner, lokaler Team-Quiz-Prototyp für zwei Teams. Die
erste Version basiert auf einer eigenständigen HTML-Datei und verbindet ein
Jungle-inspiriertes Spielbrett mit Kategorien, Countdown, Steal-Regel,
Tiebreaker und einfachen Web-Audio-Sounds.

Die nächste Iteration wird als Nuxt-4-Anwendung mit Vue, TypeScript und UnoCSS
aufgebaut. Dabei bleibt das bestehende Spielgefühl erhalten, während Layout,
Spielzustand, Fragen, Sounds und UI-Komponenten sauber getrennt werden.

## Status

Nuxt-4-MVP der Quiz-App ist angelegt. Die Startansicht, Team-Setup,
Kategorien, Countdown, Steal-Regel, A–D-Antworten, Antwortauflösung,
Tiebreaker und Audio-Tracks sind als Vue-Komponenten und Composables umgesetzt.

Unter `/type-lab` gibt es außerdem vier interaktive Clash-Display-
Kombinationen zum Vergleichen: General Sans, Switzer, Satoshi und Zodiak.

Enthalten:

- wiederverwendbare Header-, Footer- und Spielfeld-Komponenten
- zentraler Quiz-State für Teams, Runden, Timer und Spielverlauf
- UnoCSS-Tokens für Jungle-Grün, Creme, Gold, Typografie und Motion
- Nuxt Fonts mit Clash Display + General Sans via Fontshare
- Nuxt Icons mit Lucide-Iconset
- Audio-Tracks für Startscreen-Lobby, Category Selection, Tension, Time Over, Correct und Wrong unter `public/audio`
- responsive Darstellung für Desktop und kleinere Screens
- reduzierte Bewegung und sichtbare Tastaturfokusse für Accessibility

## Sound Sniper

Zweiter Spielmodus, auf der Startseite umschaltbar. Ein Geräusch läuft, wer es
erkennt, haut auf den (physischen) Buzzer, der Host drückt `1`/`A` oder
`2`/`B`. Danach `R` richtig (Punkt für das Team) oder `F` falsch (Punkt sofort
fürs andere Team). Kurze Sounds (≤ 3 s) laufen bis zu zweimal, längere einmal;
die Länge kommt aus den Metadaten der Datei.

Neuen Sound hinzufügen:

1. Datei nach `public/sounds/sniper/<kategorie>/<id>.mp3` legen (nur CC0 oder
   CC-BY, das Repo ist öffentlich).
2. Eintrag in `app/data/sniper-sounds.ts` ergänzen (`id`, `answer`, optional
   `aliases`, `category`, `src`, `credit`).
3. Quelle und Lizenz in `public/sounds/sniper/CREDITS.md` nachtragen.

Spiellogik: `app/lib/sniper-machine.ts` (regelbasiert, getestet),
`app/composables/useSniperGame.ts` (Timer, Ablauf) und
`app/composables/useSniperPlayer.ts` (Audio).

## Setup

```bash
pnpm install
pnpm dev
```

Der Development Server läuft standardmäßig unter `http://localhost:3000`.

## Production

```bash
pnpm build
pnpm preview
```

## Checks

```bash
pnpm typecheck
pnpm build
```

## Ausgangspunkt

Der aktuelle Verhaltens- und Content-Stand liegt in der ursprünglichen
`index.html`-Datei. Sie diente als Referenz für Spielregeln, Beispiel-Fragen,
Timer-Verhalten und Sound-Events. Die spielbare Oberfläche ist inzwischen in
Nuxt-Komponenten und Composables überführt.
