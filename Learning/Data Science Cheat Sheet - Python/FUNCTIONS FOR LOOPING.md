#learningDataScienceCheatSheet-Python

**FUNCTIONS FOR LOOPING**
 
 for i, value in enumerate(l):
  print("The value of item {} is {}".
  format(i,value))
- Iterate over the list l, printing the index location of each item and its value

for one, two in zip(l_one,l_two): print("one: {}, two: {}".format(one,two))
- Iterate over two lists, l_one and l_two and print each value

while x < 10:
  x += 1
- Run the code in the body of the loop until the value of x is no longer less than 10