import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define expected languages
const validLanguages = ["en", "zh-CN"]; // Extend this array with more languages as needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function expandObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    let propName = parentKey ? parentKey + "." + key : key;

    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        result[propName + "[" + index + "]"] = item;
      });
    } else if (typeof obj[key] === "object") {
      expandObject(obj[key], propName, result);
    } else {
      result[propName] = obj[key];
    }
  }
  return result;
}

async function processDirectory(directory, baseName = "", language = "en") {
  const entries = await fs.promises.readdir(directory, { withFileTypes: true });
  let combinedObject = {};

  for (const entry of entries) {
    const localPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const nestedBaseName = baseName
        ? `${baseName}/${entry.name}`
        : entry.name;
      Object.assign(
        combinedObject,
        await processDirectory(localPath, nestedBaseName, language)
      );
    } else if (
      entry.isFile() &&
      entry.name === `${language}.js` &&
      baseName !== ""
    ) {
      const filePath = `file://${localPath}`;
      const fileData = await import(filePath);
      combinedObject[baseName] = fileData.default;
    }
  }

  return combinedObject;
}

async function main() {
  const language = process.argv[2];

  if (!language || !validLanguages.includes(language)) {
    console.log(`Usage: node ${path.basename(__filename)} [language]`);
    console.log(`Supported languages are: ${validLanguages.join(", ")}`);
    console.log("Example: node index.js en");
    process.exit(1);
  }

  console.log(`Processing language files for: ${language}`);

  const combinedData = await processDirectory(
    path.join(__dirname, "locales"),
    "",
    language
  );
  const expandedData = expandObject(combinedData);
  const jsonOutput = JSON.stringify(expandedData, null, 4);

  // Optionally, write to a JSON file
  fs.writeFileSync(path.join(__dirname, "output.json"), jsonOutput);
}

main().catch(console.error);
