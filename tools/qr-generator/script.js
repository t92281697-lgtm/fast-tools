function makeQR() {

    const text = document.getElementById("text").value.trim();

    if (text === "") {
        alert("文字やURLを入力してください。");
        return;
    }

    const qr = document.getElementById("qrcode");
    qr.innerHTML = "";

    new QRCode(qr, {
        text: text,
        width: 250,
        height: 250
    });

}
