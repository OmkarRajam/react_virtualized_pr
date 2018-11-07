I have created this repo to demonstrate following issues that I found in library react-virtualized.
I have filed those issues and made a PR to fix them.

Filed issues:

1] Large list items are center aligned instead of top aligned during keyboard navigation #1263

Issue url- https://github.com/bvaughn/react-virtualized/issues/1263

PR - https://github.com/bvaughn/react-virtualized/pull/1264

Requesting a minor improvement

This happens in virtualized list, when list item height is larger than list height and scrollToAlignment is set to auto. 

When arrow key stepper is being used along with virtualized list, and you click a list item or navigate list by pressing down arrow key, for large list items, we see the center of list items instead of the top. It looks weird. It would look natural if we see the top of the list item instead of center.

(Keeping scrollToAlignment = 'start' does solve this problem but overall behavior of list keyboard navigation is weird since instead of highlight moving up and down, highlighted item is always fixed to the top of the list)

**In short**,
instead of this 
![huge_item_wrong](https://user-images.githubusercontent.com/25122531/48127498-e4285900-e2a9-11e8-8fa2-445e6cfa77bd.gif)

I want this
![huge_item_right](https://user-images.githubusercontent.com/25122531/48127533-f73b2900-e2a9-11e8-978f-d734ab1680dc.gif)


You can see a demo of the above problem on this codesandbox
https://codesandbox.io/s/github/OmkarRajam/react_virtualized_pr
It has been created using this repository
https://github.com/OmkarRajam/react_virtualized_pr


|                   |          |
|-------------------|----------|
| Browser           |    Chrome      |
| OS                |       Windows   |
| React             |     16.6.0     |
| React DOM         |   16.6.0       |
| react-virtualized |    9.21.0      |

I have added a PR that solves this issue.


2] Slight scroll up using mouse wheel makes highlighted list item to force scroll into view

Issue url- https://github.com/bvaughn/react-virtualized/issues/1265

PR - https://github.com/bvaughn/react-virtualized/pull/1266

**What's the issue:**
When we scroll down the list for some time and then we scroll up even for a bit (using mouse wheen/touchpad), we jump to the highlighted list item (highlighted item is force scrolled in the view) even though it was far away from where we were.

**When does the issue occur:**
This is a rare issue which occurs only when all these conditions are met
1. list items height is variable (thus we use CellMeasurer), 
2. we have used Arrow Key Stepper, (and we maintain a scrollToIndex state)
3. height of list item changes after it is mounted. (we fetch some data once the component is mounted and then to accommodate the new height, 'measure' function is called once data is received.)

here's a gif:
![scroll_jump](https://user-images.githubusercontent.com/25122531/48130280-25246b80-e2b2-11e8-84cd-07e77625b0aa.gif)

You can see a demo of the above problem on this codesandbox
https://codesandbox.io/s/github/OmkarRajam/react_virtualized_pr
It has been created using this repository
https://github.com/OmkarRajam/react_virtualized_pr

|                   |          |
|-------------------|----------|
| Browser           |    Chrome      |
| OS                |       Windows   |
| React             |     16.6.0     |
| React DOM         |   16.6.0       |
| react-virtualized |    9.21.0      |