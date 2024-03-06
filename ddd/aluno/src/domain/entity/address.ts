export default class Address {
  _street: string;
  _number: number;
  _zipcode: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zip;
    this._city = city;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Invalid address");
    }

    if (this._zipcode.length === 0) {
      throw new Error("Invalid zip");
    }
    if (this._city.length === 0) {
      throw new Error("Invalid city");
    }
    if (this._number <= 0) {
      throw new Error("Invalid number");
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zipcode}, ${this._city}`;
  }
}
