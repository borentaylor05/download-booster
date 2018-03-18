# downloadbooster

## Installation

```
npm install -g downloadbooster
```

## CLI Usage

Command line options for the `fetch` command are:

```
Options

   -o, --output-file <outputFile>  Name to save the output file
   -c, --chunk-size <chunkSize>    Size of chunks in bytes
   -m, --max-chunks <maxChunks>    Max number of chunks to download
   -h, --help                      output usage information
```

### Defaults
`--output-file output.pdf`

`--chunk-size 1048576 // 1024 * 1024 = 1 MiB`

`--max-chunks 0 // 0 - ignored if zero`

## CommonJS Usage
```javascript
const downloadBooster = require('downloadbooster');

const options = {
    chunkSize: 1024 * 1024,
    maxChunks: 20,
    outputFilename: 'output.pdf'
};

downloadBooster('https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf');
```

## CLI Examples

Using default options
```
downloadbooster fetch https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Specifying an output file
```
downloadbooster fetch -o another-file.pdf https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Specifying a chunk size of 1 Kib
```
downloadbooster fetch -c 1024 -o image.png https://wiesmann.codiferes.net/share/bitmaps/test_pattern.png
```

Specifying a max chunk of 1
```
downloadbooster fetch -m 1 https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Download first KiB only
```
downloadbooster fetch -m 1 -c 1024 https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Save first KiB to specific output file
```
downloadbooster fetch -m 1 -c 1024 -o my-tiny-file.pdf https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

