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
  addAssertion(testIndex, parameter, type, value) {
    model.addAssertion(testIndex, parameter, type, value);
  }
	addMethodToWorkspace(service, method) {
		model.addTest(service, method);
	}
  addProject(name, callback) {
    if (!this.model.hasProject(name)) {
      this.model.createProject(name, (data, err) => {
        this.model.loadProjectList((data) => {
          let projectList = [];
          for (let i in data) {
            projectList.push(data[i].split(".json")[0]);
          }
          this.viewController.callViewMethod('projects-side-bar', 'setProjectList', projectList);
					if(callback) {
						callback(name, data);
					}
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
	addRemapResult(testIndex, param, result) {
		model.addRemapResult(testIndex, param, result);
	}
	addRemapValue(testIndex, param, value) {
		model.addRemapValue(testIndex, param, value);
	}
  closeLoader() {
    $(".loading-animation").fadeOut();
  }
  closeModal() {
    $(".custom-modal-dialog").fadeOut("fast");
  }
  createNewProject() {
    this.showView("manage-projects-view");
  }
	getExpectationDetails(type) {
		return model.getExpectationDetails(type);
	}
	getService(name) {
		return this.model.getService(name);
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
	getServiceDetails(name) {
		return model.getServiceDetails(name);
	}
	getSettings() {
		return this.settings.getSettings();
	}
	getTestIndex() {
		return this.testIndex;
	}
  hasTest(id) {
    return model.hasTest(id);
  }
	hideTooltip() {
		$(".custom-tool-tip").addClass("hide");
	}
	importProject(data) {
		model.importProject(data, (proj) => {
			this.loadProject(proj.name);
		});
	}
  loadProject(name) {
    if (name) {
      this._disableWorkspace();
      this.model.loadProject(name, (data) => {
        $(".active-view").slideUp("fast").removeClass("active-view");
				this._setResizeTimeout();
        this.viewController.callViewMethod('project-detail-view', 'setProjectDetails', data);
				this.viewController.callViewMethod('top-nav', 'setProjectName', data.name);
        $(".project-detail-view").slideDown("fast").addClass("active-view");
        this.model.loadServiceDetails(data, (data, isComplete) => {
					this.viewController.callViewMethod('service-list', 'setServiceDetails', data);
          if (isComplete) {
            this._enableWorkspace();
          }
        });
      });
    }
  }
	moveTestDown(index) {
		model.moveTest(index, Number(index) + 1);
	}
	moveTestUp(index) {
		model.moveTest(index, Number(index) - 1);
	}
  openProject() {
    //this.showView("manage-projects-view");
		this.showView("welcome-page");
  }
	pauseTest() {
		this.testIsPaused = true;
		this.viewController.callViewMethod('playbar', 'setPaused', this.testIsPaused);
	}
	playTest() {
		this.testIsPaused = false;
		this.viewController.callViewMethod('playbar', 'setPaused', this.testIsPaused);
		this._runTest();
	}
	removeAssertion(testIndex, assertionIndex) {
		model.removeAssertion(testIndex, assertionIndex);
	}
	removeMethodFromWorkspace(index) {
		model.removeTest(index);
	}
	resetTestIndex() {
		this.pauseTest();
		this.testIndex = 0;
		this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
	}
  saveProject() {
    console.log("save project");
  }
	showAddServiceDialog() {
		this.showModal("Add Service", `
		<div class="add-service-dialog container-fluid">
			<div class="row">
				<div class="col-xs-2 label">
					Service Name:
				</div>
				<div class="col-xs-10">
					<input style="width: 100%" type="text" name="name" placeholder="service name" />
				</div>
			</div>
			<div class="row">
				<div class="col-xs-2 label">
					Service Path:
				</div>
				<div class="col-xs-3">
					<select name="service-type" style="width: 90%">
						<option value="ms-rest">REST (MS HELP URL)</option>
						<option value="soap">SOAP (WSDL)</option>
					</select>
				</div>
				<div class="col-xs-7">
					<input style="width: 100%" type="text" name="uri" placeholder="wsdl or rest help url" />
				</div>
			</div>
			<div class="warning" style="display: none;">
			</div>
		</div>
		`, [{
			label: "Cancel",
			class: "btn btn-default",
			handler: () => {
				this.closeModal();
			}
		},
		{
			label: "Add Service",
			class: "btn btn-success",
			handler: (e) => {
				let $dialog = $(".add-service-dialog");
				let type = $dialog.find("select[name='service-type']").val();
				let uri = $dialog.find("input[name='uri']").val();
				let name = $dialog.find("input[name='name']").val();
				let startsWith = uri.slice(0, 4);
				let endsWith = uri.slice(uri.length - 5);
				$dialog.find("input").css("background", "#666");
				if(!name.length) {
					$dialog.find("input[name='name']").css("background", "#933");
					$dialog.find(".warning").text("Please enter a name for this service.").slideDown("slow");
				} else if(type == 'ms-rest') {
					if(startsWith == 'http' && endsWith == '/help') {
						model.addServiceToProject(name, type, uri, (data) => {
							this.closeLoader();
						});
						this.closeModal();
						this.showLoader();
					} else {
						$dialog.find("input[name='uri']").css("background", "#933");
						$dialog.find(".warning").text("Invalid rest help file URI.  Should match 'http://service_host/service_name/help'").slideDown("slow");
					}
				} else if(type == 'soap') {
					if(startsWith == 'http' && endsWith == '?wsdl') {
						model.addServiceToProject(name, type, uri, (data) => {
							this.closeLoader();
						});
						this.closeModal();
						this.showLoader();
					} else {
						$dialog.find("input[name='uri']").css("background", "#933");
						$dialog.find(".warning").text("Invalid soap WSDL URI.  Should match 'http://service_host/service_name.svc?WSDL'").slideDown("slow");
					}
				} else {
					console.error("Type: (" + type + ") not supported.");
				}
			}
		}]);
	}
	showProjectDetailView() {
		this.showView("project-detail-view");
	}
  showImportProjectView() {
		this.showView("import-project");
  }
  showLoader() {
    $(".loading-animation").fadeIn();
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
	showTooltip(tip) {
		$(".custom-tool-tip").text(tip).removeClass("hide");
	}
  showView(viewName) {
    $(".active-view").slideUp("fast").removeClass("active-view");
    $("." + viewName).slideDown("fast").addClass("active-view");
  }
	stepBackTestIndex() {
		this.pauseTest();
		if(this.testIndex > 0) {
			--this.testIndex;
			this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
		}
	}
	stepForwardTestIndex() {
		this.pauseTest();
		let proj = model.getCurrentProject();
		if(proj && proj.tests && this.testIndex < proj.tests.length - 1) {
			++this.testIndex;
			this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
		}
	}
	toggleSettings() {
		let $set = $(".settings");
		if($set.hasClass("show-self")) {
			$set.removeClass("show-self");
		} else {
			$set.addClass("show-self");
		}
	}
	updateMousePosition(x, y) {
		$(".custom-tool-tip").css("left", x + 10).css("top", y + 10);
	}
  /**
   * Private methods
   **/
  _disableWorkspace() {
    this.showLoader();
  }
  _enableWorkspace() {
    this.closeLoader();
  }
	_objectifyValues(arr) {
		var o = {};
		for(var val in arr) {
			o[arr[val].name] = arr[val].value;
		}
		return o;
	}
	_runTest() {
		let autoPlay = 1;
		var index = this.testIndex;
		var isPaused = this.testIsPaused;
		if(!isPaused && index < model.getTestCount()) {
			let testData = stripObservers(model.getTest(index));
			let methodDetails = stripObservers(model.getMethodDetails(testData.service, testData.method));
			let service = stripObservers(model.getService(testData.service));
			let formData = this._objectifyValues($(".workspace ul.test-list li[data-index='" + index + "']").find("form").serializeArray());
			//for(let i in formData) {
				//if(model.parker[i]) {
				//	formData[i] = model.parker[i];
				//}
			//}
			if(testData.remapValues && testData.remapValues.length) {
				let l = testData.remapValues.length;
				for(let i = 0; i < l; i++) {
					let v = testData.remapValues[i];
					formData[v.param] = model.getParker(v.value);
				}
			}
			this.model.test(service, methodDetails, testData, formData, (data, err) => {
				if(err) {
					//console.warn(err);
				}
				let passedAssertions = true;
				if(data && data.assertions && data.assertions.length) {
					let l = data.assertions.length;
					while(l--) {
						let ass = data.assertions[l];
						if(!ass.passed) {
							passedAssertions = false;
						}
					}
				}
				this.viewController.callViewMethod('project-detail-view', 'setResults', {data: data, index: index});
				if(!isPaused) {
					let proj = this.model.getCurrentProject();
					if(proj && proj.tests && this.testIndex < proj.tests.length - 1) {
						++this.testIndex;
						this.viewController.callViewMethod('project-detail-view', 'setTestIndex', this.testIndex );
						if(autoPlay && passedAssertions) {
							this._runTest();
						} else {
							this.pauseTest();
							setTimeout(this._updateFooter.bind(this), 100);
						}
					} else {
						this.pauseTest();
						setTimeout(this._updateFooter.bind(this), 100);
					}
				}
			});
		}
	}
	_setResizeTimeout() {
		return setTimeout(() => {
			$(window).resize();
		}, 750);
	}
	_updateFooter() {
		let $list = $(".project-detail-view ul.test-list");
		let testCount = $list.find("li.service-test").length;
		let $assertions = $(".project-detail-view ul.list-of-assertions li");
		let assertionCount = $assertions.length;
		let successCount = $list.find("li.service-test.passed").length;
		let failCount = $list.find("li.service-test.failed").length;
		this.viewController.callViewMethod('footer-toolbar', 'setStatus', {status: failCount ? 'failed': 'success', testCount: testCount, assertionCount: assertionCount, successCount: successCount, failCount: failCount} )
	}
}
