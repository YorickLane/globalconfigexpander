# Global Config Expander

## Overview
This Node.js script is designed to dynamically load and expand localization files from a specified directory into a single JSON object. It supports processing files for specific languages by passing a language code as a command-line argument.

## Features
- Loads `.js` localization files from subdirectories within the `locales` directory.
- Supports specifying the language to process via command-line arguments.
- Outputs a flattened JSON object where each key represents a unique path in the original localization objects, including arrays indexed.

## Prerequisites
- Node.js (version 12 or later)

## Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
No dependencies are required outside of Node.js standard libraries.
Usage
Run the script by specifying a language code as an argument:

bash
Copy code
node index.js [language]
Supported languages are:

en (English)
zh-CN (Chinese Simplified)
Example:

bash
Copy code
node index.js en
This command will process all English localization files found in subdirectories of the locales folder and output the result to output.json.

Output
The output is a JSON file named output.json located in the root directory of the project, containing the expanded configuration.