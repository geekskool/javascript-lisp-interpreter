// Stack Implementation
var stackHolder = []

function stack_push(input) {
    stackHolder.push(input)
}

function stack_pop() {
    if(stack_top() != null) {
        var element = stackHolder.pop()
        return element
    }
    return null
} 

function stack_top() {
    if(stackHolder.length != 0) {
        return stackHolder[stackHolder.length-1]
    }
    return null
}
function stack_print() {
    console.log(stackHolder)
}

// Input set
var input =  "(+ 4 5 ( * 7 6 ) ) \n"
+ "( + 3 2 ( * 5 6 ( + 4 5 ) ) ) \n"
+ "(or 1 2 3 4 ) \n"
+ "(or nil 2 3 4 ) \n"
+ "(or 1 nil 3 4 ) \n"
+ "(or nil nil 3 4 ) \n"
+ "(or nil nil nil nil ) \n"
+ "(and 1 2 3 4 ) \n"
+ "(and nil 2 3 4 ) \n"
+ "(car '(apple mango grape ) ) \n"
+ "(cdr '(apple mango grape ) ) \n"
+ "(rem 5 10) \n"
+ "(mod 5 10) \n"
+ "(mod 10 5) \n"
+ "(/ 12 6) \n"
+ "(= 3 3 3 3) \n"
+ "(eq 4 5 10) \n"
+ "(/= 4 5 10) \n"
+ "(/= 4 4 4) \n"
+ "(< 5 4 3 2) \n"
+ "(< 1 2 3 4) \n"
+ "(< 1 2 1 4 3) \n"
+ "(- 4 5 ( / 12 6 ) ) \n"
+ "(eval (+ 1 2 ( * 7 6 ) ) )"   

function mySplit(data) {
    var myArray=data.split("\n");
    for(var i = 0; i < myArray.length ; i++) {
        parse(myArray[i]);
    }
}

mySplit(input)

