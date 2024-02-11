function sendDataToServer(data) {
  fetch('https://16.171.195.12:3000/storedata', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to send data to server');
      }
      console.log('Data sent to server successfully');
  })
  .catch(error => {
      console.error('Error sending data to server:', error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let timerInterval;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timerDisplay = document.getElementById('timer');
  let timerRunning = false;

  // Retrieve quizTime from localStorage if available
  const pageTitle = document.title;
  const storedQuizTime = JSON.parse(localStorage.getItem('quizTime'));
  
  if (storedQuizTime && storedQuizTime[pageTitle]) {
      hours = storedQuizTime[pageTitle].hours;
      minutes = storedQuizTime[pageTitle].minutes;
      seconds = storedQuizTime[pageTitle].seconds;
      updateTimerDisplay();
  }

  function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
      timerRunning = true;
  }

  function updateTimer() {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
      }
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
      updateTimerDisplay();
  }

  function updateTimerDisplay() {
      timerDisplay.textContent = (hours < 10 ? '0' : '') + hours + ':' +
                                  (minutes < 10 ? '0' : '') + minutes + ':' +
                                  (seconds < 10 ? '0' : '') + seconds;
  }

  startTimer();

  timerDisplay.addEventListener('click', function() {
      if (timerRunning) {
          clearInterval(timerInterval);
          timerRunning = false;
          timerDisplay.style.borderColor = 'red'; 
          timerDisplay.title = 'Click to Resume';
      } else {
          timerDisplay.style.borderColor = 'white'; 
          startTimer();
      }

      const quizTime = JSON.parse(localStorage.getItem('quizTime')) || {};
      quizTime[pageTitle] = { hours, minutes, seconds };
      localStorage.setItem('quizTime', JSON.stringify(quizTime));
      sendDataToServer(quizTime);
  });

  window.addEventListener('beforeunload', function() {
      const quizTime = JSON.parse(localStorage.getItem('quizTime')) || {};
      quizTime[pageTitle] = { hours, minutes, seconds };
      localStorage.setItem('quizTime', JSON.stringify(quizTime));
      sendDataToServer(quizTime);
  });
});

function validateAnswers(fieldID, ans) {
  const textField = document.getElementById(fieldID);

  const inputValue = textField.value.trim();

  let inputNumber;
  try {
      inputNumber = parseFloat(inputValue);
      if (isNaN(inputNumber)) {
          throw new Error("Invalid input: Not a number");
      }
  } catch (error) {
      console.error("Error converting input to number:", error);
      textField.style.borderColor = "red";
      return; 
  }

  let isCorrect = false;
  switch (typeof ans) {
      case "number":
          isCorrect = Math.abs(inputNumber - ans) <= 0.01; 
          break;
      case "string": 
          isCorrect = inputValue.toLowerCase() === ans.toLowerCase();
          break;
      default:
          console.error("Invalid answer type:", typeof ans);
          return; 
  }

  textField.style.borderColor = isCorrect ? "green" : "red";
}


function validateAnswers(fieldID, ans) {
  const textField = document.getElementById(fieldID);

  const inputValue = textField.value.trim();

  let inputNumber;
  try {
    inputNumber = parseFloat(inputValue);
    if (isNaN(inputNumber)) {
      throw new Error("Invalid input: Not a number");
    }
  } catch (error) {
    console.error("Error converting input to number:", error);
    textField.style.borderColor = "red";
    return; 
  }

  let isCorrect = false;
  switch (typeof ans) {
    case "number":
      isCorrect = Math.abs(inputNumber - ans) <= 0.01; 
      break;
    case "string": 
      isCorrect = inputValue.toLowerCase() === ans.toLowerCase();
      break;
    default:
      console.error("Invalid answer type:", typeof ans);
      return; 
  }


  textField.style.borderColor = isCorrect ? "green" : "red";

}
