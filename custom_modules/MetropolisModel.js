module.exports = class MetropolisModel {

  constructor(settings) {
    this.fs = require('fs-extra');
		this.soap = require('soap');
		this.msRest = require('../custom_modules/ms-discover.js');
    this.settings = settings;
    this.currentProject = null;
		this.projectList = [];
  }

  hasProject(name) {
    let dir = this._getProjectPath(name);
    return this.fs.pathExistsSync(dir);
  }

  createProject(name, callback) {
    if (!this.hasProject(name)) {
      let dir = this._getProjectPath(name);
      let json = this._getDefaultProjectModel(name);
      this.currentProject = json;
      this.settings.setValue("currentProject", json);
      this.fs.outputJson(dir, json, {
        spaces: 4
      }, (err) => {
        callback(json, err);
      });
    } else {
      console.warn(name + " already exists as a project.");
    }
  }

  getCurrentProject() {
    return this.currentProject;
  }

	getProjectList() {
		return this.projectList;
	}

  loadProjectList(callback) {
    let path = __dirname.split("custom_modules")[0] + 'working_files/projects/';
    if (this.fs.pathExistsSync(path)) {
      this.fs.readdir(path, function(err, items) {
        if (err) {
          console.error(err);
        }
				this.projectList = items;
        callback(items);
      });
    } else {
      callback([]);
    }
  }

  loadProject(name, callback) {
    if (this.hasProject(name)) {
      let path = this._getProjectPath(name);
      this.fs.readJson(path, (err, data) => {
        if (err) {
          console.warn(err, path, data);
        }
        this.currentProject = data;
        this.settings.setValue("currentProject", data);
        callback(data);
      });
    } else {
      console.warn(name + " does not exist as a project.");
    }
  }

  loadServiceDetails(data, progressHandler, count = 0) {
    if (data.services && data.services.length) {
      let l = data.services.length;
      let service = data.services[count];
      if (service.type == 'soap') {
        this._loadSoapDetails(service, (details) => {
					service.details = details;
					let isComplete = count == l - 1;
					progressHandler(data, isComplete);
					if(!isComplete) {
						this.loadServiceDetails(data, progressHandler, count + 1);
					}
        });
      } else if (service.type == 'ms-rest') {
        this._loadMsRestDetails(service, (details) => {
					service.details = details;
					let isComplete = count == l - 1;
					progressHandler(data, isComplete);
					if(!isComplete) {
						this.loadServiceDetails(data, progressHandler, count + 1);
					}
        });
      }
    }
  }

  _loadSoapDetails(service, handler) {
		this.soap.createClient(service.uri, (err, client) => {
			if(err) {
				throw err;
			}
			let description = client.describe();
			for(let i in description) {
				for(let j in description[i]) {
					description = description[i][j];
				}
			}
			handler(this._sortParams(this._processSoapData(description)));
		});

  }
  _loadMsRestDetails(service, handler) {
		this.msRest.getData(service.uri, (data) => {
			handler(this._sortParams(JSON.parse(data)));
		});

  }
	_processSoapData(data) {
		let a = [];
		for(let i in data) {
			let d = data[i];
			a.push({
				id: i,
				parameters: this._getParameters(d.input),
				resourceDescription: this._getParameters(d.output)
			});
		}
		return a;
	}
	_sortParams(data) {
		return data.sort(function(a, b) {
			if(a.id.toLowerCase() < b.id.toLowerCase()) {
				return -1;
			} else if(a.id.toLowerCase() > b.id.toLowerCase()) {
				return 1;
			} else {
				return 0;
			}
		});
	}
	_getParameters(data) {
		let a = [];
		for(let i in data) {
			a.push({
				description: '',
				name: i,
				type: data[i]
			});
		}
		return a;
	}
  _getProjectPath(name) {
    return __dirname.split("custom_modules")[0] + 'working_files/projects/' + name + '.json';
  }
  _getDefaultProjectModel(name) {
    return {
      name: name,
      services: [],
      settings: {},
      tests: []
    };
  }
}
