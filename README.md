Metropolis
===========

## Metropolis Features

* Interactive environment to explore .NET SOAP & REST web services
* Graphical unit test creation and execution
* Play/Pause live tests and interactively step through your tests
* Jasmine-like result expectations
* Generate APIs to call .NET services from PHP & JavaScript

## Installation Instructions

You will need to install the latest version of [Node.js](https://nodejs.org/en/) to install this project.  If you are new to Node.js, you can download the most recent Node installer from the home page of their website.

Once Node.js is installed, clone this repository to your local machine.  If you are new to Git and aren't sure how to 'clone' this repository, you can click on the green "Clone or download" button on top of this page and/or use [GitHub Desktop](https://desktop.github.com/).

Once you have cloned this project to your local machine, open a Terminal/Command window and navigate to the directory you cloned this project to.  Then enter this command in the Terminal (note, you may not need 'sudo'):

```bash
sudo npm install
```

This should install the node dependencies for this project.

To run the application, just type the following into the console:

```bash
npm start
```

## Using Metropolis

### Getting Started

When you run Metropolis for the first time, you will need to create a project.  Projects will contain the data for your web service tests and make it easy to come back and rerun previous tests.

### Create a New Project

Create a new project by clicking the "Create New Project" button on the welcome screen.  This will take you to the Create Project page where it will prompt you to give your project a name.

Once you have created your new project, you will be ready to add one or more web service references to your project.

### Add Service Reference(s)

With your newly created project, you should see a button in the top/left corner that says "Add Service".  Click "Add Service" and you will be presented with the Add Service dialog.

You can name your service anything that will be meaningful for you to identify which service you are working with.  Currently, Metropolis supports .NET web services of the SOAP and REST protocols.

#### SOAP services

To add a SOAP service, in the Service Path inputs, you'll want to select the "SOAP(WSDL)" option from the drop down menu and provide a link to the service WSDL.  Once you've added the WSDL to the project, Metropolis will load the WSDL and display the methods in its definition.

#### REST services

To add a REST service, in the Service Path inputs, you'll want to select "REST(MS HELP URL)" from the drop-down menu and provide the url to the help file the .NET framework generates for a rest service.  Since the REST service does not have a WSDL, Metropolis will crawl the .NET help files to discover the service api.

### Selecting Methods to Test

After adding your service references, you should see a list of each service along the left side of the application.  Clicking on any of the services in this list will reveal the list of methods supported by the service.  You can click on any method in this list to add it to the list of Methods to Test.

### Default Values

You can define preset values for arguments to be used during the test.  In the Default Values section, click "Toggle Details" to view the list of default values and to add new ones.

### Editing Method Calls

You can click "Show Details" on each of the methods listed under "Methods to Test" to view the arguments that will be sent during this method call.  You can edit the specific parameters of each argument in this form if you would like, this will override the default values of the test, but won't alter your saved test data.

### Managing Expectations (Making Assertions)

Different test frameworks refer to the action of evaluating the results of a method call as either making "assertions" or reviewing "expectations".  Metropolis supports a Jasmine-like list of "expectations".

You can add an Expectation to a test by clicking the blue cog button in the top/right of the method listing.

This will reveal the form where you can select the parameter coming back as a result of a method call and define what you expect this parameter to be (or to have if it's an object).

As the test is played, each expectation will be applied to the result data to determine if a test passes or fails.

### Parker System

Metropolis uses a simple cache called a Parker that records all the parameters sent and received during a test, and where possible fills in the default test data with known values from previous tests.

This means that you only have to define the very minimum default values to get your test started.  As the test runs, parameters such as the userId or securityToken are captured in the Parker when a test logs a user in and will be used in subsequent tests where those parameters are required to make additional method calls.

### Remapping Values

The Parker system works great around 80-90% of the time, meaning you don't have to define default parameters for most of your method calls.  But, in the edge cases where there may be naming difference or even just casing difference, it may be necessary to move/rename/remap data in the Parker object in order to get the default values needed for your test.

When clicking the blue cog button to reveal the Add Expectation form, you would have also revealed the "Remap Values" form.  You can use this form to rename/remap values in your Parker object.  These remap directives will occur just before the method call for the test that defines them.

### Running the Test

To run the test, just click the "Play" button at the top of the page.  This will begin a cascade down the list of methods to be called.  As each method passes their expectations, the "play head" will increment forward and call the next method.

If a test fails, the test is paused and the play head is advanced to the method just after the failing test.  At which point, you can review the details of the method that failed.  The exact URL for the method call, along with the specific parameters sent and received from the call will be displayed.

You can use the back/forward buttons to move the play head backwards or forwards through the test.  You can edit values for individual tests and then restart the test at any point by clicking play.

This functionality allows you to interactively step through a test and try different parameters to achieve success.
