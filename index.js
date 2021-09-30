const core = require("@actions/core");
const os = require("os");
const github = require("@actions/github");
const fs = require("fs");
const YAML = require("yaml");

function getValue(value, defaultValue) {
  return value != undefined && value != null && value.trim() != ""
    ? value
    : defaultValue;
}

try {
  const filePath = core.getInput("file");
  const major = core.getInput("major");
  const minor = core.getInput("minor");
  const patch = core.getInput("patch");

  var content = fs.readFileSync(filePath, "utf8");

  const yaml = YAML.parse(list);
  var split = yaml["version"].split(".");
  var version = {
    major: getValue(major, split[0]),
    minor: getValue(minor, split[1]),
    patch: getValue(patch, split[2]),
  };
  yaml["version"] = `${version.major}.${version.minor}.${version.patch}`;

  content = YAML.stringify(yaml);

  console.log(content);

  fs.writeFileSync(filePath, content);
  core.setOutput("yaml", content);
} catch (error) {
  core.setFailed(error.message);
}
