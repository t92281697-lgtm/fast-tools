const text = document.getElementById("text");

const characters = document.getElementById("characters");
const noSpaces = document.getElementById("noSpaces");
const lines = document.getElementById("lines");
const words = document.getElementById("words");

const clearBtn = document.getElementById("clearBtn");


function updateCount() {

    const value = text.value;

    // 文字数
    characters.textContent = value.length;

    // 空白を除いた文字数
    noSpaces.textContent = value.replace(/\s/g, "").length;

    // 行数
    lines.textContent = value === "" ? 0 : value.split(/\r?\n/).length;

    // 単語数
    const wordList = value.trim().split(/\s+/);

    words.textContent =
        value.trim() === "" ? 0 : wordList.length;
}


// 入力するたびにカウント
text.addEventListener("input", updateCount);


// クリア
clearBtn.addEventListener("click", function () {

    text.value = "";

    updateCount();

    text.focus();

});