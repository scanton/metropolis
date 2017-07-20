module.exports = class Expectations {

	constructor() {
  }

  toContain(data, member) {
    return data[member] != null;
  }
  toBeDefined(data) {
    return data != null;
  }
	toHaveNumberWithinRange(data, member, min, max) {
		let n = Number(data[member]);
		min = Number(min);
		max = Number(max);
		if(!isNaN(n) && !isNaN(min) && !isNaN(max)) {
			return n >= min && n <= max;
		}
		return false;
	}
	toHaveTrue(data, member) {
		let element = data[member];
		return element == true || element == 'true';
	}
}
