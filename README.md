# Large data sets rendering performance test app

A demo app used to test performance of large (n=500) data lists rendering.

Currently implemented following renderers:

- a [react window](https://github.com/bvaughn/react-window) based list
- a plain list of elements

Run `npm install && npm start` to start local dev server.

Open `/test-data` page to trigger rendering of different kinds of lists (you can also use `rerender 10 times` button to get more statistics data)

Open `/performance` page to see rendering statistics
