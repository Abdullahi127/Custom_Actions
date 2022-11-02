// Add dependencies.
// npm install @actions/core
// npm install @actions/github

const core = require("@actions/core");
const github = require("@actions/github");
//const fs = require("fs");
const fs = require("fs/promises");

// To build.
// npm i -g @vercel/ncc
// ncc build .github/actions/jsonReader/index.js -o .github/actions/jsonReader/build

//---- Methods.
async function example() {
  try {
    const jsonFile = core.getInput("path");
    const key = core.getInput("key");

    //const jsonString = fs.readFileSync(jsonFile);
    const jsonString = await fs.stat(jsonFile);
    const versions = new Map(Object.entries(JSON.parse(jsonString)));

    core.setOutput("value", versions.get(key).toString());
    console.log(JSON.stringify(github, null, "\t"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

example();
