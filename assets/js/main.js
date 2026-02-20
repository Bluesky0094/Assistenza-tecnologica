const translations = window.TRANSLATIONS || {};

const baseWhatsApp = "https://wa.me/393514218212?text=";

const getWhatsAppLink = (lang) => {
  const strings = translations[lang];
  if (!strings || !strings.whatsapp_message) {
    return baseWhatsApp;
  }
  return `${baseWhatsApp}${encodeURIComponent(strings.whatsapp_message)}`;
};

const getStrings = (lang) => {
  const base = translations[lang];
  if (!base) return null;

  return {
    ...base,
    hero_whatsapp: getWhatsAppLink(lang),
    footer_whatsapp_link: getWhatsAppLink(lang),
  };
};

const applyTranslations = (lang) => {
  const strings = getStrings(lang);
  if (!strings) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (strings[key]) {
      element.textContent = strings[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const pairs = element.dataset.i18nAttr.split(",");
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((item) => item.trim());
      if (!attr || !key || !strings[key]) return;
      element.setAttribute(attr, strings[key]);
    });
  });

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    const nextLang = lang === "it" ? "en" : "it";
    toggle.textContent = nextLang.toUpperCase();
    toggle.setAttribute(
      "aria-label",
      lang === "it" ? strings.toggle_to_en : strings.toggle_to_it
    );
  }

  localStorage.setItem("site_lang", lang);
};

const initFaqAccordion = () => {
  const faqItems = document.querySelectorAll(".faq-list .faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
};

const initLanguageToggle = () => {
  const saved = localStorage.getItem("site_lang");
  const initial = saved && translations[saved] ? saved : "it";
  applyTranslations(initial);
  initFaqAccordion();

  const nav = document.getElementById("primary-nav");
  const menuToggle = document.getElementById("menu-toggle");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.matches("a.nav-link")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const toggle = document.getElementById("lang-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = document.documentElement.lang || "it";
    const next = current === "it" ? "en" : "it";
    applyTranslations(next);
  });
};

initLanguageToggle();

