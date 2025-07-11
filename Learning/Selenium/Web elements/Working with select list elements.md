#Selenium 
# Working with select list elements
Select lists have special behaviors compared to other elements.

Select elements can require quite a bit of boilerplate code to automate. To reduce this, and make your tests cleaner, there is a `Select` class in the Selenium support package. To use it, you will need the following import statement:

```python
from selenium.webdriver.support.select import Select
  
```

You are then able to create a Select object using a WebElement that references a `<select>` element.

```python
select_element = driver.find_element(By.ID,'selectElementID')
select_object = Select(select_element)
  
```

The Select object will now give you a series of commands that allow you to interact with a `<select>` element. First of all, there are different ways of selecting an option from the `<select>` element.

```html
<select>
 <option value=value1>Bread</option>
 <option value=value2 selected>Milk</option>
 <option value=value3>Cheese</option>
</select>
```

There are three ways to select the first option from the above element:

```python
# Select an <option> based upon the <select> element's internal index
select_object.select_by_index(1)

# Select an <option> based upon its value attribute
select_object.select_by_value('value1')

# Select an <option> based upon its text
select_object.select_by_visible_text('Bread')
  
```

You can then check which options are selected by using:

```python
# Return a list[WebElement] of options that have been selected
all_selected_options = select_object.all_selected_options

# Return a WebElement referencing the first selection option found by walking down the DOM
first_selected_option = select_object.first_selected_option
  
```

Or you may just be interested in what `<option>` elements the `<select>` element contains:

```python
# Return a list[WebElement] of options that the <select> element contains
all_available_options = select_object.options
  
```

If you want to deselect any elements, you now have four options:

```python
# Deselect an <option> based upon the <select> element's internal index
select_object.deselect_by_index(1)

# Deselect an <option> based upon its value attribute
select_object.deselect_by_value('value1')

# Deselect an <option> based upon its text
select_object.deselect_by_visible_text('Bread')

# Deselect all selected <option> elements
select_object.deselect_all()
  
```

Finally, some `<select>` elements allow you to select more than one option. You can find out if your `<select>` element is one of these by using:

```python
does_this_allow_multiple_selections = select_object.is_multiple
  
```
