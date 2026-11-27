# Loading and errors

Every part of a page that shows data from the server has three states: loading, error and
data. A list has a fourth one, empty. Show each state where the data goes, so that users always
know whether the data is coming, is missing or could not arrive.

The states belong to the part of the page, not to each call. When several calls fill the same
part, such as a table and the counters above it, they share one skeleton and one error. A call
that shows nothing, such as a prefetch, needs no state, and an error handled for the whole
application, such as an expired session, needs no message of its own.

## Loading

- **First load**: while the data of a part is loading for the first time, show `NeSkeleton` in
  its place, with about the shape of the content, or the `loading` prop of `NeTable`. The rest
  of the page stays visible, such as the page header and its primary action. Don't cover the
  page with a spinner.
- **Refresh**: when the data is already on screen and loads again, such as with an automatic
  refresh, the **Refresh** button, a filter or a page of a table, keep showing it. Don't go back
  to the skeleton, which makes the content jump, loses the scroll position and, in a table, takes
  the focus away from the sort button that started the load. Show only refreshes that take more
  than 500 ms: a quicker one ends before anyone needs to be told.
  - **A table**: an indeterminate `NeProgressBar` of size `sm` over the top border of the table,
    out of the layout, so that showing it never moves the table or its toolbar, with `Updating…`
    as text for screen readers only. It fades in after 500 ms; it has no text to read, so it
    needs no minimum time on screen.
  - **Other content**, such as a timeline or a grid of cards: a small `NeSpinner` with
    `Updating…` next to the toolbar or the title. It appears after 500 ms and, once shown, stays
    at least 500 ms: a quicker one would only flash, too fast to read.
- **Actions**: the button that starts an action, such as **Save**, **Create** or **Delete**,
  takes its `loading` state until the server answers, and can't be pressed again meanwhile. The
  other fields and buttons of the form stay as they are.

## Errors

- **The data can't be loaded**: show `NeInlineNotification` in place of the content, with the
  title `Cannot retrieve <objects>` and the cause in the description, as in
  [Error messages](?page=writing-guidelines#error-messages). Don't show an empty state instead.
- **A refresh fails**: keep the data on screen and show the error above it.
- **An action fails**: keep the drawer or the modal open with what users entered, and show the
  error in it with `NeInlineNotification`. When the action succeeds, close it and show a toast.
- **Where the error goes**: an error about one part of the page, such as a table, a card or the
  form of a drawer, goes in that part, with `NeInlineNotification`. An error that belongs to no
  part of the page, such as a call for the whole application or an operation in the
  background, can go in a toast. A product can show a toast as well as the inline error, for
  example to keep it in its list of notifications.
- No call fails silently: an error only in the console is a missing error state.

## Empty state

Show `NeEmptyState` only after a load that succeeded with no items, as in
[Empty states](?page=writing-guidelines#empty-states). Never show it while the data is loading
or after an error: users would believe that there is nothing.

On the page, in place of a table or a list, the empty state has the background of a card,
Elevation/L0 (white, Gray/950 in the dark theme), as in the
[*Empty state* pattern](https://nethesis.github.io/vue-components/?path=/story/patterns-empty-state--no-items).
Its default background, Elevation/L2, is for an empty state inside a card.

| Where | Do | Don't |
| --- | --- | --- |
| First load | A skeleton in place of the table | A spinner over the whole page |
| Refresh | The table stays, with the bar over its top border | The table goes back to the skeleton |
| Load that failed | `Cannot retrieve customers`, with the cause | `No customers` |
| Empty state on the page | The background of a card, Elevation/L0 | The default gray background, Elevation/L2 |
| Save | **Save** shows its loading state until the server answers | **Save** can be pressed again while the first save runs |
