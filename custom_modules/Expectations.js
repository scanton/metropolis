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
		return d instanceof Date && !isNaN(data.valueOf());
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
	toBeGreaterThan(data, value) {
		return Number(data) > Number(value);
	}
	toBeGreaterThanOrEqualTo(data, value) {
		return Number(data) >= Number(value);
	}
	toBeJsonString(data) {
		try {
			JSON.parse(data);
		} catch(e) {
			return false;
		}
		return true;
	}
	toBeLessThanOrEqualTo(data, value) {
		return Number(data) <= Number(value);
	}
	toBeLongerThan(data, value) {
		return data.length > value;
	}
	toBeNaN(data) {
		return isNaN(Number(data));
	}
	toBeNear(data, value, epsilon) {
		let d = Math.round(data * (10 * epsilon))/(10 * epsilon);
		return d == value;
	}
	toBeNonEmptyArray(data) {
		return Array.isArray(data) && data.length > 0;
	}
	toBeNonEmptyObject(data) {
		return Object.keys(data).length > 0 && data.constructor === Object
	}
	toBeNonEmptyString(data) {
		return typeof(data) == "string" && data.length > 0;
	}
	toBeNull(data) {
		return data == null;
	}
	toBeNumber(data) {
		return !isNaN(Number(data));
	}
	toBeObject(data) {
		if(data === null) {
			return false;
		}
		return ( (typeof data === 'function') || (typeof data === 'object'));
	}
	toBeOddNumber(data) {
		return Math.abs(data % 2) === 1;
	}
	toBeRegExp(data) {
		let isValid = true;
		try {
			new RegExp(data);
		} catch(e) {
			isValid = false;
		}
		return isValid;
	}
	toBeSameLengthAs(data, length) {
		return data.length == length;
	}
	toBeShorterThan(data, length) {
		return data.length < length;
	}
	toBeString(data, value) {
		return data == value;
	}
	toBeTrue(data) {
		return data === true;
	}
	toBeTruthy(data) {
		return data == true || data == 'true';
	}
	toBeUndefined(data) {
		return data == undefined;
	}
	toBeValidDate(data) {
		let d = new Date(data);
		return d != "Invalid Date";
	}
	toBeWhitespace(data) {
		return !data.replace(/\s/g, '').length;
	}
	toBeWholeNumber(data) {
		return Number.isInteger(data);
	}
	toBeWithinRange(data, floor, ceiling) {
		return data >= floor && data <= ceiling;
	}
  toContain(data, member) {
    return data[member] != null;
  }
	toEndWith(data, string) {
		return data.endsWith(string);
	}
	toEqual(data, value) {
		return data == value;
	}
	toHaveArray(data, member) {
		return Array.isArray(data[member]);
	}
	toHaveArrayOfBooleans(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		let l = data[member].length;
		while(l--) {
			if(typeof(data[member][l]) != "boolean") {
				return false;
			}
		}
		return true;
	}
	toHaveArrayOfNumbers(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		let l = data[member].length;
		while(l--) {
			if(isNaN(Number(data[member][l]))) {
				return false;
			}
		}
		return true;
	}
	toHaveArrayOfObjects(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		let l = data[member].length;
		while(l--) {
			if(!((typeof data[member][l] === 'function') || (typeof data[member][l] === 'object'))) {
				return false;
			}
		}
		return true;
	}
	toHaveArrayOfSize(data, member, length) {
		return data[member].length == length;
	}
	toHaveArrayOfStrings(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		let l = data[member].length;
		while(l--) {
			if(typeof data[member][l] != "string") {
				return false;
			}
		}
		return true;
	}
	toHaveBoolean(data, member) {
		return typeof(data[member]) == "boolean";
	}
	toHaveDate(data, member) {
		let d = new Date(data[member]);
		return d != "Invalid Date";
	}
	toHaveDateAfter(data, member, date) {
		let d1 = new Date(data[member]);
		let d2 = new Date(date);
		if(d1 == "Invalid Date" || d2 == "Invalid Date") {
			return false;
		}
		return d1.getTime() > d2.getTime();
	}
	toHaveDateBefore(data, member, date) {
		let d1 = new Date(data[member]);
		let d2 = new Date(date);
		if(d1 == "Invalid Date" || d2 == "Invalid Date") {
			return false;
		}
		return d1.getTime() < d2.getTime();
	}
	toHaveEmptyArray(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		return data[member].length == 0;
	}
	toHaveEmptyObject(data, member) {
		return Object.keys(data[member]).length == 0 && data[member].constructor === Object
	}
	toHaveEmptyString(data, member) {
		return typeof data[member] == "string" && data[member].length == 0;
	}
	toHaveEvenNumber(data, member) {
		return data[member] % 2 === 0;
	}
	toHaveFalse(data, member) {
		return data[member] === false;
	}
	toHaveJsonString(data, member) {
		try {
			JSON.parse(data[member]);
		} catch(e) {
			return false;
		}
		return true;
	}
	toHaveMember(data, member) {
		return data[member] != null;
	}
	toHaveNonEmptyArray(data, member) {
		if(!Array.isArray(data[member])) {
			return false;
		}
		return data[member].length > 0;
	}
	toHaveNonEmptyObject(data, member) {
		return Object.keys(data[member]).length > 0 && data[member].constructor === Object
	}
	toHaveNonEmptyString(data, member) {
		return typeof data[member] == "string" && data[member].length > 0;
	}
	toHaveNumber(data, member) {
		return !isNaN(Number(data[member]));
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
	toHaveObject(data, member) {
		return (typeof data[member] === 'function') || (typeof data[member] === 'object');
	}
	toHaveOddNumber(data, member) {
		return Math.abs(data[member] % 2) === 1;
	}
	toHaveString(data, member, str) {
		let s = data[member];
		return s == str;
	}
	toHaveStringLongerThan(data, member, string) {
		return data[member].length > string.length;
	}
	toHaveStringSameLengthAs(data, member, string) {
		return data[member].length == string.length;
	}
	toHaveStringShorterThan(data, member, string) {
		return data[member].length < string.length;
	}
	toHaveTrue(data, member) {
		let element = data[member];
		if(element == true || element == 'true') {
			return true;
		};
		return false;
	}
	toHaveUndefined(data, member) {
		return data[member] == undefined;
	}
	toHaveWhitespaceString(data, member) {
		return !data[member].replace(/\s/g, '').length;
	}
	toHaveWholeNumber(data, member) {
		return Number.isInteger(data[member]);
	}
	toMatch(data, pattern) {
		return data.match(pattern) != null;
	}
	toStartWith(data, string) {
		return data.startsWith(string);
	}
}
