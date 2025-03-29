function paintQuestions(dataset) {
  // 2 - Tratamiento de datos

  // Forma 1. Ineficiente con 2 iteraciones
  // const listFilms = dataset.map((films) => `prod${films.id}`);
  // const listDate = dataset.map((films) => films.price);

  // Forma 2. Eficiente con 1 iteración

  dataset.forEach((questions) => {
    document.getElementById("questions-section").innerHTML = "";
    document.getElementById("questions-section").innerHTML = `
           <article>
          <p>${questions.question}</p>
        </article> `;
    document.getElementById("answer-section").innerHTML = "";

    const allAnswers = [
      questions.correct_answer,
      ...questions.incorrect_answers,
    ];
    const shuffledAnswers = shuffleArray([...allAnswers]);

    document.getElementById("answer-section").innerHTML = `
    
        ${shuffledAnswers
          .map(
            (answer) => `<li onclick="checkAnswer('${answer}')">${answer}</li>`
          )
          .join("")}
      `;
  });
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function checkAnswer(questions) {
  const listItems = document.querySelectorAll("#answer-section li");
  const feedback = document.getElementById("feedback");
  console.log(questions);

  listItems.forEach((item) => {
    item.classList.remove("selected", "incorrect");
    if (item.textContent === selectedAnswer) {
      item.classList.add(
        selectedAnswer === questions.correct_answer ? "selected" : "incorrect"
      );
    }
    if (item.textContent === questions.correct_answer) {
      item.classList.add("selected");
    }
  });

  // Mostrar feedback
  if (selectedAnswer === questions.correct_answer) {
    feedback.innerHTML = "<p style='color:green;'>¡Correcto! 😊</p>";
  } else {
    feedback.innerHTML =
      "<p style='color:red;'>Incorrecto. La respuesta correcta es <strong>" +
      questions.correct_answer +
      "</strong>.</p>";
  }
}

async function getData() {
  try {
    // 1 - Obtención de datos
    const response = await fetch("../json/questions.json");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data.results);

    // Tratamiento + representar gráficamente los datos. Pasos 2-3
    paintQuestions(data.results);
    checkAnswer(data.results);
    paintGraph ()
  } catch (error) {
    // Manejar el error de manera personalizada
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData();

// function paintGraph 