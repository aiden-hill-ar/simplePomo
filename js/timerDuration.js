const focusLengthInput = doc.querySelector("#focus-timer");

focusLengthInput.addEventListener("input", e => {
    const target = e.target;
    let value = e.target.value;
    const iSemi = timer.innerText.indexOf(":");
    let tensValue;
    let onesValue;
    let seconds = timer.innerText.slice(iSemi + 1);
    const max = e.target.max;
    const min = e.target.min;

    if (seconds !== "00") {
        seconds = "00";
        timer.innerText = timer.innerText.replaceAt("00", iSemi + 1);
    };

    if (value === "") {
        timer.innerText = timer.innerText.replaceAt("00", 0, iSemi);
    } else {
        if (Number(value) > max) {
            tensValue = max.slice(0, 1);
            onesValue = max.slice(-1);
            target.value = tensValue + onesValue;
            value = tensValue + onesValue;
        } else if (Number(value) < min) {
            tensValue = min.slice(0, 1);
            onesValue = min.slice(-1);
            target.value = tensValue + onesValue;
            value = tensValue + onesValue;
        };

        tensValue = value.slice(0, 1);
        onesValue = value.slice(-1); 
        if (value.slice(0, iSemi).length === 1) {
            timer.innerText = timer.innerText.replaceAt(`0${onesValue}`, 0, iSemi);
        } else {
            timer.innerText = timer.innerText.replaceAt(`${tensValue}${onesValue}`, 0, iSemi);
        };
    };
});