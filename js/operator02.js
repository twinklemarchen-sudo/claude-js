// 나이는 임의로 설정
//const name = "세민";
//const age = 37;

// 19살 이상이면 입장 가능, 미만이면 입장 불가
//const enter = age >= 19 ? "입장 가능" : "입장 불가";

// 짝수 / 홀수 판별
//const oddEven = age % 2 === 0 ? "짝수" : "홀수";

// 16살이면 당첨, 아니면 꽝입니다
//const result = age === 16 ? "당첨" : "꽝입니다";

// 콘솔 출력
//console.log(`${name}님은 ${enter}`);
//console.log(`${age}, ${oddEven}, ${result}.`);



const age = 17
const name = "홍길동"
const baseAge = 19
const pass = "입장 가능"
const notPass = "입장 불가"
const luckyAge = 16
const lucky = "당첨"
const unLucky = "꽝"
const odd = "홀수"
const even = "짝수"
const passResult = age >= baseAge ? pass : notPass
const evenResult = age % 2 === 0 ? even : odd
const luckyResult = age === luckyAge ? lucky : unLucky

// console.log(name, "님은 ", passResult, age, evenResult, luckyResult)
// 문자열의 연결
// console.log(name + "님은 " + passResult + " " + age + "살 " + evenResult + " " + luckyResult) 

// es6 `${}`: 템플릿 리터럴은 문자열 안에서 변수를 사용하는 문법
console.log(`${name}님은 ${passResult} ${age}살이고, ${evenResult}, ${luckyResult}`)

