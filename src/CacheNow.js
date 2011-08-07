CacheNow = function(id) {
	this.id_ 	= id;
	this.store_ = [];
};
CacheNow.prototype = {
	add: function(obj, query) {
		if (query != 'undefined')
			this.assignQuery_(obj, query);
		
		this.merge_(obj);
	},
	get: function(id) {
		for (var i=0; i < this.store_.length; i++)
			if (this.store_[i][this.id_] == id)
				return this.store_[i];
		return null;
	},
	query: function(query) {
		var store = [];
		for (var i=0; i < this.store_.length; i++)
			if (this.hasQuery_(this.store_[i], query))
				store.push(this.store_[i]);
		return store;
	},
	exists: function(obj) {
		if (this.get(obj[this.id_]) === null)
			return false;
		else
			return true;
	},
	
	hasQuery_: function(obj, query) {
		for (var i=0; i < obj.query.length; i++)
			if (this.match_(obj.query[i], query))
				return true;
		return false;
	},
	merge_: function(obj) {
		if (obj instanceof Array)
			for (var i=0; i < obj.length; i++)
				this.singleMerge_(obj[i]);
		else
			this.singleMerge_(obj);
	},
	assignQuery_: function(obj, query) {
		if (obj instanceof Array) {
			for (var i=0; i < obj.length; i++) {
				if (typeof(obj[i].query) == 'undefined')
					obj[i].query = [];
				obj[i].query.push(query);
			}
		} else {
			if (typeof(obj.query) == 'undefined')
				obj.query = [];
			obj.query.push(query);
		}
	},
	save_: function(obj) {
		if (obj instanceof Array) {
			for (var i=0; i < obj.length; i++)
				if (!this.exists(obj[i]))
					this.store_.push(obj[i]);
		} else
			if (!this.exists(obj))
				this.store_.push(obj);
	},
	singleMerge_: function(newObj) {
		var oldObj = this.get(newObj[this.id_]);
		if (oldObj === null)
			this.save_(newObj);
		else
			for (attrname in newObj) {
				if (attrname == 'query')
					oldObj[attrname] = this.joinQueries_(oldObj[attrname], newObj[attrname]);
				else
					oldObj[attrname] = newObj[attrname];
			}
	},
	match_: function(a, b) {
		for (attr in a)
			if (a[attr] != b[attr])
				return false;
		return true;
	},
	joinQueries_: function(a, b) {
		var q = a.slice(0);
		
		for (var i=0; i < b.length; i++) {
			var diff = true;
			for (var j=0; j < a.length; j++)
				if (this.match_(a[j], b[j]))
					diff = false;
			if (diff)
				q.push(b[i]);
		}
		
		return q;
	}
};
