/* 
	Business Rule for Loaner Reservation
	Authored by: Ashley Pressley
	Updated: 08/11/2017
	Description: Validates dates to ensure loaner reservation end date
		does not come before the begin date
*/

validateLoanedDates();

function validateLoanedDates() {
	var start = new GlideDateTime(current.start_date);
	var end = new GlideDateTime(current.end_date);
	var dur = start.compareTo(end); 
	//0 if dates are equal, 1 if the argument date occurs is before this date, or -1 if the argument is after this date.
											   
    if (dur !== -1) {
		var message = gs.getMessage("{0} must be after {1}", [ current.end_date.getLabel(), current.start_date.getLabel() ]);
		gs.addErrorMessage(message);

		current.setAbortAction(true);
	}
	else return;
}

