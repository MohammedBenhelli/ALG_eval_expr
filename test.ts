import eval_expr from "./main.ts";

const test = [
    "(-5600+23000)-(-67/3)-908/(14*2)%4",
    "24*(30-12)%6809+(14/9)"
]
for (let i in test) 
    console.log(`test ${i}`, eval_expr(test[i]), "eval:", eval(test[i]));
