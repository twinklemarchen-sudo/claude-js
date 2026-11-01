// let num = 10

// if (num >= 15) {
//     console.log("15이상")
// }else{
//      console.log("15미만")
// }

// let score = 80

// if (score >=90){
//     console.log("A")
// } else if(score >=80){
//     console.log("B")
//     }else if(score >= 70){
//         console.log("C")
//     }else{
//         console.log("d")
//     }

// 학생 성적 평가
let name = "홍길동"
let koreanScore = 85
let mathScore = 90
let englishScore = 78

// 세 과목의 평균 계산
let average = (koreanScore + mathScore + englishScore) / 3

// 평균에 따른 합격/불합격 판정
if (average >= 60) {
    console.log(name + "학생의 평균: " + average + " - 합격")
} else {
    console.log(name + "학생의 평균: " + average + " - 불합격")
}

