// script.js

// 初期設定
const board = document.getElementById("board");
const questionElem = document.getElementById("question");
const correctCountElem = document.getElementById("correct-count");

// 列（右から左）と行（上から下）を設定
const cols = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];
const rows = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

// 将棋の初期配置
const pieceData = {
  "9一": { piece: "香", owner: "enemy" },
  "8一": { piece: "桂", owner: "enemy" },
  "7一": { piece: "銀", owner: "enemy" },
  "6一": { piece: "金", owner: "enemy" },
  "5一": { piece: "王", owner: "enemy" },
  "4一": { piece: "金", owner: "enemy" },
  "3一": { piece: "銀", owner: "enemy" },
  "2一": { piece: "桂", owner: "enemy" },
  "1一": { piece: "香", owner: "enemy" },
  "2二": { piece: "角", owner: "enemy" },
  "8二": { piece: "飛", owner: "enemy" },
  "9三": { piece: "歩", owner: "enemy" },
  "8三": { piece: "歩", owner: "enemy" },
  "7三": { piece: "歩", owner: "enemy" },
  "6三": { piece: "歩", owner: "enemy" },
  "5三": { piece: "歩", owner: "enemy" },
  "4三": { piece: "歩", owner: "enemy" },
  "3三": { piece: "歩", owner: "enemy" },
  "2三": { piece: "歩", owner: "enemy" },
  "1三": { piece: "歩", owner: "enemy" },
  "9七": { piece: "歩", owner: "self" },
  "8七": { piece: "歩", owner: "self" },
  "7七": { piece: "歩", owner: "self" },
  "6七": { piece: "歩", owner: "self" },
  "5七": { piece: "歩", owner: "self" },
  "4七": { piece: "歩", owner: "self" },
  "3七": { piece: "歩", owner: "self" },
  "2七": { piece: "歩", owner: "self" },
  "1七": { piece: "歩", owner: "self" },
  "2八": { piece: "飛", owner: "self" },
  "8八": { piece: "角", owner: "self" },
  "9九": { piece: "香", owner: "self" },
  "8九": { piece: "桂", owner: "self" },
  "7九": { piece: "銀", owner: "self" },
  "6九": { piece: "金", owner: "self" },
  "5九": { piece: "玉", owner: "self" },
  "4九": { piece: "金", owner: "self" },
  "3九": { piece: "銀", owner: "self" },
  "2九": { piece: "桂", owner: "self" },
  "1九": { piece: "香", owner: "self" },
};

// ゲームの状態
let currentAnswer = null;
let correctCount = 0;

// ボードを作成して駒を配置
rows.forEach((rowLabel) => {
  cols.forEach((colLabel) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    const position = `${colLabel}${rowLabel}`; // 符号形式 (例: "5一")

    // 駒が存在する場合は挿入
    if (pieceData[position]) {
      const pieceInfo = pieceData[position];
      const piece = document.createElement("span");
      piece.className = "piece";
      piece.textContent = pieceInfo.piece; // 駒の文字

      // 敵駒の場合は回転クラスを追加
      if (pieceInfo.owner === "enemy") {
        piece.classList.add("enemy-piece");
      }

      cell.appendChild(piece);
    }

    cell.dataset.row = rowLabel;
    cell.dataset.col = colLabel;
    cell.addEventListener("click", handleCellClick); // マスのクリックイベント
    board.appendChild(cell);
  });
});

// ランダムな駒の符号を生成
function generateRandomQuestion() {
  const positions = Object.keys(pieceData); // 駒のあるマスを取得
  const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  return randomPosition; // 例: "7六"
}

// 新しい問題を出題
function setNewQuestion() {
  currentAnswer = generateRandomQuestion();
  questionElem.textContent = `符号: ${currentAnswer}`;
}

// マス目がクリックされたときの処理
function handleCellClick(event) {
  const cell = event.target.closest(".cell");
  if (!cell) return;

  const clickedRow = cell.dataset.row; // 行（一～九）
  const clickedCol = cell.dataset.col; // 列（9～1）
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
