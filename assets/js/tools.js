(() => {
  const toolRoot = document.querySelector("[data-tool='generator']");
  const modeButtons = toolRoot ? toolRoot.querySelectorAll(".tool-pill") : [];
  const panels = toolRoot ? toolRoot.querySelectorAll(".tool-options-panel") : [];
  const lengthInput = document.getElementById("tool-length");
  const lengthValue = document.getElementById("tool-length-value");
  const optLetters = document.getElementById("opt-letters");
  const optNumbers = document.getElementById("opt-numbers");
  const optSymbols = document.getElementById("opt-symbols");
  const usernameDigits = document.getElementById("username-digits");
  const usernameLetters = document.getElementById("opt-letters-username");
  const usernameNumbers = document.getElementById("opt-numbers-username");
  const usernameSymbols = document.getElementById("opt-symbols-username");
  const output = document.getElementById("tool-output");
  const generateBtn = document.getElementById("tool-generate");
  const copyBtn = document.getElementById("tool-copy");
  const hint = document.getElementById("tool-hint");

  const passWords = document.getElementById("pass-words");
  const passWordsValue = document.getElementById("pass-words-value");
  const passSep = document.getElementById("pass-sep");
  const passDigits = document.getElementById("pass-digits");

  if (!lengthInput || !output || !generateBtn || !copyBtn) return;

  const words = Array.isArray(window.WORD_LIST) && window.WORD_LIST.length
    ? window.WORD_LIST
    : ["user", "tech", "help", "safe", "clean", "quick", "nova", "luna"];

  let mode = "password";

  const sets = {
    letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.?",
  };
  const usernameSymbolsList = ["_", "."];

  const updateLengthLabel = () => {
    if (lengthValue) lengthValue.textContent = lengthInput.value;
  };

  const updatePassLength = () => {
    if (passWordsValue) passWordsValue.textContent = passWords.value;
  };

  const updatePassDigitsOptions = () => {
    if (!passDigits || !passWords) return;
    const maxDigits = Number(passWords.value);
    const previous = passDigits.value ? Number(passDigits.value) : 1;
    passDigits.innerHTML = "";
    for (let i = 0; i <= maxDigits; i += 1) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = String(i);
      passDigits.appendChild(option);
    }
    passDigits.value = String(Math.min(previous || 1, maxDigits));
  };

  const updateMode = (nextMode) => {
    mode = nextMode;
    modeButtons.forEach((btn) => {
      const isActive = btn.dataset.mode === mode;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === mode;
      panel.hidden = !isActive;
    });
    if (hint) {
      hint.classList.remove("is-error", "is-success");
    }
    output.value = "";
    if (copyBtn) copyBtn.disabled = true;
  };

  const buildCharset = () => {
    let charset = "";
    if (optLetters && optLetters.checked) charset += sets.letters;
    if (optNumbers && optNumbers.checked) charset += sets.numbers;
    if (optSymbols && optSymbols.checked) charset += sets.symbols;
    return charset;
  };

  const pickWord = () => words[Math.floor(Math.random() * words.length)];

  const randomDigits = (count) => {
    let result = "";
    for (let i = 0; i < count; i += 1) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  };

  const buildUsername = () => {
    const wordCount = Math.random() < 0.5 ? 1 : 2;
    const parts = [];
    for (let i = 0; i < wordCount; i += 1) {
      parts.push(pickWord());
    }
    let base = parts.join("");

    if (usernameSymbols && usernameSymbols.checked) {
      const symbol = usernameSymbolsList[Math.floor(Math.random() * usernameSymbolsList.length)];
      base = wordCount === 2 ? parts.join(symbol) : `${base}${symbol}`;
    }

    base = base.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();

    const digitsCount = usernameDigits ? Number(usernameDigits.value) : 2;
    const digits = usernameNumbers && usernameNumbers.checked ? randomDigits(digitsCount) : "";
    return `${base || "user"}${digits}`;
  };

  const generate = () => {
    if (mode === "username") {
      if (usernameLetters && !usernameLetters.checked) {
        if (hint) hint.classList.add("is-error");
        output.value = "";
        return;
      }
      output.value = buildUsername();
      if (copyBtn) copyBtn.disabled = false;
      return;
    }

    const charset = buildCharset();
    if (!charset) {
      if (hint) hint.classList.add("is-error");
      output.value = "";
      return;
    }
    if (hint) hint.classList.remove("is-error");

    const length = Number(lengthInput.value);
    let result = "";
    for (let i = 0; i < length; i += 1) {
      const idx = Math.floor(Math.random() * charset.length);
      result += charset[idx];
    }

    output.value = result;
    if (copyBtn) copyBtn.disabled = false;
  };

  const generatePassphrase = () => {
    if (!passWords || !output || !passSep) return;
    const count = Number(passWords.value);
    const sep = passSep.value;
    const parts = [];
    for (let i = 0; i < count; i += 1) {
      parts.push(pickWord());
    }

    const digitsToAdd = passDigits ? Number(passDigits.value) : 0;
    if (digitsToAdd > 0) {
      const available = [...Array(count).keys()];
      for (let i = 0; i < Math.min(digitsToAdd, count); i += 1) {
        const idx = Math.floor(Math.random() * available.length);
        const wordIndex = available.splice(idx, 1)[0];
        parts[wordIndex] = `${parts[wordIndex]}${Math.floor(Math.random() * 10)}`;
      }
    }

    output.value = parts.join(sep);
    if (hint) {
      hint.classList.remove("is-error");
      hint.classList.add("is-success");
    }
    if (copyBtn) copyBtn.disabled = false;
  };

  const copyToClipboard = async () => {
    if (!output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      if (hint) {
        hint.classList.remove("is-error");
        hint.classList.add("is-success");
      }
    } catch (err) {
      output.select();
      document.execCommand("copy");
      if (hint) hint.classList.add("is-success");
    }
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => updateMode(btn.dataset.mode));
  });

  lengthInput.addEventListener("input", updateLengthLabel);
  updateLengthLabel();

  generateBtn.addEventListener("click", () => {
    if (mode === "passphrase") {
      generatePassphrase();
      return;
    }
    generate();
  });
  copyBtn.addEventListener("click", copyToClipboard);

  if (passWords) {
    passWords.addEventListener("input", updatePassLength);
    updatePassLength();
    updatePassDigitsOptions();
    passWords.addEventListener("input", updatePassDigitsOptions);
  }

  updateMode(mode);
})();

