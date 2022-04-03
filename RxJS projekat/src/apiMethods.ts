import { from, Observable } from "rxjs";
import { Coffee } from "./models/coffee";
import * as data from "../env";
import { Cockie } from "./models/cockie";
import { Topping } from "./models/topping";

export function getCoffeesObservables(): Observable<Coffee[]> {
  return from(
    fetch(`${data.BASE_URL}/coffees`)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetching data.");
        else return response.json();
      })
      .catch((error) => console.log("Error: " + error))
  );
}

export function getCoffeeObservableByName(name: string): Observable<Coffee[]> {
  return from(
    fetch(`${data.BASE_URL}/coffees?name_like=${name}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetching data.");
        else return response.json();
      })
      .catch((error) => console.log("Error: " + error))
  );
}

export function getCockieObservableByName(name: string): Observable<Cockie> {
  return from(
    fetch(`${data.BASE_URL}/cockies?name=${name}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetching data.");
        else return response.json();
      })
      .catch((error) => console.log("Error: " + error))
  );
}

export function getToppingObservableByName(name: string): Observable<Topping> {
  return from(
    fetch(`${data.BASE_URL}/toppings?name=${name}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetching data.");
        else return response.json();
      })
      .catch((error) => console.log("Error: " + error))
  );
}
