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

## Palette exploration

I / **Split field** previews five green-only directions. The current reference
is **Canopy signal**: deep pine ink, tea-green field, warm token accent, and
paper cream. The other options intentionally push further into acid lime,
digital emerald, olive highlighter, and blue-green aqua so the choice is a real
art direction rather than a near-duplicate.

| Direction | Ink | Jungle | Field | Accent |
| --- | --- | --- | --- | --- |
| Canopy signal | `#092219` | `#123D2A` | `#C7E9A7` | `#E4B84C` |
| Acid orchard | `#081811` | `#0B4429` | `#E7F7B6` | `#CAFF4A` |
| Digital emerald | `#071A19` | `#008C63` | `#C9F3D0` | `#62F5B3` |
| Lime cypress | `#14210C` | `#3D5F1F` | `#EFF7C8` | `#DFFF3E` |
| Deep aqua | `#041D1B` | `#126B5B` | `#D7F1DF` | `#8BF2BD` |

The role-based contrast thinking is informed by [Khroma](https://www.khroma.co/)
and [Huemint](https://huemint.com/about/), but the combinations are authored
for Jungle / Quiz. The global lab tokens stay unchanged until one direction is
selected as the final system palette. The live game setup currently applies
**Acid orchard** as the first full-screen trial of the I / Split field direction.

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
