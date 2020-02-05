# error handling system

The error handling system for site-wide error handling

## Description

Our error handling system uses Dan Abramov's concept of [ErrorBoundaries](https://reactjs.org/docs/error-boundaries.html), in order to "catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI."

This allows us to handle errors gracefully, making it so the entire app doesn't crash due to a corrupt subsection of the codebase.

## Basic Example

We drank straight from the source on this one...

So see [here for an example](https://codepen.io/gaearon/pen/wqvxGa?editors=0010).

## Links
- [https://reactjs.org/docs/error-boundaries.html](https://reactjs.org/docs/error-boundaries.html)
- [https://codepen.io/gaearon/pen/wqvxGa?editors=0010](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)
