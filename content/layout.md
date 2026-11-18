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
  - **Notifications**: opens a side drawer on the right. The bell shakes when a notification
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
- Toasts appear in the top right corner, below the top bar.

## Page header

From the [*Table page* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-table-page--standard).
The text of the title and of the description follows the
[writing guidelines](?page=writing-guidelines#page-header).

- The primary action, such as `Create user`, goes on the right of the title, or of the
  description when there is no title.
- On small screens it goes after the description.
- When there is no description, it goes on the right of the table toolbar, or above it on small
  screens.
- When there are no objects yet, it goes only in the empty state.

```example
page-header
```

## Cards

- The action buttons of a card, such as the button that opens what the card shows, are usually
  left-aligned, like the text above them, not pushed to the right edge.
- The menu of actions of the card stays in its top right corner: the `menuItems` of `NeCard`.

```example
card-actions
```

## Buttons

- Only one `primary` button in a view or a dialog: the others are `secondary` or `tertiary`.
- A button that confirms a destructive action is `danger`, in place of the `primary`.

```example
one-primary
```

## Small screens

- Write the layout mobile first, with the Tailwind breakpoints (`sm:`, `md:`, `lg:`…), and check
  it at a phone width.
- `NeTable` shows each row as a card below its `cardBreakpoint`. Follow the
  [*Table page* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-table-page--standard)
  for a page that lists objects.

## Toasts after a dialog

After closing a modal or a drawer, show the toast once the closing animation has ended, about
500 ms later: otherwise it appears while the dialog is still moving.
