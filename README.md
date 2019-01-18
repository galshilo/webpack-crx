# webpack-crx
pack chrome extensions

````
javascript
const WebpackCrx = require("webpack-crx");
new WebpackCrx({
              key: 'ey.pem',
              src: 'build',
              dest: 'dist',
              name: 'outputfile'
          })
```

Options:
`key` (optiona)
  Path to pem key file. If no key is provided, a temp key will be generated for the packing process.
 `src`
  folder containing the extension files.
 `dest`
  destination output folder.
 `name`
  output file name
