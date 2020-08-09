const cleanExpr = (expr: string, i: number): string => {
    let str: string = "", j:number = i;
    while(expr.charAt(--i) !== "(") {
        str += expr.charAt(i);
    }
    str = str.split("").reverse().join("");
    expr = `${expr.substr(0, i)}${solveExpr(str)}${expr.substr(j + 1, expr.length)}`;
    return expr;
}

const notSign = (char: string): boolean => char !== "+" && char !== "-" && char !== "/" && char !== "*" && char !== "%"
//TODO: cas nombre commencant par -
const hasSign = (str: string): boolean => {
    for(let i = 0; i < str.length; i++) 
        if(!notSign(str[i]))
            return true;
    return false;
}

const cleanString = (first: string, second: string): Array<number>  => {
    let firstClean: number, secondClean: number, tmp: string = "", offsetFirst: number = -1, offsetSecond: number = -1;
    if(!hasSign(first))
        firstClean = parseFloat(first);
    else {
    for(let i = first.length; i > 0; i--)
        if(notSign(first[i]) || (first[i] === "-" && !notSign(first[i - 1])))
            tmp += first[i];
        else{
            offsetFirst = i;
            break;
        }
        tmp = tmp.substr(9, tmp.length - 1);
        tmp = tmp.split("").reverse().join("");
        firstClean = parseFloat(tmp);
    }
    tmp = "";
    for(let i = 0; i < second.length; i++)
        if(notSign(second[i]) || (second[i] === "-" && !notSign(first[i + 1])))
            tmp += second[i];
        else {
            offsetSecond = i;
            break;
        }
    offsetSecond = getOffsetSecond(tmp)
    secondClean = parseFloat(tmp);
    return [firstClean, secondClean, offsetFirst, offsetSecond];
}

const getOffsetSecond = (expr: string): number  => {
    let i: number = 0;
    while (++i < expr.length)
        if(!notSign(expr[i]))
            return i;
    return i;
}

const getOffFirst = (expr: string): number  => {
    let i: number = expr.length;
    while (--i < expr.length)
        if(!notSign(expr[i]))
            return i;
    return i;
}

const solveExpr = (expr: string): number => {
    let total: number, first: string, second: string, firstClean: number, secondClean: number, offsetFirst: number, offsetSecond: number, tab: Array<string>;
    for(let i = 0; i < expr.length; i++) {
        switch(expr[i]) {
            case "*":
                tab= expr.split("*");
                first = tab[0];
                tab.shift();
                second = tab.join("*");
                [firstClean, secondClean, offsetFirst, offsetSecond] = cleanString(first, second);
                expr = `${first.substr(0, offsetFirst + 1)}${firstClean * secondClean}${second.substr(offsetSecond, second.length - 1)}`;
                i = 0;
                break;
            case "/":
                tab= expr.split("/");
                first = tab[0];
                tab.shift();
                second = tab.join("/");
                [firstClean, secondClean, offsetFirst, offsetSecond] = cleanString(first, second);
                expr = `${first.substr(0, offsetFirst + 1)}${firstClean / secondClean}${second.substr(offsetSecond, second.length - 1)}`;
                i = 0;
                break;
            case "%":
                tab= expr.split("%");
                first = tab[0];
                tab.shift();
                second = tab.join("%");
                [firstClean, secondClean, offsetFirst, offsetSecond] = cleanString(first, second);
                expr = `${first.substr(0, offsetFirst + 1)}${firstClean % secondClean}${second.substr(offsetSecond, second.length - 1)}`;
                i = 0;
                break;
        }
    }
    for(let i = 1; i < expr.length; i++) {
        switch(expr[i]) {
            case "+":
                tab = expr.split("+");
                if(expr.charAt(0) === '-') tab[0] = `-${tab[0]}`;
                first = tab[0];
                tab.shift();
                second = tab.join("+");
                [firstClean, secondClean, offsetFirst, offsetSecond] = cleanString(first, second);
                expr = `${first.substr(0, offsetFirst + 1)}${firstClean + secondClean}${second.substr(offsetSecond, second.length - 1)}`;
                i = 1;
                break;
            case "-":
                tab = expr.split("-");
                if(expr.charAt(0) === '-') tab[0] = `-${tab[0]}`;
                first = tab[0];
                tab.shift();
                second = tab.join("-");
                [firstClean, secondClean, offsetFirst, offsetSecond] = cleanString(first, second);
                expr = `${first.substr(0, offsetFirst + 1)}${firstClean - secondClean}${second.substr(offsetSecond, second.length - 1)}`;
                i = 1;
                break;
        }
    }
    return parseFloat(expr);
}

const eval_expr = (expr: string): number  => {
    let total: number = 0;
    expr = `(${expr})`
    expr = expr.split("--").join("+").split("+-").join("+").split("-(-").join("+(").split("+(-").join("-(");
    for(let i = 0; i < expr.length; i++) {
        expr = expr.split("--").join("+").split("+-").join("+").split("-(-").join("+(").split("+(-").join("-(");
        if(expr.charAt(i) === ")") {
            expr = cleanExpr(expr, i);
            i = 0;
        }
    }
    return parseFloat(expr);
}

export default eval_expr;