const input = document.getElementById("input");
const output = document.getElementById("output");
const message = document.getElementById("message");

const formatBtn = document.getElementById("formatBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");


// JSONを整形
formatBtn.addEventListener("click", function () {

    const text = input.value.trim();

    if (text === "") {
        message.textContent = "JSONを入力してください。";
        return;
    }

    try {

        const json = JSON.parse(text);

        output.value = JSON.stringify(json, null, 2);

        message.textContent = "JSONを整形しました！";

    } catch (error) {

        output.value = "";

        message.textContent =
            "❌ JSONの形式が正しくありません。";

    }

});


// コピー
copyBtn.addEventListener("click", async function () {

    if (output.value === "") {
        message.textContent = "先にJSONを整形してください。";
        return;
    }

    try {

        await navigator.clipboard.writeText(output.value);

        message.textContent = "📋 コピーしました！";

    } catch (error) {

        output.select();
        document.execCommand("copy");

        message.textContent = "📋 コピーしました！";

    }

});


// クリア
clearBtn.addEventListener("click", function () {

    input.value = "";
    output.value = "";
    message.textContent = "";

});