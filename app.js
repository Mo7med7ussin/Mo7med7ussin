/* Personal details live in profile.js. This site runs without a build step. */
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const profile = window.CV_PROFILE;
  if (!profile) return;
  const copy = {
    ar: {
      skip: "تخطَّ إلى المحتوى", brand: "سيرة ذاتية شخصية", navAbout: "نبذة عني", navJourney: "مسيرتي", navSkills: "مهاراتي", navContact: "تواصل معي", hello: "أهلًا، أنا", contactAction: "لنتواصل", savePdf: "حفظ السيرة PDF", findMe: "تجدني على", personalProfile: "الملف الشخصي", portraitLine: "فضول مستمر.\nتعلّم مستمر.", discover: "اكتشف المزيد", aboutLabel: "نبذة عني", aboutTitle: "التقنية شغف.\nوالتعلّم رحلة.", focusLabel: "اهتماماتي", focusValue: "الذكاء الاصطناعي والأنظمة المدمجة", approachLabel: "توجّهي", approachValue: "التعلّم المستمر واستكشاف التقنيات", interestsLabel: "ما يثير اهتمامي", interestsTitle: "مجالات أستكشفها", journeyLabel: "التعليم والقيادة", journeyTitle: "مسيرتي\nحتى الآن.", journeyDescription: "بين دراسة الذكاء الاصطناعي والمشاركة في الحياة الطلابية.", educationLabel: "التعليم", leadershipLabel: "القيادة الطلابية", skillsLabel: "المهارات التقنية", skillsTitle: "أدوات في رحلتي.", skillsDescription: "لغات البرمجة والأدوات التي أتعامل معها.", contactLabel: "لنبدأ حوارًا", contactTitle: "فكرة، فرصة،\nأو حتى مرحبًا.", contactDescription: "يسعدني التواصل معك والحديث عن التقنية والتعلّم والفرص الجديدة.", copyEmail: "نسخ البريد الإلكتروني", footer: "تعلّم مستمر، وخطوة جديدة كل يوم.", backTop: "للأعلى", copied: "تم نسخ البريد الإلكتروني", copyFailed: "تعذّر النسخ. حدّد البريد وانسخه يدويًا.", menuOpen: "فتح القائمة", menuClose: "إغلاق القائمة", navLabel: "التنقل الرئيسي", printHint: "اختر حفظ بتنسيق PDF من نافذة الطباعة"
    },
    en: {
      skip: "Skip to content", brand: "Personal résumé", navAbout: "About", navJourney: "My journey", navSkills: "Skills", navContact: "Contact", hello: "HELLO, I'M", contactAction: "Get in touch", savePdf: "Save résumé as PDF", findMe: "FIND ME ON", personalProfile: "PERSONAL PROFILE", portraitLine: "Always curious.\nAlways learning.", discover: "Explore my profile", aboutLabel: "ABOUT ME", aboutTitle: "Driven by technology.\nInspired by learning.", focusLabel: "MY INTERESTS", focusValue: "AI & embedded systems", approachLabel: "MY APPROACH", approachValue: "Continuous learning & exploration", interestsLabel: "WHAT SPARKS MY CURIOSITY", interestsTitle: "Fields I explore", journeyLabel: "EDUCATION & LEADERSHIP", journeyTitle: "My journey\nso far.", journeyDescription: "Studying Artificial Intelligence and taking part in student life.", educationLabel: "EDUCATION", leadershipLabel: "STUDENT LEADERSHIP", skillsLabel: "TECHNICAL SKILLS", skillsTitle: "Tools along the way.", skillsDescription: "The programming languages and tools I work with.", contactLabel: "LET'S START A CONVERSATION", contactTitle: "An idea, an opportunity,\nor just a hello.", contactDescription: "I'd be happy to connect and talk about technology, learning, and new opportunities.", copyEmail: "Copy email address", footer: "Always learning. One step forward, every day.", backTop: "Back to top", copied: "Email address copied", copyFailed: "Couldn't copy. Select the email address and copy it manually.", menuOpen: "Open menu", menuClose: "Close menu", navLabel: "Main navigation", printHint: "Choose Save as PDF in the print dialog"
    }
  };
  let language = "ar";
  let toastTimer;
  const toggle = document.querySelector("#language-toggle");
  const menu = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#navigation");

  function setText(element, value) {
    const lines = String(value).split("\n");
    element.replaceChildren();
    lines.forEach((line, i) => {
      if (i) element.append(document.createElement("br"));
      element.append(document.createTextNode(line));
    });
  }

  function closeMenu() {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", copy[language].menuOpen);
    navigation.classList.remove("is-open");
  }

  function render(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "ar";
    const text = copy[language];
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => setText(el, text[el.getAttribute("data-i18n")]));
    document.querySelectorAll("[data-profile]").forEach(el => setText(el, profile[el.getAttribute("data-profile")][language]));
    const dot = document.createElement("span");
    dot.className = "title-dot";
    dot.textContent = ".";
    document.querySelector("h1").append(dot);
    ["education", "leadership"].forEach(group => {
      document.querySelectorAll(`[data-${group}]`).forEach(el => setText(el, profile[group][el.getAttribute(`data-${group}`)][language]));
    });
    document.querySelector("#portrait").alt = profile.name[language];
    document.querySelector(".brand").setAttribute("aria-label", profile.name[language] + (language === "ar" ? " — الرئيسية" : " — Home"));
    document.querySelectorAll(".print-button").forEach(el => el.title = text.printHint);
    document.querySelectorAll("[data-link]").forEach(el => { el.href = profile.links[el.getAttribute("data-link")]; });
    document.querySelectorAll("[data-email]").forEach(el => {
      el.href = "mailto:" + profile.email;
      el.querySelector("bdi").textContent = profile.email;
    });
    const interests = document.querySelector("#interests-list");
    interests.replaceChildren();
    profile.interests.forEach((interest, i) => {
      const card = document.createElement("article");
      card.className = "interest-card";
      const top = document.createElement("div");
      top.className = "interest-top";
      const icon = document.createElement("span");
      icon.className = i === 0 ? "interest-icon" : "interest-icon chip-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = i === 0 ? "✳" : "⌘";
      const number = document.createElement("span");
      number.className = "item-number";
      number.textContent = String(i + 1).padStart(2, "0") + " /";
      top.append(icon, number);
      const heading = document.createElement("h3");
      heading.textContent = interest.title[language];
      const description = document.createElement("p");
      description.textContent = interest.description[language];
      const english = document.createElement("span");
      english.className = "interest-english";
      english.dir = "ltr";
      english.textContent = interest.title.en;
      card.append(top, heading, description, english);
      interests.append(card);
    });
    const skills = document.querySelector("#skills-list");
    skills.replaceChildren();
    const symbols = { Python: "Py", "C++": "C+", TypeScript: "TS", MySQL: "DB", GitHub: "GH", "VS Code": "</>" };
    profile.skills.forEach(skill => {
      const item = document.createElement("span");
      item.className = "skill";
      const symbol = document.createElement("span");
      symbol.className = "skill-symbol";
      symbol.setAttribute("aria-hidden", "true");
      symbol.textContent = symbols[skill] || "•";
      item.append(symbol, document.createTextNode(skill));
      skills.append(item);
    });
    toggle.replaceChildren(document.createTextNode(language === "ar" ? "EN " : "عربي "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    toggle.append(arrow);
    toggle.lang = language === "ar" ? "en" : "ar";
    toggle.setAttribute("aria-label", language === "ar" ? "Switch to English" : "التبديل إلى العربية");
    navigation.setAttribute("aria-label", text.navLabel);
    document.title = profile.name[language] + " — " + profile.role[language];
    document.querySelector('meta[name="description"]').content = profile.intro[language];
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = profile.intro[language];
    closeMenu();
  }

  toggle.addEventListener("click", () => {
    render(language === "ar" ? "en" : "ar");
    try { localStorage.setItem("cv-language", language); } catch (_) { /* Optional preference. */ }
  });
  menu.addEventListener("click", () => {
    const isOpen = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? copy[language].menuClose : copy[language].menuOpen);
    navigation.classList.toggle("is-open", isOpen);
    if (isOpen) navigation.querySelector("a").focus();
  });
  navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  document.querySelectorAll(".print-button").forEach(button => button.addEventListener("click", () => window.print()));
  document.querySelector("#copy-email").addEventListener("click", async () => {
    let copied = false;
    try { await navigator.clipboard.writeText(profile.email); copied = true; } catch (_) {
      const fallback = document.createElement("textarea");
      fallback.value = profile.email;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.append(fallback);
      fallback.select();
      try { copied = document.execCommand("copy"); } catch (_) { /* Show manual fallback. */ }
      fallback.remove();
      document.querySelector("#copy-email").focus();
    }
    const toast = document.querySelector("#toast");
    toast.textContent = copied ? copy[language].copied : copy[language].copyFailed;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 4000);
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll("a").forEach(link => {
          if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -50% 0px", threshold: 0 });
    document.querySelectorAll("#about, #journey, #skills, #contact").forEach(section => observer.observe(section));
  }
  document.querySelector("#year").textContent = String(new Date().getFullYear());
  let savedLanguage;
  try { savedLanguage = localStorage.getItem("cv-language"); } catch (_) { /* Arabic is the default. */ }
  render(savedLanguage || "ar");
})();
