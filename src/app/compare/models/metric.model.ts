export class Metric {
  constructor(
    public id: number,
    public name: string,
    public designer: string,
    public type: string,
    public unit: string,
    public question: string,
    public about: string,
    public url: string,
    public numOfAnswers: number,
    public numOfCompanies: number
  ) {}
}
