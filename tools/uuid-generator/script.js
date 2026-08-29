const result = document.getElementById("result");
const multipleResult = document.getElementById("multipleResult");
const message = document.getElementById("message");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const generate10Btn = document.getElementById("generate10Btn");
const copy10Btn = document.getElementById("copy10Btn");


// UUIDを1個生成
generateBtn.addEventListener("click", function () {
    result.value = crypto.randomUUID();
    message.textContent = "UUIDを生成しました！";
});


// 1個コピー
copyBtn.addEventListener("click", async function () {

    if (result.value === "") {
        message.textContent = "先にUUIDを生成してください。";
        return;
    }

    try {
        await navigator.clipboard.writeText(result.value);
        message.textContent = "UUIDをコピーしました！";
    } catch (error) {
        result.select();
        document.execCommand("copy");
        message.textContent = "UUIDをコピーしました！";
    }

});


// 10個生成
generate10Btn.addEventListener("click", function () {

    let uuids = [];

    for (let i = 0; i < 10; i++) {
        uuids.push(crypto.randomUUID());
    }

    multipleResult.value = uuids.join("\n");

    message.textContent = "UUIDを10個生成しました！";
});


// 10個まとめてコピー
copy10Btn.addEventListener("click", async function () {

    if (multipleResult.value === "") {
        message.textContent = "先にUUIDを10個生成してください。";
        return;
    }

    try {
        await navigator.clipboard.writeText(multipleResult.value);
        message.textContent = "10個のUUIDをコピーしました！";
    } catch (error) {
        multipleResult.select();
        document.execCommand("copy");
        message.textContent = "10個のUUIDをコピーしました！";
    }

});