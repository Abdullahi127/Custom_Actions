// Add dependencies.
// npm install @actions/core
// npm install @actions/github
// npm i -g @vercel/ncc

const core = require("@actions/core");
const github = require("@actions/github");

const findValidRegex = (validRegexes, projectName, commits) => {
  const result = "#" + projectName + "-PATCH";
  for (let i = 0; i < validRegexes.length; i++) {
    const regex = new RegExp(`${validRegexes[i]}`);
    for (let j = 0; j < commits.length; j++) {
      const word = commits[j].toUpperCase();
      if (regex.test(word)) {
        return word;
      }
    }
  }
  return result;
};

const updateMAJOR = (currentVersion) => {
  const digests = currentVersion.split(".");
  let MAJOR = parseInt(digests[0]) + 1;
  let MINOR = 0;
  let PATCH = 0;

  return MAJOR + "." + MINOR + "." + PATCH;
};

const updateMINOR = (currentVersion) => {
  const digests = currentVersion.split(".");
  let MAJOR = parseInt(digests[0]);
  let MINOR = parseInt(digests[1]) + 1;
  let PATCH = 0;

  return MAJOR + "." + MINOR + "." + PATCH;
};

const updatePatch = (currentVersion) => {
  const digests = currentVersion.split(".");
  let MAJOR = parseInt(digests[0]);
  let MINOR = parseInt(digests[1]);
  let PATCH = parseInt(digests[2]) + 1;

  return MAJOR + "." + MINOR + "." + PATCH;
};

const findFirstMatch = (characters, regexes) => {
  let temp;
  for (let i = 0; i < regexes.length; i++) {
    temp = characters.match(new RegExp(`${regexes[i]}`));

    if (temp != null) {
      return temp.toString();
    }
  }
  return temp.toString();
};

const nextVersion = (result, currentVersion) => {
  switch (result) {
    case "MAJOR":
      return updateMAJOR(currentVersion);
    case "MINOR":
      return updateMINOR(currentVersion);
    case "PATCH":
      return updatePatch(currentVersion);
    default:
      throw console.error(
        "Illegal state, the variable must be MAJOR, MINOR or PATCH. The variable is [ " +
          result +
          " ]"
      ); // TODO need to be tested!
  }
};

const updateCurrentVersion = (projectName, currentVersion, commits) => {
  const validRegexes = [
    "#" + projectName + "-MAJOR",
    "#" + projectName + "MAJOR",
    "#" + projectName + "-MINOR",
    "#" + projectName + "MINOR",
    "#" + projectName + "-PATCH",
    "#" + projectName + "PATCH",
  ];

  const validWords = ["MAJOR", "MINOR", "PATCH"];

  const commitsArray = commits.split(" ");
  let result = findValidRegex(validRegexes, projectName, commitsArray);
  result = findFirstMatch(result, validWords);

  switch (result) {
    case "MAJOR":
      return updateMAJOR(currentVersion);
    case "MINOR":
      return updateMINOR(currentVersion);
    default:
      return updatePatch(currentVersion);
  }
};

// To build:
// ncc build .github/actions/findnextversion/index.js -o .github/actions/findnextversion/build

try {
  const projectName = core.getInput("projectName").toUpperCase();
  const currentVersion = core.getInput("currentVersion");
  const commits = core.getInput("commits");
  const nextVersion = updateCurrentVersion(
    projectName,
    currentVersion,
    commits
  );

  core.setOutput("nextVersion", nextVersion);
  console.log(JSON.stringify(github, null, "\t"));
} catch (error) {
  core.setFailed(error.message);
}

module.exports = {
  updatePatch,
  updateMINOR,
  updateMAJOR,
  findFirstMatch,
  findValidRegex,
  nextVersion,
  updateCurrentVersion,
};
