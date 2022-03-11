export type booking = {
  id: string,
  space: string,
  date: Date,
  schedule: {end:string, start:string}
}