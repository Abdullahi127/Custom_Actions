// Add dependencies.
// npm install @actions/core
// npm install @actions/github

const core = require("@actions/core");
const github = require("@actions/github");

// To build.
// npm i -g @vercel/ncc
// ncc build .github/actions/jsonReader/index.js -o .github/actions/jsonReader/build

//---- Methods.

//---- Main execution.
try {
  const jsonFile = core.getInput("json-file");

  const key = core.getInput("key");

  const value = "";

  core.setOutput("value", value);

  console.log(JSON.stringify(github, null, "\t"));
} catch (error) {
  core.setFailed(error.message);
}
