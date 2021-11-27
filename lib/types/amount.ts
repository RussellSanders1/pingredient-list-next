import Measurement from "./measurement";

export interface AmountI {
  value: number;
  measurement: Measurement
}

export default class Amount implements AmountI {
  public value: number;

  public measurement: Measurement;

  constructor(
    value: number = 0,
    measurement: Measurement = Measurement.scalar,
  ) {
    this.value = value;
    this.measurement = measurement;
  }
}
