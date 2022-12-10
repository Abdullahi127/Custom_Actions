// Add dependencies.
// npm install @actions/core
// npm install @actions/github
// npm i -g @vercel/ncc

const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

// To build:
// ncc build .github/actions/findprojectversion/index.js -o .github/actions/findprojectversion/build

//---- Methods.
try {
  const jsonFile = core.getInput("path");
  const key = core.getInput("key");

  const jsonString = fs.readFileSync(jsonFile);
  const versions = new Map(Object.entries(JSON.parse(jsonString)));

  core.setOutput("value", versions.get(key).toString());
  console.log(JSON.stringify(github, null, "\t"));
} catch (error) {
  core.setFailed(error.message);
}
