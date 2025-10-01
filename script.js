const LOTTERY_DATA = [
  {
    title: "پایه ششم - کمیته امداد امام خمینی (ره)",
    prizes: [ { amount: "30 میلیون تومان", winner: null }, { amount: "15 میلیون تومان", winner: null } ]
  },
  {
    title: "پایه نهم - کمیته امداد امام خمینی (ره)",
    prizes: [ { amount: "30 میلیون تومان", winner: null }, { amount: "15 میلیون تومان", winner: null }, { amount: "5 میلیون تومان", winner: null } ]
  },
  {
    title: "پایه نهم - بنیاد علوی",
    prizes: [ { amount: "30 میلیون تومان", winner: null }, { amount: "15 میلیون تومان", winner: null }, { amount: "5 میلیون تومان", winner: null } ]
  }
];

let currentLotteryIndex = -1;
let currentPrizeIndex = -1;

// دسترسی به المان‌های HTML
const selectionStep = document.getElementById('lottery-selection');
const lotteryPage = document.getElementById('lottery-page');
const prizeListContainer = document.getElementById('prize-list');
const modalOverlay = document.getElementById('modal-overlay');

function selectLottery(index) {
  currentLotteryIndex = index;
  const selectedLottery = LOTTERY_DATA[index];
  document.getElementById('lottery-title').textContent = selectedLottery.title;
  
  renderPrizeList();
  
  selectionStep.classList.remove('active');
  lotteryPage.classList.add('active');
}

function renderPrizeList() {
  prizeListContainer.innerHTML = '';
  const prizes = LOTTERY_DATA[currentLotteryIndex].prizes;

  prizes.forEach((prize, index) => {
    const prizeItem = document.createElement('div');
    prizeItem.className = 'prize-item';
    
    const prizeInfo = document.createElement('div');
    prizeInfo.className = 'prize-info';
    
    const prizeAmount = document.createElement('div');
    prizeAmount.className = 'prize-amount';
    prizeAmount.textContent = prize.amount;
    prizeInfo.appendChild(prizeAmount);

    let actionElement;
    if (prize.winner) {
      actionElement = document.createElement('div');
      actionElement.className = 'prize-winner';
      actionElement.textContent = prize.winner;
    } else {
      actionElement = document.createElement('button');
      actionElement.className = 'btn btn-draw-prize';
      actionElement.innerHTML = `<i class="fa-solid fa-dice"></i> قرعه‌کشی`;
      actionElement.onclick = () => openDrawModal(index);
    }

    prizeItem.appendChild(prizeInfo);
    prizeItem.appendChild(actionElement);
    prizeListContainer.appendChild(prizeItem);
  });
}

function openDrawModal(prizeIndex) {
  currentPrizeIndex = prizeIndex;
  const prize = LOTTERY_DATA[currentLotteryIndex].prizes[prizeIndex];
  
  document.getElementById('modal-title').textContent = `قرعه‌کشی برای جایزه: ${prize.amount}`;
  document.getElementById('modal-min').value = '1';
  document.getElementById('modal-max').value = '';
  document.getElementById('modal-winner-display').textContent = '';
  
  modalOverlay.classList.remove('modal-hidden');
}

function closeModal() {
  modalOverlay.classList.add('modal-hidden');
}

function confirmAndDraw() {
  const minInput = document.getElementById('modal-min').value;
  const maxInput = document.getElementById('modal-max').value;
  const minVal = parseInt(minInput);
  const maxVal = parseInt(maxInput);

  if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
    alert('لطفاً یک محدوده معتبر وارد کنید.');
    return;
  }

  // ایجاد لیست اعداد فقط برای این قرعه کشی
  const numbers = [];
  for (let i = minVal; i <= maxVal; i++) {
    numbers.push(i);
  }
  
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const winner = numbers[randomIndex];
  
  // نمایش برنده در پاپ آپ
  document.getElementById('modal-winner-display').textContent = `🎉 برنده: ${winner} 🎉`;
  
  // ذخیره برنده و به‌روزرسانی لیست اصلی
  LOTTERY_DATA[currentLotteryIndex].prizes[currentPrizeIndex].winner = winner;
  
  // با تاخیر پاپ آپ را می‌بندیم تا کاربر نتیجه را ببیند
  setTimeout(() => {
    closeModal();
    renderPrizeList(); // رفرش لیست جوایز برای نمایش برنده
  }, 2500);
}

function goHome() {
  // ریست کردن داده‌ها برای اطمینان
  LOTTERY_DATA.forEach(lottery => {
    lottery.prizes.forEach(prize => prize.winner = null);
  });

  lotteryPage.classList.remove('active');
  selectionStep.classList.add('active');
}
