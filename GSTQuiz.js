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