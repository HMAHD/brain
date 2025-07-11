#HTML
# Advanced text formatting

There are many other elements in HTML for formatting text, which we didn't get to in the [HTML text fundamentals](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) article. The elements described in this article are less known, but still useful to know about (and this is still not a complete list by any means). Here you'll learn about marking up quotations, description lists, computer code and other related text, subscript and superscript, contact information, and more.

Prerequisites:

Basic HTML familiarity, as covered in [Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started). HTML text formatting, as covered in [HTML text fundamentals](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals).

Objective:

To learn how to use lesser-known HTML elements to mark up advanced semantic features.

## [Description lists](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#description_lists "Permalink to Description lists")

In HTML text fundamentals, we walked through how to [mark up basic lists](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals#lists) in HTML, but we didn't mention the third type of list you'll occasionally come across — **description lists**. The purpose of these lists is to mark up a set of items and their associated descriptions, such as terms and definitions, or questions and answers. Let's look at an example of a set of terms and definitions:

soliloquy
In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)
monologue
In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.
aside
In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information

Description lists use a different wrapper than the other list types — [`<dl>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl); in addition each term is wrapped in a [`<dt>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt) (description term) element, and each description is wrapped in a [`<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) (description definition) element.

### [Description list example](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#description_list_example "Permalink to Description list example")

Let's finish marking up our example:

```
<dl>
  <dt>soliloquy</dt>
  <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
  <dt>monologue</dt>
  <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
  <dt>aside</dt>
  <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought, or piece of additional background information.</dd>
</dl>
```

Copy to Clipboard

The browser default styles will display description lists with the descriptions indented somewhat from the terms.

### [Multiple descriptions for one term](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#multiple_descriptions_for_one_term "Permalink to Multiple descriptions for one term")

Note that it is permitted to have a single term with multiple descriptions, for example:

```
<dl>
  <dt>aside</dt>
  <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought, or piece of additional background information.</dd>
  <dd>In writing, a section of content that is related to the current topic, but doesn't fit directly into the main flow of content so is presented nearby (often in a box off to the side.)</dd>
</dl>
```

Copy to Clipboard

### [Active learning: Marking up a set of definitions](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#active_learning_marking_up_a_set_of_definitions "Permalink to Active learning: Marking up a set of definitions")

It's time to try your hand at description lists; add elements to the raw text in the _Input_ field so that it appears as a description list in the _Output_ field. You could try using your own terms and descriptions if you like.

If you make a mistake, you can always reset it using the _Reset_ button. If you get really stuck, press the _Show solution_ button to see the answer.

## [Quotations](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#quotations "Permalink to Quotations")

HTML also has features available for marking up quotations; which element you use depends on whether you are marking up a block or inline quotation.

### [Blockquotes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#blockquotes "Permalink to Blockquotes")

If a section of block level content (be it a paragraph, multiple paragraphs, a list, etc.) is quoted from somewhere else, you should wrap it inside a [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) element to signify this, and include a URL pointing to the source of the quote inside a [`cite`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#attr-cite) attribute. For example, the following markup is taken from the MDN `<blockquote>` element page:

```
<p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
```

Copy to Clipboard

To turn this into a block quote, we would just do this:

```
<p>Here below is a blockquote...</p>
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>
```

Copy to Clipboard

Browser default styling will render this as an indented paragraph, as an indicator that it is a quote; the paragraph above the quotation is there to demonstrate that.

### [Inline quotations](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#inline_quotations "Permalink to Inline quotations")

Inline quotations work in exactly the same way, except that they use the [`<q>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q) element. For example, the below bit of markup contains a quotation from the MDN `<q>` page:

```
<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q></p>
```

Copy to Clipboard

Browser default styling will render this as normal text put in quotes to indicate a quotation, like so:

### [Citations](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#citations "Permalink to Citations")

