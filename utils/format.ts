export function formatDate(date: Date) {
  date.setHours(0, 0, 0, 0)
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}

function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0')
}
