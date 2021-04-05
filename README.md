# trapped-water-calculator

trapped-water-calculator presents an interactive, React-based UI for the trapped rainwater problem. To form land, click on one or more squares, and the trapped rainwater will be automatically filled in with blue squares. The number of water squares will be tallied below the grid.

No underground aquifers are allowed, so a click in mid-air will build land in all squares below the clicked square as well as the clicked square itself. Likewise, a click on land underneath one more more land squares will delete all land above the clicked square, as well as the clicked square itself.


## Installation

Clone the repository or download the zip and expand in an empty directory, then in the directory containg package.json, run:

### `npm install`

## Usage

Run:

### `npm start`

The React server will listen on port 3000, and should automatically launch the page in your browser.

## Options

To change the grid size, modify the rows/cols props in `./src/index.js`. UI inputs of rows/cols will be available in a future commit.
