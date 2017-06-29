module.exports = class MetropolisModel {

	constructor() {
    this.fs = require('fs-extra');
    this.currentProject = null;
	}

  hasProject(name) {
    let dir = this._getProjectPath(name);
    return this.fs.pathExistsSync(dir);
  }

  createProject(name, callback) {
    if(!this.hasProject(name)) {
      let dir = this._getProjectPath(name);
      let json = this._getDefaultProjectModel(name);
      this.currentProject = json;
      this.fs.outputJson(dir, json, (err) => {
        callback(json, err);
      });
    } else {
      console.warn(name + " already exists as a project.");
    }
  }

  getProjectList() {
    this.fs.readdir(__dirname.split("custom_modules")[0] + 'working_files/projects/', function(err, items) {
      console.log(err, items);
    });
  }

  loadProject(name, callback) {
    if(this.hasProject(name)) {
      let path = _getProjectPath(name);
      this.fs.readJson(path, function(data, err) {
        console.log(data, err);
      });
    } else {
      console.warn(name + " does not exist as a project.");
    }
  }

  _getProjectPath(name) {
    return __dirname.split("custom_modules")[0] + 'working_files/projects/' + name + '.json';
  }
  _getDefaultProjectModel(name) {
    return {
      name: name,
      services: [],
      settings: {}
    };
  }
}
