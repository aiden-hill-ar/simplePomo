const doc = document;

const timer = doc.querySelector(".timer p");
const startPauseButton = doc.querySelector("button.start-pause");

String.prototype.replaceAt = function(replacement, start, end) {
   if (end === undefined) {
      return this.substring(0, start) + replacement;
   } else {
      return this.substring(0, start) + replacement + this.substring(end);
   }
};

function countDownMinute() {
   // stands for "Index of Semicolon"
   const iSemi = timer.innerHTML.indexOf(":");
   const ones = timer.innerText.slice(1, iSemi);
   if (ones === "0") {
      const prevTen = timer.innerText.slice(0, 1);
      timer.innerText = timer.innerText.replaceAt(`${prevTen - 1}9`, 0, iSemi);
   } else {
      const prevOne = timer.innerText.slice(1, iSemi);
      timer.innerText = timer.innerText.replaceAt(`${prevOne - 1}`, 1, iSemi);
   };
};

function countDownSeconds() {
   // stands for "Index of Semicolon"
   const iSemi = timer.innerHTML.indexOf(":");
   const tens = timer.innerText.slice(iSemi + 1, -1)
   const ones = timer.innerText.slice(iSemi + 2);
   if (tens === "0" && ones === "0") {
      countDownMinute();
      timer.innerText = timer.innerText.replaceAt("59", iSemi + 1);
   } else if (ones === "0") {
      const prevTen = timer.innerText.slice(iSemi + 1, -1);
      timer.innerText = timer.innerText.replaceAt(`${prevTen - 1}9`, iSemi + 1);
   } else {
      const prevOne = timer.innerText.slice(-1);
      timer.innerText = timer.innerText.replaceAt(`${prevOne - 1}`, iSemi + 2);
   };
};

function countDown(ms, onTick) {
   const start = performance.now();
   let expected = start + ms;
   let id;

   function tick() {
      const now = performance.now();
      onTick(now - start);
      expected += ms;
      id = setTimeout(tick, Math.max(0, expected - now));
   };

   id = setTimeout(tick, ms);
   return () => clearTimeout(id);
};

const onTick = countDownSeconds; 
let stop;

startPauseButton.addEventListener("click", e => {
   const target = e.target.closest("button");
   target.classList.toggle("started");
   if (target.classList.contains("started")) {
      target.querySelector("span").innerText = "Pause";
      stop = countDown(1000, onTick);
   } else {
      target.querySelector("span").innerText = "Start";
      stop();
   }
});