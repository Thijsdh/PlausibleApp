class MyPathBuilder {
  constructor({rootDir}) {
    this._rootDir = rootDir;
  }

  buildPathForTestArtifact(artifactName, testSummary) {
    return `${this._rootDir}/${artifactName}`;
  }
}

module.exports = MyPathBuilder;
