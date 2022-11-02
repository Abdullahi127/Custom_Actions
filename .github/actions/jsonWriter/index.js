// Add dependencies.
// npm install @actions/core
// npm install @actions/github

const core = require("@actions/core");
const github = require("@actions/github");
//const fs = require("fs");
const fs = require("fs/promises");

// To build.
// npm i -g @vercel/ncc
// ncc build .github/actions/jsonWriter/index.js -o .github/actions/jsonWriter/build

//---- Methods.
async function example() {
  try {
    const jsonFile = core.getInput("path");
    const key = core.getInput("key");
    const value = core.getInput("value");

    const jsonString = fs.readFileSync(jsonFile);
    const versions = new Map(Object.entries(JSON.parse(jsonString)));

    versions.set(key, value);
    await fs.appendFile(
      jsonFile,
      JSON.stringify(Object.fromEntries([...versions]))
    );

    core.setOutput("map", JSON.stringify(Object.fromEntries([...versions])));

    console.log(JSON.stringify(github, null, "\t"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

example();
