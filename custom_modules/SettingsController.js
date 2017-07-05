module.exports = class SettingsController {

	constructor() {
    this.dirName = __dirname.split("custom_modules")[0];
    this.fs = require('fs-extra');
    let path = this.dirName + 'working_files/settings.json';
    if(!this.fs.existsSync(path)) {
      this.settings = {};
      this._saveSettings();
    } else {
      this._loadSettings(path);
    }
  }

  setValue(name, val) {
    this.settings[name] = val;
    this._saveSettings();
  }
  getValue(name) {
    return this.settings[name];
  }
  pushArrayValue(arrayName, val) {
    if(!this.settings[arrayName]) {
      this.settings[arrayName] = [];
    }
    this.settings[arrayName].push(val);
    this._saveSettings();
  }
  removeArrayValue(arrayName, val) {
    if(this.settings[arrayName]) {
        let a = this.settings[arrayName];
        let l = a.length;
        while(l--) {
          if(a[l] == val) {
            a.splice(l, 1);
          }
        }
        this._saveSettings();
    }
  }

  _saveSettings() {
    let path = this.dirName + 'working_files/settings.json';
    return this.fs.outputJsonSync(path, this.settings, {spaces: 4});
  }
  _loadSettings(path) {
    this.settings = this.fs.readJsonSync(path);
  }
}