//Receives an input expression string and evaluates the expression  
function parse(d) {
    d = d.replace(/\(/g, '')
    d = d.replace(/\)/g, '') 
    d = d.replace(/\,/g, '')
    d = d.replace(/\'/g, '')
  
    //console.log(d)

    var smallArray = d.split(" ")
    smallArray.splice(-1,1)
    smallArray = smallArray.filter(function(str) {
        return /\S/.test(str);
    });
    console.log(smallArray)
    for (var i = 0; i <smallArray.length ; i++) {
        //console.log(smallArray[i])
    }
    //Pushing elements of smallArray into stackHolder
    console.log('*************************')
    for(var i = 0; i < smallArray.length ; i++) {
        stack_push(smallArray[i])
    }
    stack_print()
    console.log('*************************')
 
    var temp = []
    while(stack_top() != null) {
        var x = stack_pop()
        var last_popped_element = x
        if((x != "+") && (x != "*") && (x != "-") && (x != "/") && (x != "mod") && (x != "rem") && (x != ">") && (x != "<") && (x != "=") && (x != "/=") && (x != "eq") && (x != "car") && (x != "cdr") &&  (x != "cons") &&   (x != "set") && (x != "list") && (x != "quote") && (x != "eval") && (x != "and") && (x != "or") && (x != "lambda")) {
            temp.push(x)
        }

    if(x == "+") { 
        // console.log("passing eval")
        var total = temp.reduce(function(a,b){ return +a + + b});
        stack_push(total)
        temp = []  
    }
    if(x == "*") {
        var product = temp.reduce(function(a,b){ return a * b});
        stack_push(product)
        temp = []
    }
    if (x == '-') {
        if(temp.length == 1) {
            temp.push(0)
        }
        temp.reverse()
        var diff = temp.reduce(function(a,b){ return a - b});
        stack_push(diff)
        temp = []
    } 
    if (x == '/') {
        var div = temp.reduce(function(a,b){ return b / a});
        stack_push(div)
        temp = [];
     
    }
    if ((x == 'mod') && (temp.length == 2)) {
        temp.reverse() 
        var mod = temp.reduce(function(a,b){ return a % b});
        stack_push(mod)
        temp = []
    }
    if ((x == 'mod') && (temp.length >2)) {
        stack_push("Too many Arguments")
        temp = []
    }
    if ((x == 'rem') && (temp.length == 2)) {
        temp.reverse()
        var rem = temp.reduce(function(a,b){ return a % b});
        stack_push(rem)
        temp = []
    }
    if ((x == 'rem') && (temp.length >2)) {
        stack_push("Too many Arguments")
        temp = []
    }
    if (x == '>') {
        temp.reverse()
        function CheckDescending(array) {
            for (var i = 0; i <array.length-1; i++) {
                if(array[i] <= array[i+1]) {
                    return 'NIL'
                }
            } 
            return 'T'
      }
      
        stack_push(CheckDescending(temp))
        temp = []
    }
    if ( x == '<' ) {
        temp.reverse()
        function CheckAscending(array) {
            for (var i = 0; i <array.length-1; i++) {
                if(array[i] >= array[i+1]) {
                    return 'NIL'
                }
            } 
            return 'T'
        }
      
        stack_push(CheckAscending(temp))
        temp = []
    }
    if(x == '=') {
        function CheckEquality(array) {
            for (var i = 0; i <array.length-1; i++) {
                if(array[i] != array[i+1]) {
                    return 'NIL'
                }
            } 
            return 'T'
        }
      
        stack_push(CheckEquality(temp))
        temp = []
    }
    if((x == 'eq') && (temp.length == 2)) {
        function CheckAnotherEquality(array) {
            for (var i = 0; i <array.length-1; i++) {
                if(array[i] != array[i+1]) {
                    return 'NIL'
                }
            }
            return 'T'   
        }
      
        stack_push(CheckAnotherEquality(temp))
        temp = []
    }
    if((x == 'eq') && (temp.length > 2)) {
        stack_push('Too many Arguments')
        temp = []
    }
    if(x == '/=') {
        function CheckInequality(array) {
            for (var i = 0; i <array.length-1; i++) {
                if(array[i] == array[i+1]) {
                    return 'NIL'
                }
            } 
            return 'T'
        }
      
        stack_push(CheckInequality(temp))
        temp = []
    }
    if(x == 'and') {
        temp.reverse()
        function checkAnd(array) {
            for(var i = 0; i<array.length;i++) {
                if((array[i] == "nil") || (array[i] == "NIL")) {
                    return "NIL"
                } 
            }
            return array[array.length -1]
        }
        stack_push(checkAnd(temp))
        temp =[]
    }
    if(x == 'or') {
        temp.reverse()
        function checkOr(array) {
            if ((array[0] == "nil" )&& (array[1] == "nil")) {
                return array[2]
            }
            if(array[0] == "nil") {
                return array[1]
            }
            return array[0]
        }
        stack_push(checkOr(temp))
        temp =[]
    }
    if(x == 'car') {
        function getFirstElement(array) {
            for(var i = 0; i< array.length ; i++) {
                var my_element =  array[array.length -1]
                return my_element
            }
        }
        stack_push(getFirstElement(temp))
        temp = []
    }
    if(x == 'cdr') {
        function getLastElement(array) {
            for(var i = 0; i< array.length ; i++) {
                var my_element =  array[0]
                return my_element
            }
        }
        stack_push(getLastElement(temp))
        temp = []
    }
    if(x == 'cons') {
        temp.reverse()
        function addElement(array) {
            array.unshift("(")
            array.push(")")
            //onsole.log(array)
            var array1 = array.join()
            array1 = array1.replace(/\,/g, ' ')
            return array1
        }
        stack_push(addElement(temp))
        temp = []
    }
    if(x == "set") {
        temp.reverse()
        function setVal(array) {
            for (var i = 0; i < array.length ; i++) {
                var val = array.shift()
                val = array
                return val
            }
        }
        stack_push(setVal(temp))
        temp = []
    }
    if(x == "list") {
        temp.reverse()
        function getList(array) {
            return array
        }
        stack_push(getList(temp))
        temp = []
    }
    if(x == "quote") {
        temp.reverse()
        function getMe(array) {
            array.unshift("(")
            array.push(")")
            console.log(array)
            var array1 = array.join()
            array1 = array1.replace(/\,/g, ' ')
            return array1
        }
        stack_push(getMe(temp))
        temp = []
    }
    if(x == "eval") {
        stack_push(temp)
        temp = []
    }
  }
  console.log(last_popped_element)
}







