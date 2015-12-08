
/* ========================================================================
 * DNCalendar - v1.0
 * https://github.com/black-lotus/dnCalendar
 * ========================================================================
 * Copyright 2015 WPIC, Romdoni Agung Purbayanto
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

 (function ( $ ) {

	$.fn.dnCalendar = function( options ) {
		var self = $(this);
		var settings = {};

		// current date
		var currDate = new Date();
            // custom default date
            var defDate = null;
            // today date
            var todayDate = new Date();

		/*
		* get total weeks in month
		*
		* @param int
		* @param int, range 1..12
		*/
		var weekCount = function(year, month_number) {
		    var firstOfMonth = new Date(year, month_number-1, 1);
		    var lastOfMonth = new Date(year, month_number, 0);

		    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

		    return Math.ceil( used / 7);
		}

		/*
		* draw calendar and give call back when date selected
		*/
		var draw = function() {
                  var m = currDate.getMonth(); // get month
                  var d = currDate.getDate(); // get date of month
                  var y = currDate.getFullYear(); // get full year

                  // get month name
                  var headerMonth = settings.monthNames[m];
                  if (settings.monthUseShortName == true) {
                  	headerMonth = settings.monthNamesShort[m];
                  }

                  // create header label
                  var headerGroup = $("<div id='dncalendar-header' class='dncalendar-header'></div>");
                  headerGroup.append("<h2>"+ headerMonth +" "+ y +"</h2>");

                  // determine prev link as false
                  var prevInactive = false;

                  // set prev link as true when minDate is exist and current date is less than or equal minDate
                  var minDate = null;
                  if (typeof settings.minDate !== 'undefined') {
                  	var minDateArr = settings.minDate.split('-');
                  	minDate = new Date(minDateArr[0], minDateArr[1] - 1, minDateArr[2]);
                  	
                  	if (minDate.getFullYear() >= y) {
                  		if (minDate.getMonth() >= m) {
                  			prevInactive = true;
                  		}
                  	}
                  }

                  // determine prev link as false
                  var nextInactive = false;

                  // set next link as true when maxDate is exist and current date is greater than or equal maxDate
                  var maxDate = null;
                  if (typeof settings.maxDate !== 'undefined') {
                  	var maxDateArr = settings.maxDate.split('-');
                  	maxDate = new Date(maxDateArr[0], maxDateArr[1] - 1, maxDateArr[2]);
                  	
                  	if (maxDate.getFullYear() <= y) {
                  		if (maxDate.getMonth() <= m) {
                  			nextInactive = true;
                  		}
                  	}
                  }

                  // create link group
                  var calendarLinksGroup = $("<div id='dncalendar-links' class='dncalendar-links'></div>");
                  var prevLinkGroup = $("<div id='dncalendar-prev-month' class='dncalendar-prev-month'></div>");
                  var nextLinkGroup = $("<div id='dncalendar-next-month' class='dncalendar-next-month'></div>");

                  // disable prev link
                  if (prevInactive) {
                  	prevLinkGroup.addClass("dncalendar-inactive");
                  	prevLinkGroup.removeAttr("id");
                  }

                  // disable next link
                  if (nextInactive) {
                  	nextLinkGroup.addClass("dncalendar-inactive");
                  	nextLinkGroup.removeAttr("id");
                  }

                  // add link group into header
                  calendarLinksGroup.append(prevLinkGroup);
                  calendarLinksGroup.append(nextLinkGroup);
                  headerGroup.append(calendarLinksGroup);

                  var bodyGroup = $("<div id='dncalendar-body' class='dncalendar-body'></div>");
                  var tableGroup = $("<table></table>");

                  var weekName = settings.dayNames;
                  if (settings.dayUseShortName == true) {
                  	weekName = settings.dayNamesShort;
                  }

                  var tableHeadGroup = $("<thead></thead>");
                  var tableHeadRowGroup = $("<tr></tr>");
                  var weekNameLength = weekName.length;
                  for (var i = 0; i < weekNameLength; i++) {
                  	tableHeadRowGroup.append("<td "+ ((i == 0 || i == weekNameLength - 1) ? 'class=\"holiday\"' : '') +">"+ weekName[i] +"</td>");
                  }
                  tableHeadGroup.append(tableHeadRowGroup);

                  var tableBodyGroup = $("<tbody></tbody>");
                  var totalWeeks = weekCount(y, m + 1);
                  var totalDaysInWeeks = 7;
                  var startDate = 1;

                  var firstDayOfMonth = new Date(y, m, 1); // get first day of month
      		var lastDayOfMonth = new Date(y, m + 1, 0); // get last day of month
      		
      		var lastDateOfPrevMonth = new Date(y, m, 0); // get last day of previous month
      		var prevDate = lastDateOfPrevMonth.getDate() - firstDayOfMonth.getDay() + 1;

      		var firstDateOfNextMonth = new Date(y, m + 1, 1); // get fist day of next month
      		var nextDate = firstDateOfNextMonth.getDate();

      		var limitMinDate = 0;
      		if (minDate != null) {
      			limitMinDate = minDate.getDate();
      		}

      		var limitMaxDate = 0;
      		if (maxDate != null) {
      			limitMaxDate = maxDate.getDate();
      		}

                  var todayTitle = 'today';
                  var defaultDateTitle = 'default date';
                  if (typeof settings.dataTitles !== 'undefined') {
                        if (typeof settings.dataTitles.defaultDate !== 'undefined') {
                              defaultDateTitle = settings.dataTitles.defaultDate;
                        }  

                        if (typeof settings.dataTitles.today !== 'undefined') {
                              todayTitle = settings.dataTitles.today;
                        } 
                  }

                  for (var i = 0; i < totalWeeks; i++) {
                  	var tableBodyRowGroup = $("<tr></tr>");
                  	for (var j = 0; j < totalDaysInWeeks; j++) {
                  		if ( (i != 0 && i != totalWeeks - 1) || (i == 0 && j >= firstDayOfMonth.getDay()) || (i == totalWeeks - 1 && j <= lastDayOfMonth.getDay())) {
              				
                                    var colDateClass = "";
                                    var colDateDataAttr = "";

                                    if (todayDate.getFullYear() == y && todayDate.getMonth() == m && todayDate.getDate() == startDate) {
                                          colDateClass = ' today-date ';
                                          colDateDataAttr = "data-title='"+ todayTitle +"'";
                                    }

                                    if (defDate != null && defDate.getFullYear() == y && defDate.getMonth() == m && defDate.getDate() == startDate) {
                                         colDateClass = ' default-date ';
                                         colDateDataAttr = "data-title='"+ defaultDateTitle +"'";
                                    }

                                    if (j == 0 || j == totalDaysInWeeks - 1) {
                                          colDateClass += ' holiday ';
                                    }

                                    if (typeof settings.notes !== 'undefined') {
                                          if (dateIsNotes(new Date(y, m, startDate))) {
                                                colDateClass += " note ";
                                          }
                                    }

                                    var colDate = "<td id='calendarClick' class='"+ colDateClass +" calendarClick' data-date='"+ startDate +"' data-month='"+ (m+1) +"' data-year='"+ y +"'><div class='entry' "+ colDateDataAttr +">"+ startDate +"</div></td>";

                                    if (minDate != null) {
              					if (minDate.getFullYear() >= y) {
                  					if (minDate.getMonth() >= m && startDate < limitMinDate) {
                                                      
                                                      colDate = "<td class='"+ colDateClass +"' data-date='"+ startDate +"' data-month='"+ (m+1) +"' data-year='"+ y +"'><div class='entry' "+ colDateDataAttr +">"+ startDate +"</div></td>";
                                                      
                  					}
                  				}
              				} 

              				if (maxDate != null) {
              					if (maxDate.getFullYear() <= y) {
                  					if (maxDate.getMonth() <= m && startDate > limitMaxDate) {
                                                     
                                                      colDate = "<td class='"+ colDateClass +"' data-date='"+ startDate +"' data-month='"+ (m+1) +"' data-year='"+ y +"'><div class='entry' "+ colDateDataAttr +">"+ startDate +"</div></td>";
                                                      
                  					}
                  				}
              				}

              				tableBodyRowGroup.append(colDate);

              				startDate++;
                  		} else {
                                    // first row of calendar
                  			if (i == 0) {
                                          var colDateClass = "";
                                          var colDateDataAttr = "";

                                          if (todayDate.getFullYear() == lastDateOfPrevMonth.getFullYear() && todayDate.getMonth() == lastDateOfPrevMonth.getMonth() && todayDate.getDate() == prevDate) {
                                                colDateClass = ' today-date ';
                                                colDateDataAttr = "data-title='"+ todayTitle +"'";
                                          }

                                          if (defDate != null && defDate.getFullYear() == lastDateOfPrevMonth.getFullYear() && defDate.getMonth() == lastDateOfPrevMonth.getMonth() && defDate.getDate() == prevDate) {
                                                colDateClass = ' default-date ';
                                                colDateDataAttr = "data-title='"+ defaultDateTitle +"'";
                                          }

                                          if (j == 0 || j == totalDaysInWeeks - 1) {
                                                colDateClass += ' holiday ';
                                          }

                                          if (typeof settings.notes !== 'undefined') {
                                                if (dateIsNotes(new Date(lastDateOfPrevMonth.getFullYear(), lastDateOfPrevMonth.getMonth(), prevDate))) {
                                                     
                                                      colDateClass += " note ";

                                                }
                                          }

                  				var colDate = "<td id='calendarClick' class='"+ colDateClass +"' data-date='"+ prevDate +"' data-month='"+ (lastDateOfPrevMonth.getMonth() + 1) +"' data-year='"+ lastDateOfPrevMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ prevDate +"</div></td>";
                  				
                                          if (minDate != null) {
                                                if (minDate.getFullYear() > lastDateOfPrevMonth.getFullYear()) {
                                                      colDate = "<td class='"+ colDateClass +"' data-date='"+ prevDate +"' data-month='"+ (lastDateOfPrevMonth.getMonth() + 1) +"' data-year='"+ lastDateOfPrevMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ prevDate +"</div></td>";
                                                } else {
                                                      if (minDate.getFullYear() == lastDateOfPrevMonth.getFullYear() && minDate.getMonth() > lastDateOfPrevMonth.getMonth()) {
                                                            colDate = "<td class='"+ colDateClass +"' data-date='"+ prevDate +"' data-month='"+ (lastDateOfPrevMonth.getMonth() + 1) +"' data-year='"+ lastDateOfPrevMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ prevDate +"</div></td>";
                                                      }
                                                }
                  				}

                  				tableBodyRowGroup.append(colDate);

                  				prevDate++;
                  			}

                                    // last row of calendar
                  			if (i == totalWeeks - 1){
                                          var colDateClass = "";
                                          var colDateDataAttr = "";

                                          if (todayDate.getFullYear() == firstDateOfNextMonth.getFullYear() && todayDate.getMonth() == firstDateOfNextMonth.getMonth() && todayDate.getDate() == nextDate) {
                                                colDateClass = ' today-date ';
                                                colDateDataAttr = "data-title='"+ todayTitle +"'";
                                          }

                                          if (defDate != null && defDate.getFullYear() == firstDateOfNextMonth.getFullYear() && defDate.getMonth() == firstDateOfNextMonth.getMonth() && defDate.getDate() == nextDate) {
                                                colDateClass = ' default-date ';
                                                colDateDataAttr = "data-title='"+ defaultDateTitle +"'";
                                          }

                                          if (j == 0 || j == totalDaysInWeeks - 1) {
                                                colDateClass += ' holiday ';
                                          }

                                          if (typeof settings.notes !== 'undefined') {
                                                if (dateIsNotes(new Date(firstDateOfNextMonth.getFullYear(), firstDateOfNextMonth.getMonth(), nextDate))) {
                                                     
                                                      colDateClass += " note ";

                                                }
                                          }

                  				var colDate = "<td id='calendarClick' class='"+ colDateClass +"' data-date='"+ nextDate +"' data-month='"+ (firstDateOfNextMonth.getMonth() + 1) +"' data-year='"+ firstDateOfNextMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ nextDate +"</div></td>";
                  			
                                          if (maxDate != null) {
                  					if (maxDate.getFullYear() <= firstDateOfNextMonth.getFullYear()) {
                  						
                                                      if (maxDate.getMonth() <= firstDateOfNextMonth.getMonth()) {
                                                            if (maxDate.getMonth() < firstDateOfNextMonth.getMonth()) {
                                                                  
                                                                  colDate = "<td class='"+ colDateClass +"' data-date='"+ nextDate +"' data-month='"+ (firstDateOfNextMonth.getMonth() + 1) +"' data-year='"+ firstDateOfNextMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ nextDate +"</div></td>";
                                                                  
                                                            } else {
                                                                  if (limitMaxDate < nextDate) {
                                                                        
                                                                        colDate = "<td class='"+ colDateClass +"' data-date='"+ nextDate +"' data-month='"+ (firstDateOfNextMonth.getMonth() + 1) +"' data-year='"+ firstDateOfNextMonth.getFullYear() +"'><div class='entry' "+ colDateDataAttr +">"+ nextDate +"</div></td>";
                                                                        
                                                                  }
                                                            }
                  						}

                  					}
                  				}

                  				tableBodyRowGroup.append(colDate);
                  				
                  				nextDate++;
                  			}
                  		}
                  		
                  	} // end for (j)
                  	tableBodyGroup.append(tableBodyRowGroup);
                  } // end for (i)

                  var notesGroup = "";
                  if (settings.showNotes) {
                        var notes = getNotesThisMonth();
                        var notesLength = notes.length;

                        if (notesLength > 0) {
                              notesGroup = $("<ul class='dncalendar-note-list'></ul>");

                              for (var i = 0; i < notesLength; i++) {
                                    var date = notes[i].date;
                                    var noteList = notes[i].notes;
                                    var noteListLength = noteList.length;

                                    var list = "";
                                    list += "<li class='date'>";
                                    list += "<span>"+ date +"</span> ";

                                    if (noteListLength > 0) {
                                          list += " : ";

                                          for (var j = 0; j < noteListLength; j++) {
                                                list += noteList[j];
                                                if (noteListLength <= j) {
                                                      list += ", ";
                                                }
                                          }
                                    }
                                    
                                    list += "</li>";

                                    notesGroup.append(list);
                              }
                        }
                  } 

                  tableGroup.append(tableHeadGroup);
                  tableGroup.append(tableBodyGroup);
                  bodyGroup.append(tableGroup);

			self.html("");
			self.append(headerGroup);
			self.append(bodyGroup);
                  self.append(notesGroup);
		}

            var dateIsNotes = function(date) {
                  var notesLength = settings.notes.length;
                  for (var i = 0; i < notesLength; i++) {
                        var dateNote = settings.notes[i].date.split('-');
                        var nDate = new Date(dateNote[0], dateNote[1] - 1, dateNote[2]);

                        if ( nDate.getFullYear() == date.getFullYear() && nDate.getMonth() == date.getMonth() && nDate.getDate() == date.getDate() ) {
                              return true;
                        }
                  }

                  return false;
            }

            var getNotesThisMonth = function() {
                  var result = [];
                  var notesLength = settings.notes.length;
                  for (var i = 0; i < notesLength; i++) {
                        var dateNote = settings.notes[i].date.split('-');
                        var nDate = new Date(dateNote[0], dateNote[1] - 1, dateNote[2]);
                        
                        if (nDate.getFullYear() == currDate.getFullYear() && nDate.getMonth() == currDate.getMonth()) {
                              var temp = {};
                              temp['date'] = nDate.getDate();
                              temp['notes'] = settings.notes[i].note;

                              result.push(temp);
                        }
                  }

                  return result;
            }

		var nextMonth = function() {
			var firstDateOfNextMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1); // get fist day of next month
			var date = firstDateOfNextMonth.getDate();
			var month = firstDateOfNextMonth.getMonth();
			var year = firstDateOfNextMonth.getFullYear();

			currDate = new Date(year, month, date);
			draw();
		}

		var prevMonth = function() {
			var firstDateOfPrevMonth = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1); // get fist day of previous month
			var date = firstDateOfPrevMonth.getDate();
			var month = firstDateOfPrevMonth.getMonth();
			var year = firstDateOfPrevMonth.getFullYear();

			currDate = new Date(year, month, date);
			draw();
		}

		var triggerAction = function() {

		    $('body').on('click', '#calendarClick', function(){
				var selectedDate = $(this).data('date');
				var selectedMonth = $(this).data('month');
				var selectedYear = $(this).data('year');

				settings.dayClick.call(this, new Date(selectedYear, selectedMonth - 1, selectedDate), self);

                  });

		    $('body').on('click', '#dncalendar-prev-month', function() {
		    	prevMonth();
		    });

		    $('body').on('click', '#dncalendar-next-month', function() {
		    	nextMonth();
		    });
		}

		return {
			build: function() {
                        settings = $.extend( {}, $.fn.dnCalendar.defaults, options );

				// replace with defaultDate when exist
				if (typeof settings.defaultDate !== 'undefined') {
                              var defaultDateArr = settings.defaultDate.split('-');
                              currDate = new Date(defaultDateArr[0], defaultDateArr[1] - 1, defaultDateArr[2]);
                              defDate = currDate;
                        }

				draw();
				triggerAction();
			},
                  update: function(options) {
                        settings = $.extend(settings, options);

                        // replace with defaultDate when exist
                        if (typeof settings.defaultDate !== 'undefined') {
                              var defaultDateArr = settings.defaultDate.split('-');
                              currDate = new Date(defaultDateArr[0], defaultDateArr[1] - 1, defaultDateArr[2]);
                              defDate = currDate;
                        }

                        draw();
                  }
		}
	}

      // plugin defaults 
      $.fn.dnCalendar.defaults = { 
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], 
            monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Dec' ],
            dayNames: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
            dayUseShortName: false,
            monthUseShortName: false,
            showNotes: false,
            dayClick: function(date, view) {}
      }; 

} ( jQuery ));