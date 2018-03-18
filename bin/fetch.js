#!/usr/bin/env node

const program = require('commander');

const speedyDownload = require('../src/speedyDownload');
const log = require('../src/log');

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
            // defaulting to undefined is strange but it lets me use proper defaults if
            // a user passes an invalid option (e.g. a string for chunkSize or maxChunks)
            chunkSize: Number(cmd.chunkSize) || undefined,
            maxChunks: Number(cmd.maxChunks) || undefined,
            outputFilename: cmd.outputFile
        }).then((savedFileName) => {
            log.success(`\nFile downloaded and saved as: ${savedFileName}\n`);
        }).catch((err) => {
            log.error(`${err}\n`);
        });
    });

program.parse(process.argv); // notice that we have to parse in a new statement.
