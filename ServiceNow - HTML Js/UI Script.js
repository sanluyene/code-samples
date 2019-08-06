/* 
    UI Script for Date Range Filtering
    Authored by: Ashley Pressley
    Updated: 12/28/2018
    Description: For use as an Angular Dependency for custom date
      range widget filter for a custom Portal Widget
*/
// 

(function() {
    angular.module('dateRangeFilter', []).filter('dateRange', function() {
        return function( items, fromDate, toDate ) {
            if (fromDate == undefined || toDate == undefined || fromDate == '' || toDate == '') {
                fromDate = new Date('2000-01-01');
                toDate = new Date('2200-12-31');
            }
            var filtered = [];
            
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);
                
            angular.forEach(items, function(item) {
                //var item_from_date = Date.parse(item.start_time);
                //var item_to_date = Date.parse(item.end_time);
                var item_from_no_time = item.start_time.split(' ');
                var item_from_date = Date.parse(item_from_no_time[0]);
                var item_to_no_time = item.end_time.split(' ');
                var item_to_date = Date.parse(item_to_no_time[0]);

                if(item_from_date >= from_date && item_to_date <= to_date) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    });
})();