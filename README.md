# dnCalendar
simple and light calendar built with jquery

<img src="https://github.com/black-lotus/dnCalendar/blob/master/sample_1.png"/>

<img src="https://github.com/black-lotus/dnCalendar/blob/master/sample_2.png"/>


# Requirements

* JQuery 1.*


# Browser supported

* Safari (tested)
* Google Chrome (tested)
* Firefox (tested)
* Safari mobile (tested)
* Google Chrome mobile (tested)



**Usage**    
========

load style and jquery first, then load dncalendar.js or dncalendar.min.js bellow jquery


**Simple Usage**

```
$("#dncalendar-container").dnCalendar().build();
```


**Update or re-draw Calendar**

```
var myCalendar = $("#dncalendar-container").dnCalendar();
// build first
myCalendar.build();

// update and change calendar
myCalendar.update({defaultDate: "2015-12-04"})
```


**Callback**

```
$("#dncalendar-container").dnCalendar({
	dayClick: function(date, view) {
    	alert(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
    }
}).build();
```


***Set Min and Max Date***

```
$("#dncalendar-container").dnCalendar({
	minDate: "2015-12-15",
	maxDate: "2016-03-01",
}).build();
```


***Set default date***

```
$("#dncalendar-container").dnCalendar({
	defaultDate: "2016-01-12"
}).build();
```


***Change Month and Day name***

```
$("#dncalendar-container").dnCalendar({
	monthNames: [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ], 
	dayNames: [ 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
}).build();
```


***Change Month and Day short name***

```
$("#dncalendar-container").dnCalendar({
	monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' ],
	dayNamesShort: [ 'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab' ]
}).build();
```


***Use short name***

```
$("#dncalendar-container").dnCalendar({
	dayUseShortName: true,
    monthUseShortName: true
}).build();
```


***Change title of default date and today***

```
$("#dncalendar-container").dnCalendar({
	dataTitles: { defaultDate: 'default', today : 'hari ini' }
}).build();
```


***Add some notes in Calendar***

```
$("#dncalendar-container").dnCalendar({
	notes: [
    		{ "date": "2015-12-25", "note": ["Natal"] },
    		{ "date": "2015-12-31", "note": ["Tahun Baru"] }
    	]
}).build();
```


***Show information detail of notes***

```
$("#dncalendar-container").dnCalendar({
	showNotes: true
}).build();
```


***Set start day of week***

```
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
$("#dncalendar-container").dnCalendar({
	startWeek: 'sunday' // default is sunday
}).build();
```



# Copyright

Copyright (C) 2015 Romdoni Agung Purbayanto ( donnydiunindra AT gmail.com )

