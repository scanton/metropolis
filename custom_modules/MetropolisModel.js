module.exports = class MetropolisModel {

  constructor(settings) {
    this.fs = require('fs-extra');
    this.soap = require('soap');
    this.msRest = require('../custom_modules/ms-discover.js');
    let Expectations = require('../custom_modules/Expectations.js');
    this.expect = new Expectations();
    let RestClient = require('node-rest-client').Client;
    this.rest = new RestClient();
    this.settings = settings;
    this.currentProject = null;
    this.serviceDetails = {};
    this.projectList = [];
    this.listeners = {};
    this.parker = {};
    let path = __dirname.split("custom_modules")[0];
    this.expectations = this.fs.readJsonSync(path + 'data/expectations.json').sort(function(a, b) {
      if (a.assertionType > b.assertionType) {
        return 1;
      } else if (a.assertionType < b.assertionType) {
        return -1;
      }
      return 0;
    });
  }

  addAssertion(testIndex, parameter, type, value) {
    let set = this.settings.getSettings();
    let proj = this._cloneObject(set.currentProject);
    proj.tests[testIndex].assertions.push({
      parameter: parameter,
      type: type,
      value: value
    });
    this.settings.setValue("currentProject", proj);
    this._saveCurrentProject();
  }
  addDefaultParameter(param, val) {
    let set = this.settings.getSettings();
    let proj = this._cloneObject(set.currentProject);
    if (!proj.defaultValues) {
      proj.defaultValues = {};
    }
    proj.defaultValues[param] = val;
    this.settings.setValue("currentProject", proj);
    this._saveCurrentProject();
  }
  addEventListener(eventName, handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(handler);
  }
  addTest(serviceName, methodName) {
    let meth = this._getMethodFromCurrentProject(serviceName, methodName);
    if (meth) {
      this._addTestToCurrentProject(meth);
    }
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
  dispatchEvent(eventName, data) {
    let handlers = this.listeners[eventName];
    let l = handlers.length;
    while (l--) {
      handlers[l](data);
    }
  }
  getCurrentProject() {
    return this.currentProject;
  }
  getExpectationDetails(type) {
    var l = this.expectations.length;
    while (l--) {
      if (this.expectations[l].assertionType == type) {
        return this.expectations[l];
      }
    }
  }
  getExpectations() {
    return this.expectations;
  }
  getMethodDetails(serviceName, methodName) {
    if (this.serviceDetails[serviceName]) {
      let service = this.serviceDetails[serviceName];
      let l = service.length;
      while (l--) {
        if (service[l].id == methodName) {
          return service[l];
        }
      }
    }
  }
  getParker(name) {
    return this.parker[name];
  }
  getProjectList() {
    return this.projectList;
  }
  getService(name) {
    name = name.trim();
    if (this.currentProject && this.currentProject.services) {
      let l = this.currentProject.services.length;
      while (l--) {
        if (this.currentProject.services[l].name == name) {
          return this.currentProject.services[l];
        }
      }
    }
  }
  getServiceDetails(serviceName) {
    if (this.serviceDetails[serviceName]) {
      return this.serviceDetails[serviceName];
    }
  }
  getTest(index) {
    if (index !== undefined) {
      let set = this.settings.getSettings();
      if (set && set.currentProject && set.currentProject.tests) {
        return set.currentProject.tests[index];
      }
    }
  }
  getTestCount() {
    let set = this.settings.getSettings();
    if (set.currentProject && set.currentProject.tests) {
      return set.currentProject.tests.length;
    }
  }
  hasProject(name) {
    let dir = this._getProjectPath(name);
    return this.fs.pathExistsSync(dir);
  }
  hasTest(id) {
    if (id !== undefined) {
      let set = this.settings.getSettings();
      if (set && set.currentProject && set.currentProject.tests) {
        let l = set.currentProject.tests.length;
        while (l--) {
          if (set.currentProject.tests[l].method == id) {
            return true;
          }
        }
      }
    }
    return false;
  }
  loadProject(name, callback) {
    if (this.hasProject(name)) {
      let path = this._getProjectPath(name);
      this.fs.readJson(path, (err, data) => {
        if (err) {
          console.warn(err, path, data);
        }
        this.currentProject = data;
        if (data.defaultValues) {
          this.resetParker();
          this.park(data.defaultValues);
        }
        this.settings.setValue("currentProject", data);
        callback(data);
      });
    } else {
      console.warn(name + " does not exist as a project.");
    }
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
  loadServiceDetails(data, progressHandler, count = 0) {
    if (data.services && data.services.length) {
      let l = data.services.length;
      let service = data.services[count];
      if (service.type == 'soap') {
        this._loadSoapDetails(service, (details) => {
          //service.details = details;
          this.serviceDetails[service.name.trim()] = details;
          let isComplete = count == l - 1;
          progressHandler(this.serviceDetails, isComplete);
          if (!isComplete) {
            this.loadServiceDetails(data, progressHandler, count + 1);
          }
        });
      } else if (service.type == 'ms-rest') {
        this._loadMsRestDetails(service, (details) => {
          //service.details = details;
          this.serviceDetails[service.name.trim()] = details;
          let isComplete = count == l - 1;
          progressHandler(this.serviceDetails, isComplete);
          if (!isComplete) {
            this.loadServiceDetails(data, progressHandler, count + 1);
          }
        });
      }
    }
  }
  moveTest(index, target) {
    let set = this.settings.getSettings();
    if (set.currentProject && set.currentProject.tests) {
      if (index && target < set.currentProject.tests.length) {
        let tests = set.currentProject.tests
        tests.splice(target, 0, tests.splice(index, 1)[0]);
        this._saveCurrentProject();
      }
    }
  }
  park(obj) {
    for (let i in obj) {
      this.parker[i] = obj[i];
    }
    return this.parker;
  }
  removeAssertion(testIndex, assertionIndex) {
    let set = this.settings.getSettings();
    let proj = this._cloneObject(set.currentProject);
    proj.tests[testIndex].assertions.splice(assertionIndex, 1);
    this.settings.setValue("currentProject", proj);
    this._saveCurrentProject();
  }
  removeDefaultParameter(param) {
    let set = this.settings.getSettings();
    let proj = this._cloneObject(set.currentProject);
    delete proj.defaultValues[param];
    this.settings.setValue("currentProject", proj);
    this._saveCurrentProject();
  }
  removeTest(index) {
    if (index !== undefined) {
      let set = this.settings.getSettings();
      if (set && set.currentProject && set.currentProject.tests) {
        set.currentProject.tests.splice(index, 1);
        this._saveCurrentProject();
      }
    }
  }
  resetParker() {
    this.parker = {};
  }
  test(service, methodDetails, testData, formData, callback) {
    if (service.type == 'soap') {
      var args = {};
      let l = methodDetails.parameters.length;
      for (let i = 0; i < l; i++) {
        let name = methodDetails.parameters[i].name;
        let type = methodDetails.parameters[i].type;
        args[name] = this._getDefaultValue(name, type, formData);
      }
      this.soap.createClient(service.uri, (err, client) => {
        if (err) {
          console.warn(err);
        }
        client[testData.method](args, (err, result) => {
          if (err) {
            console.warn(err);
          }
          for (var i in result) {
            this.park(result[i]);
          }
          let assertions = this._makeAssertions(result, testData);
          let o = {
            result: result,
            assertions: assertions,
            args: args,
            parker: this.parker,
            service: service,
            methodDetails: methodDetails,
            testData: testData
          }
          callback(o, err);
        });
      });
    } else if (service.type == 'ms-rest') {
      let args = {};
      if(methodDetails.bodyParameters) {
        args = this._mergeObjects(args, this._objectifyParameters(methodDetails.bodyParameters, formData));
      }
      if(methodDetails.uriParameters) {
        args = this._mergeObjects(args, this._objectifyParameters(methodDetails.uriParameters, formData));
      }
      let verb = methodDetails.verb;
      let uri = service.uri.split("/help")[0] + '/' + this._injectValues(methodDetails.path, formData);
      if(this.rest[verb.toLowerCase()]) {
        this.rest[verb.toLowerCase()](uri, args, (result, response) => {
          this.park(result);
          let assertions = this._makeAssertions(result, testData);
          let o = {
            uri: uri,
            result: result,
            assertions: assertions,
            args: args,
            parker: this.parker,
            service: service,
            methodDetails: methodDetails,
            testData: testData
          }
          callback(o, response);
        });
      } else {
        console.warn("REST Verb: " + verb.toUpperCase() + " not supported");
      }
    } else {
      callback(null, null, "invalid service type");
    }
  }
  updateDefaultParameter(param, val) {
    this.addDefaultParameter(param, val);
  }

  /**
   * Private Methods
   **/

   _objectifyParameters(arr, formData) {
     let o = {};
     let l = arr.length;
     for(let i = 0; i < l; i++) {
       let name = arr[i].name;
       let type = arr[i].type;
       o[name] = this._getDefaultValue(name, type, formData);
     }
     return o;
   }

  _addTestToCurrentProject(method) {
    let set = this.settings.getSettings();
    if (set && set.currentProject && set.currentProject.tests) {
      set.currentProject.tests.push(method);
      this._saveCurrentProject();
    }
  }
  _assert(param, value, type, args) {
    let o = {
      param: param,
      value: value,
      type: type,
      args: args,
      passed: false
    };
    if (this.expect[type]) {
      if (args.length == 0) {
        o.passed = this.expect[type](value);
      } else if (args.length == 1) {
        o.passed = this.expect[type](value, args[0]);
      } else if (args.length == 2) {
        o.passed = this.expect[type](value, args[0], args[1]);
      } else if (args.length == 3) {
        o.passed = this.expect[type](value, args[0], args[1], args[2]);
      }
    } else {
      console.log(this.expect);
      console.warn("expectation type not found", type);
    }
    return o;
  }
  _cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  _getDefaultProjectModel(name) {
    return {
      name: name,
      services: [],
      settings: {},
      tests: []
    };
  }
  _getDefaultValue(name, type, formData) {
    let isNumeric = false;
    if (type == 'xs:boolean' || type == 'xs:int' || type == 'integer') {
      isNumeric = true;
    }
    if(formData[name]) {
      if(isNumeric) {
        return Number(formData[name]);
      } else {
        return formData[name];
      }
    }
    let p = this.getParker(name);
    if (p) {
      if (isNumeric) {
        p = Number(p);
      }
      return p;
    }
    if (isNumeric) {
      return 0;
    }
    return '';
  }
  _getMethodFromCurrentProject(serviceName, methodName) {
    serviceName = serviceName.trim();
    methodName = methodName.trim();
    if (this.serviceDetails[serviceName]) {
      let srv = this.serviceDetails[serviceName];
      let l = srv.length;
      while (l--) {
        if (srv[l].id.trim() == methodName) {
          let a = this._cloneObject(srv[l]);
          let o = {};
          o.service = serviceName;
          o.method = methodName;
          o.assertions = [];
          o.details = srv[l];
          return (o);
        }
      }
    }
  }
  _getParameters(data) {
    let a = [];
    for (let i in data) {
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
  _injectValues (str, vals) {
  	var a = str.split("{");
  	var l = a.length;
  	var a2;
  	for(var i = 1; i < l; i++) {
  		a2 = a[i].split('}');
  		a2[0] = vals[a2[0]];
  		a[i] = a2.join('');
  	}
  	return a.join('');
  }
  _loadMsRestDetails(service, handler) {
    this.msRest.getData(service.uri, (data) => {
      handler(this._sortParams(JSON.parse(data)));
    });

  }
  _loadSoapDetails(service, handler) {
    this.soap.createClient(service.uri, (err, client) => {
      if (err) {
        throw err;
      }
      let description = client.describe();
      for (let i in description) {
        for (let j in description[i]) {
          description = description[i][j];
        }
      }
      handler(this._sortParams(this._processSoapData(description)));
    });
  }
  _makeAssertions(data, test) {
    let tests = [];
    if (test.assertions && test.assertions.length) {
      let l = test.assertions.length;
      for (let i = 0; i < l; i++) {
        let ass = test.assertions[i];
        console.log(ass, data);
        tests.push(this._assert(ass.parameter, data[ass.parameter], ass.type, ass.value));
      }
    }
    return tests;
  }
  _mergeObjects(obj1, obj2) {
    let o = this._cloneObject(obj1);
    let o2 = this._cloneObject(obj2);
    for(let i in o2) {
      o[i] = o2[i];
    }
    return o;
  }
  _processSoapData(data) {
    let a = [];
    for (let i in data) {
      let d = data[i];
      a.push({
        id: i,
        parameters: this._getParameters(d.input),
        resourceDescription: this._getParameters(d.output)
      });
    }
    return a;
  }
  _saveCurrentProject() {
    let set = this.settings.getSettings();
    this.currentProject = set.currentProject;
    let proj = this._cloneObject(set.currentProject);
    let l = proj.services.length;
    while (l--) {
      proj.services[l].details = [];
    }
    this.dispatchEvent("default-data-change", proj);
    this.fs.outputJson(this._getProjectPath(set.currentProject.name), proj, {
      spaces: 4
    }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  _sortParams(data) {
    return data.sort(function(a, b) {
      if (a.id.toLowerCase() < b.id.toLowerCase()) {
        return -1;
      } else if (a.id.toLowerCase() > b.id.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
