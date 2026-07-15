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
document.getElementById("text").focus();
}

function downloadQR(){

    const canvas = document.querySelector("#qrcode canvas");

    if(!canvas){
        alert("先にQRコードを生成してください。");
        return;
    }

    const link = document.createElement("a");

    link.download = "qrcode.png";

    link.href = canvas.toDataURL();

    link.click();

}

function clearQR(){

    document.getElementById("text").value="";

    document.getElementById("qrcode").innerHTML="";

}

document.getElementById("text").addEventListener("keydown",function(e){

    if(e.key==="Enter"){
        makeQR();
    }

});