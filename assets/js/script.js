// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var hour9 = localStorage.getItem("hour-9");
  var hour10 = localStorage.getItem("hour-10");
  var hour11 = localStorage.getItem("hour-11");
  var hour12 = localStorage.getItem("hour-12");
  var hour13 = localStorage.getItem("hour-13");
  var hour14 = localStorage.getItem("hour-14");
  var hour15 = localStorage.getItem("hour-15");
  var hour16 = localStorage.getItem("hour-16");
  var hour17 = localStorage.getItem("hour-17");
  var storageArr = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17];
  var descriptionArr = document.querySelectorAll(".description");
  var confirmation = document.getElementById("confirm");
  for (var i = 0; i < storageArr.length; i++) { //set all of the elements in one go; only wasting five lines instead of nine
    descriptionArr[i].textContent = storageArr[i];
  }
  
  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  var currentDay = document.getElementById('currentDay');
  currentDay.textContent = today.format("dddd, MMMM DD, YYYY - h:mm:ss A")
  setInterval(function() {
    var everySecond = dayjs();
    var updateEverySecond = everySecond.format("dddd, MMMM DD, YYYY - h:mm:ss A")
    currentDay.textContent = updateEverySecond;
  }, 200); //updates every 200 milliseconds for maximum accuracy

  var hourBlocks = document.querySelectorAll(".hour");
  console.log(hourBlocks);
  //for loop looks for the current time, sets that block's class to present, then sets class of all previous blocks to past
  for (var i = 0; i < hourBlocks.length; i++) {
    if (hourBlocks[i].textContent === today.format("hA")) {
      hourBlocks[i].parentElement.classList.remove("future");
      hourBlocks[i].parentElement.classList.add("present");
      for (var j = 0; j < i; j++) {
        hourBlocks[j].parentElement.classList.remove("future");
        hourBlocks[j].parentElement.classList.add("past");
      }
    }
  }
  //Sets all blocks to past if the time is past 5PM
  if (today.format("HH") > 17) {
    for (var i = 0; i < hourBlocks.length; i++) {
      hourBlocks[i].parentElement.classList.remove("future");
      hourBlocks[i].parentElement.classList.add("past");
    }
  }
  
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function saveToStorage(event) {
    var textToStore = event.target.previousElementSibling.value;
    if (textToStore === null) {
      return;
    }
    localStorage.setItem(event.target.parentElement.id, textToStore);
    confirmation.textContent = "Event added to local storage!";
    setInterval(function() {
      confirmation.textContent = " ";
    }, 1000);
  }
  
    
  $(".saveBtn").on("click",
    saveToStorage 
    );  //This spits out an error occasionally, I don't know why; just keep clicking and it will eventually work

  
});
