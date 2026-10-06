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
Kategorien, Countdown, Steal-Regel, Antwortauflösung, Tiebreaker und
Web-Audio-Sounds sind als Vue-Komponenten und Composables umgesetzt.

Geplante Bausteine:

- wiederverwendbare Header-, Footer- und Spielfeld-Komponenten
- zentraler Quiz-State für Teams, Runden, Timer und Spielverlauf
- UnoCSS-Tokens für Jungle-Grün, Creme, Gold, Typografie und Motion
- Nuxt Fonts mit Clash Display + General Sans via Fontshare
- Nuxt Icons mit Lucide-Iconset
- responsive Darstellung für Desktop und kleinere Screens
- reduzierte Bewegung und sichtbare Tastaturfokusse für Accessibility

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
`index.html`-Datei. Sie dient als Referenz für Spielregeln, Beispiel-Fragen,
Timer-Verhalten und Sound-Events, bis die einzelnen Verantwortlichkeiten in
Nuxt-Komponenten und Composables überführt wurden.
