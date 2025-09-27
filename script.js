let availableNumbers = [];
let minVal, maxVal;

function startLottery() {
  // خطا ۱ و ۲: باید ID ها را به صورت رشته (داخل کوتیشن) به getElementById بدهیم.
  const minInput = document.getElementById('min').value;
  const maxInput = document.getElementById('max').value;

  minVal = parseInt(minInput);
  maxVal = parseInt(maxInput);

  // خطا ۳: اپراتورهای منطقی (||) بین شرط‌ها جا افتاده بود.
  if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
    // خطا ۴: پیام alert باید داخل کوتیشن باشد.
    alert('لطفاً یک محدوده معتبر وارد کنید (عدد شروع ≤ عدد پایان).');
    return;
  }

  availableNumbers = [];
  // خطا ۵: شرط حلقه for اشتباه بود. باید از <= استفاده می‌شد.
  for (let i = minVal; i <= maxVal; i++) {
    availableNumbers.push(i);
  }

  // تکرار خطا ۱: استفاده از کوتیشن برای ID ها
  document.getElementById('range-display').textContent = `${minVal} تا ${maxVal}`;
  document.getElementById('setup').classList.remove('active');
  document.getElementById('lottery').classList.add('active');
  document.getElementById('result').textContent = ''; // باید یک رشته خالی باشد
}

function drawNumber() {
  if (availableNumbers.length === 0) {
    document.getElementById('result').textContent = '🎉 همه اعداد قرعه‌کشی شدند!';
    document.getElementById('draw-btn').disabled = true;
    return;
  }

  // خطا ۶: علامت ضرب (*) بین Math.random() و طول آرایه جا افتاده بود.
  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const winner = availableNumbers.splice(randomIndex, 1)[0];
  document.getElementById('result').textContent = winner;

  if (availableNumbers.length === 0) {
    document.getElementById('draw-btn').disabled = true;
    // خطا ۷: برای رفتن به خط بعد باید از \n استفاده کرد.
    document.getElementById('result').textContent += '\n🎉 همه اعداد تمام شد!';
  }
}

function resetLottery() {
  // تکرار خطا ۱: استفاده از کوتیشن برای ID ها
  document.getElementById('lottery').classList.remove('active');
  document.getElementById('setup').classList.add('active');
  document.getElementById('draw-btn').disabled = false;
}
