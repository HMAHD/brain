#learningDataScienceCheatSheet-Python

**DATETIME**

import datetime as dt 
- Import the datetime module

now = dt.datetime.now() 
- Assign datetime object representing the current time to now

wks4 = dt.datetime.timedelta(weeks=4) 
- Assign a timedelta object representing a timespan of 4 weeks to wks4

now - wks4 
- Return a datetime object representing the time 4 weeks prior to now 

newyear_2020 = dt.datetime(year=2020, month=12, day=31) 
- Assign a datetime object representing December 25, 2020 to newyear_2020

newyear_2020.strftime("%A, %b %d, %Y") 
- Returns "Thursday, Dec 31, 2020" 

dt.datetime.strptime('Dec 31, 2020',"%b %d, %Y") 
- Return a datetime object representing December 31, 2020

