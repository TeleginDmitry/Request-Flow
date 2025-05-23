// export function getHoursBetweenDates(startDate, endDate){
//     let start = Date.parse(startDate);
//     let end = Date.parse(endDate);
//     let diff = end - start;
//     return Math.floor(diff / 1000 / 60 / 60);
// }

// export function getFullCurrentDate(){
//     const date = new Date();
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
// }

export function getFullDateByStr(paramDate) {
  const date = new Date(paramDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

// Отформатировнная строка с временем из бд
export function getFullDateByStrFromDb(date) {
  const originalDateTime = date;
  const dateTime = new Date(originalDateTime);
  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const year = dateTime.getFullYear();
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function getDayMonthDate(date) {
  const dateTime = new Date(date);
  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}`;
}

// export function getCurrentTime(time){
//     const date = time ? time : new Date();
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
// }
