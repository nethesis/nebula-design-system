# Figma fixes

Changes to make in the [Nebula Figma file](https://www.figma.com/design/ZRZzzlqb9GfB9Xdz6iGufh/Nebula-Design-System)
so that it agrees with this guide. Remove an item once it is done.

## Text to correct

- [ ] **Writing guidelines** page, *Writing guidelines 2*, Labels: "Do not include instructions in
  the label" needs the exception `Confirm new password`.
- [ ] **Writing guidelines** page, *Writing guidelines 2*, Placeholder: "Use placeholders only to
  show an example or expected format" and "Avoid instructional sentences inside the field" are too
  strict. A placeholder can also say what to do, such as `Filter <objects>`.
- [ ] **Writing guidelines** page, *Writing guidelines 2*, Validation messages: for an empty
  required field, allow `Required` or a positive instruction that names what is missing
  (`Enter a username`, `Select a language`).
- [ ] **Empty state** page, *Empty state_writing-guidelines*: the example "Threat shield DNS is
  disabled" becomes "Threat Shield DNS is disabled". Check other occurrences of "Threat shield" in
  the file.
- [ ] **Modal** page, *modal_guidelines*: the example `Speed dial “Jenny Wilson” will be deleted.`
  loses the quotes: `Speed dial Jenny Wilson will be deleted.`
- [ ] **Toast Notification** page, *Toast Notification_Guideline and use cases*: the Italian
  example "La segreteria per l'interno 101 è stata attivata" becomes "… è stata abilitata"
  (Enable is *Abilita*, not *Attiva*).
- [ ] **Toast Notification** page, *Toast Notification_Guideline and use cases*: "Toast
  descriptions do not require a final period" becomes "Omit the final period when the description
  is one short sentence; use normal punctuation when it has more sentences", as on the Writing
  guidelines page.

- [ ] **Colors** page, *Colors documentation*: typos "sush" (such) in the Text token description,
  and "Emerald /500" (Emerald/500) in the NethVoice Product Primary table.

- [ ] **Spacing and border** page, *Border radius* table: the names follow Tailwind 3 (`Rounded sm`,
  `Rounded`, `Rounded md`…), while the variables follow Tailwind 4 (`rounded-xs` 2 px,
  `rounded-sm` 4 px, `rounded-md` 6 px…). Rename the rows as the variables.

- [ ] **Semantic colors** variables, descriptions copied from other tokens:
  - the Favicon and Placeholder tokens of NethSecurity, NethVoice, NethLink and NethService say
    "Focus … components";
  - the My Nethesis tokens mention NethService;
  - `Text/Warning` says "on rose background";
  - `Elevation/L0`, `L2`, `L2 invert`, `L3` and `L4` all say "content on S0 (es: cards)";
  - `Border/Ring/Toast` and the `Border/Accent` tokens say "components like InlineNotification";
  - 29 `Surface` tokens (Rounded icon, Phone island, Toggle, Skeleton, Scrollbar, the status
    surfaces…) and the 5 `Text/Calls and status` tokens say "Icons or content not text", the
    description of the Icon tokens.
- [ ] **Semantic colors** variables: 163 of the 251 tokens have no description, among them 52 of the
  56 `Icon` tokens, 30 of the 47 `Text` tokens and all the `Utility` tokens. The site and
  `colors.json` show the descriptions to designers and coding agents.
- [ ] **Elevation and shadow** page: the variables include `Elevation/L4` (gray-300, dark gray-600),
  which the page does not show.

## Contrast

The [Accessibility](https://nethesis.github.io/nebula-design-system/?page=accessibility) page asks
for text with a contrast of at least 4.5:1 (WCAG AA). These Text tokens don't reach it on the page
and card backgrounds (`Elevation/L1` and `Elevation/L0`):

- [ ] `Text/Secondary`, dark theme: Indigo/500 is 4.5:1 on L0 and 4.0:1 on L1. Indigo/400
  reaches 5.9:1 on L1.
- [ ] `Text/Link/Nethesis`, light theme: Nethesis/Light blue is 3.0:1 on L0.
- [ ] `Text/Placeholder`: Gray/400 is 2.5:1 on white in the light theme, Gray/500 is 4.2:1 on
  Gray/950 in the dark theme, and WCAG counts placeholders as text. Gray/500 in the light theme
  (4.8:1) would reach it; in the dark theme Gray/400 (7.9:1) is already `Text/Tertiary neutral`,
  so the placeholder would look like real text. To decide with the designer. vue-components uses
  `placeholder:text-gray-400 dark:placeholder:text-gray-500` and would change too.

## To complete or remove

- [ ] Guideline frames still with the template text: **Card**, **Side drawer**, **Table**,
  **Tabs**, **Toggle**, **Topbar**, **Text area**, **Notification button**, **Main sidebar**,
  **Vertical navigation**, **Phone island**, and most of **Combobox**, **Dropdown** and **Radio
  selection**. Fill them in or remove them.
- [ ] **Inline notification** page: the example "Please sign in again" becomes "Sign in again." (no
  "please" for routine instructions).
- [ ] **Toast Notification** page, *When not to use*: one cell has placeholder text (Nullam
  feugiat…) and one is cut ("In NethSecurity after t").
- [ ] **Breadcrumbs** page, *Guidelines*: the title is still "Component name".
- [ ] **Checkbox** page: "Storybook link" is a placeholder.
- [ ] **Empty state** page, *Behavior* and *Content*: the Do and Don't descriptions are still the
  template text ("This would be the description…").
- [ ] **Checkbox** and **Combobox** pages: "less than 6 options" and "more than 6 options" leave
  out exactly 6.
- [ ] **Website** text styles: remove `Website/H1` to `Website/H5`, `Website/Paragraph` and
  `UI/Button/xl website`.
- [ ] **Semantic colors** variables: rename the `Product Primary/Website and My Nethesis` group to
  `Product Primary/My Nethesis`. Until then, `scripts/import-colors.mjs` renames it on import:
  remove the rename from `RENAMED_GROUPS` once Figma is fixed.

## Questions for the designer

- [ ] **Spacing and border** page, *Focus ring*: when is the "Focus ring/2 … primary" effect style
  (shade 700) used instead of "Focus ring/2" (shade 500)? In vue-components the primary button
  uses shade 500, and shade 700 appears only on the focused card of `NeCheckboxCards` and
  `NeRadioSelection`.

## Once the writing rules live in this guide

- [ ] Replace the writing rules in Figma (Writing guidelines page and the writing sections of the
  component pages) with a short link to the corresponding section of
  https://nethesis.github.io/nebula-design-system/, so there is a single source.
