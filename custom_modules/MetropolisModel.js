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
      this.fs.outputJson(dir, json, {spaces: 4}, (err) => {
        callback(json, err);
      });
    } else {
      console.warn(name + " already exists as a project.");
    }
  }

  getProjectList(callback) {
		let path = __dirname.split("custom_modules")[0] + 'working_files/projects/';
		if(this.fs.pathExistsSync(path)) {
	    this.fs.readdir(path, function(err, items) {
	      if(err) {
	        console.error(err);
	      }
	      callback(items);
	    });
		} else {
			callback([]);
		}
  }

  loadProject(name, callback) {
    if(this.hasProject(name)) {
      let path = this._getProjectPath(name);
      this.fs.readJson(path, (err, data) => {
				if(err) {
					console.warn(err, path, data);
				}
				this.currentProject = data;
        callback(data);
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
