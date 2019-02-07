# webpack-crx
pack chrome extensions

````
const WebpackCrx = require("webpack-crx");
new WebpackCrx({
              key: 'key.pem',
              src: 'build',
              dest: 'dist',
              name: 'outputfile'
          })
````

Options:

 `key` (optional)
 
  Path to pem key file. If no key is provided, a temp key will be generated for the packing process.
  
 `src`

  folder containing the extension files.
        
 `dest`
    
  destination output folder.
  
 `name`
 
  output file name
