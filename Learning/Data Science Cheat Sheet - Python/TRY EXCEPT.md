#learningDataScienceCheatSheet-Python

**TRY/EXCEPT**

Catch and deal with Errors  

l_ints = [1, 2, 3, "", 5] - Assign a list of integers with one missing value to l_ints

1_floats = [] 
for i in l_ints: 
	try:
		1_floats.append(float(i)) 
	except:
		1_floats.append(i)
		
- Convert each value of l_ints to a float, catching and handling ValueError: could not convert string to float: where values are missing.
