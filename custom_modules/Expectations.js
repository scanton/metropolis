module.exports = class Expectations {

	constructor() {
  }

	toBeAfter(data, date) {
		return new Date(data).getTime() > new Date(date).getTime();
	}
	toBeArray(data) {
		return Array.isArray(data);
	}
	toBeArrayOfBooleans(data) {
		if(this.toBeArray(data) && data.length > 0) {
			let l = data.length;
			while(l--) {
				let val = data[l];
				if(val !== 1 && val !== 0) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	toBeArrayOfNumbers(data) {
		if(this.toBeArray(data) && data.length > 0) {
			let l = data.length;
			while(l--) {
				let val = data[l];
				if(isNaN(val)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	toBeArrayOfObjects(data) {
		if(this.toBeArray(data) && data.length > 0) {
			let l = data.length;
			while(l--) {
				let val = data[l];
				if(typeof val !== "object" || val == null) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	toBeArrayOfSize(data, length) {
		return data.length == Number(length);
	}
	toBeArrayOfStrings(data) {
		if(this.toBeArray(data) && data.length > 0) {
			let l = data.length;
			while(l--) {
				let val = data[l];
				if(typeof val !== "string") {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	toBeBefore(data, date) {
		return new Date(data).getTime() < new Date(date).getTime();
	}
	toBeBoolean(data) {
		return data === 1 || data === 0;
	}
	toBeCloseTo(data, value, decimal) {
		let n = Math.round(data * (10 * decimal)) / (10 * decimal);
		return value == n;
	}
	toBeDate(data) {
		let d = new Date(data);
		return d instanceof Date && !isNaN(date.valueOf());
	}
  toBeDefined(data) {
    return data != null;
  }
	toBeEmptyArray(data) {
		return this.toBeArray(data) && data.length === 0;
	}
	toBeEmptyObject(data) {
		return Object.keys(data).length === 0 && data.constructor === Object;
	}
	toBeEmptyString(data) {
		return data && data.length && data.length === 0;
	}
	toBeEvenNumber(data) {
		return data % 2 === 0;
	}
	toBeFalse(data) {
		return data === false;
	}
	toBeFalsy(data) {
		return data == false || data === "false";
	}
	toBeOddNumber(data) {
		return Math.abs(n % 2) === 1;
	}
	toBeGreaterThan(data, value) {
		return Number(data) > Number(value);
	}
	toBeLessThan(data, value) {
		return Number(data) < Number(value);
	}
	toBeTrue(data) {
		return data === true;
	}
	toBeTruthy(data) {
		return data == true || data == 'true';
	}
  toContain(data, member) {
    return data[member] != null;
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
	toHaveString(data, member, str) {
		let s = data[member];
		return s == str;
	}
	toHaveTrue(data, member) {
		let element = data[member];
		if(element == true || element == 'true') {
			return true;
		};
		return false;
	}
}
