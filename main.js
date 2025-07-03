document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navs = document.querySelectorAll(".section.cc-nav");
  const scrollOffset = 100;
  let scrollEnabled = false;
  let withinOffset = true;
  let menuOpen = false;

  const navControls = document.querySelectorAll(".nav-controls");
  const navHamburgers = document.querySelectorAll(".nav-hamburger");
  const navCloses = document.querySelectorAll(".nav-close");
  const navFakeBgs = document.querySelectorAll(".nav-fake_background");
  const navHeightContainers = document.querySelectorAll(
    ".container.cc-nav-height"
  );
  const navbars = document.querySelectorAll(".navbar");

  const navItems = document.querySelectorAll(
    ".row.row-justify-around.cc-nav-items"
  );
  const navBottom = document.querySelectorAll(".nav-bottom_wrapper");
  const navContact = document.querySelectorAll(".nav-results_flex.cc-hor");

  if (navs.length) {
    setTimeout(() => {
      scrollEnabled = true;
    }, 1000);

    let scrollThreshold = 20;

    window.addEventListener("scroll", function () {
      if (!scrollEnabled || menuOpen) return;

      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      withinOffset = scrollTop <= scrollOffset;

      navs.forEach((nav) => {
        if (scrollTop < 50) {
          gsap.to(nav, { top: "0rem", duration: 0.3, ease: "power2.out" });
          nav.classList.remove("cc-scrolled");
        } else if (scrollTop > lastScrollTop + scrollThreshold) {
          gsap.to(nav, { top: "-10rem", duration: 0.4, ease: "power2.out" });
        } else if (scrollTop < lastScrollTop - scrollThreshold) {
          gsap.to(nav, { top: "0rem", duration: 0.5, ease: "power2.out" });
          if (!withinOffset) {
            nav.classList.add("cc-scrolled");
          } else {
            nav.classList.remove("cc-scrolled");
          }
        }
      });

      lastScrollTop = scrollTop;
    });
  } else {
    console.error("Navigatie-elementen .section.cc-nav niet gevonden.");
  }

  let menuTimeline = gsap.timeline({ paused: true });

  menuTimeline
    .set(navFakeBgs, { display: "block" })
    .fromTo(
      navFakeBgs,
      { y: "-100%" },
      { y: "0%", duration: 1.2, ease: "expo.inOut" }
    )
    .set(navs, { height: "100%" }, "-=0.8")
    .set(navs, { color: "var(--_color---dark--100)", duration: 0.3 }, "-=0.8")
    .set(navItems, { display: "flex" }, "-=0.6")
    .fromTo(
      navItems,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out" },
      "-=0.6"
    )
    .set(navBottom, { display: "flex" }, "-=0.6")
    .fromTo(
      navContact,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay: 0.1, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      navHamburgers,
      { scale: 1, opacity: 1 },
      { scale: 0, opacity: 0, duration: 0.6, ease: "power2.out" },
      "-=1.4"
    )
    .fromTo(
      navCloses,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=1.4"
    );

  if (navControls.length) {
    navControls.forEach((control) => {
      control.addEventListener("click", function () {
        menuOpen = !menuOpen;

        if (menuOpen) {
          menuTimeline.timeScale(1).play();
        } else {
          menuTimeline.timeScale(1.5).reverse();
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const navResults = document.querySelectorAll(".nav-results_flex");
  const overlay = document.querySelector(
    ".col.col-lg-4.col-md-6.col-sm-12.cc-overlay"
  );
  const backButtons = document.querySelectorAll(".nav-item.cc-back");
  let activeResult = null;
  let activeItem = null;

  function handleLargeScreen() {
    navItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const targetAttribute = item.getAttribute("nav-item");

        if (activeItem) {
          activeItem.classList.remove("active");
          const previousArrow = activeItem.querySelector(".svg.cc-nav_arrow");
          if (previousArrow) previousArrow.classList.remove("active");
        }

        activeItem = item;
        activeItem.classList.add("active");
        const currentArrow = activeItem.querySelector(".svg.cc-nav_arrow");
        if (currentArrow) currentArrow.classList.add("active");

        if (activeResult) {
          activeResult.style.display = "none";
          activeResult.style.opacity = "0";
        }

        showNewResult(targetAttribute);
      });
    });
  }

  function showNewResult(targetAttribute) {
    activeResult = document.querySelector(
      `.nav-results_flex[nav-result="${targetAttribute}"]`
    );
    if (activeResult) {
      activeResult.style.display = "flex";
      setTimeout(() => {
        activeResult.style.opacity = "1";
      }, 10);
    }
  }

  function handleSmallScreen() {
    navItems.forEach((item) => {
      const targetAttribute = item.getAttribute("nav-item");
      if (targetAttribute) {
        item.classList.add("active");
        const arrow = item.querySelector(".svg.cc-nav_arrow");
        if (arrow) arrow.classList.add("active");
      }

      item.addEventListener("click", function (event) {
        if (!targetAttribute) {
          return;
        }

        event.preventDefault();

        activeItem = item;
        activeItem.classList.add("active");
        const arrow = activeItem.querySelector(".svg.cc-nav_arrow");
        if (arrow) arrow.classList.add("active");

        if (activeResult) {
          activeResult.style.display = "none";
        }

        showNewResultMobile(targetAttribute);
      });
    });

    backButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        if (overlay) {
          overlay.style.transition = "transform 0.3s ease-in-out";
          overlay.style.transform = "translateX(100%)";
        }

        if (activeResult) {
          activeResult.style.display = "none";
          activeResult.style.opacity = "0";
          activeResult = null;
        }
      });
    });
  }

  function showNewResultMobile(targetAttribute) {
    if (overlay) {
      overlay.style.transition = "transform 0.3s ease-in-out";
      overlay.style.transform = "translateX(0%)";
    }

    activeResult = document.querySelector(
      `.nav-results_flex[nav-result="${targetAttribute}"]`
    );
    if (activeResult) {
      activeResult.style.display = "flex";
      setTimeout(() => {
        if (activeResult) {
          activeResult.style.opacity = "1";
        }
      }, 10);
    }
  }

  function checkScreenSize() {
    if (window.innerWidth >= 768) {
      handleLargeScreen();
    } else {
      handleSmallScreen();
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  document.querySelectorAll(".nav-controls").forEach((control) => {
    control.addEventListener("click", function () {
      if (activeResult) {
        activeResult.style.display = "none";
        activeResult.style.opacity = "0";
        activeResult = null;
      }
      if (activeItem) {
        activeItem.classList.remove("active");
        const activeArrow = activeItem.querySelector(".svg.cc-nav_arrow");
        if (activeArrow) activeArrow.classList.remove("active");
        activeItem = null;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const stickyContainer = document.querySelector(".container.cc-sticky");
  const nav = document.querySelector(".section.cc-nav");
  const jobSection = document.querySelector(".section.u-pt-0.cc-job");

  if (!stickyContainer || !nav || !jobSection) {
    return;
  }

  let lastScrollTop = 0;
  const scrollOffset = 10;
  const overlapOffset = -8;
  const navs = document.querySelectorAll(".section.cc-nav");

  ScrollTrigger.create({
    trigger: jobSection,
    start: "top top",
    end: () => "+=" + jobSection.offsetHeight,
    onUpdate: (self) => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const navHeight = nav.offsetHeight;

      if (scrollTop < lastScrollTop - scrollOffset) {
        // Navigatie komt naar beneden, pas sticky element langzaam aan
        gsap.to(nav, { top: "0rem", duration: 0.4, ease: "power2.out" });
        gsap.to(stickyContainer, {
          top: navHeight + overlapOffset,
          duration: 1,
          ease: "power2.out",
        });
        nav.classList.add("cc-scrolled");

        gsap.to(navs, {
          color: "var(--_color---dark--100)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (scrollTop > lastScrollTop + scrollOffset) {
        // Navigatie schuift naar boven, reset sticky element langzaam
        gsap.to(nav, { top: "-10rem", duration: 0.4, ease: "power2.out" });
        gsap.to(stickyContainer, {
          top: 0,
          duration: 0.1,
          ease: "power2.out",
        });
        nav.classList.remove("cc-scrolled");

        gsap.to(navs, {
          color: "", // Laat de kleur terugkeren naar de standaard waarde (CSS)
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScrollTop = scrollTop;
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Zoek de section met het juiste data-attribuut
  const section = document.querySelector(
    '[data-wf--heading-2-col-text--variant="transparent-effect"]'
  );

  if (section) {
    // Zoek binnen deze section naar het element met de transparante tekst
    const textElement = section.querySelector(".transparent-text_effect");

    if (textElement) {
      let text = textElement.innerText.trim();
      let words = text.split(" ");

      if (words.length > 0) {
        let lastWord = words.pop(); // Pak het laatste woord
        let letters = lastWord.split(""); // Split het woord in letters
        let fadeSteps = [
          0.9, 0.8, 0.7, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.2,
        ];

        let fadeLength = Math.ceil(letters.length * 0.8); // 80% van de lengte van het woord
        let stepCount = Math.min(fadeSteps.length, fadeLength); // Zorg dat we niet meer stappen gebruiken dan er letters zijn

        // Pas opacity toe op de laatste letters van het woord
        for (let i = 0; i < stepCount; i++) {
          let opacity = fadeSteps[i];
          letters[
            letters.length - fadeLength + i
          ] = `<span style="opacity:${opacity}">${
            letters[letters.length - fadeLength + i]
          }</span>`;
        }

        // Zet het laatste woord opnieuw in elkaar
        let fadedWord = letters.join("");

        // Zet de nieuwe tekst terug
        textElement.innerHTML = words.join(" ") + " " + fadedWord;
      }
    }
  }
});

function truncateText() {
  const activeTab = document.querySelector(".w-tab-pane.w--tab-active"); // Selecteer alleen de actieve tab
  if (!activeTab) {
    return;
  }

  const reviewCards = activeTab.querySelectorAll(".job-list_description");

  reviewCards.forEach((card) => {
    const textElement = card.querySelector(".job-list_description-text");
    if (!textElement) {
      return;
    }

    const maxLines = 2;
    const computedStyle = window.getComputedStyle(textElement);
    const lineHeight = parseInt(computedStyle.lineHeight, 10);
    if (isNaN(lineHeight)) return;

    const maxHeight = lineHeight * maxLines;

    // Reset naar originele tekst indien nodig
    let originalText = textElement.getAttribute("data-original-text");
    if (!originalText) {
      originalText = textElement.textContent.trim();
      textElement.setAttribute("data-original-text", originalText);
    } else {
      textElement.textContent = originalText;
    }

    if (textElement.scrollHeight > maxHeight) {
      let truncatedText = originalText;
      textElement.style.maxHeight = `${maxHeight}px`;
      textElement.style.overflow = "hidden";
      textElement.style.display = "-webkit-box";
      textElement.style.webkitBoxOrient = "vertical";
      textElement.style.webkitLineClamp = maxLines;

      while (textElement.scrollHeight > maxHeight && truncatedText.length > 0) {
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
        if (lastSpaceIndex === -1) break;
        truncatedText = truncatedText.slice(0, lastSpaceIndex).trim();
        textElement.textContent = truncatedText + "...";
      }

      const fadeSpan = document.createElement("span");
      fadeSpan.innerHTML =
        "<span style='opacity: 0.75;'>.</span><span style='opacity: 0.5;'>.</span><span style='opacity: 0.25;'>.</span>";
      textElement.innerHTML = truncatedText + fadeSpan.outerHTML;
    } else {
      textElement.style.maxHeight = "";
      textElement.style.overflow = "";
      textElement.style.webkitLineClamp = "";
    }
  });
}

// Roep truncateText aan bij pagina-lading en resize
document.addEventListener("DOMContentLoaded", truncateText);
window.addEventListener("resize", truncateText);

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".w-tab-link")) {
      setTimeout(truncateText, 200); // Wacht even tot Webflow de tab wisselt
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-form='validation']").forEach((form) => {
    const submitBtns = form.querySelectorAll(".btn.is-form"); // Selecteer alle submit buttons

    function checkValidation() {
      let isValid = true;

      // Controleer input, textarea, email, tel, number, url, date
      form
        .querySelectorAll(
          "[form-validation='input'], [form-validation='textarea'], [form-validation='email'], [form-validation='tel'], [form-validation='number'], [form-validation='url'], [form-validation='date']"
        )
        .forEach((input) => {
          if (!input.value.trim()) isValid = false;
        });

      // Controleer radio groups (één moet geselecteerd zijn)
      form
        .querySelectorAll("[form-validation='radio-group']")
        .forEach((group) => {
          const radios = group.querySelectorAll("input[type='radio']");
          if (![...radios].some((radio) => radio.checked)) isValid = false;
        });

      // Controleer checkbox groups (minimaal één moet geselecteerd zijn)
      form
        .querySelectorAll("[form-validation='checkbox-group']")
        .forEach((group) => {
          const checkboxes = group.querySelectorAll("input[type='checkbox']");
          if (![...checkboxes].some((checkbox) => checkbox.checked))
            isValid = false;
        });

      // Controleer single checkboxes (moeten aangevinkt zijn als ze required zijn)
      form
        .querySelectorAll("[form-validation='checkbox']")
        .forEach((checkbox) => {
          if (!checkbox.checked) isValid = false;
        });

      // Controleer select dropdowns
      form.querySelectorAll("[form-validation='select']").forEach((select) => {
        if (!select.value) isValid = false;
      });

      // Controleer file uploads
      form.querySelectorAll("[form-validation='file']").forEach((fileInput) => {
        if (!fileInput.files.length) isValid = false;
      });

      // Update alle submit buttons
      submitBtns.forEach((btn) => {
        if (isValid) {
          btn.classList.add("cc-active");
        } else {
          btn.classList.remove("cc-active");
        }
      });
    }

    // Event listeners voor live validatie
    form.addEventListener("input", checkValidation);
    form.addEventListener("change", checkValidation);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = gsap.utils.toArray(".cc-parallax");

  elements.forEach((container) => {
    const img = container.querySelector(".cc-parallax_img");
    if (!img) return;

    gsap.set(img, { opacity: 0 });

    gsap.to(img, { opacity: 1, duration: 1, ease: "power2.out" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          scrub: true,
          pin: false,
          start: "top bottom",
          end: "bottom top",
        },
      })
      .fromTo(
        img,
        { yPercent: -8, ease: "none" },
        { yPercent: 8, ease: "none" }
      );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[class*='text-6xl-normal']").forEach((element) => {
    const excludeDot = element.getAttribute("data-dot") === "false";
    if (excludeDot) return;

    let html = element.innerHTML.trim();

    const endingRegex = /(?:<span[^>]*>)?([.!?])(?:<\/span>)?\s*$/;

    if (endingRegex.test(html)) {
      html = html.replace(endingRegex, '<span style="color: #ff6720;">$1</span>');
      element.innerHTML = html;
    } else {
      element.innerHTML = html + '<span style="color: #ff6720;">.</span>';
    }
  });
});
