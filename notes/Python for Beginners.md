---
attachments: [Clipboard_2022-05-25-09-44-01.png, Clipboard_2022-05-25-09-46-29.png, Clipboard_2022-05-25-09-47-00.png, Clipboard_2022-05-25-09-48-07.png, Clipboard_2022-05-25-09-50-17.png, Clipboard_2022-05-25-09-51-58.png, Clipboard_2022-05-25-09-52-39.png, Clipboard_2022-05-25-09-52-57.png]
title: Python for Beginners
created: '2022-05-25T04:13:18.273Z'
modified: '2022-05-25T04:24:40.330Z'
---

# Python for Beginners
 
Writing Clean Code – Part 2
 

Introduction
 

This is the second part of a 3-part lesson on writing clean code. This part is focused on writing clean code. We plan to discuss 5 critical techniques of writing clean code and deep dive on the first two qualities.

 

Color Coding
 

Following color code is used throughout the presentation.
![](@attachment/Clipboard_2022-05-25-09-44-01.png)

## Techniques of Writing Readable Code
 
Following are the five techniques which can be utilized for making a codebase more readable.

1) Using meaningful names
2) Write functions that does one thing (Single Responsibility Functions)
3) Avoiding deep nesting
4) Avoiding copying and pasting code
5) Commenting responsibly
 

These are selected out of many since these techniques compose the basics of writing readable code and they are simple to understand. Developers adhering to these techniques would be able to achieve significant code readability.

 

In Part 2, the first two techniques will be discussed in detail.

 

## Scenario: Lending a Book in an Online Library Management System
![](@attachment/Clipboard_2022-05-25-09-46-29.png)

To discuss techniques of writing readable code, a simple scenario of lending a book in an online Library Management System would be used throughout this and next session.

The diagram above is a Flow Diagram or a Flow Chart. This represents decision making process (i.e., the logic of the scenario) and the actions that happen when decisions are made. Black circles represent Start and End. The square shapes represent actions that happens, either by a human user or by code. The diamond shapes represent validations and decisions that are made along the way.

The scenario or flow starts by a User requesting a book to be lent. Once the request is made, there’s a validation to check if the user is an existing member of the library. If the user is a member, then the flow decides to move to the next validation, where it checks if this member has already lent more than 2 books. If the Member has not lent more than two books, then the flow decides to move to the next validation where it checks if the requested book is available.

If the book is available, the flow decides to move to the action of calculating the Return Date for the book. Once done, it moves to the final step of checking out the book where the book gets assigned to this member and updates the return date. This brings to the end of one path of the scenario.

If any of the validations fail, then the flow moves to a step where the system informs the user why a book cannot be lent. After that the flow ends.

 

## Lend Book Python Function
![](@attachment/Clipboard_2022-05-25-09-47-00.png)

The code above is a Python function named lend_book, which implements the logic described by the flow diagram introduced earlier.

 

This function lend_book takes two parameters, m_id and b_id. The first valid line in the function is an IF condition. Inside the If condition, there’s a call to another function named _check_db_member which takes m_id as an input. It seems to be returning a Boolean value, which the IF condition evaluates. By the looks of it, it seems the parameter m_id corresponds to member-id and the function _check_db_member validates whether the member id is valid. This corresponds to the first diamond shape in the flow diagram, where the validation of whether the user is an existing member happens.

 

If the member id validation is successful, another function _get_book is called with the member id. Then it checks if this function has returned less than 2 books. This corresponds to the condition of validating whether the member has more than two books to return in the flow diagram.

 

Once the number of books to be returned is verified, the function _check_db_book is called taking the b_id as an input. This condition corresponds to the condition where the book availability is validated. This suggests the b_id represents the book id.

If the book availability check is also satisfied, then the logic seems to calculate the return date and then call a function to check out the book to the Member. It seems to update the database to reflect that the member has checked out the corresponding book with the newly calculated return date.

