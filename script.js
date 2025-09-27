let availableNumbers = [];
let minVal, maxVal;

const setupStep = document.getElementById('setup');
const lotteryStep = document.getElementById('lottery');
const winnerDisplay = document.getElementById('winner-number');
const drawBtn = document.getElementById('draw-btn');

function startLottery() {
  const minInput = document.getElementById('min').value;
  const maxInput = document.getElementById('max').value;

  minVal = parseInt(minInput);
  maxVal = parseInt(maxInput);

  if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
    alert('لطفاً یک محدوده معتبر وارد کنید (عدد شروع ≤ عدد پایان).');
    return;
  }

  availableNumbers = [];
  for (let i = minVal; i <= maxVal; i++) {
    availableNumbers.push(i);
  }

  document.getElementById('range-display').textContent = `${minVal} تا ${maxVal}`;
  
  // تغییر نمایش مراحل
  setupStep.classList.remove('active');
  lotteryStep.classList.add('active');
  
  // بازنشانی نمایشگر برنده
  winnerDisplay.innerHTML = '🏆';
  winnerDisplay.classList.remove('reveal');
}

function drawNumber() {
  if (availableNumbers.length === 0) {
    winnerDisplay.textContent = 'تمام!';
    drawBtn.disabled = true;
    alert('🎉 همه اعداد قرعه‌کشی شدند!');
    return;
  }

  // حذف انیمیشن قبلی برای اجرای دوباره
  winnerDisplay.classList.remove('reveal');
  
  // این یک ترفند برای اجرای مجدد انیمیشن CSS است
  void winnerDisplay.offsetWidth;

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const winner = availableNumbers.splice(randomIndex, 1)[0];
  
  winnerDisplay.textContent = winner;
  
  // اضافه کردن کلاس انیمیشن برای نمایش عدد
  winnerDisplay.classList.add('reveal');
  
  if (availableNumbers.length === 0) {
    drawBtn.disabled = true;
  }
}

function resetLottery() {
  lotteryStep.classList.remove('active');
  setupStep.classList.add('active');
  drawBtn.disabled = false;
  
  // بازنشانی مقادیر ورودی
  document.getElementById('min').value = '1';
  document.getElementById('max').value = '100';
}
