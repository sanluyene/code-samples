// ServiceNow Script Include
// Advanced Reference Field for Loaner Laptop Module
// Intention to disallow conflicting selection of laptops
// Author: Ashley Sattler

function loanerGroup(current) {
	var availComp = ' '; //actually available laptop list
	var start = current.start_date; //selected pickup date
	var end = current.end_date; //selected return date
	var bool = true;
	
	// we need to make a list of the loaners
	var gc = new GlideRecord('cmdb_ci_computer');
	gc.addQuery('x_oarnl_loaner_req_loaner', true);
	gc.query();
	while (gc.next()) {
		// find all loaner requests with this laptop
		var gr = new GlideRecord('x_oarnl_loaner_req_loaner_requests');
		gr.addQuery('laptop.sys_id', gc.sys_id);
		gr.query();
		while (gr.next()) {
			var thisstart = gr.start_date;
			var thisend = gr.end_date;
			
			// the below check will tell us if it's NOT available
			if (thisstart < end || thisend > start) bool = false;
			}
		
		if (bool) {
			if (availComp.length > 0) availComp += (',' + gc.sys_id);
				else availComp = gc.sys_id;
			}
		// reset our boolean
		bool = true;
	}
	
	return 'sys_idIN' + availComp;
}
