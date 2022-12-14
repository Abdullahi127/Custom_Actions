// Add dependencies.
// npm install @actions/core
// npm install @actions/github
// npm i -g @vercel/ncc

const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

// To build:
// ncc build .github/actions/setprojectversion/index.js -o .github/actions/setprojectversion/build

//---- Methods.

try {
  const jsonFile = core.getInput("path");
  const key = core.getInput("key");
  const value = core.getInput("value");

  const jsonString = fs.readFileSync(jsonFile);
  const versions = new Map(Object.entries(JSON.parse(jsonString)));

  versions.set(key, value);
  fs.writeFileSync(jsonFile, JSON.stringify(Object.fromEntries([...versions])));
  core.setOutput("map", JSON.stringify(Object.fromEntries([...versions])));

  console.log(JSON.stringify(github, null, "\t"));
} catch (error) {
  core.setFailed(error.message);
}
