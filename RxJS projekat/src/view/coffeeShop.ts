import {
  debounce,
  debounceTime,
  delay,
  filter,
  from,
  fromEvent,
  map,
  merge,
  repeat,
  switchMap,
} from "rxjs";
import {
  getCoffeeObservableByName,
  getCoffeesObservables,
} from "../apiMethods";
import { Coffee } from "../models/coffee";

const coffeeShopContainer = document.getElementById("coffee-shop");
const coffeeCartContainer = document.getElementById("coffee-cart");
let i = 0;

export function createCoffeeShopView() {
  let coffees = getCoffeesObservables()
    .pipe(
      map((c) => c[i++]),
      repeat(20)
    )
    .subscribe((coffee: Coffee) =>
      createCoffeeShopCard(coffeeShopContainer, coffee)
    );
}

export function createCoffeeShopCard(host: HTMLElement, coffee: Coffee) {
  if (!host) throw new Error("Host doesn't exist.");
  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  host.appendChild(cardContainer);

  const imageDiv = document.createElement("div");
  imageDiv.className = "imageDiv";
  cardContainer.appendChild(imageDiv);

  const image = document.createElement("img");
  image.className = "imageForCoffee";
  image.src = coffee.image;
  imageDiv.appendChild(image);

  const divCardContent = document.createElement("div");
  divCardContent.className = "divCardContent";
  cardContainer.appendChild(divCardContent);

  const headerName = document.createElement("h2");
  headerName.className = "name";
  headerName.innerHTML = coffee.name;
  divCardContent.appendChild(headerName);

  const pDescription = document.createElement("div");
  pDescription.className = "paragraph";
  pDescription.innerHTML = coffee.description;
  divCardContent.appendChild(pDescription);

  const divCP = document.createElement("div");
  divCP.className = "divCP";
  divCardContent.appendChild(divCP);

  const divCoffein = document.createElement("div");
  divCoffein.className = "divCoffein";
  divCoffein.innerHTML = coffee.coffein.toString() + "% ☕";
  divCP.appendChild(divCoffein);

  const divPrice = document.createElement("div");
  divPrice.className = "divPrice";
  divPrice.innerHTML = "💲" + coffee.price.toString();
  divCP.appendChild(divPrice);

  const divButton = document.createElement("div");
  divButton.className = "divButton";
  divCardContent.appendChild(divButton);

  const button = document.createElement("button");
  button.className = "button";
  button.innerHTML = "ADD TO CART";
  divButton.appendChild(button);
  button.onclick = (ev) => {
    const n = cardContainer.querySelector(".name").innerHTML;
    const p = divCardContent.querySelector(".divPrice").innerHTML;
    actionAddToCart(n, p);
  };
}
export function actionAddToCart(name: string, price: string) {
  const cartItem = document.createElement("div");
  cartItem.className = "cartItem";
  const total = document.getElementById("total");

  if (
    coffeeCartContainer.innerHTML.trim() ==
    "<h3>Your cart is empty. Add items :)</h3>"
  ) {
    coffeeCartContainer.innerHTML = "";
    coffeeCartContainer.appendChild(cartItem);
    const divCartText = document.createElement("div");
    divCartText.className = "divCartText";
    const divCartPrice = document.createElement("div");
    divCartPrice.className = "divCartPrice";
    divCartText.innerHTML = name;
    divCartPrice.innerHTML = price;
    cartItem.appendChild(divCartText);
    cartItem.appendChild(divCartPrice);
    total.innerHTML = "Total: " + price;
  } else {
    coffeeCartContainer.appendChild(cartItem);
    const divCartText = document.createElement("div");
    divCartText.className = "divCartText";
    const divCartPrice = document.createElement("div");
    divCartPrice.className = "divCartPrice";
    divCartText.innerHTML = name;
    divCartPrice.innerHTML = price;
    cartItem.appendChild(divCartText);
    cartItem.appendChild(divCartPrice);
    let newPriceString = total.innerHTML;
    let newPriceNumber = parseInt(newPriceString.slice(9).trim());
    newPriceNumber += parseInt(price.slice(2));
    total.innerHTML = "Total: " + "💲" + newPriceNumber;
  }
}
export function createCoffeeSearchBox() {
  const container = document.getElementById("search-box");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search..";
  input.className = "searchBox";
  container.appendChild(input);
  input.oninput = (ev) => {
    coffeeShopContainer.innerHTML = "";
  };
  return fromEvent(input, "input")
    .pipe(
      debounceTime(600),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((t) => t.length >= 3),
      map((t) => t.toUpperCase()),
      switchMap((t) => getCoffeeObservableByName(t))
    )
    .subscribe((x) => drawSearchedCoffees(x));
}
export function drawSearchedCoffees(coffees: Coffee[]) {
  coffees.map((c) => createCoffeeShopCard(coffeeShopContainer, c));
}
