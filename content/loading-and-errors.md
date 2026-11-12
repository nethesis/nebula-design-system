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
  refresh, the **Refresh** button, a filter or a page of a table, keep showing it. Show a small
  `NeSpinner` with `Updating…` next to the toolbar or the title. Show it only when the refresh
  takes more than 500 ms, and keep it visible for at least 500 ms: a quicker one would only
  flash, too fast to read. Don't go back to the skeleton, which makes the content jump and loses
  the scroll position.
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

| Do | Don't |
| --- | --- |
| A skeleton in place of the table on the first load | A spinner over the whole page |
| The table stays, with `Updating…` while it refreshes | The table goes back to the skeleton on every refresh |
| `Cannot retrieve customers`, with the cause | `No customers` after a load that failed |
| **Save** shows its loading state until the server answers | **Save** can be pressed again while the first save runs |
