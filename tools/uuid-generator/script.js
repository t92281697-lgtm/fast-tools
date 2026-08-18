const result = document.getElementById("result");
const multipleResult = document.getElementById("multipleResult");
const message = document.getElementById("message");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const generate10Btn = document.getElementById("generate10Btn");
const copy10Btn = document.getElementById("copy10Btn");


// UUIDを1個生成
generateBtn.addEventListener("click", () => {

    result.value = crypto.randomUUID();

    message.textContent = "UUIDを生成しました！";

});


// UUIDをコピー
copyBtn.addEventListener("click", async () => {

    if (!result.value) {
        message.textContent = "先にUUIDを生成してください。";
        return;
    }

    await navigator.clipboard.writeText(result.value);

    message.textContent = "UUIDをコピーしました！";

});


// UUIDを10個生成
generate10Btn.addEventListener("click", () => {

    const uuids = [];

    for (let i = 0; i < 10; i++) {
        uuids.push(crypto.randomUUID());
    }

    multipleResult.value = uuids.join("\n");

    message.textContent = "UUIDを10個生成しました！";

});


// UUIDを10個まとめてコピー
copy10Btn.addEventListener("click", async () => {

    if (!multipleResult.value) {
        message.textContent = "先にUUIDを10個生成してください。";
        return;
    }

    await navigator.clipboard.writeText(multipleResult.value);

    message.textContent = "10個のUUIDをコピーしました！";

});