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
		if(data) {
			return data && data.length && data.length === 0;
		}
		return false;
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
		if(data) {
			return data.length > value;
		}
		return false;
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
		if(data) {
			return data.length == length;
		}
		return false;
	}
	toBeShorterThan(data, length) {
		if(data) {
			return data.length < length;
		}
		return false;
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
		if(data && data.replace) {
			return !data.replace(/\s/g, '').length;
		}
		return false;
	}
	toBeWholeNumber(data) {
		return Number.isInteger(data);
	}
	toBeWithinRange(data, floor, ceiling) {
		return data >= floor && data <= ceiling;
	}
  toContain(data, member) {
		if(data) {
    	return data[member] != null;
		}
		return false;
  }
	toEndWith(data, string) {
		if(data && data.endsWith) {
			return data.endsWith(string);
		}
		return false;
	}
	toEqual(data, value) {
		return data == value;
	}
	toHaveArray(data, member) {
		if(data) {
			return Array.isArray(data[member]);
		}
	}
	toHaveArrayOfBooleans(data, member) {
		if(data) {
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
		return false;
	}
	toHaveArrayOfNumbers(data, member) {
		if(data) {
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
		return false;
	}
	toHaveArrayOfObjects(data, member) {
		if(data) {
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
		return false;
	}
	toHaveArrayOfSize(data, member, length) {
		if(data) {
			return data[member].length == length;
		}
		return false;
	}
	toHaveArrayOfStrings(data, member) {
		if(data) {
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
		return false;
	}
	toHaveBoolean(data, member) {
		if(data) {
			return typeof(data[member]) == "boolean";
		}
		return false;
	}
	toHaveDate(data, member) {
		if(data) {
			let d = new Date(data[member]);
			return d != "Invalid Date";
		}
		return false;
	}
	toHaveDateAfter(data, member, date) {
		if(data) {
			let d1 = new Date(data[member]);
			let d2 = new Date(date);
			if(d1 == "Invalid Date" || d2 == "Invalid Date") {
				return false;
			}
			return d1.getTime() > d2.getTime();
		}
		return false;
	}
	toHaveDateBefore(data, member, date) {
		if(data) {
			let d1 = new Date(data[member]);
			let d2 = new Date(date);
			if(d1 == "Invalid Date" || d2 == "Invalid Date") {
				return false;
			}
			return d1.getTime() < d2.getTime();
		}
		return false;
	}
	toHaveEmptyArray(data, member) {
		if(data) {
			if(!Array.isArray(data[member])) {
				return false;
			}
			return data[member].length == 0;
		}
		return false;
	}
	toHaveEmptyObject(data, member) {
		if(data) {
			return Object.keys(data[member]).length == 0 && data[member].constructor === Object;
		}
		return false;
	}
	toHaveEmptyString(data, member) {
		if(data) {
			return typeof data[member] == "string" && data[member].length == 0;
		}
		return false;
	}
	toHaveEvenNumber(data, member) {
		if(data) {
			return data[member] % 2 === 0;
		}
		return false;
	}
	toHaveFalse(data, member) {
		if(data) {
			return data[member] === false;
		}
		return false;
	}
	toHaveJsonString(data, member) {
		if(data) {
			try {
				JSON.parse(data[member]);
			} catch(e) {
				return false;
			}
			return true;
		}
		return false;
	}
	toHaveMember(data, member) {
		if(data) {
			return data[member] != null;
		}
		return false;
	}
	toHaveNonEmptyArray(data, member) {
		if(data) {
			if(!Array.isArray(data[member])) {
				return false;
			}
			return data[member].length > 0;
		}
		return false;
	}
	toHaveNonEmptyObject(data, member) {
		if(data) {
			return Object.keys(data[member]).length > 0 && data[member].constructor === Object;
		}
		return false;
	}
	toHaveNonEmptyString(data, member) {
		if(data) {
			return typeof data[member] == "string" && data[member].length > 0;
		}
		return false;
	}
	toHaveNumber(data, member) {
		if(data) {
			return !isNaN(Number(data[member]));
		}
		return false;
	}
	toHaveNumberWithinRange(data, member, min, max) {
		if(data) {
			let n = Number(data[member]);
			min = Number(min);
			max = Number(max);
			if(!isNaN(n) && !isNaN(min) && !isNaN(max)) {
				return n >= min && n <= max;
			}
		}
		return false;
	}
	toHaveObject(data, member) {
		if(data) {
			return (typeof data[member] === 'function') || (typeof data[member] === 'object');
		}
		return false;
	}
	toHaveOddNumber(data, member) {
		if(data) {
			return Math.abs(data[member] % 2) === 1;
		}
		return false;
	}
	toHaveString(data, member, str) {
		if(data) {
			let s = data[member];
			return s == str;
		}
		return false;
	}
	toHaveStringLongerThan(data, member, string) {
		if(data) {
			return data[member].length > string.length;
		}
		return false;
	}
	toHaveStringSameLengthAs(data, member, string) {
		if(data) {
			return data[member].length == string.length;
		}
		return false;
	}
	toHaveStringShorterThan(data, member, string) {
		if(data) {
			return data[member].length < string.length;
		}
		return false;
	}
	toHaveTrue(data, member) {
		if(data) {
			let element = data[member];
			if(element == true || element == 'true') {
				return true;
			};
		}
		return false;
	}
	toHaveUndefined(data, member) {
		if(data) {
			return data[member] == undefined;
		}
		return false;
	}
	toHaveWhitespaceString(data, member) {
		if(data) {
			return !data[member].replace(/\s/g, '').length;
		}
		return false;
	}
	toHaveWholeNumber(data, member) {
		if(data) {
			return Number.isInteger(data[member]);
		}
		return false;
	}
	toMatch(data, pattern) {
		if(data && data.match) {
			return data.match(pattern) != null;
		}
		return false;
	}
	toStartWith(data, string) {
		if(data && data.startsWith) {
			return data.startsWith(string);
		}
		return false;
	}
}
