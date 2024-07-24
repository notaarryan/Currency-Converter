let BASE_URL;
let options = document.querySelectorAll(".dropdown select");
let text = document.querySelector("#exchangeRate");
let btn = document.querySelector("#convert button");
let input = document.querySelector("#convert input");
let amount;
let finalAmount;
let fromCode = "USD";
let toCode = "INR";
let flagUrl;
let exchangeRate;

for (let option of options) {
  for (let code in countryList) {
    let id = option.getAttribute("id");
    let newElement = document.createElement("option");
    newElement.value = code;
    newElement.text = code;
    option.append(newElement);
    if (newElement.value == "USD" && id == "fromSelect") {
      newElement.selected = true;
    } else if (newElement.value == "INR" && id == "toSelect") {
      newElement.selected = true;
    }
  }

  option.addEventListener("change", () => {
    let id = option.getAttribute("id");
    let countryCode = countryList[option.value];
    flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    if (id == "fromSelect") {
      flag = document.querySelector("#fromFlag");
      flag.src = flagUrl;
    } else if (id == "toSelect") {
      flag = document.querySelector("#toFlag");
      flag.src = flagUrl;
    }
  });

  option.addEventListener("change", async () => {
    let id = option.getAttribute("id");
    if (id == "fromSelect") {
      fromCode = option.value;
    } else if (id == "toSelect") {
      toCode = option.value;
    }
    BASE_URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCode.toLowerCase()}.json`;
    let response = await fetch(BASE_URL);
    data = await response.json();
    rates = data[fromCode.toLowerCase()];
    exchangeRate = rates[toCode.toLowerCase()];
    console.log(exchangeRate);
    text.innerText = `1${fromCode} = ${exchangeRate}${toCode}`;
  });
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log(`From: ${fromCode}`);
  console.log(`To: ${toCode}`);
  amount = input.value;
  if (amount < 0 || amount == "") {
    input.value = "";
    amount = 1;
  }
  BASE_URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCode.toLowerCase()}.json`;
  let response = await fetch(BASE_URL);
  data = await response.json();
  rates = data[fromCode.toLowerCase()];
  exchangeRate = rates[toCode.toLowerCase()];
  finalAmount = amount * exchangeRate;
  text.innerText = `${amount}${fromCode} = ${finalAmount}${toCode}`;
});
