// 1) npm i -D jest
// 2) Update package.json with:
// "scripts": {
//    "test": "jest"
// }
// 3) Add module.exports = function_name in index.js. Example: module.exports = updatePatch;
// 4) npm test

// -------------- TESTS starts here.
const index = require("../index");

// --- Tests for the PATCH.

test("Update the PATCH by one", () => {
  expect(index.updatePatch("1.0.0")).toBe("1.0.1");
});

// --- Tests for the PATCH ends here.

// --- Tests for the MINOR starts here.

test("Update the MINOR by one", () => {
  expect(index.updateMINOR("1.0.0")).toBe("1.1.0");
});

test("Update the MINOR by one and reset the PATCH to zero", () => {
  expect(index.updateMINOR("1.0.1")).toBe("1.1.0");
});

// --- Tests for the MINOR ends here.

// --- Tests for the MAJOR starts here

test("Update the MAJOR by one", () => {
  expect(index.updateMAJOR("1.0.0")).toBe("2.0.0");
});

test("Update the MAJOR by one and reset thte MINOR and PATCH to zero", () => {
  expect(index.updateMAJOR("1.1.7")).toBe("2.0.0");
});

// --- Tests for the MINOR ends here.

// --- Tests for the findFirstMatch starts here.

test("Test MAJOR is returned when #COREMAJOR", () => {
  const result = "something#COREMAJOR";
  const validWords = ["MAJOR", "MINOR", "PATCH"];
  expect(index.findFirstMatch(result, validWords)).toBe("MAJOR");
});

test("Test MAJOR is returned when #CORE-MAJOR", () => {
  const result = "something#COREMAJOR";
  const validWords = ["MAJOR", "MINOR", "PATCH"];
  expect(index.findFirstMatch(result, validWords)).toBe("MAJOR");
});

test("Test MINOR is returned when #COREMINOR", () => {
  const result = "something#COREMINOR";
  const validWords = ["MAJOR", "MINOR", "PATCH"];
  expect(index.findFirstMatch(result, validWords)).toBe("MINOR");
});

test("Test MINOR is returned when #CORE-MINOR", () => {
  const result = "something#COREMINOR";
  const validWords = ["MAJOR", "MINOR", "PATCH"];
  expect(index.findFirstMatch(result, validWords)).toBe("MINOR");
});

// // --- Tests for the findFirstMatch ends here.

// // --- Tests for the findVaildRegex starts here.

test("find the MAJOR regex for core when there are MINOR and PATCH available.", () => {
  const projectName = "CORE";
  const validRegexs = [
    "#" + projectName + "MAJOR",
    "#" + projectName + "MINOR",
    "#" + projectName + "PATCH",
  ];
  const commitsArray = ["#COREMINOR", "#COREPATCH", "#COREMAJOR"];
  expect(index.findValidRegex(validRegexs, projectName, commitsArray)).toBe(
    "#COREMAJOR"
  );
});

test("find the MINOR regex for core when PATCH available.", () => {
  const projectName = "CORE";
  const validRegexs = [
    "#" + projectName + "MAJOR",
    "#" + projectName + "MINOR",
    "#" + projectName + "PATCH",
  ];
  const commitsArray = ["#COREPATCH", "#COREMINOR"];
  expect(index.findValidRegex(validRegexs, projectName, commitsArray)).toBe(
    "#COREMINOR"
  );
});

test("find the PATCH regex for core.", () => {
  const projectName = "CORE";
  const validRegexs = [
    "#" + projectName + "MAJOR",
    "#" + projectName + "MINOR",
    "#" + projectName + "PATCH",
  ];
  const commitsArray = ["#asdfasdfsad", "#COREPATCH", "fasdfasdfgg"];
  expect(index.findValidRegex(validRegexs, projectName, commitsArray)).toBe(
    "#COREPATCH"
  );
});

// // --- Tests for the findVaildRegex ends here.

// // --- Tests for the updateCurrentVersion starts here.

test("Update CORE MAJOR.", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.0";
  const commits = "fasdfasd #COREPATCH sdfsadf #COREMAJOR";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "2.0.0"
  );
});

test("Update CORE MAJOR (FOR CORE-MINOR).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.0";
  const commits = "fasdfasd #COREPATCH sdfsadf #COREMAJOR";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "2.0.0"
  );
});

test("Update CORE MINOR (FOR COREMINOR).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.1";
  const commits = "fasdfasd #COREPATCH sdfsadf #COREMINOR";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "1.1.0"
  );
});

test("Update CORE MINOR (FOR CORE-MINOR).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.1";
  const commits = "fasdfasd #COREPATCH sdfsadf #CORE-MINOR";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "1.1.0"
  );
});

test("Update CORE PATCH (FOR COREPATCH).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.1";
  const commits = "fasdfasd sdfsadf #COREPATCH";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "1.0.2"
  );
});

test("Update CORE PATCH (FOR CORE-PATCH).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.1";
  const commits = "fasdfasd #CORE-PATCH sdfsadf";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "1.0.2"
  );
});

test("Update CORE PATCH (FOR CORE-PATCH).", () => {
  const projectName = "CORE";
  const currentVersion = "1.0.1";
  const commits = "fasdfasd dsfasdfsad sdfsadf";
  expect(index.updateCurrentVersion(projectName, currentVersion, commits)).toBe(
    "1.0.2"
  );
});

// --- Tests for the updateCurrentVersion ends here.
