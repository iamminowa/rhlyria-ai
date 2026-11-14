# Vendored front-end libraries

These files are served by the Worker from `/horizon/vendor/` so the app has no third-party CDN dependency.
Each file keeps its original license header. Do not remove the headers.

| File | What it is | License |
| --- | --- | --- |
| `liquid.js`, `liquid.css` | Liquid Glass SDK, based on "glisse" v0.5.0 by Kelvin Zhang (https://github.com/0kzh/glisse), with modifications by COSVerses | MIT |
| `react.js`, `react-dom.js` | React 18.3.1 and ReactDOM 18.3.1 UMD production builds, unmodified, by Meta Platforms, Inc. and affiliates | MIT |

Only change made to `liquid.js` in this repository: the two `ensure(...)` calls that load React now point to this app's own `/horizon/vendor/` paths instead of a CDN.

The CDN usage policy in the headers concerns the original hosting of these files by their publisher. This repository serves its own copies, as the MIT license and that policy allow.
