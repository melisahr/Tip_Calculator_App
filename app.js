const bill = document.getElementById("bill");
const people = document.getElementById("people");
const custom = document.getElementById("custom");
const tipTotal = document.querySelectorAll(".top_right p");
const totalPerson = document.querySelectorAll(".bot_right p");
const reset = document.getElementById("reset_btn");
const tipButton = document.querySelectorAll("button");

tipButton.forEach(button => {
  button.addEventListener("click", (e) => {
    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (bill.value === "") return;
    if (people.value === "") {
      people.classList.add("error");
      return;
    }
    people.classList.remove("error");

    calculateTip(
      parseFloat(bill.value),
      parseInt(tipValue),
      parseInt(people.value)
    );
  });
});

custom.addEventListener("input", () => {
  if (bill.value === "") {
    resetAll();
    return;
  }
  if (people.value === "") {
    people.classList.add("error");
    return;
  }

  people.classList.remove("error");

  calculateTip(
    parseFloat(bill.value),
    parseFloat(custom.value),
    parseInt(people.value)
  );
});

function calculateTip(bill, tipPercentage, people) {
  let tipAmount = (bill * (tipPercentage / 100)) / people;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * people + bill) / people;
  totalAmount = totalAmount.toFixed(2);

  tipTotal.forEach((element) => {
    element.innerText = `$${tip}`;
  });
  totalPerson.forEach((element) => {
    element.innerHTML = `$${totalAmount}`;
  });
}

reset.addEventListener("click", resetAll);

function resetAll() {
  tipTotal.forEach((element) => {
    element.innerHTML = "$0.00";
  });
  totalPerson.forEach((element) => {
    element.innerHTML = "$0.00";
  });
  bill.value = "";
  people.value = "";
  custom.value = "";
  people.classList.remove("error");
}

