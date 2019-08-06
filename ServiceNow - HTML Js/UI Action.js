/* 
	UI Action for Loaner Reservation
	Authored by: Ashley Pressley
	Updated: 08/11/2017
	Description: Auto populates fields when moving from the Request
		to the Loaner Reservation module
*/

var fieldList = 'sysparm_query=request=' + current.sys_id;
fieldList += '^start_date=' + current.variables.pickup_date;  
fieldList += '^end_date=' + current.variables.return_date;
fieldList += '^requestor=' + current.variables.requested_for; 
var redirectURL = 'x_oarnl_loaner_req_loaner_requests.do?sys_id=-1&' + fieldList;  
action.setRedirectURL(redirectURL); 
action.setReturnURL(current);  