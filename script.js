let availableNumbers = [];
let minVal, maxVal;

function startLottery() {
  const minInput = document.getElementById("min").value;
  const maxInput = document.getElementById("max").value;

  minVal = parseInt(minInput);
  maxVal = parseInt(maxInput);

  if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
    alert("لطفاً یک محدوده معتبر وارد کنید (عدد شروع ≤ عدد پایان).");
    return;
  }

  availableNumbers = [];
  for (let i = minVal; i <= maxVal; i++) {
    availableNumbers.push(i);
  }

  document.getElementById("range-display").textContent = `${minVal} تا ${maxVal}`;
  document.getElementById("setup").classList.remove("active");
  document.getElementById("lottery").classList.add("active");
  document.getElementById("result").textContent = "";
}

function drawNumber() {
  if (availableNumbers.length === 0) {
    document.getElementById("result").textContent = "🎉 همه اعداد قرعه‌کشی شدند!";
    document.getElementById("draw-btn").disabled = true;
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const winner = availableNumbers.splice(randomIndex, 1)[0];
  document.getElementById("result").textContent = winner;

  if (availableNumbers.length === 0) {
    document.getElementById("draw-btn").disabled = true;
    document.getElementById("result").textContent += "\n🎉 همه اعداد تمام شد!";
  }
}

function resetLottery() {
  document.getElementById("lottery").classList.remove("active");
  document.getElementById("setup").classList.add("active");
  document.getElementById("draw-btn").disabled = false;
}
