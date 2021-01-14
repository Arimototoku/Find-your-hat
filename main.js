const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._coordinates = [0, 0];
    this._dimensions = [3, 3];
  }
  set field(updateField) {
    this._field = updateField;
  }
  get field() {
    return this._field;
  }
  set coordinates(newCoordinates) {
    this._coordinates = newCoordinates;
  }
  get coordinates() {
    return this._coordinates;
  }
  set dimensions(newDimensions) {
    this._dimensions = newDimensions;
  }
  get dimensions() {
    return this._dimensions;
  }
  print() {
    this.field.forEach((element) => {
      console.log(element.join(""));
    });
  }
  move(step) {
    if (step === "U" || step === "u") {
      this.coordinates[0]--;
      if (
        !this.checkOutOfBounds() &&
        !this.checkFallDownAHole() &&
        !this.checkFoundAHat()
      ) {
        this.changeField();
      }
    } else if (step === "D" || step === "d") {
      this.coordinates[0]++;
      if (
        !this.checkOutOfBounds() &&
        !this.checkFallDownAHole() &&
        !this.checkFoundAHat()
      ) {
        this.changeField();
      }
    } else if (step === "L" || step === "l") {
      this.coordinates[1]--;
      if (
        !this.checkOutOfBounds() &&
        !this.checkFallDownAHole() &&
        !this.checkFoundAHat()
      ) {
        this.changeField();
      }
    } else if (step === "R" || step === "r") {
      this.coordinates[1]++;
      if (
        !this.checkOutOfBounds() &&
        !this.checkFallDownAHole() &&
        !this.checkFoundAHat()
      ) {
        this.changeField();
      }
    }
  }
  changeField() {
    this.checkFallDownAHole();
    this.field[this.coordinates[0]][this.coordinates[1]] = pathCharacter;
  }
  checkOutOfBounds() {
    return (
      this.coordinates[0] >= this.dimensions[0] ||
      this.coordinates[1] >= this.dimensions[1] ||
      this.coordinates[0] < 0 ||
      this.coordinates[1] < 0
    );
  }
  checkFallDownAHole() {
    return this._field[this._coordinates[0]][this._coordinates[1]] === hole;
  }
  checkFoundAHat() {
    return this._field[this._coordinates[0]][this._coordinates[1]] === hat;
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
console.log("Hi, there. Let's fins your hat. Enter U,D,L,R to move.");
while (true) {
  myField.print();
  const step = prompt("Which way?");
  myField.move(step);
  if (myField.checkOutOfBounds()) {
    console.log("You are out off the field. Game Over!");
    return;
  }
  if (myField.checkFallDownAHole()) {
    console.log("You fell down a hole! Game over!");
    return;
  }
  if (myField.checkFoundAHat()) {
    console.log("Congratulations! You found a hat! You are a winner!");
    return;
  }
  //   if (myField.checkFallDownAHole()) {
  //     console.log("You fell down a hole! Game over!");
  //     return;
  //   }
  //   console.log(myField.coordinates.join("*"));
  //   myField.print();
}
