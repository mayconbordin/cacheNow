if (typeof(Collection) == "undefined")
	Collection = {};
	
Collection.Sort = {};
Collection.Sort.stringAsc = function(a, b) {
	a = String.prototype.toLowerCase.apply(a);
	b = String.prototype.toLowerCase.apply(b);
		
 	return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

Collection.Sort.stringDesc = function(a, b) {
	a = String.prototype.toLowerCase.apply(a);
	b = String.prototype.toLowerCase.apply(b);

 	return (a < b) ? 1 : ((a > b) ? -1 : 0);
};

Collection.Sort.numberAsc = function(a, b) {
	return (a - b);
};

Collection.Sort.numberDesc = function(a, b) {
	return (b - a);
};

// Collection.ArrayList
// ---------------------

Collection.ArrayList = {};
Collection.ArrayList = function() {
	this.data = new Array();
};

Collection.ArrayList.prototype = {
	add: function(e, index) {
		if(isNaN(index))
			index = this.data.length;
		this._checkBoundInclusive(index);
		if (index < this.data.length) {
			for (var i = this.data.length; i > index; --i)
				this.data[i] = this.data[i - 1];
		}
		this.data[index] = e;
	},
	indexOf: function(e) {
		for (var i = 0; i < this.data.length; ++i)
			if (e === this.data[i])
				return i;
		return -1;
	},
	lastIndexOf: function(e) {
		for (var i = this.data.length; i >= 0; --i)
			if (e === this.data[i])
				return i;
		return -1;
	},
	get: function(index) {
		this._checkBoundExclusive(index);
		return this.data[index];
	},
	getFirst: function() {
		return (this.isEmpty() ? null : this.get(0));
	},
	getLast: function() {
		return (this.isEmpty() ? null : this.get(this.data.lenght - 1));
	},
	set: function(index, e) {
		this._checkBoundExclusive(index);
		var r = this.data[index];
		data[index] = e;
		return r;
	},
	sort: function(sortFunc) {
		if (sortFunc && sortFunc != null)
			this.data.sort(sortFunc);
		else
			this.data.sort();
	},
	remove: function(index) {
		this._checkBoundExclusive(index);
		var r = this.data[index];
		for (var i = index; i < (this.data.length -1); ++i)
			this.data[i] = this.data[i + 1];
		--this.data.length;
		return r;
	},
	removeObj: function(o) {
		var index = this.indexOf(o);
		if (index != -1) {
			this.remove(index);
			return true;
		} else
			return false;
	},
	clear: function() {
		this.data.length = 0;
	},
	contains: function(elem) {
		return (this.indexOf(elem) != -1);
	},
	isEmpty: function() {
		return this.data.length == 0;
	},
	toArray: function() {
		return this.data;
	},
	size: function() {
		return this.data.length;
	},
	
	// Iternal Implementations
	// -----------------------
	_checkBoundInclusive: function(index) {
		if (index < 0 || index > this.data.length)
			throw new Error("Index " + index + " is out of bounds [0," + (this.data.length - 1) + "]");
	},
	_checkBoundExclusive: function(index) {
		if (index < 0 || index >= this.data.length)
			throw new Error("Index " + index + " is out of bounds [0," + (this.data.length - 1) + "]");
	}
};
