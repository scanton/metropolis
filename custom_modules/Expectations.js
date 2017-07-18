module.exports = class Expectations {

	constructor() {
  }

  toContain(data, member) {
    return data[member] != null;
  }
  toBeDefined(data) {
    return data != null;
  }
}
