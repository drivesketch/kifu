// 初期設定
const board = document.getElementById("board");
const questionElem = document.getElementById("question");
const correctCountElem = document.getElementById("correct-count");

// 列（右から左）と行（上から下）を設定
const cols = ["9", "8", "7", "6", "5", "4", "3", "2", "1"]; // 縦方向（右から左）
const rows = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]; // 横方向（上から下）
let currentAnswer = null;
let correctCount = 0;

// マス目を作成
rows.forEach((rowLabel, rowIndex) => {
  cols.forEach((colLabel, colIndex) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = rowLabel; // 行（一～九）
    cell.dataset.col = colLabel; // 列（1～9）
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
});

// ランダムな符号を生成
function generateRandomQuestion() {
  const randomRow = rows[Math.floor(Math.random() * rows.length)]; // 一～九
  const randomCol = cols[Math.floor(Math.random() * cols.length)]; // 1～9
  return `${randomCol}${randomRow}`; // 例: "7六"
}

// 新しい問題を出題
function setNewQuestion() {
  currentAnswer = generateRandomQuestion();
  questionElem.textContent = `符号: ${currentAnswer}`;
}

// マス目がクリックされたときの処理
function handleCellClick(event) {
  const cell = event.target;
  const clickedRow = cell.dataset.row; // 行（一～九）
  const clickedCol = cell.dataset.col; // 列（1～9）
  const clickedPosition = `${clickedCol}${clickedRow}`; // 例: "7六"

  if (clickedPosition === currentAnswer) {
    cell.classList.add("correct");
    correctCount++;
    correctCountElem.textContent = correctCount;
    setTimeout(() => {
      resetBoard();
      setNewQuestion();
    }, 500); // 緑色を見せるために少し遅延
  } else {
    cell.classList.add("wrong");
    setTimeout(() => {
      cell.classList.remove("wrong");
    }, 500);
  }
}

// ボードをリセット
function resetBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("correct"));
}

// ゲーム開始
setNewQuestion();
