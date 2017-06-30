exports.getData = (path, callback) => {
	var request = require('request');
	var cheerio = require('cheerio');
	var trace = console.log;

	var a = path.split("http://");

	var s = a.pop();

	a = s.split("/");

	var host = 'http://' + a[0];

	"String functions";

	var stripAndTrim = function(str) {
		return str.split("\r").join("").split("\n").join("").trim();
	};

	var camelCase = function(str, isClass) {
		var delimiters, l;
		if (isClass == null) {
			isClass = false;
		}
		delimiters = [' ', '-', '_'];
		l = delimiters.length;
		while (l--) {
			str = str.split(delimiters[l]).join("*");
		}
		a = str.toLowerCase().split("*");
		l = a.length;
		while (l--) {
			s = a[l];
			s = s.slice(0, 1).toUpperCase() + s.slice(1);
			a[l] = s;
		}
		s = a.join("");
		if (!isClass) {
			s = s.slice(0, 1).toLowerCase() + s.slice(1);
		}
		return s;
	};

	"Make remote calls and parse result";

	request(path, function(err, resp, body) {
		var addSamples, createRootDataObject, createSample, getDefaultParam, i, l, methodsFound, r, results, totalMethods;
		if (err) {
			throw err;
		}
		var $ = cheerio.load(body);

		"Get Top Level Data Object";

		var getDots = function(count) {
			var s = '';
			var c = count;
			while (c--) {
				s += '.';
			}
			return s + ' (' + count + ')';
		};

		var parseTable = function($table) {
			var a = [];
			$table.find("tbody tr").each(function() {
				var o;
				o = {};
				$(this).find("td").each(function() {
					var $this, label, value;
					$this = $(this);
					label = $this.attr("class").split("parameter-")[1];
					value = stripAndTrim($this.text());
					return o[label] = value;
				});
				return a.push(o);
			});
			return a;
		};

		getDefaultParam = function(type) {
			if (type === 'integer') {
				return 0;
			} else if (type === 'decimal number') {
				return 0.0;
			} else if (type === 'boolean') {
				return false;
			} else if (type === 'globally unique identifier') {
				return '00000000-0000-0000-0000-000000000000';
			} else {
				return '';
			}
		};

		createSample = function(arr) {
			var i, l, o, param;
			o = {};
			l = arr.length;
			i = 0;
			while (i < l) {
				param = arr[i];
				o[param.name] = getDefaultParam(param.type);
				++i;
			}
			return o;
		};

		addSamples = function(data) {
			var i, item, l;
			l = data.length;
			i = 0;
			while (i < l) {
				item = data[i];
				if (item.uriParameters) {
					item.uriSample = createSample(item.uriParameters);
				}
				if (item.bodyParameters) {
					item.bodySample = createSample(item.bodyParameters);
				}
				if (item.resourceDescription) {
					item.resourceSample = createSample(item.resourceDescription);
				}
				++i;
			}
			return data;
		};

		createRootDataObject = function($elements) {
			var services, topic;
			services = [];
			topic = '';
			$elements.each(function() {
				var $this;
				$this = $(this);
				if ($this.is("h2")) {
					return topic = $this.text();
				} else {
					return $this.find("tbody tr").each(function() {
						var $apiName, $tr, description, id, link, name;
						$tr = $(this);
						$apiName = $tr.find(".api-name");
						link = $apiName.find("a").attr("href");
						description = stripAndTrim($tr.find(".api-documentation").text());
						name = $apiName.text();
						id = link.split("/").pop();
						a = name.split(" ");
						return services.push({
							id: id,
							topic: topic,
							verb: a[0],
							path: a[1],
							description: description,
							detailPage: link
						});
					});
				}
			});
			return services;
		};

		r = createRootDataObject($(".main-content").children());
		totalMethods = l = r.length;
		methodsFound = i = 0;
		results = [];
		while (i < l) {
			(function(i) {
				var method = r[i];
				return request(host + method.detailPage, function(err, resp, body) {
					var $content, $detail, subject;
					subject = '';
					$detail = cheerio.load(body);
					$content = $detail(".main-content div");
					$content.children().each(function() {
						var $this;
						$this = $(this);
						if ($this.is("h3")) {
							return subject = camelCase($(this).text());
						} else if ($this.is("table")) {
							return method[subject] = parseTable($this);
						}
					});
					++methodsFound;
					if (methodsFound === totalMethods) {
						return callback(JSON.stringify(addSamples(r)));
					}
				});
			})(i);
			results.push(i++);
		}
		return results;
	});
}
