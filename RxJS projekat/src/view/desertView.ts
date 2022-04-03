import { delay, of, zip } from "rxjs";
import {
  getCockieObservableByName,
  getCoffeeObservableByName,
  getToppingObservableByName,
} from "../apiMethods";

const note = of("Your desert on meni today:");
const cockie = getCockieObservableByName("Jaffa");
const topping = getToppingObservableByName("cream");
const coffee = getCoffeeObservableByName("AFFOGATO");
export function createFullDesert() {
  const desert = zip(
    note,
    cockie.pipe(delay(1000)),
    topping.pipe(delay(3000)),
    coffee.pipe(delay(4000))
  );
  const subscribe = desert.subscribe((s) => console.log(s));
  return subscribe;
}
