# download-booster

## Installation

```
npm install -g download-booster
```

## Usage

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
`--max-chunks output.pdf // 0 - ignored if zero`

## Examples

Using default options
```
download-booster fetch https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Specifying an output file
```
download-booster fetch -o another-file.pdf https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Specifying a chunk size of 1 Kib
```
download-booster fetch -c 1024 -o image.png https://wiesmann.codiferes.net/share/bitmaps/test_pattern.png
```

Specifying a max chunk of 1
```
download-booster fetch -m 1 https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Download first KiB only
```
download-booster fetch -m 1 -c 1024 https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

Save first KiB to specific output file
```
download-booster fetch -m 1 -c 1024 -o my-tiny-file.pdf https://www.hrw.org/sites/default/files/reports/wr2010_0.pdf
```

