# Layout

The space between the parts of a page comes from the scale of
[Spacing and border](?page=spacing-and-border), the surfaces from
[Elevation and shadow](?page=elevation-and-shadow), and the place of skeletons, errors and empty
states from [Loading and errors](?page=loading-and-errors).

## App shell

Every page of a product sits in the same app shell: a side menu on the left, a top bar above the
page, and the page itself. My Nethesis and NethSecurity build it the same way: copy the classes
from `src/components/shell/` of My Nethesis.

```example
app-shell
```

### Side menu

- From the `lg` breakpoint, the menu is fixed on the left, 288 px wide (`w-72`), with a white
  background (`gray-950` in the dark theme) and a border on its right. The logo of the product
  is at the top, 28 px high (`h-7`), in a row as high as the top bar.
- Below `lg`, the menu is hidden. The menu button of the top bar opens it as a dialog that slides
  in from the left, over a `gray-900/80` backdrop, with its close button outside the panel. It
  opens in 300 ms and closes in 200 ms.
- Each item has an icon and a label, `text-sm` and `font-medium`. The icon is the light one, and
  the solid one for the item of the current page.
- The item of the current page has a `border-l-4` border in `primary-700` (`primary-500` in the
  dark theme), a `gray-100` background (`gray-800`) and `gray-900` text (`gray-50`). The other
  items get the same background on hover.
- When all the pages fit in the menu, group them into sections, each with a label shown in
  capital letters (`uppercase`), as in My Nethesis: *Systems management*, *Companies and users*.
- When they do not, give each area an item that opens and closes its pages, as in NethSecurity:
  *Network*, *Firewall*. The item shows a chevron, and its pages are indented, without an icon.
  The item of the current page is open, and the menu remembers the items the user opened
  (`savePreference` of `@nethesis/vue-components`).

### Top bar

- The top bar stays at the top of the page (`sticky top-0`), 64 px high (`h-16`), with the
  background of the side menu, a border below and no shadow.
- On the left, below `lg`, the button that opens the side menu (`faBars`), then a vertical
  separator. The space in the middle is kept for a global search.
- On the right, the state of the product, such as the unsaved changes or the name of the unit in
  NethSecurity, then a vertical separator, then the icon buttons.
