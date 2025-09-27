@import url('https://fonts.googleapis.com/css2?family=Lalezar&display=swap');

body {
  font-family: 'Vazirmatn', sans-serif;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
}

.container {
  /* افکت شیشه مات (Glassmorphism) */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px 40px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 550px;
  width: 90%;
  transition: all 0.5s ease-in-out;
}

h1 {
  margin-top: 0;
  margin-bottom: 25px;
  color: #ffffff;
  font-family: 'Lalezar', cursive; /* فونت جذاب برای عنوان */
  font-size: 28px;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
}

h1 i {
  margin-left: 10px;
  color: #FFD700; /* رنگ طلایی برای آیکون */
}

.step {
  display: none;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.step.active {
  display: block;
  opacity: 1;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 16px;
  direction: ltr;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  box-sizing: border-box; /* برای محاسبه صحیح عرض */
}
input::placeholder {
  color: #ccc;
}

button {
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 18px;
  border-radius: 15px;
  cursor: pointer;
  margin: 15px 5px 5px 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  font-family: 'Vazirmatn', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* فاصله بین آیکون و متن */
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(46, 229, 157, 0.4);
}

button:active {
  transform: translateY(-1px) scale(1.02);
}

#result {
  margin-top: 25px;
  font-weight: bold;
  color: #38ef7d;
  min-height: 100px; /* ارتفاع بیشتر برای نمایش انیمیشن */
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 20px;
}

#winner-number {
  font-size: 72px;
  font-family: 'Lalezar', cursive;
  text-shadow: 0 0 20px rgba(56, 239, 125, 0.8);
}

#reset-btn {
  background: linear-gradient(135deg, #6c757d, #343a40);
}
#reset-btn:hover {
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
}

.button-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* برای نمایش بهتر در موبایل */
}
