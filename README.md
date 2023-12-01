# Postman2MarkdownPDF

Postman2MarkdownPDF is a tool that converts Postman collection data in JSON format to Markdown and then to PDF. This can be useful for generating documentation from your Postman API collections.

## Installation

Ensure you have Node.js and npm installed on your machine. Then, install the required dependencies:

```bash
npm install
```

## Usage

1. **Run the Script:**

   ```bash
   node formatJsonToMarkdown.js
   ```

2. **Follow the Prompts:**

   - Enter the path to your Postman collection JSON file.
   - Enter the path for the output Markdown file.
   - Enter the path for the output PDF file.

3. **Output:**

   - The script will convert the JSON to Markdown and save it to the specified Markdown file.
   - It will then convert the Markdown to PDF and save it to the specified PDF file.

## Example

```bash
Please enter the path of the JSON file: path/to/your/postman_collection.json
Please enter the path for the output Markdown file: path/to/output/documentation.md
Please enter the path for the output PDF file: path/to/output/documentation.pdf
```

## Dependencies

- `fs`: File system module for reading and writing files.
- `readline`: Interface for reading user input from the console.
- `md-to-pdf`: Library for converting Markdown to PDF.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to contribute to this project by opening issues or pull requests. See [CONTRIBUTING](CONTRIBUTING.md) for more details.

## Acknowledgments

- Thanks to the [md-to-pdf](https://www.npmjs.com/package/md-to-pdf) library for making Markdown to PDF conversion easier.