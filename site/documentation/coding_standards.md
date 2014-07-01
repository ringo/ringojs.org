# Coding Standard for the RingoJS Project

This document collects the coding standards that are in use in the Ringo code base. Ultimately, there is one __golden rule__ almost universally applicable to open source projects:

> If you are extending, enhancing, or bug fixing already
> implemented code, use the style that is already being
> used so that the source is uniform and easy to follow.
>
> _(Formulation taken from the [LLVM Coding Standards](http://llvm.org/docs/CodingStandards.html).)_

__Hard rules__ (no exceptions!) for contributions:

- Use 4 spaces for indentation
- Prefer spaces over tabs: do _not_ use tabs

Contributions will be rejected unless they conform to above rules.

__"Softer" rules__ widely adhered to in the Ringo, but not yet formally prescribed:

- Write your code in lines no longer than 80 characters
- Avoid trailing whitespace (i.e. additional spaces at the end of a line or additional newlines at the end of a file)
- Prefer single quoted strings

In general, the Ringo code more often than not sticks to the ["Code Conventions for the JavaScript Programming Language"](http://javascript.crockford.com/code.html), which serve as a good guideline what to use when in doubt.
