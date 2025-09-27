// === تغییر: ساختار داده برای مدیریت قرعه‌کشی‌ها ===
const LOTTERY_DATA = [
  {
    title: "پایه ششم - کمیته امداد امام خمینی (ره)",
    prizes: [
      { amount: "30 میلیون تومان", winner: null },
      { amount: "15 میلیون تومان", winner: null }
    ]
  },
  {
    title: "پایه نهم - کمیته امداد امام خمینی (ره)",
    prizes: [
      { amount: "30 میلیون تومان", winner: null },
      { amount: "15 میلیون تومان", winner: null },
      { amount: "5 میلیون تومان", winner: null }
    ]
  },
  {
    title: "پایه نهم - بنیاد علوی",
    prizes: [
      { amount: "30 میلیون تومان", winner: null },
      { amount: "15 میلیون تومان", winner: null },
      { amount: "5 میلیون تومان", winner: null }
    ]
  }
];

// متغیرهای سراسری برای مدیریت وضعیت برنامه
let availableNumbers = [];
let currentLotteryIndex = -1;
let prizesToDraw = [];

// دسترسی به المان‌های HTML
const selectionStep = document.getElementById('lottery-selection');
const setupStep = document.getElementById('setup');
const lotteryStep = document.getElementById('lottery');
const winnerDisplay = document.getElementById('winner-number');
const drawBtn = document.getElementById('draw-btn');
const prizeListContainer = document.getElementById('prize-list');

// === تغییر: تابع جدید برای انتخاب نوع قرعه‌کشی ===
function selectLottery(index) {
  currentLotteryIndex = index;
  const selectedLottery = LOTTERY_DATA[index];
  
  // کپی کردن جوایز برای جلوگیری از تغییر داده اصلی
  prizesToDraw = JSON.parse(JSON.stringify(selectedLottery.prizes)); 
  
  document.getElementById('setup-title').textContent = selectedLottery.title;
  
  selectionStep.classList.remove('active');
  setupStep.classList.add('active');
}

function startLottery() {
  const minInput = document.getElementById('min').value;
  const maxInput = document.getElementById('max').value;
  const minVal = parseInt(minInput);
  const maxVal = parseInt(maxInput);

  if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
    alert('لطفاً یک محدوده معتبر وارد کنید.');
    return;
  }

  availableNumbers = [];
  for (let i = minVal; i <= maxVal; i++) {
    availableNumbers.push(i);
  }

  const selectedLottery = LOTTERY_DATA[currentLotteryIndex];
  document.getElementById('lottery-title').textContent = selectedLottery.title;
  document.getElementById('range-display').textContent = `${minVal} تا ${maxVal}`;
  
  setupStep.classList.remove('active');
  lotteryStep.classList.add('active');
  
  winnerDisplay.innerHTML = '🏆';
  renderPrizeList();
}

// === تغییر: تابع جدید برای نمایش لیست جوایز ===
function renderPrizeList() {
  prizeListContainer.innerHTML = ''; // پاک کردن لیست قبلی
  prizesToDraw.forEach(prize => {
    const prizeItem = document.createElement('div');
    prizeItem.className = 'prize-item';
    
    let winnerHTML = `<span class="prize-status">در انتظار قرعه‌کشی...</span>`;
    if (prize.winner) {
      prizeItem.classList.add('claimed');
      winnerHTML = `<span class="prize-winner">${prize.winner}</span>`;
    }

    prizeItem.innerHTML = `
      <span class="prize-amount">${prize.amount}</span>
      ${winnerHTML}
    `;
    prizeListContainer.appendChild(prizeItem);
  });
}

function drawNumber() {
  const remainingPrizes = prizesToDraw.filter(p => p.winner === null);
  if (remainingPrizes.length === 0) {
    winnerDisplay.textContent = 'پایان!';
    alert('🎉 تمام جوایز این بخش اهدا شد!');
    drawBtn.disabled = true;
    return;
  }

  if (availableNumbers.length === 0) {
    alert('خطا: هیچ شماره‌ای برای قرعه‌کشی باقی نمانده است!');
    return;
  }
  
  winnerDisplay.classList.remove('reveal');
  void winnerDisplay.offsetWidth; // ترفند برای اجرای مجدد انیمیشن

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const winner = availableNumbers.splice(randomIndex, 1)[0];
  
  winnerDisplay.textContent = winner;
  winnerDisplay.classList.add('reveal');
  
  // اختصاص برنده به اولین جایزه باقی‌مانده
  const nextPrize = prizesToDraw.find(p => p.winner === null);
  nextPrize.winner = winner;
  
  // به‌روزرسانی لیست جوایز برای نمایش برنده
  setTimeout(renderPrizeList, 600); // با کمی تاخیر برای دیدن انیمیشن

  if (prizesToDraw.every(p => p.winner !== null)) {
      drawBtn.textContent = "قرعه کشی تمام شد";
      drawBtn.disabled = true;
  }
}

// === تغییر: تابع جدید برای بازگشت به منوی اصلی ===
function goHome() {
  // ریست کردن همه چیز
  availableNumbers = [];
  currentLotteryIndex = -1;
  prizesToDraw = [];
  
  document.getElementById('min').value = '1';
  document.getElementById('max').value = '';
  drawBtn.disabled = false;
  drawBtn.innerHTML = '<i class="fa-solid fa-dice-d6"></i> انتخاب برنده بعدی!';

  lotteryStep.classList.remove('active');
  setupStep.classList.remove('active');
  selectionStep.classList.add('active');
}
