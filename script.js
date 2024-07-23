let URL = "https://latest.currency-api.pages.dev/v1/currencies/inr.json";

let selects = document.querySelectorAll(".dropdown select");

for (let select of selects) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = countryList[code];
    select.append(newOption);
  }
}