The content of the [`cite`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#attr-cite) attribute sounds useful, but unfortunately browsers, screenreaders, etc. don't really do much with it. There is no way to get the browser to display the contents of `cite`, without writing your own solution using JavaScript or CSS. If you want to make the source of the quotation available on the page you need to make it available in the text via a link or some other appropriate way.

There is a [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) element, but this is meant to contain the title of the resource being quoted, e.g. the name of the book. There is no reason, however, why you couldn't link the text inside `<cite>` to the quote source in some way:

```
<p>According to the <a href="/en-US/docs/Web/HTML/Element/blockquote">
<cite>MDN blockquote page</cite></a>:
</p>

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>

<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q> -- <a href="/en-US/docs/Web/HTML/Element/q">
<cite>MDN q page</cite></a>.</p>
```

Copy to Clipboard

Citations are styled in italic font by default.

### [Active learning: Who said that?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#active_learning_who_said_that "Permalink to Active learning: Who said that?")

Time for another active learning example! In this example we'd like you to:

1.  Turn the middle paragraph into a blockquote, which includes a `cite` attribute.
2.  Turn "The Need To Eliminate Negative Self Talk" in the third paragraph into an inline quote, and include a `cite` attribute.
3.  Wrap the title of each source in `<cite>` tags and turn each one into a link to that source.

The citation sources you need are:

-   http://www.brainyquote.com/quotes/authors/c/confucius.html for the Confucius quote
-   http://example.com/affirmationsforpositivethinking for "The Need To Eliminate Negative Self Talk".

If you make a mistake, you can always reset it using the _Reset_ button. If you get really stuck, press the _Show solution_ button to see the answer.

## [Abbreviations](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#abbreviations "Permalink to Abbreviations")

Another fairly common element you'll meet when looking around the Web is [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) — this is used to wrap around an abbreviation or acronym, and provide a full expansion of the term (included inside a [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-title) attribute.)

### [Abbreviation example](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#abbreviation_example "Permalink to Abbreviation example")

Let's look at an example.

```
<p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>

<p>I think <abbr title="Reverend">Rev.</abbr> Green did it in the kitchen with the chainsaw.</p>
```

Copy to Clipboard

These will come out looking something like this (the expansion will appear in a tooltip when the term is hovered over):

**Note:** Earlier versions of html also included support for the [`<acronym>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/acronym) element, but it was removed from the HTML spec in favor of using `<abbr>` to represent both abbreviations and acronyms. `<acronym>` should not be used.

### [Active learning: marking up an abbreviation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#active_learning_marking_up_an_abbreviation "Permalink to Active learning: marking up an abbreviation")

For this simple active learning assignment, we'd like you to mark up an abbreviation. You can use our sample below, or replace it with one of your own.

## [Marking up contact details](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#marking_up_contact_details "Permalink to Marking up contact details")

HTML has an element for marking up contact details — [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address). This wraps around your contact details, for example:

```
<address>
  Chris Mills, Manchester, The Grim North, UK
</address>
```

Copy to Clipboard

It could also include more complex markup, and other forms of contact information, for example:

```
<address>
  <p>
    Chris Mills<br>
    Manchester<br>
    The Grim North<br>
    UK
  </p>

  <ul>
    <li>Tel: 01234 567 890</li>
    <li>Email: me@grim-north.co.uk</li>
  </ul>
</address>
```

Copy to Clipboard

Note that something like this would also be OK, if the linked page contained the contact information:

```
<address>
  Page written by <a href="../authors/chris-mills/">Chris Mills</a>.
</address>
```

Copy to Clipboard

**Note:** The [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) element should only be used to provide contact information for the document contained with the nearest [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) or [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) element. It would be correct to use it in the footer of a site to include the contact information of the entire site, or inside an article for the contact details of the author, but not to mark up a list of addresses unrelated to the content of that page.

## [Superscript and subscript](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#superscript_and_subscript "Permalink to Superscript and subscript")

You will occasionally need to use superscript and subscript when marking up items like dates, chemical formulae, and mathematical equations so they have the correct meaning. The [`<sup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup) and [`<sub>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub) elements handle this job. For example:

```
<p>My birthday is on the 25<sup>th</sup> of May 2001.</p>
<p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
<p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>
```

Copy to Clipboard

The output of this code looks like so:

## [Representing computer code](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#representing_computer_code "Permalink to Representing computer code")

There are a number of elements available for marking up computer code using HTML:

-   [`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code): For marking up generic pieces of computer code.
-   [`<pre>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre): For retaining whitespace (generally code blocks) — if you use indentation or excess whitespace inside your text, browsers will ignore it and you will not see it on your rendered page. If you wrap the text in `<pre></pre>` tags however, your whitespace will be rendered identically to how you see it in your text editor.
-   [`<var>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var): For specifically marking up variable names.
-   [`<kbd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd): For marking up keyboard (and other types of) input entered into the computer.
-   [`<samp>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp): For marking up the output of a computer program.

Let's look at a few examples. You should try having a play with these (try grabbing a copy of our [other-semantics.html](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/advanced-text-formatting/other-semantics.html) sample file):

```
<pre><code>var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}</code></pre>

<p>You shouldn't use presentational elements like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</p>

<p>In the above JavaScript example, <var>para</var> represents a paragraph element.</p>

<p>Select all the text with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>.</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>
```

Copy to Clipboard

The above code will look like so:

## [Marking up times and dates](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#marking_up_times_and_dates "Permalink to Marking up times and dates")

HTML also provides the [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) element for marking up times and dates in a machine-readable format. For example:

```
<time datetime="2016-01-20">20 January 2016</time>
```

Copy to Clipboard

Why is this useful? Well, there are many different ways that humans write down dates. The above date could be written as:

-   20 January 2016
-   20th January 2016
-   Jan 20 2016
-   20/01/16
-   01/20/16
-   The 20th of next month
-   20e Janvier 2016
-   2016 年 1 月 20 日
-   And so on

But these different forms cannot be easily recognized by computers — what if you wanted to automatically grab the dates of all events in a page and insert them into a calendar? The [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) element allows you to attach an unambiguous, machine-readable time/date for this purpose.

The basic example above just provides a simple machine readable date, but there are many other options that are possible, for example:

```
<!-- Standard simple date -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- Just year and month -->
<time datetime="2016-01">January 2016</time>
<!-- Just month and day -->
<time datetime="01-20">20 January</time>
<!-- Just time, hours and minutes -->
<time datetime="19:30">19:30</time>
<!-- You can do seconds and milliseconds too! -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- Date and time -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- Date and time with timezone offset -->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- Calling out a specific week number -->
<time datetime="2016-W04">The fourth week of 2016</time>
```

Copy to Clipboard

## [Test your skills!](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#test_your_skills! "Permalink to Test your skills!")

You've reached the end of this article, but can you remember the most important information? You can find some further tests to verify that you've retained this information before you move on — see [Test your skills: Advanced HTML text](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Test_your_skills:_Advanced_HTML_text).

## [Summary](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#summary "Permalink to Summary")

That marks the end of our study of HTML text semantics. Bear in mind that what you have seen during this course is not an exhaustive list of HTML text elements — we wanted to try to cover the essentials, and some of the more common ones you will see in the wild, or at least might find interesting. To find way more HTML elements, you can take a look at our [HTML element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) (the [Inline text semantics](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#inline_text_semantics) section would be a great place to start.) In the next article we will look at the HTML elements you'd use to structure the different parts of an HTML document.

-   [  
    ](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)