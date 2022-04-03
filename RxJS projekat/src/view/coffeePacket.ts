import { from, merge } from "rxjs";

const coffeePacketsContainer = document.getElementById("coffee-packets");
const coffeePacketBoom =  from(["AFFOGATO","CAFFÈ MOCHA","CAPPUCCINO","CAFÈ AU LAIT"]);
const coffeePacketBomb = from(["COLD BREW COFFEE", "DOUBLE ESPRESSO", "ESPRESSO CON PANNA"]);
export function mergeCoffeePackets() {
  merge(coffeePacketBomb, coffeePacketBoom)
  .subscribe(c => createRadioButtons(c));
  createButtonOrder();
}

export function createRadioButtons(coffee: string) {
  let divRb = document.createElement("div");
  let option = document.createElement("input");
  option.type = "radio";
  option.name = "group";
  option.value = coffee;

  let label = document.createElement("label");
  label.innerHTML = coffee;
  label.className = "coffeLabel";

  divRb.appendChild(option);
  divRb.appendChild(label);
  coffeePacketsContainer.appendChild(divRb);
}

export function createButtonOrder() {
  let orderBtn = document.createElement("button");
  orderBtn.innerHTML = "Order";
  orderBtn.className = "orderButton";

  orderBtn.addEventListener("click", function () {
    alert(`You can order these packets.\nFor price you can look at the coffee shop.`);
  });
  coffeePacketsContainer.appendChild(orderBtn);
}