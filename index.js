const fs = require('fs');
const readline = require('readline');
const { mdToPdf } = require('md-to-pdf');

function objectToMarkdown(obj) {
    let markdown = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            markdown += `**${key}:** ${obj[key]}\n\n`;
        }
    }
    return markdown;
}

function formatJsonToMarkdown(jsonData) {
    let markdownContent = '';

    if (Array.isArray(jsonData)) {
        jsonData.forEach((item, index) => {
            markdownContent += `## Request ${index + 1}\n\n`;
            markdownContent += objectToMarkdown(item);
        });
    } else if (typeof jsonData === 'object') {
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                if(key === 'info'){
                    markdownContent += `## Documentation: \n\n`;
                    markdownContent += objectToMarkdown(jsonData[key]);
                } else if(key === 'item') {
                    jsonData.item.forEach((item, index) => {
                        markdownContent += `## Request : ${item.name}\n\n`;
            
                        markdownContent += objectToMarkdown({
                            'Method': item.request.method,
                            'URL': item.request.url.raw,
                            'Description': item.request.description || '',
                        });
            
                        if (item.request.body && item.request.body.raw) {
                            markdownContent += '### Request Body:\n\n```json\n';
                            markdownContent += JSON.stringify(JSON.parse(item.request.body.raw), null, 2);
                            markdownContent += '\n```\n\n';
                        }
            
                        if (item.response && item.response.length > 0) {
                            markdownContent += '### Response:\n\n```json\n';
                            markdownContent += JSON.stringify(item.response, null, 2);
                            markdownContent += '\n```\n\n';
                        }
                    });
                }
            }
        }
    } else {
        console.error('JSON format is not supported.');
    }

    return markdownContent;
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Please enter the path of the JSON file: ', (jsonFilePath) => {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    const markdownContent = formatJsonToMarkdown(jsonData);

    rl.question('Please enter the path for the output Markdown file: ', (markdownFilePath) => {
        fs.writeFileSync(markdownFilePath, markdownContent, 'utf-8');
        console.log('Conversion from JSON to Markdown completed successfully.');

        rl.question('Please enter the path for the output PDF file: ', async (pdfFilePath) => {
            try {
                const pdf = await mdToPdf({ path: 'readme.md' }, { dest: pdfFilePath }).catch((error) => {throw error});

                if (pdf) {
                    fs.writeFileSync(pdf.filename, pdf.content);
                }
                console.log('Conversion from Markdown to PDF completed successfully.');
            } catch (error) {
                console.error('Error during conversion from Markdown to PDF:', error.message);
            } finally {
                rl.close();
            }
        });
    });
});