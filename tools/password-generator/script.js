function generatePassword() {

    const length = parseInt(document.getElementById("length").value);

    const upper = document.getElementById("upper").checked;
    const lower = document.getElementById("lower").checked;
    const number = document.getElementById("number").checked;
    const symbol = document.getElementById("symbol").checked;

    let chars = "";

    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (symbol) chars += "!@#$%^&*()_-+=<>?/{}[]";

    if (chars.length === 0) {
        alert("1つ以上選択してください。");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * chars.length);
        password += chars[random];
    }

    document.getElementById("result").value = password;
}

function copyPassword() {

    const result = document.getElementById("result");

    if (result.value === "") {
        alert("先にパスワードを生成してください。");
        return;
    }

    navigator.clipboard.writeText(result.value);

    alert("コピーしました！");
}