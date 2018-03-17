#!/usr/bin/env node

const program = require('commander');

const speedyDownload = require('../src/speedyDownload');

program
    .version('0.0.1')
    .usage('fetch <file>')
    .command('fetch <fileUrl>')
    .description('Fetch and download a file from the internet')
    .option('-o, --output-file <outputFile>', 'Name to save the output file')
    .option('-c, --chunk-size <chunkSize>', 'Size of chunks in bytes')
    .option('-m, --max-chunks <maxChunks>', 'Max number of chunks to download')
    .action((fileUrl, cmd) => {
        speedyDownload((fileUrl), {
            chunkSize: Number(cmd.chunkSize),
            maxChunks: Number(cmd.maxChunks),
            outputFilename: cmd.outputFile
        });
    });

program.parse(process.argv); // notice that we have to parse in a new statement.
