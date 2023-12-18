let arg = process.argv;
let str = arg[2];
//let str = '1 + 2 * ( 4 / 2 ) ^ 2 ^ 3 - 1';
let polish = toPolish(str);
console.log(polish);
let evalStr = str.replaceAll("^", "**");
var res = reversePolish(polish);
if (eval(evalStr) == res)
    console.log(true);
else 
{
	console.log(false);
	return;
}
console.log(res);

function toPolish(str)
{	
	let tokens = str.split(' ')
	let out = '';
	let priority= new Object();
	priority['-'] = priority['+'] = 1;
	priority['*'] = priority['/'] = 2;
	priority['^'] = 3;
	priority['('] = 0;
	let stack = new Array();

	for(let i = 0; i < tokens.length; i++)
	{
		if (!isNaN(tokens[i]))
		{
			out += tokens[i];
			continue;
		}
		switch (tokens[i])
		{
			case '^' :
				stack.push(tokens[i]);
				break;
			case '(' :
				stack.push(tokens[i]);
				break;
			case ')' :
				while(stack[stack.length - 1] != '(')
				out += stack.pop();
				stack.pop();
				break;
			default :
				let first = stack[stack.length - 1];
				if (stack.length == 0) 
					stack.push(tokens[i]);
				else 
				{
					if (priority[tokens[i]] > priority[first]) 
					stack.push(tokens[i]);
					if (priority[tokens[i]] == priority[first])
					{
						out += first;
						stack.pop();
						stack.push(tokens[i]);
					}
					if (priority[tokens[i]] < priority[first]) 
					{
						while (priority[tokens[i]] <= priority[stack[stack.length - 1]])
							out += stack.pop();
						stack.push(tokens[i]);
					}
				}
				break;
		}
	}
	while(stack.length !== 0)
		out += stack.pop();
	return out;
}

function reversePolish (polish) 
{
    let tokens = polish.split("");
    let stack = new Array();
    if(tokens == '')
        return 0;
    for(i = 0; i < tokens.length; i++) 
	{
        if(!isNaN(tokens[i]))
		{
            stack.push(tokens[i]);
			continue;
		}
            let a = parseInt(stack.pop());
            let b = parseInt(stack.pop());
			let res;
			switch (tokens[i])
			{
				case '+' :
					res = a + b;
					break;
				case '-' : 
					res = b - a;
					break;
				case '*' :
					res = a * b;
					break;
				case '/' :
					res = b / a;
					break;
				case '^' :
					res = Math.pow(b, a);
			}
			stack.push(res);
    }
    return stack[0];
}
