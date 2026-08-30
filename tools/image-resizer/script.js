const imageInput = document.getElementById("imageInput");
const uploadArea = document.getElementById("uploadArea");

const editor = document.getElementById("editor");
const previewImage = document.getElementById("previewImage");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");

const keepRatio = document.getElementById("keepRatio");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

const format = document.getElementById("format");

const processBtn = document.getElementById("processBtn");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

const message = document.getElementById("message");
const canvas = document.getElementById("canvas");

let originalImage = null;
let originalWidth = 0;
let originalHeight = 0;
let downloadURL = null;


// ==============================
// 画像を読み込む
// ==============================

function loadImage(file) {

    if (!file || !file.type.startsWith("image/")) {
        message.textContent = "画像ファイルを選択してください。";
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        const img = new Image();

        img.onload = function() {

            originalImage = img;

            originalWidth = img.naturalWidth;
            originalHeight = img.naturalHeight;

            widthInput.value = originalWidth;
            heightInput.value = originalHeight;

            previewImage.src = event.target.result;

            editor.hidden = false;

            message.textContent =
                `${originalWidth} × ${originalHeight}px の画像を読み込みました。`;
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}


// ==============================
// ファイル選択
// ==============================

imageInput.addEventListener("change", function() {

    const file = imageInput.files[0];

    loadImage(file);

});


// ==============================
// ドラッグ＆ドロップ
// ==============================

uploadArea.addEventListener("dragover", function(event) {

    event.preventDefault();

    uploadArea.classList.add("dragover");

});


uploadArea.addEventListener("dragleave", function() {

    uploadArea.classList.remove("dragover");

});


uploadArea.addEventListener("drop", function(event) {

    event.preventDefault();

    uploadArea.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    loadImage(file);

});


// ==============================
// 縦横比を維持
// ==============================

widthInput.addEventListener("input", function() {

    if (!keepRatio.checked || !originalImage) {
        return;
    }

    const newWidth = Number(widthInput.value);

    if (!newWidth) {
        return;
    }

    const ratio = originalHeight / originalWidth;

    heightInput.value = Math.round(newWidth * ratio);

});


heightInput.addEventListener("input", function() {

    if (!keepRatio.checked || !originalImage) {
        return;
    }

    const newHeight = Number(heightInput.value);

    if (!newHeight) {
        return;
    }

    const ratio = originalWidth / originalHeight;

    widthInput.value = Math.round(newHeight * ratio);

});


// ==============================
// 画質表示
// ==============================

quality.addEventListener("input", function() {

    qualityValue.textContent = `${quality.value}%`;

});


// ==============================
// リサイズ・圧縮
// ==============================

processBtn.addEventListener("click", function() {

    if (!originalImage) {
        message.textContent = "先に画像を選択してください。";
        return;
    }

    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    if (width <= 0 || height <= 0) {
        message.textContent = "幅と高さを正しく入力してください。";
        return;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // PNG以外は白背景
    if (format.value !== "image/png") {

        ctx.fillStyle = "white";

        ctx.fillRect(0, 0, width, height);

    }

    ctx.drawImage(
        originalImage,
        0,
        0,
        width,
        height
    );

    const imageQuality = Number(quality.value) / 100;

    canvas.toBlob(function(blob) {

        if (!blob) {

            message.textContent =
                "画像の処理に失敗しました。";

            return;
        }

        if (downloadURL) {
            URL.revokeObjectURL(downloadURL);
        }

        downloadURL = URL.createObjectURL(blob);

        downloadBtn.hidden = false;

        const sizeKB = (blob.size / 1024).toFixed(1);

        message.textContent =
            `処理完了！ ${sizeKB} KB`;

    }, format.value, imageQuality);

});


// ==============================
// ダウンロード
// ==============================

downloadBtn.addEventListener("click", function() {

    if (!downloadURL) {
        message.textContent =
            "先に画像を処理してください。";

        return;
    }

    const extension =
        format.value === "image/png"
            ? "png"
            : format.value === "image/webp"
                ? "webp"
                : "jpg";

    const link = document.createElement("a");

    link.href = downloadURL;

    link.download = `fast-tools-image.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});


// ==============================
// リセット
// ==============================

resetBtn.addEventListener("click", function() {

    if (downloadURL) {
        URL.revokeObjectURL(downloadURL);
        downloadURL = null;
    }

    originalImage = null;

    imageInput.value = "";

    previewImage.src = "";

    widthInput.value = "";
    heightInput.value = "";

    editor.hidden = true;

    downloadBtn.hidden = true;

    message.textContent = "";

});