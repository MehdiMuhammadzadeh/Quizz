async function init() {
  let questionNum = 5;
  let level = 0;
  let results = [];

  const container = document.querySelector(".container");

  // Fetch
  async function fetchQuestions() {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${questionNum}`
    );
    const questions = await response.json();

    return questions.results;
  }

  const questions = await fetchQuestions();
  console.log(questions);

  // Handle Answer
  function handleAnswer(answer) {
    results.push(answer);
    level++;

    if (level < questionNum) {
      container.replaceChildren();
      
      render();
    } else {
      finish();

    }
 
  }

  // Finish
  function finish() {
    container.replaceChildren();
    let correctAns = 0;
    results.forEach((result, i) => {
      if (result == questions[i].correct_answer) {
        correctAns++;
      }
    });
    const message = document.createElement('h1')
    message.textContent = 'Congragulations! You did it.'
    container.appendChild(message)
    
    const resultEl = document.createElement("h1");
    resultEl.classList.add('result-title')
    resultEl.textContent = `${correctAns} of ${questionNum} question is correct`;
    container.appendChild(resultEl);


    const reloadButton = document.createElement('button')
    reloadButton.textContent = 'Refresh The Quizz!';
    reloadButton.classList.add('reload-quizz');
    container.appendChild(reloadButton)

    reloadButton.addEventListener('click', () =>{
      location.reload()
    })


  }

  // Render
  function render() {
    const questionContainerEl = document.createElement("div");
    questionContainerEl.classList.add("question-container");
    
    const answerContainerEl = document.createElement("div");
    answerContainerEl.classList.add('answer-container');
    
    const questionTitleEl = document.createElement("p");
    questionTitleEl.textContent = questions[level].question;
    questionContainerEl.appendChild(questionTitleEl);
    questionContainerEl.appendChild(answerContainerEl);

    const answers = [
     questions[level].correct_answer,
      ...questions[level].incorrect_answers,
    ];
    console.log('Answers', answers)

    answers.forEach((answer) => {
      const answerEl = document.createElement("button");
      answerEl.textContent = answer;
      answerEl.addEventListener("click", () => handleAnswer(answer));
      answerContainerEl.appendChild(answerEl);
    });

    questionContainerEl.appendChild(answerContainerEl);

    container.appendChild(questionContainerEl);

    console.log(answerContainerEl)

    const lightBox = document.createElement('div');
    lightBox.classList.add('light-box');
    container.appendChild(lightBox)
   

   questions.map(light=>{
    const lights = document.createElement('div');
    lights.classList.add('light')
    // lights.textContent = light.correct_answer
    lightBox.appendChild(lights)
   })

  }
  render();




}

init();