- Each icon button has a 24 px icon, a round background on hover, and a tooltip with its name,
  also read by screen readers (`sr-only`). In this order:
  - **Help**: a link to the documentation of the product, in a new tab. A product can add
    buttons before it, such as *Ask AI* in My Nethesis.
  - **Notifications**, only in a product with a notifications drawer: opens the drawer on the
    right, which lists the [toasts](#toasts) shown so far. The bell shakes when a notification
    arrives, and shows no dot.
  - **Account**: the avatar of the user and a chevron. It opens a menu aligned to the right, with
    the name and the email of the user at the top, then items such as the account page and the
    theme, and last, after a divider, *Sign out*.

### Page

- The page sits on the right of the side menu (`lg:pl-72`), with `py-10` above and below and
  `px-4 sm:px-6 lg:px-8` on the sides.
- It starts with the [page header](#page-header). A detail page has a breadcrumb above the
  title, which leads back to the list, as in My Nethesis. Views of the same page are tabs
  (`NeTabs`) below the title, as *Firewall rules* in NethSecurity.
- Toasts appear over the page, as [Toasts](#toasts) says.

## Page header

From the [*Table page* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-table-page--standard).
The text of the title and of the description follows the
[writing guidelines](?page=writing-guidelines#page-header).

- The actions of the page, the `primary` button such as `Create user` and, when there is one,
  a second button, go on the right of the description, aligned with it.
- When the page has a title but no description, they go on the right of the title.
- When it has neither a title nor a description, and the page shows a table, a primary action
  about the objects of the table, such as creating a new one, can go on the right of the table
  toolbar, or above it on small screens.
- On small screens they go after the description, or after the title.
- When a page that lists objects has none yet, the primary action that creates them goes only
  in the empty state.

```example
page-header
```

## Cards

- A button inside a card is left-aligned, like the rest of the content of the card, not pushed
  to the right edge.
- The menu of actions of the card stays in its top right corner: the `menuItems` of `NeCard`.

```example
card-actions
```

## Dashboard

- The home page of a product can be a dashboard: a grid of cards, each an `NeCard` about one
  subject. A card can count one kind of object, such as the systems or the users, as in My
  Nethesis, or show a chart or other statistics.
- The grid has one column on phones, two from `sm`, and three or four on wide screens (`xl`,
  `2xl`), with `gap-6` between the cards.
- In the title of every card, the icon of its subject and the title, in sentence case like every
  title, both in Text/Secondary neutral (`text-base`, `font-medium`).
- A card can lead to the page of the product with the details of its subject, such as the list
  of the objects that it counts.
- A counter card has the number in its top right corner: `text-4xl`, `font-medium`, in
  Text/Secondary.
  - From 10,000 the number is abbreviated, such as *12.5K* (*12,5K* in Italian), with the full
    number in a tooltip.
  - The number links to the page that lists the objects it counts. Its accessible name holds the
    title and the number, such as *Users: 12*.
- The cards load and refresh as [Loading and errors](?page=loading-and-errors) says: on the first
  load, each card shows its skeleton; on a refresh, such as an automatic one every 30 seconds,
  their content stays on screen. A failed load shows one error above the grid.

```example
dashboard
```

## Forms

- A form that creates or edits an object of a list goes in a side drawer, opened by the create
  button of the page or the Edit action of a row: follow the
  [*Create item drawer* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-create-item-drawer--standard).
- A form that is the page itself, such as a settings page or the account page, goes in the page,
  with the layout of `FormLayout` in My Nethesis and NethSecurity: copy it from
  `src/components/common/FormLayout.vue` of My Nethesis.
  - The form is at most 768 px wide (`max-w-3xl`) and split into sections, one for each subject,
    with a divider (`<hr>`) between them and `space-y-8` around it.
  - Each section has its title (`text-lg`, `font-medium`) and, when needed, a description
    (`text-sm`, `gray-500`, `gray-400` in the dark theme) on the left, 5/12 of the width
    (`md:w-5/12`), and its fields on the right (`md:w-7/12`), one below the other. Below `md`,
    the title and the description go above the fields.
  - One `primary` *Save* button saves the whole page. It goes after the last section and its
    divider, aligned with the fields, with the error of a failed save above it.
- An inline notification about one field, such as a missing prerequisite or a warning on its
  value, goes right above that field, never below it: users read it before they fill in the
  field.

```example
form-in-page
```

## Tables

- A page that lists objects follows the
  [*Table page* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-table-page--standard):
  the toolbar with search and filters above the table, the actions of each row on its right.
- A table that can hold more rows than fit in a page has `NePaginator` in the `paginator` slot
  of `NeTable`. It shows 10 rows by default, and the user can choose 5, 10, 25, 50 or 100.
- The number of rows the user chooses is kept for that user and that table, also after signing
  out: save it in the browser with `savePreference` of `@nethesis/vue-components`, named after the
  table (`usersPageSize`), and read it with `getPreference` when the page opens. Both keep it in
  the local storage entry `preferences-<username>`.
- A new number of rows, a search or a filter brings the table back to its first page.

```example
table-pagination
```

## Buttons

- Buttons are left-aligned, like the content they belong to, as in cards and in forms in a page.
  They go on the right only in the footer of a modal or a drawer, and for the actions of the
  [page header](#page-header).
- Only one `primary` button in a view or a dialog: the others are `secondary` or `tertiary`.
- A button that confirms a destructive action is `danger`, in place of the `primary`.

```example
one-primary
```

## Toasts

- Toasts are temporary: they appear in the top right corner of the screen, below the top bar,
  and close by themselves after 5 seconds, 10 seconds for an error, or with their close button.
- Several toasts stack one below the other, aligned to the right, with the newest at the top.
- A product can also keep its toasts in a notifications drawer, opened from the top bar, where
  the user can read them again later. The drawer is optional.
- After closing a modal or a drawer, show the toast once the closing animation has ended, about
  500 ms later: otherwise it appears while the dialog is still moving.

```example
toasts
```

## Small screens

- Write the layout mobile first, with the Tailwind breakpoints (`sm:`, `md:`, `lg:`…), and check
  it at a phone width.
- `NeTable` shows each row as a card below its `cardBreakpoint`. Follow the
  [*Table page* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-table-page--standard)
  for a page that lists objects.
