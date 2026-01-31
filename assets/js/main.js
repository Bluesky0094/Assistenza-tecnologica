const translations = {
  it: {
    site_title: "Assistenza Tecnologica",
    skip_link: "Vai al contenuto",
    hero_eyebrow: "Supporto tecnico e digitale",
    hero_title: "Risolvo problemi tecnologici, senza stress.",
    hero_subtitle:
      "Interventi rapidi in presenza a Modica e provincia di Ragusa, oppure da remoto ovunque.",
    hero_cta: "Scrivimi su WhatsApp",
    hero_cta_note: "Risposta veloce, zero impegno.",
    hero_panel_title: "Come posso aiutarti",
    hero_panel_item1: "Assistenza per casa e ufficio",
    hero_panel_item2: "Configurazioni sicure e pulite",
    hero_panel_item3: "Supporto remoto o in presenza",
    nav_home: "Home",
    nav_about: "Chi sono",
    nav_menu: "Menu",
    how_eyebrow: "Metodo in 3 passi",
    how_title: "Come funziona",
    how_subtitle: "Un percorso chiaro: contatto rapido, analisi e soluzione.",
    how_step1_title: "1. Contatto rapido",
    how_step1_body:
      "Mi scrivi su WhatsApp: capisco la richiesta e ti dico tempi e costi.",
    how_step2_title: "2. Analisi e piano",
    how_step2_body: "Valuto il problema e ti propongo la soluzione piu adatta.",
    how_step3_title: "3. Soluzione e supporto",
    how_step3_body:
      "Intervento in presenza o remoto, con indicazioni per mantenere tutto sicuro.",
    toggle_to_en: "Passa a English",
    toggle_to_it: "Passa a Italiano",
    whatsapp_message: "Ciao! Ho visto il tuo sito e vorrei informazioni sui tuoi servizi.",
  },
  en: {
    site_title: "Assistenza Tecnologica",
    skip_link: "Skip to content",
    hero_eyebrow: "Technical and digital support",
    hero_title: "I solve tech problems, without the stress.",
    hero_subtitle:
      "Fast in-person help in Modica and the province of Ragusa, or remote anywhere.",
    hero_cta: "Message me on WhatsApp",
    hero_cta_note: "Quick reply, no commitment.",
    hero_panel_title: "How I can help",
    hero_panel_item1: "Help for home and small offices",
    hero_panel_item2: "Secure, clean configurations",
    hero_panel_item3: "Remote or in-person support",
    nav_home: "Home",
    nav_about: "About me",
    nav_menu: "Menu",
    how_eyebrow: "3-step process",
    how_title: "How it works",
    how_subtitle: "Clear flow: quick contact, analysis, and solution.",
    how_step1_title: "1. Quick contact",
    how_step1_body:
      "Message me on WhatsApp so I can gauge the request and timing.",
    how_step2_title: "2. Analysis and plan",
    how_step2_body: "I review the issue and propose the best path forward.",
    how_step3_title: "3. Solution and support",
    how_step3_body:
      "On-site or remote help, with guidance to keep things secure.",
    toggle_to_en: "Switch to English",
    toggle_to_it: "Switch to Italian",
    whatsapp_message: "Hi! I saw your website and I'd like information about your services.",
  },
};

const baseWhatsApp = "https://wa.me/393514218212?text=";

const getWhatsAppLink = (lang) =>
  `${baseWhatsApp}${encodeURIComponent(translations[lang].whatsapp_message)}`;

const getStrings = (lang) => ({
  ...translations[lang],
  hero_whatsapp: getWhatsAppLink(lang),
});

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

const initLanguageToggle = () => {
  const saved = localStorage.getItem("site_lang");
  const initial = saved && translations[saved] ? saved : "it";
  applyTranslations(initial);

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
