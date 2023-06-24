const repetitionsRange = document.getElementById('repetitionsRange');
const repetitionsValue = document.getElementById('repetitionsValue');
const input = document.getElementById('inputText')
const encodeEnglish = document.getElementById('toggleEncode');
const outputText = document.getElementById('outputText')

repetitionsRange.addEventListener('input', () => repetitionsValue.textContent = repetitionsRange.value);

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

const  encodeText = () => {
    const repetitions = parseInt(repetitionsRange.value);
    let encodedText = input.value;
    for (let i = 0; i < repetitions; i++) {
        encodedText = customEncodeURIComponent(encodedText, encodeEnglish.checked);
    }
    outputText.innerText = encodedText;
}