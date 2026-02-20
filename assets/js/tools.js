(() => {
  const modeButtons = document.querySelectorAll("[data-tool='credential'] .tool-pill");
  const lengthInput = document.getElementById("tool-length");
  const lengthValue = document.getElementById("tool-length-value");
  const optLetters = document.getElementById("opt-letters");
  const optNumbers = document.getElementById("opt-numbers");
  const optSymbols = document.getElementById("opt-symbols");
  const output = document.getElementById("tool-output");
  const generateBtn = document.getElementById("tool-generate");
  const copyBtn = document.getElementById("tool-copy");
  const hint = document.getElementById("tool-hint");

  const qrInput = document.getElementById("qr-input");
  const qrSize = document.getElementById("qr-size");
  const qrSizeValue = document.getElementById("qr-size-value");
  const qrGenerate = document.getElementById("qr-generate");
  const qrDownload = document.getElementById("qr-download");
  const qrPreview = document.getElementById("qr-preview");
  const qrImage = document.getElementById("qr-image");
  const qrHint = document.getElementById("qr-hint");

  const initCredentialTool = () => {
    if (!lengthInput || !output || !generateBtn || !copyBtn) return;

    let mode = "password";

    const sets = {
      letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()-_=+[]{};:,.?",
    };

    const updateLengthLabel = () => {
      if (lengthValue) lengthValue.textContent = lengthInput.value;
    };

    const updateMode = (nextMode) => {
      mode = nextMode;
      modeButtons.forEach((btn) => {
        const isActive = btn.dataset.mode === mode;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      output.value = "";
    };

    const buildCharset = () => {
      let charset = "";
      if (optLetters && optLetters.checked) charset += sets.letters;
      if (optNumbers && optNumbers.checked) charset += sets.numbers;
      if (optSymbols && optSymbols.checked) charset += sets.symbols;
      return charset;
    };

    const generate = () => {
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

      if (mode === "username") {
        result = result.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
        if (!result) result = "user";
      }

      output.value = result;
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

    generateBtn.addEventListener("click", generate);
    copyBtn.addEventListener("click", copyToClipboard);
  };

  const initQrTool = () => {
    if (!qrInput || !qrSize || !qrGenerate || !qrDownload || !qrPreview || !qrImage) return;

    const updateSizeLabel = () => {
      if (qrSizeValue) qrSizeValue.textContent = qrSize.value;
    };

    const setDownloadState = (enabled) => {
      qrDownload.setAttribute("aria-disabled", enabled ? "false" : "true");
    };

    const buildQrUrl = () => {
      const value = qrInput.value.trim();
      const size = Number(qrSize.value);
      const encoded = encodeURIComponent(value);
      return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`;
    };

    const generateQr = () => {
      const value = qrInput.value.trim();
      if (!value) {
        if (qrHint) qrHint.classList.add("is-error");
        qrPreview.hidden = true;
        setDownloadState(false);
        return;
      }

      if (qrHint) {
        qrHint.classList.remove("is-error");
        qrHint.classList.add("is-success");
      }

      const url = buildQrUrl();
      qrImage.src = url;
      qrDownload.href = url;
      qrPreview.hidden = false;
      setDownloadState(true);
    };

    qrSize.addEventListener("input", updateSizeLabel);
    qrGenerate.addEventListener("click", generateQr);

    qrInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        generateQr();
      }
    });

    updateSizeLabel();
    setDownloadState(false);
  };

  initCredentialTool();
  initQrTool();
})();
