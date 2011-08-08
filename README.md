# CacheNow

Basically, this script is meant to store objects and optionally relate them to
a query. You can't perform queries, but you can store objects from a query that
you did. You can then retrieve the objects of an specific query.

## Example

     // Create an instance of the CacheNow.
     // The 'id' string is the identifier property
     // of the object that will be stored here.
     var cache = new CacheNow('id');
     
     // Let's say that you have retrieved this array of objects from some url
     var objects = [
		{id:1, name:'John', date:'2011-08-03'},
		{id:2, name:'Mike', date:'2011-08-03'},
		{id:3, name:'Locke', date:'2011-08-03'},
		{id:4, name:'Luis', date:'2011-08-03'},
		{id:5, name:'José', date:'2011-08-03'}
     ];
     
     // Here I will add those objects to the cache with the query used
     // to retrieve them.
     cache.add(objects, {minDate:'2011-08-01', maxDate:'2011-08-05'});
     
     // After that, another query is performed (the same query as before)
     var data = cache.query({minDate:'2011-08-01', maxDate:'2011-08-05'});
     
     // Now it checks if the cache returned something
     if (data.length > 0)
     	// Do something with this data
     else {
     	// Retrieve the data from some source
     	var query = {minDate:'2011-08-01', maxDate:'2011-08-05'};
     	ajaxRequest('http://datasource/list', query, function(request) {
     		// In this example the data is in JSON
     		var objects = eval('(' + request.responseText + ')');
     		// Then the objects are added to the cache
			cache.add(events, query);
     	});
     }
