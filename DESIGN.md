# Jungle Quiz design direction

## Visual world

Editorial game-night interface: deep jungle green, warm paper cream, yellow
game tokens, and leaf green for positive states. The system borrows from quiz
show title cards, printed game boards, and slightly misregistered poster type.
It should feel designed and playful, not glossy or app-store neutral.

## Tokens

- Ink `#071a13`
- Jungle `#0d2a1d`
- Cream `#f3eedb`
- Gold `#dfba64`
- Leaf `#b7d69e`
- Coral `#dd927b`
- Muted `#a5b5a3`
- Line `rgba(243, 238, 219, 0.16)`

Display uses Clash Display. UI uses General Sans. Small labels can use Switzer.

## Composition

Prefer editorial asymmetry, ruled surfaces, oversized display type, and clear
active-state contrast. Controls should be shaped as actions, not decorative
cards. Use one memorable irregular gesture per surface: a tilted label, an
offset game token, a split score rail, or a deliberately oversized timer.

## Motion and responsive rules

Use short ease-out transitions for stage changes, timer emphasis, and selection.
Respect reduced motion. On narrow screens, collapse to one reading column,
keep the active action above secondary configuration, and preserve 44px minimum
targets.

## Avoid

Generic SaaS cards, glassmorphism, gradient text, excessive rounded containers,
emoji-as-icons, and uniform repeated tiles that make every quiz state feel the
same.
