# Sector Connection Algorithm
An algorithm for connecting squares / borders in a Grid

run the test program with `electron .` inside your terminal, electron must be installed globally or else it will not open.
 
This algorithm takes positions on a grid and uses an algorithm to connect edges and create the correct regions for textures and borders to be applied to a tilegrid or 2D grid of blocks

This is similar to the algorithm that Deepworld used back when the game was alive, and its also quite similar to both minecraft and terraria's apis respectively.

Im working to add support for 1x1 connected grids, but for right now only grids bigger than 2x2 work (such ad 3x3... 9x9, etc)

If you use 3x3, its essentially the same as Unity's UI Border algorithm

Everything used to render tha algorithm is inside the main javascript file, and the algorithm itself is inside [secca.js](./algorithms/secca.js)
