module.exports = class MetropolisController {

	constructor(model, viewController, settings) {
		this.settings = settings;
		this.viewController = viewController;
		this.model = model;
		this.model.getProjectList((data) => {
			let projectList = [];
			for(let i in data) {
				projectList.push(data[i].split(".json")[0]);
			}
			this.viewController.callViewMethod('projects-side-bar', 'setProjectList', projectList);
			this.viewController.callViewMethod('welcome-page', 'setProjectList', projectList);

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
    $(".active-view").slideUp("fast").removeClass("active-view");
		$("." + viewName).slideDown("fast").addClass("active-view");
  }

  showMenu(menuName) {
    console.log(menuName);
  }

	showModal(headline, body, buttons) {
		this.viewController.callViewMethod('custom-dialog-box', 'setHeadline', headline);
		this.viewController.callViewMethod('custom-dialog-box', 'setBody', body);
		this.viewController.callViewMethod('custom-dialog-box', 'setButtons', buttons);
		$(".custom-modal-dialog").fadeIn("fast");
	}

	closeModal() {
		$(".custom-modal-dialog").fadeOut("fast");
	}

	/**
	 *
	 * Projects
	 *
	 **/

	addProject(name) {
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
			this.showModal("'" + name + "' Already Exists", "<p>You already have an existing project called '" + name + "'.</p><p>Please select another name for your new project.</p>", [{
				label: "Cancel",
				class: "btn btn-default",
				handler: () => {
					this.closeModal();
				}
			},
			{
				label: "Load " + name,
				class: "btn btn-success",
				handler: () => {
					this.loadProject(name);
					this.closeModal();
				}
			}]);
		}
	}

  createNewProject() {
    console.log("create new project");
  }

	loadProject(name) {
		this.model.loadProject(name, (data) => {
			$(".active-view").slideUp("fast").removeClass("active-view");
			this.viewController.callViewMethod('project-detail-view', 'setProjectDetails', data);
			$(".project-detail-view").slideDown("fast").addClass("active-view");
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
