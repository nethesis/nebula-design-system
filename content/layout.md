# Layout

The space between the parts of a page comes from the scale of
[Spacing and border](?page=spacing-and-border), the surfaces from
[Elevation and shadow](?page=elevation-and-shadow), and the place of skeletons, errors and empty
states from [Loading and errors](?page=loading-and-errors).

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
