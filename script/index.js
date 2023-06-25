const repetitionsRange = document.getElementById('repetitionsRange');
const repetitionsValue = document.getElementById('repetitionsValue');
const input = document.getElementById('inputText')
const encodeEnglish = document.getElementById('toggleEncode');
const outputText = document.getElementById('outputText')
const toastContainer = document.getElementById("toastContainer");

repetitionsRange.addEventListener('input', () => repetitionsValue.textContent = repetitionsRange.value);

/**
 * encode button
 * @returns {void}
 */
const encodeText = () => {
    const repetitions = parseInt(repetitionsRange.value);
    let encodedText = input.value;
    for (let i = 0; i < repetitions; i++) {
        encodedText = customEncodeURIComponent(encodedText, encodeEnglish.checked);
    }
    outputText.innerText = encodedText;
}

/**
 * copy button
 * @returns {void}
 */
const copyText = () => {
    const text = outputText.innerText;

    if (text === null || text === undefined || text === ''){
        showToast("Empty text cannot be copied.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => showToast("Text has been copied."))
        .catch((err) => {
            showToast("Failed to copy text");
            console.error("Failed to copy text: ", err);
        });
}

/**
 * @param {string} str 
 * @param {boolean} encodeEnglish 
 * @returns {string}
 */
const customEncodeURIComponent = (str, encodeEnglish) => {
    let encodedStr = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        let encodedChar = '%' + charCode.toString(16).toUpperCase();
        if (!encodeEnglish && charCode < 128) {
            encodedChar = str[i];
        }
        encodedStr += encodedChar;
    }
    return encodedStr;
}

/**
 * @param {string} text
 * @returns {void}
 */
const showToast = (text) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.innerHTML = `
<div class="toast-body">
    ${text}
</div>
`;
    toastContainer.appendChild(toast);
    toast.classList.add("show");

    setTimeout(() => toast.remove(), 3000);
}
