/* 
	Business Rule for Enterprise Tasker System
	Authored by: Ashley Pressley
	Updated: 08/20/2018
	Description: Sets the default delivery date for a child task record
	  for the ETASK system based upon the parent task's delivery date.
*/

(function executeRule(current, previous /*null when async*/) {
	// Grab the ETASK app system properties that determine the default Child Delivery Date
	var defaultFutureDays = gs.getProperty('x_etask.calendar.days.default');
	var defaultTime = gs.getProperty('x_etask.calendar.time.default');
	
	// Create a DT object from the current Task Delivery Date
	var taskDelivery = new GlideDateTime(current.getValue('u_this_due_date'));
	// Add the system property default days to the date
	taskDelivery.addDaysLocalTime(defaultFutureDays);
	
	// This creates a new DT object 7 days after the Task Delivery Date at 5PM UTC
	var childDelivery = new GlideDateTime(taskDelivery.getDate() + ' ' + defaultTime);
	
	// We need to add the appropriate amount of time to the Child Delivery Date to match
	// the default time system property of the logged-in user's timezone
	var offset = childDelivery.getTZOffset();
	childDelivery.addSeconds(-(offset/1000));
	
	current.u_child_due_date = childDelivery;
})(current, previous);