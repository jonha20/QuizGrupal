const firebaseConfig = {
  apiKey: "AIzaSyBWb1Dn92SCNUbWnn6SWQVF4UaMxypPm9s",
  authDomain: "quiz-grupal.firebaseapp.com",
  projectId: "quiz-grupal",
  storageBucket: "quiz-grupal.firebasestorage.app",
  messagingSenderId: "589625917984",
  appId: "1:589625917984:web:2c7a74a3ccfeff9bfef245",
};

firebase.initializeApp(firebaseConfig); // Inicializaar app Firebase

const db = firebase.firestore(); // db representa mi BBDD //inicia Firestore

let aciertos = 0;
let nombre = prompt("Introduce tu Nombre");
function paintQuestions(dataset) {
  document.getElementById("questions-section").innerHTML = "";
  document.getElementById("questions-section").innerHTML = `
           <article>
          <p>${dataset.question}</p>
        </article> `;
  document.getElementById("answer-section").innerHTML = "";

  const allAnswers = [dataset.correct_answer, ...dataset.incorrect_answers];
  const shuffledAnswers = shuffleArray([...allAnswers]);

  document.getElementById("answer-section").innerHTML = `
    
    ${shuffledAnswers
      .map(
        (answer) =>
          `<li onclick="checkAnswer('${answer}', '${dataset.correct_answer}')">${answer}</li>`
      )
      .join("")}
      `;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function checkAnswer(selectedAnswer, correctAnswer) {
  const answerElements = document.querySelectorAll("#answer-section li");

  answerElements.forEach((questionColor) => {
    // Resetear estilos
    questionColor.style.backgroundColor = "";
    questionColor.style.color = "";
    questionColor.style.textDecoration = "";

    if (questionColor.textContent === selectedAnswer) {
      if (selectedAnswer === correctAnswer) {
        questionColor.style.backgroundColor = "#4CAF50";
        questionColor.style.color = "white";
        aciertos++;
      } else {
        questionColor.style.backgroundColor = "#F44336";
        questionColor.style.color = "white";
        questionColor.style.textDecoration = "line-through";

        // Resaltar la correcta
        answerElements.forEach((correctQuestion) => {
          if (correctQuestion.textContent === correctAnswer) {
            correctQuestion.style.backgroundColor = "#4CAF50";
            correctQuestion.style.color = "white";
          }
        });
      }
    }
  });
}
// Funcion para eliminar todo
const goResults = () => {
  const results = confirm("¿Quieres ver los resultados?");
  if (results) {
    window.location.href = "./results.html";
  } else {
    location.reload();
  }
};
const writeNameDB = (array) => {
  db.collection("partidas")
    .add(array)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => console.error("Error adding document: ", error));
};

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
    let currentQuestionIndex = 0;
    let contadorPreguntas = 1;

    const data = await response.json();

    // Tratamiento + representar gráficamente los datos. Pasos 2-3
    document.getElementById("next-button").addEventListener("click", () => {
      document.getElementById(
        "pregunta"
      ).innerHTML = `Pregunta ${contadorPreguntas}/10`;
      console.log(data.results[currentQuestionIndex]);
      paintQuestions(data.results[currentQuestionIndex]);
      if (currentQuestionIndex >= 9) {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("resultados-button").style.display = "block";
        document
          .getElementById("resultados-button")
          .addEventListener("click", () => {
            window.location.href = "./results.html";
          });
      } else if (currentQuestionIndex < 9) {
        document.getElementById("resultados-button").style.display = "none";
      }

      checkAnswer(data.results[currentQuestionIndex]);
      if (currentQuestionIndex >= 10) {
        // Fin del quiz
        alert("Quiz completado!");
        document.getElementById("answer-section").innerHTML = "";
        const formData = {
          name: nombre,
          aciertos: aciertos,
        };
        writeNameDB(formData);
        goResults();
      }

      currentQuestionIndex++;
      contadorPreguntas++;
    });
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
