module.exports = class MetropolisController {

	constructor() {

	}

	addProject(name) {
		console.log("creating new project: ", name);
	}

  createNewProject() {
    console.log("create new project");
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

  openProject() {
    console.log("open project");
  }

  saveProject() {
    console.log("save project");
  }

  showView(viewName) {
    console.log(viewName);
  }

  showMenu(menuName) {
    console.log(menuName);
  }
}
