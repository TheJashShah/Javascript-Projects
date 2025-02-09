const FormDiv = document.getElementById("form");
const QuestionDiv = document.getElementById("questions");
const ResultDiv = document.getElementById("result");

let data;
let questions = [];

function DecodeHTML(text){
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  return doc.body.textContent || "";
}

function CheckForCorrect(array){

  const result_list = document.createElement("ol")

  const Score = document.createElement("h1")
  let score = 0;

  if (questions.length > 0){

    for (let i = 0; i < questions.length; i++){

      const question = questions[i];

      const Text = document.createElement("li")

      if(DecodeHTML(question.correct_answer) === DecodeHTML(array[i])){

        score++;

        Text.innerHTML = "Correctly Answered!";
        Text.style.color = "#90ee90";
      }
      else{
        Text.innerHTML = `Wrong! Correct answer was ${question.correct_answer}`;
        Text.style.color = "#f95e25";
      }

      result_list.appendChild(Text);
    }

    Score.innerHTML = `You got ${score} questions correct out of ${questions.length} questions.`

    ResultDiv.appendChild(result_list);
    ResultDiv.appendChild(Score);
  }
}

const categories = [
  {
    id: 9,
    name: "General Knowledge",
    question_count: 313
  },
  {
    id: 10,
    name: "Entertainment: Books",
    question_count: 99
  },
  {
    id: 11,
    name: "Entertainment: Film",
    question_count: 251
  },
  {
    id: 12,
    name: "Entertainment: Music",
    question_count: 366
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres",
    question_count: 32
  },
  {
    id: 14,
    name: "Entertainment: Television",
    question_count: 170
  },
  {
    id: 15,
    name: "Entertainment: Video Games",
    question_count: 973
  },
  {
    id: 16,
    name: "Entertainment: Board Games",
    question_count: 59
  },
  {
    id: 17,
    name: "Science & Nature",
    question_count: 230
  },
  {
    id: 18,
    name: "Science: Computers",
    question_count: 159
  },
  {
    id: 19,
    name: "Science: Mathematics",
    question_count: 55
  },
  {
    id: 20,
    name: "Mythology",
    question_count: 58
  },
  {
    id: 21,
    name: "Sports",
    question_count: 133
  },
  {
    id: 22,
    name: "Geography",
    question_count: 275
  },
  {
    id: 23,
    name: "History",
    question_count: 314
  },
  {
    id: 24,
    name: "Politics",
    question_count: 59
  },
  {
    id: 25,
    name: "Art",
    question_count: 33
  },
  {
    id: 26,
    name: "Celebrities",
    question_count: 52
  },
  {
    id: 27,
    name: "Animals",
    question_count: 76
  },
  {
    id: 28,
    name: "Vehicles",
    question_count: 71
  },
  {
    id: 29,
    name: "Entertainment: Comics",
    question_count: 68
  },
  {
    id: 30,
    name: "Science: Gadgets",
    question_count: 29
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga",
    question_count: 184
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
    question_count: 17
  },
];

async function getQuestions(category, amount){

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`

    try{
        const response = await fetch(url);
        return response.json()
    }
    catch(e){
        console.log(`Error Recieved: ${e}`);
    }
}

function makeQuestions(){

    QuestionDiv.innerHTML = "";

    if(questions.length  > 0){

      for(let i = 0; i < questions.length; i++){

        let question = questions[i];

        const question_div = document.createElement("div");
        question_div.id = "question"

        question_div.appendChild(document.createElement("hr"));

        const questionText = document.createElement("p");
        questionText.id = "question-text"
        questionText.innerHTML = question.question;
        question_div.appendChild(questionText);

        question.incorrect_answers.push(question.correct_answer);

        let answers = question.incorrect_answers.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        for(let ans of answers){
          const Option = document.createElement("input");
          Option.id = "option";
          Option.type = "radio";
          Option.value = ans;
          Option.name = `${i}`;

          question_div.appendChild(Option);

          const Label = document.createElement("label")
          Label.innerHTML = ans;
          Label.htmlFor = "ans"
          question_div.appendChild(Label);
        }

        const Clear = document.createElement("button");
        Clear.id = "clear";
        Clear.textContent = "Clear";
        Clear.addEventListener("click", () => {
          document.querySelectorAll(`input[name="${i}"]`).forEach((input) => {
            input.checked = false;
          });
        });

        question_div.appendChild(Clear);

        QuestionDiv.appendChild(question_div);

      }
    }
    else{
      const Tag = document.createElement("p");
      Tag.textContent = "There is some Error in making the quiz.";
      QuestionDiv.appendChild(Tag);
    }
}

function createResult(){

  ResultDiv.innerHTML = "";

  if(questions.length > 0){
    const getResult = document.createElement("button");
    getResult.id = "check"
    getResult.textContent = "Check";

    getResult.addEventListener("click", () => {

      let answers = [];

      for(let i = 0; i < questions.length; i++){

        const answer = document.querySelector(`input[name="${i}"]:checked`);

        answers.push(answer ? answer.value : "Left Empty");

        document.querySelectorAll(`input[name="${i}"]`).forEach((input) => {
          input.disabled = true;
        });        
      }

      CheckForCorrect(answers);

    })

    ResultDiv.appendChild(getResult);

    const Reset = document.createElement("button");
    Reset.id = "reset";
    Reset.innerHTML = "Reset";
    Reset.addEventListener("click", () => {
      location.reload();
    });

    ResultDiv.appendChild(Reset);

  }
  
}

function StartClicked(){

    FormDiv.innerHTML = "";

    const Select = document.createElement("select");
    Select.id = "dropdown";

    for(let category of categories){
        const Option = document.createElement("option")
        Option.value = category.question_count;
        Option.textContent = category.name;
        Option.name = category.id;

        Select.appendChild(Option);
    }

    FormDiv.appendChild(Select);

    const Input = document.createElement("input")
    Input.id = "input";
    Input.placeholder = "Enter Number of Questions.."
    Input.type = "number";
    Input.min = "10";
    Input.max = "50";

    FormDiv.appendChild(Input);

    Select.addEventListener("change", () => {
        const MaxNumber = Number(Select.value);
        Input.max = MaxNumber;
    })

    const Create = document.createElement("button")
    Create.id = "create";
    Create.textContent = "Create Quiz";
    Create.addEventListener("click", async () => {

        const NumQuestions = Number(Input.value);
        const Max = Number(Input.max);

        //const selected = Select.options[Select.selectedIndex].text;
        const Id = Select.options[Select.selectedIndex].name;

        if(NumQuestions >= 10 && NumQuestions <= Max){

          try{
            
            data = await getQuestions(Id, NumQuestions);
            questions = data.results;

            makeQuestions();
            createResult();
          }
          catch(e){
            console.log(`Error recieved: ${e}`);
          }

        }
        else{
            alert(`This Category has a minimum of 10 questions and a maximum of ${Max} questions.`);
        }
    })

    FormDiv.appendChild(Create);
}