(() => {
  const qrRoot = document.querySelector("[data-tool='qr']");
  if (!qrRoot) return;

  const qrInput = document.getElementById("qr-input");
  const qrSize = document.getElementById("qr-size");
  const qrGenerate = document.getElementById("qr-generate");
  const qrDownload = document.getElementById("qr-download");
  const qrImage = document.getElementById("qr-image");
  const qrHint = document.getElementById("qr-hint");

  if (!qrInput || !qrSize || !qrGenerate || !qrDownload || !qrImage) return;

  const buildQrUrl = (text, size) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&data=${encodeURIComponent(text)}`;

  const clearHintState = () => {
    if (!qrHint) return;
    qrHint.classList.remove("is-error", "is-success");
  };

  const generateQr = () => {
    const text = qrInput.value.trim();
    if (!text) {
      qrImage.hidden = true;
      qrImage.removeAttribute("src");
      qrDownload.disabled = true;
      if (qrHint) qrHint.classList.add("is-error");
      return;
    }

    clearHintState();
    if (qrHint) qrHint.classList.add("is-success");

    const size = Number(qrSize.value) || 256;
    qrImage.src = buildQrUrl(text, size);
    qrImage.hidden = false;
    qrDownload.disabled = false;
  };

  const downloadQr = () => {
    if (!qrImage.src) return;
    const link = document.createElement("a");
    link.href = qrImage.src;
    link.download = "assistenza-tecnologica-qr.png";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  qrGenerate.addEventListener("click", generateQr);
  qrDownload.addEventListener("click", downloadQr);
  qrInput.addEventListener("input", clearHintState);
})();