The ELSE sections of the IF conditions reflect the validation failures. Recalling our flow diagram, each Else section prints a message to indicate why a book cannot be lent to the user.

Although the flow diagram is easier to understand, the corresponding Python code is a bit cryptic to read and understand. There are two main reasons for the lack of readability as indicated below.

- Not using meaningful names for variables and functions which describe the purpose
- The function does too many things, which makes understanding difficult

## Using Meaningful Names
![](@attachment/Clipboard_2022-05-25-09-48-07.png)

The above table lists all the variables and functions used with in the function lend_book. It also defines the purpose of them and suggests names which are meaningful and communicates the purpose of the variable or the function.

 

Row number 7 must be mentioned specially as this is one of the major bad practices in coding that must be avoided at any cost. Single letter variable names are not descriptive at all. If used, it takes a lot of time to understand purpose of such variables and may require reading the entire code for the function in some cases.

Following is the lend_book function after applying the suggested naming improvements.
![](@attachment/Clipboard_2022-05-25-09-50-16.png)

Although the number of lines of code is almost the same, the code is now much more readable simply due to the meaningful variable and function names. As one reads through the code, the meaningful names allow easily grasping the intent of the code and hence the logic.

 

The two numbers (2 – Maximum books a user can lend and 14 - the maximum number of days a book can be kept before returning) which is part of the logic is assigned to variables with meaningful names. The logic or calculation refers to the variables which makes the logic much easier to understand.

 

## Write Functions with Single Responsibility
 

As discussed earlier, the lend_book function does too many things. Following are the list of responsibilities that the function holds.

 

1. Validates whether the user is eligible for lending a book
   1. Checks if the user is an existing member of the library.
   2.  Validates whether the member has lent maximum allowed number of books.
2. Calculates the return date for the book and then checks out the book.
3. If validations fail, it prints messages to inform why the book could not be returned.
 

Another highly effective technique of writing clean code is to ensure the functions hold one and only one responsibility. Therefore, the function lend_book which holds 3 major responsibilities can be broken down in to smaller functions which holds a single responsibility.

Let’s consider the following responsibilities #1 and #2 to be extracted into smaller functions.

## Function for Validating Eligibility of a Member for Lending a Book
![](@attachment/Clipboard_2022-05-25-09-51-58.png)

The function above does one and only one thing. It validates if the user is eligible for lending a book.

 

The name of the function and input parameters clearly expresses what it’s trying to do. The corresponding code block has been moved from lend_book function into this function _is_member_eligible_for_lending. Moreover, the first technique of using meaningful names that explains the purpose has also been adhered to. The name of the new function clearly explains the single responsibility that it holds.

 

The function returns True if the user is eligible and False if not eligible. In validating eligibility, the function evaluates the following two conditions.

 

1. Whether the user is an existing member
2. Whether the user has already lent two books
 

Although these are two distinct validations, in terms of the business responsibility of validating the eligibility of a member for requesting more books to be lent, both these conditions falls under this single business responsibility.

 

## Function for Calculating the Return Date
 ![](@attachment/Clipboard_2022-05-25-09-52-39.png)


Similarly, the logic for calculating the return date for a book is moved to another new function _get_book_return_date.

The function is simple and holds one and only one responsibility of calculating the return date for a book lent on the current date. Also note that the first technique of using meaningful and contextual names has been adhered to.

## New Look of lend_book Function
![](@attachment/Clipboard_2022-05-25-09-52-57.png)

Above is the lend_book function after extracting two functions with single responsibilities. It’s clear that the number of lines has reduced, the readability has improved, and the function summarizes the logic nicely to the reader.

 

### Conclusion :smile: :+1:
 

This lesson explains effectiveness in using meaningful and contextual names as well as writing functions that holds a single responsibility in improving the readability of code.

 

The example showcases how a badly written unreadable code can be improved drastically using the above principles.

 

As developers we must ensure these techniques are followed which would improve the readability of the code.
