# javascript-lisp-interpreter
The interpreter implements the following instructions as primitives:

(+ z1 z2 ... zn)
(- z1 z2 ... zn)
(* z1 z2 ... zn)
(/ z1 z2 ... zn)
Returns z1 {+|-|*|/} z2 {+|-|*|/} ... {+|-|*|/} zn.
(eq s1 s2 ... sn)
(= s1 s2 ... sn)
Returns t if the si are all the same object, nil otherwise.

(< z1 z2 ... zn)
(> z1 z2 ... zn)
Returns t if the zi are in ascending or descending order, respectively, or nil otherwise.

(and s1 s2 ... sn)
(or s1 s2 ... sn)
Returns t if the si are all non-nil (and) or if any si is non-nil (or). Evaluates arguments from left to right and stops when the return value is determined.

(car s)
Returns the first element of the list s. If s is not a list, returns nil.

(cdr s)
Returns the tail of the list s, i.e. s with its first element removed. If s is not a list, returns nil.

(cons e s)
Returns a new list whose car is e and whose cdr is s.

(list s1 s2 ... sn)
Returns a list whose elements are the (evaluated) si.

(quote s)
Returns s uninterpreted.

(set e s)
Sets e to the evaluated value of s. The value of e must be a symbol, i.e. [a-z][a-z0-9]*.

(eval s)
Evaluates s and returns the result.
