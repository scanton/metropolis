module.exports = class MetropolisController {

	constructor(model, viewController) {
		this.viewController = viewController;
		this.model = model;
		this.model.getProjectList((data) => {
			let projectList = [];
			for(let i in data) {
				projectList.push(data[i].split(".json")[0]);
			}
			this.viewController.callViewMethod('projects-side-bar', 'setProjectList', projectList);
		});
	}

	getServiceData(serviceType, uri) {
		if(!uri) {
			console.warn("Missing URI");
			return;
		}
		if(serviceType == ".NET REST") {
			console.log("REST", uri);
		} else if(serviceType == "SOAP") {
			console.log("SOAP", uri);
		} else {
			console.warn("Unknown serviceType: ", serviceType);
		}
	}

  showView(viewName) {
    console.log(viewName);
  }

  showMenu(menuName) {
    console.log(menuName);
  }

	/**
	 *
	 * Projects
	 *
	 **/

	addProject(name) {
		console.log("creating new project: ", name);
		if(!this.model.hasProject(name)) {
			this.model.createProject(name, (data, err) => {
				this.model.getProjectList((data) => {
					let projectList = [];
					for(let i in data) {
						projectList.push(data[i].split(".json")[0]);
					}
					this.viewController.callViewMethod('projects-side-bar', 'setProjectList', projectList);
				});
			});
		} else {
			console.warn(name + " already exists as a project.");
		}
	}

  createNewProject() {
    console.log("create new project");
  }

	loadProject(name) {
		this.model.loadProject(name, (data) => {
				console.log('load project ' + name, data);
		});
	}

  openProject() {
    console.log("open project");
  }

  saveProject() {
    console.log("save project");
  }

	/**
	 *
	 * Private methods
	 *
	 **/


}
