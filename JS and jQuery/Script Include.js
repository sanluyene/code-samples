/* 
	Script Include for Loaner Reservation
	Authored by: Ashley Pressley
	Updated: 08/11/2017
	Description: Pulls only available laptops that are available for
		the given start and end dates of the reservation, to ensure
		that no device can be double-booked
*/

// This is a script includes to get the dynamic laptop
// advanced reference field to populate only with
// laptops that are available for the given request date range

function loanerGroup(current) {
	var availComp = ' '; //actually available laptop list
	var start = new GlideDateTime(current.start_date); //selected pickup date
	var end = new GlideDateTime(current.end_date); //selected return date
	var bool = true;
			
	// we then need to make a list of the loaners than do not fall into the above group
	var gc = new GlideRecord('u_cmdb_eprop');
	gc.addQuery('u_loaner', true);
	gc.query();
	while (gc.next()) {
		var gr = new GlideRecord('x_oarnl_loaner_req_loaner_requests');
		gr.addQuery('laptop.u_property_number', gc.u_property_number);
		gr.query();
		while (gr.next()) {
			var resstart = new GlideDateTime(gr.start_date);
			var resend = new GlideDateTime(gr.end_date);
			
			// add buffer of 2 days to reserved start and end dates
			resstart.addDaysLocalTime(-2);
			resend.addDaysLocalTime(2);
			
			// 0 if dates are equal, 1 if the argument date occurs is before this date, or -1 if the argument is after this date.
			if (start.compareTo(resend) != 1 || end.compareTo(resstart) != 1) bool = false;
		}

		if (bool) {
			if (availComp.length > 0) availComp += (',' + gc.u_property_number);
			else availComp = gc.u_property_number;
		}
		bool = true;
	}
	
	return 'u_property_numberIN' + availComp;
}