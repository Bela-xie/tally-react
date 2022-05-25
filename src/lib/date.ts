let Years:number[] = [];
let Months:number[] = [];
const currentYear = new Date().getFullYear();
for (let i = 1900; i <= currentYear; i++) {
  Years.push(i);
}
for (let i = 1; i <= 12; i++) {
  Months.push(i);
}

export {Years,Months}