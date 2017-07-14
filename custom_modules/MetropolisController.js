module.exports = class MetropolisController {

  constructor(model, viewController, settings) {
    this.settings = settings;
    this.viewController = viewController;
    this.model = model;
		this.model.addEventListener("default-data-change", (data) => {
			this.viewController.callViewMethod("project-detail-view", 'setProjectDetails', data);
		});
    this.model.loadProjectList((data) => {
      let projectList = [];
      for (let i in data) {
        projectList.push(data[i].split(".json")[0]);
      }
      this.viewController.callViewMethod('projects-side-bar', 'setProjectList', projectList);
      this.viewController.callViewMethod('welcome-page', 'setProjectList', projectList);
    });
		this.testIndex = 0;
		this.testIsPaused = true;
  }

	resetTestIndex() {
		this.testIndex = 0;
		this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
	}
	stepBackTestIndex() {
		if(this.testIndex > 0) {
			--this.testIndex;
			this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
		}
	}
	stepForwardTestIndex() {
		let proj = model.getCurrentProject();
		if(proj && proj.tests && this.testIndex < proj.tests.length - 1) {
			++this.testIndex;
			this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
		}
	}
	playTest() {
		this.testIsPaused = false;
	}
	pauseTest() {
		this.testIsPaused = true;
	}
	getTestIndex() {
		return this.testIndex;
	}

	getExpectationDetails(type) {
		return model.getExpectationDetails(type);
	}


  addAssertion(testIndex, parameter, type, value) {
    model.addAssertion(testIndex, parameter, type, value);
  }

	removeAssertion(testIndex, assertionIndex) {
		model.removeAssertion(testIndex, assertionIndex);
	}

	updateMousePosition(x, y) {
		$(".custom-tool-tip").css("left", x + 10).css("top", y + 10);
	}

  getServiceData(serviceType, uri) {
    if (!uri) {
      this.showModal("Missing URI", "<p>Please provide a URL to the service you would like to use.</p>", [{
        label: "OK",
        class: "btn btn-info",
        handler: () => {
          this.closeModal();
        }
      }]);
      return;
    }
    if (serviceType == ".NET REST") {
      console.log("REST", uri);
    } else if (serviceType == "SOAP") {
      console.log("SOAP", uri);
    } else {
      this.showModal("Unknown serviceType: " + serviceType, "<p>'" + serviceType + "' is not a supported service type.</p>", [{
        label: "OK",
        class: "btn btn-info",
        handler: () => {
          this.closeModal();
        }
      }]);
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

  showLoader() {
    $(".loading-animation").fadeIn();
  }

  closeLoader() {
    $(".loading-animation").fadeOut();
  }

	showTooltip(tip) {
		$(".custom-tool-tip").text(tip).removeClass("hide");
	}
	hideTooltip() {
		$(".custom-tool-tip").addClass("hide");
	}

  /**
   *
   * Projects
   *
   **/

  addProject(name) {
    if (!this.model.hasProject(name)) {
      this.model.createProject(name, (data, err) => {
        this.model.loadProjectList((data) => {
          let projectList = [];
          for (let i in data) {
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
        }
      ]);
    }
  }

  loadProject(name) {
    if (name) {
      this._disableWorkspace();
      this.model.loadProject(name, (data) => {
        $(".active-view").slideUp("fast").removeClass("active-view");
        this.viewController.callViewMethod('project-detail-view', 'setProjectDetails', data);
        $(".project-detail-view").slideDown("fast").addClass("active-view");
        this.model.loadServiceDetails(data, (data, isComplete) => {
          if (isComplete) {
            this._enableWorkspace();
          }
        });
      });
    }
  }

  createNewProject() {
    this.showView("manage-projects-view");
  }

  openProject() {
    this.showView("manage-projects-view");
  }

  saveProject() {
    console.log("save project");
  }

  addMethodToWorkspace(service, method) {
		model.addTest(service, method);
  }
  /**
   *
   * Private methods
   *
   **/

  _disableWorkspace() {
    this.showLoader();
  }
  _enableWorkspace() {
    this.closeLoader();
  }
}
