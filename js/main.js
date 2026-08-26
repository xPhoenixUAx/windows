(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var sourceBrandName = "Window Match";
  var sourceCompanyName = "Window Match, Inc.";
  var brandName = config.brand || sourceBrandName;
  var companyName = config.company || brandName;
  var corporateEmail = config.email || "";

  function renderConfigText(value) {
    if (typeof value !== "string") return value;
    return value
      .split("{brand}").join(brandName)
      .split("{company}").join(companyName)
      .split("{email}").join(corporateEmail || "");
  }

  var pageFile = window.location.pathname.split("/").pop() || "index.html";
  var configuredTitle = renderConfigText(config.pageTitles && config.pageTitles[pageFile]);
  if (configuredTitle) {
    document.title = configuredTitle;
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(function (element) {
      element.setAttribute("content", configuredTitle);
    });
  }

  if (config.logo) {
    document.querySelectorAll(".wordmark-mark, .footer-brand-mark").forEach(function (element) {
      element.src = config.logo;
      element.alt = "";
    });
    document.querySelectorAll('link[rel="icon"]').forEach(function (element) {
      element.href = config.logo;
    });
  }
  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(function (element) {
    var imagePath = element.getAttribute("content");
    if (imagePath) element.setAttribute("content", new URL(imagePath, document.baseURI).href);
  });

  var wordmarkLines = brandName.split(/\s+/);
  document.querySelectorAll(".wordmark-text").forEach(function (element) {
    element.textContent = "";
    wordmarkLines.forEach(function (line) {
      var span = document.createElement("span");
      span.textContent = line;
      element.appendChild(span);
    });
  });

  var generatedConfigText = {
    siteName: brandName,
    footerDescription: brandName + " helps homeowners organize project requests and explore introductions to independent local providers.",
    copyrightText: "\u00A9 " + new Date().getFullYear() + " " + brandName + ". All rights reserved.",
    aggregatorDisclosure: config.disclaimer
  };
  document.querySelectorAll("[data-config]").forEach(function (element) {
    var value = generatedConfigText[element.getAttribute("data-config")];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-config-email]").forEach(function (element) {
    if (corporateEmail) {
      element.href = "mailto:" + corporateEmail;
      element.textContent = corporateEmail;
    }
  });

  function replaceBrandTokens(value) {
    if (typeof value !== "string") return value;
    var companyToken = "\u0007company\u0007";
    return value
      .split(sourceCompanyName).join(companyToken)
      .split(sourceBrandName).join(brandName)
      .split(companyToken).join(companyName);
  }

  if (document.body && (brandName !== sourceBrandName || companyName !== sourceCompanyName)) {
    document.querySelectorAll("meta[content]").forEach(function (element) {
      element.setAttribute("content", replaceBrandTokens(element.getAttribute("content")));
    });

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var textNode;
    while ((textNode = walker.nextNode())) {
      var parentTag = textNode.parentElement ? textNode.parentElement.tagName : "";
      if (parentTag !== "SCRIPT" && parentTag !== "STYLE" && parentTag !== "NOSCRIPT") {
        textNode.nodeValue = replaceBrandTokens(textNode.nodeValue);
      }
    }
    document.querySelectorAll("[aria-label], [title], [alt], [placeholder]").forEach(function (element) {
      ["aria-label", "title", "alt", "placeholder"].forEach(function (attribute) {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, replaceBrandTokens(element.getAttribute(attribute)));
      });
    });
  }

  var rasterIcons = {
    "grid-2x2": "window",
    "panels-top-left": "window",
    "frame": "window",
    "wind": "window",
    "building-2": "window",
    "wrench": "repair",
    "settings-2": "repair",
    "hammer": "repair",
    "paintbrush": "repair",
    "lock-keyhole": "repair",
    "scan-eye": "glass",
    "cloud-fog": "glass",
    "droplets": "glass",
    "layers": "glass",
    "shield-check": "glass",
    "sparkles": "glass",
    "search": "glass",
    "clipboard-list": "clipboard",
    "clipboard-check": "clipboard",
    "calendar-days": "clipboard",
    "messages-square": "contact",
    "ruler": "clipboard",
    "triangle-alert": "rosette",
    "gauge": "rosette",
    "map-pin": "rosette",
    "clock-3": "rosette",
    "badge-check": "rosette",
    "check": "rosette",
    "mail": "rosette",
    "plus": "rosette",
    "menu": "rosette",
    "x": "rosette"
  };

  function createIcon(name, extraClass) {
    var icon = document.createElement("img");
    icon.className = "icon" + (extraClass ? " " + extraClass : "");
    icon.src = "img/common/icon-" + (rasterIcons[name] || "rosette") + "-generated.webp";
    icon.alt = "";
    icon.width = 56;
    icon.height = 56;
    icon.decoding = "async";
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("data-icon-name", name);
    return icon;
  }

  var serviceHero = document.querySelector(".service-hero");
  if (serviceHero) {
    var serviceHeroHardware = document.createElement("span");
    serviceHeroHardware.className = "service-hero-hardware latch";
    serviceHeroHardware.setAttribute("aria-hidden", "true");
    serviceHero.appendChild(serviceHeroHardware);

    document.querySelectorAll(".service-section").forEach(function (section, index) {
      var frameHardware = document.createElement("span");
      frameHardware.className = "service-frame-hardware service-frame-hardware--" + ((index % 3) + 1) + " latch";
      frameHardware.setAttribute("aria-hidden", "true");
      section.appendChild(frameHardware);
    });
  }

  document.querySelectorAll(".latch").forEach(function (latch) {
    var hardware = document.createElement("img");
    hardware.className = "latch-image";
    hardware.src = "img/common/hardware-latch-generated.webp";
    hardware.alt = "";
    hardware.width = 144;
    hardware.height = 64;
    hardware.decoding = "async";
    hardware.setAttribute("aria-hidden", "true");
    latch.appendChild(hardware);
  });

  function prependIcon(element, name, extraClass) {
    if (element) element.insertBefore(createIcon(name, extraClass), element.firstChild);
  }

  var services = [
    {
      href: "window-installation-replacement.html",
      title: "Installation & Replacement",
      description: "New openings and full-window replacement.",
      icon: "grid-2x2"
    },
    {
      href: "window-repair.html",
      title: "Window Repair",
      description: "Frames, sashes, hardware and operation.",
      icon: "wrench"
    },
    {
      href: "glass-seal-repair.html",
      title: "Glass & Seal Repair",
      description: "Cracked panes, condensation and seals.",
      icon: "scan-eye"
    }
  ];
  var currentPage = window.location.pathname.split("/").pop();
  var factorIconSets = {
    "window-installation-replacement.html": "img/services/factor-icon-installation-",
    "window-repair.html": "img/services/factor-icon-repair-",
    "glass-seal-repair.html": "img/services/factor-icon-glass-"
  };
  var reasonIconSets = {
    "window-installation-replacement.html": "img/services/reason-icon-installation-",
    "window-repair.html": "img/services/reason-icon-repair-",
    "glass-seal-repair.html": "img/services/reason-icon-glass-"
  };
  var contextIcons = {
    "Drafts": "wind",
    "Fogged glass": "cloud-fog",
    "Difficult operation": "settings-2",
    "Frame damage": "frame",
    "Water intrusion": "droplets",
    "Rising energy use": "gauge",
    "Project context in one place": "clipboard-list",
    "Local provider introductions": "map-pin",
    "Space to compare options": "layers",
    "No promise of availability": "clock-3",
    "Drafts and comfort differences": "wind",
    "Persistent condensation": "droplets",
    "Visible frame damage": "triangle-alert",
    "Older single-pane units": "calendar-days",
    "Renovation or new openings": "hammer",
    "Window count": "grid-2x2",
    "Existing opening condition": "scan-eye",
    "Frame material": "layers",
    "Glass and performance options": "gauge",
    "Access and floor level": "building-2",
    "Interior and exterior finish work": "paintbrush",
    "Sticking or binding sashes": "settings-2",
    "A window will not stay open": "panels-top-left",
    "Locks no longer align": "lock-keyhole",
    "Loose or damaged hardware": "wrench",
    "Localized frame or sash damage": "triangle-alert",
    "Air or water near one opening": "droplets",
    "Window style and age": "calendar-days",
    "Manufacturer or identifying marks": "badge-check",
    "Material and finish": "paintbrush",
    "Extent and location of damage": "triangle-alert",
    "Hardware availability": "wrench",
    "Access and surrounding trim": "frame",
    "Fogging between panes": "cloud-fog",
    "Visible cracks or chips": "triangle-alert",
    "Surface condensation": "droplets",
    "Water near the glazing edge": "droplets",
    "Loose or deteriorated glazing material": "frame",
    "Cloudy or distorted appearance": "scan-eye",
    "Pane dimensions and shape": "ruler",
    "Single, double or triple glazing": "layers",
    "Safety-glass requirements": "shield-check",
    "Frame and sash condition": "frame",
    "Glass coatings or decorative features": "sparkles",
    "Access, removal and disposal": "hammer"
  };

  function addContextualIcon(heading, extraClass) {
    if (!heading) return;
    var iconName = contextIcons[heading.textContent.trim()];
    if (iconName) prependIcon(heading, iconName, extraClass);
  }

  services.forEach(function (service, index) {
    prependIcon(document.querySelectorAll(".hero-service strong")[index], service.icon, "hero-service-icon");
    prependIcon(document.querySelectorAll(".service-pane-body")[index], service.icon, "service-pane-icon");
    document.querySelectorAll('.footer-links a[href="' + service.href + '"]').forEach(function (link) {
      prependIcon(link, service.icon, "footer-service-icon");
    });
  });

  document.querySelectorAll(".process-stage").forEach(function (stage, index) {
    stage.classList.add("has-icon");
    prependIcon(stage, ["clipboard-list", "search", "messages-square"][index % 3], "process-icon");
  });
  document.querySelectorAll(".value-item h3").forEach(function (heading) {
    addContextualIcon(heading, "section-heading-icon value-icon");
  });
  document.querySelectorAll(".reason-item h3").forEach(function (heading, index) {
    var iconSet = reasonIconSets[currentPage];
    if (!iconSet) {
      addContextualIcon(heading, "section-heading-icon reason-icon");
      return;
    }

    var visual = document.createElement("span");
    visual.className = "reason-visual reason-visual--" + (index + 1);
    visual.setAttribute("aria-hidden", "true");
    var icon = document.createElement("img");
    icon.src = iconSet + (index + 1) + "-v3.webp";
    icon.alt = "";
    icon.width = 384;
    icon.height = 384;
    icon.decoding = "async";
    visual.appendChild(icon);
    heading.parentElement.appendChild(visual);
  });
  document.querySelectorAll(".factor-item h3").forEach(function (heading, index) {
    var iconSet = factorIconSets[currentPage];
    if (!iconSet) {
      addContextualIcon(heading, "section-heading-icon factor-icon");
      return;
    }

    var visual = document.createElement("span");
    visual.className = "factor-visual factor-visual--" + (index + 1);
    visual.setAttribute("aria-hidden", "true");
    var icon = document.createElement("img");
    icon.src = iconSet + (index + 1) + "-v3.webp";
    icon.alt = "";
    icon.width = 384;
    icon.height = 384;
    icon.decoding = "async";
    visual.appendChild(icon);
    heading.parentElement.appendChild(visual);
  });
  document.querySelectorAll(".preparation-list > li, .service-checklist > li").forEach(function (item) {
    item.classList.add("has-icon");
    prependIcon(item, "check", "checklist-icon");
  });
  document.querySelectorAll(".footer-contact > a").forEach(function (link) {
    prependIcon(link, "mail", "footer-contact-icon");
  });

  document.querySelectorAll(".footer-main").forEach(function (footerMain) {
    var brandColumn = footerMain.firstElementChild;
    var contactColumn = footerMain.querySelector(".footer-contact");

    if (brandColumn && !brandColumn.querySelector(".footer-project-link")) {
      var projectLink = document.createElement("a");
      projectLink.className = "footer-project-link";
      projectLink.href = "index.html#contact";
      projectLink.innerHTML = "<span>Start a project</span><span aria-hidden=\"true\">→</span>";
      brandColumn.appendChild(projectLink);
    }

    if (contactColumn && !contactColumn.querySelector(".footer-contact-copy")) {
      var contactHeading = contactColumn.querySelector(".footer-heading");
      var contactLink = contactColumn.querySelector("a[data-config-email]");
      var contactCopy = document.createElement("p");
      contactCopy.className = "footer-contact-copy";
      contactCopy.textContent = "Questions about the website or a submitted request? Contact our team directly.";
      if (contactHeading) contactHeading.insertAdjacentElement("afterend", contactCopy);

      var contactNote = document.createElement("p");
      contactNote.className = "footer-contact-note";
      contactNote.textContent = "Independent providers respond according to local availability.";
      if (contactLink) contactLink.insertAdjacentElement("afterend", contactNote);
      else contactColumn.appendChild(contactNote);
    }
  });
  var faqCloseTimers = new WeakMap();

  function closeFaqItem(item) {
    window.clearTimeout(faqCloseTimers.get(item));
    item.classList.remove("is-expanded");
    faqCloseTimers.set(item, window.setTimeout(function () {
      if (!item.classList.contains("is-expanded")) item.open = false;
      faqCloseTimers.delete(item);
    }, 480));
  }

  function openFaqItem(item) {
    window.clearTimeout(faqCloseTimers.get(item));
    faqCloseTimers.delete(item);
    item.open = true;
    item.querySelector(".faq-answer").getBoundingClientRect();
    item.classList.add("is-expanded");
  }

  document.querySelectorAll(".faq-column details").forEach(function (item) {
    if (item.open) item.classList.add("is-expanded");
    item.querySelector("summary").addEventListener("click", function (event) {
      event.preventDefault();
      if (item.classList.contains("is-expanded")) {
        closeFaqItem(item);
        return;
      }
      item.closest(".faq-column").querySelectorAll("details.is-expanded").forEach(function (otherItem) {
        if (otherItem !== item) closeFaqItem(otherItem);
      });
      openFaqItem(item);
    });
  });
  var servicesLink = document.querySelector('.header-nav > a[href$="#services"]');
  var servicesDropdown = null;
  var servicesToggle = null;
  var servicesPanel = null;
  var servicesHoverOpenedAt = 0;
  var mobileServicesToggle = null;
  var mobileServicesPanel = null;

  function createDropdownIndicator() {
    var indicator = document.createElement("span");
    indicator.className = "dropdown-indicator";
    indicator.setAttribute("aria-hidden", "true");
    indicator.appendChild(createIcon("plus", "dropdown-toggle-icon"));
    return indicator;
  }

  function toggleServicesDropdown(open, focusIndex) {
    if (!servicesToggle || !servicesPanel) return;
    servicesToggle.setAttribute("aria-expanded", String(open));
    servicesPanel.hidden = !open;
    if (open && typeof focusIndex === "number") {
      var links = servicesPanel.querySelectorAll("a[href]");
      if (links[focusIndex]) links[focusIndex].focus();
    }
  }

  if (servicesLink) {
    servicesDropdown = document.createElement("div");
    servicesDropdown.className = "nav-dropdown";
    servicesToggle = document.createElement("button");
    servicesToggle.type = "button";
    servicesToggle.className = "nav-dropdown-toggle";
    servicesToggle.textContent = "Services";
    servicesToggle.setAttribute("aria-expanded", "false");
    servicesToggle.setAttribute("aria-controls", "services-dropdown");
    if (servicesLink.getAttribute("aria-current") === "page") {
      servicesToggle.setAttribute("aria-current", "page");
    }
    servicesToggle.appendChild(createDropdownIndicator());

    servicesPanel = document.createElement("div");
    servicesPanel.id = "services-dropdown";
    servicesPanel.className = "nav-dropdown-menu";
    servicesPanel.setAttribute("aria-label", "Window services");
    servicesPanel.hidden = true;
    var dropdownLabel = document.createElement("p");
    dropdownLabel.className = "nav-dropdown-label";
    dropdownLabel.textContent = "Find your starting point";
    servicesPanel.appendChild(dropdownLabel);

    services.forEach(function (service) {
      var link = document.createElement("a");
      link.className = "nav-dropdown-link";
      link.href = service.href;
      if (currentPage === service.href) link.setAttribute("aria-current", "page");

      var serviceIconFrame = document.createElement("span");
      serviceIconFrame.className = "nav-dropdown-icon-frame";
      serviceIconFrame.appendChild(createIcon(service.icon, "nav-dropdown-service-icon"));

      var copy = document.createElement("span");
      copy.className = "nav-dropdown-copy";
      var title = document.createElement("span");
      title.className = "nav-dropdown-title";
      title.textContent = service.title;
      var description = document.createElement("span");
      description.className = "nav-dropdown-description";
      description.textContent = service.description;
      copy.appendChild(title);
      copy.appendChild(description);
      link.appendChild(serviceIconFrame);
      link.appendChild(copy);
      servicesPanel.appendChild(link);
    });

    servicesLink.parentNode.replaceChild(servicesDropdown, servicesLink);
    servicesDropdown.appendChild(servicesToggle);
    servicesDropdown.appendChild(servicesPanel);

    servicesToggle.addEventListener("click", function () {
      if (servicesToggle.getAttribute("aria-expanded") === "true" && Date.now() - servicesHoverOpenedAt < 350) {
        servicesHoverOpenedAt = 0;
        return;
      }
      toggleServicesDropdown(servicesToggle.getAttribute("aria-expanded") !== "true");
    });

    servicesDropdown.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        servicesHoverOpenedAt = Date.now();
        toggleServicesDropdown(true);
      }
    });

    servicesDropdown.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "mouse" && !servicesDropdown.contains(document.activeElement)) {
        toggleServicesDropdown(false);
      }
    });

    servicesDropdown.addEventListener("focusout", function () {
      window.requestAnimationFrame(function () {
        if (!servicesDropdown.contains(document.activeElement)) toggleServicesDropdown(false);
      });
    });

    servicesDropdown.addEventListener("keydown", function (event) {
      var links = Array.prototype.slice.call(servicesPanel.querySelectorAll("a[href]"));
      var currentIndex = links.indexOf(document.activeElement);

      if (event.key === "Escape") {
        if (servicesPanel.hidden) return;
        event.preventDefault();
        toggleServicesDropdown(false);
        servicesToggle.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        var offset = event.key === "ArrowDown" ? 1 : -1;
        var nextIndex = currentIndex === -1 ? (offset > 0 ? 0 : links.length - 1) : (currentIndex + offset + links.length) % links.length;
        toggleServicesDropdown(true, nextIndex);
      } else if (!servicesPanel.hidden && (event.key === "Home" || event.key === "End")) {
        event.preventDefault();
        toggleServicesDropdown(true, event.key === "Home" ? 0 : links.length - 1);
      }
    });

    document.addEventListener("pointerdown", function (event) {
      if (!servicesDropdown.contains(event.target)) toggleServicesDropdown(false);
    });
  }

  var trigger = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var previousFocus;
  var menuCloseTimer;

  if (trigger) {
    var menuMark = trigger.querySelector(".menu-mark");
    if (menuMark) {
      menuMark.classList.add("has-icons");
      menuMark.appendChild(createIcon("menu", "menu-open-icon"));
      menuMark.appendChild(createIcon("x", "menu-close-icon"));
    }
  }

  function toggleMobileServices(open, focusFirst) {
    if (!mobileServicesToggle || !mobileServicesPanel) return;
    mobileServicesToggle.setAttribute("aria-expanded", String(open));
    mobileServicesPanel.hidden = !open;
    if (open && focusFirst) {
      var firstLink = mobileServicesPanel.querySelector("a[href]");
      if (firstLink) firstLink.focus();
    }
  }

  if (menu) {
    var mobileNavigation = menu.querySelector("nav");
    var mobileServiceLinks = mobileNavigation ? Array.prototype.slice.call(mobileNavigation.querySelectorAll("a[href]")).filter(function (link) {
      return services.some(function (service) {
        return link.getAttribute("href") === service.href;
      });
    }) : [];

    if (mobileServiceLinks.length) {
      var mobileServices = document.createElement("div");
      mobileServices.className = "mobile-services";
      mobileServicesToggle = document.createElement("button");
      mobileServicesToggle.type = "button";
      mobileServicesToggle.className = "mobile-services-toggle";
      mobileServicesToggle.textContent = "Services";
      mobileServicesToggle.setAttribute("aria-expanded", "false");
      mobileServicesToggle.setAttribute("aria-controls", "mobile-services-dropdown");
      mobileServicesToggle.appendChild(createDropdownIndicator());

      mobileServicesPanel = document.createElement("div");
      mobileServicesPanel.id = "mobile-services-dropdown";
      mobileServicesPanel.className = "mobile-services-menu";
      mobileServicesPanel.hidden = true;
      mobileNavigation.insertBefore(mobileServices, mobileServiceLinks[0]);
      mobileServices.appendChild(mobileServicesToggle);
      mobileServices.appendChild(mobileServicesPanel);
      mobileServiceLinks.forEach(function (link) {
        if (link.getAttribute("aria-current") === "page") mobileServicesToggle.classList.add("is-current");
        var linkedService = services.find(function (service) {
          return service.href === link.getAttribute("href");
        });
        if (linkedService) prependIcon(link, linkedService.icon, "mobile-service-icon");
        mobileServicesPanel.appendChild(link);
      });

      mobileServicesToggle.addEventListener("click", function () {
        toggleMobileServices(mobileServicesToggle.getAttribute("aria-expanded") !== "true", false);
      });
      mobileServicesToggle.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          toggleMobileServices(true, true);
        }
      });
    }
  }

  function closeMenu(restoreFocus) {
    if (!trigger || !menu) return;
    window.clearTimeout(menuCloseTimer);
    trigger.setAttribute("aria-expanded", "false");
    trigger.querySelector(".menu-label").textContent = "Menu";
    toggleMobileServices(false, false);
    document.body.classList.remove("menu-is-open");
    menu.classList.remove("is-open");
    menu.classList.add("is-closing");

    function finishMenuClose() {
      if (trigger.getAttribute("aria-expanded") === "true") return;
      menu.hidden = true;
      menu.classList.remove("is-closing");
    }

    if (menu.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) finishMenuClose();
    else menuCloseTimer = window.setTimeout(finishMenuClose, 370);
    if (restoreFocus && previousFocus) previousFocus.focus();
  }

  function openMenu() {
    window.clearTimeout(menuCloseTimer);
    toggleServicesDropdown(false);
    previousFocus = document.activeElement;
    trigger.setAttribute("aria-expanded", "true");
    trigger.querySelector(".menu-label").textContent = "Close";
    menu.hidden = false;
    menu.classList.remove("is-closing");
    menu.getBoundingClientRect();
    menu.classList.add("is-open");
    document.body.classList.add("menu-is-open");
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }

  if (trigger && menu) {
    trigger.addEventListener("click", function () {
      trigger.getAttribute("aria-expanded") === "true" ? closeMenu(true) : openMenu();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (menu.hidden) return;
      if (event.key === "Escape") { event.preventDefault(); closeMenu(true); return; }
      if (event.key !== "Tab") return;
      var focusable = [trigger].concat(Array.prototype.slice.call(menu.querySelectorAll("a[href], button:not([disabled])")));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (event) {
      if (event.matches) closeMenu(false);
      else toggleServicesDropdown(false);
    });
  }

  var header = document.querySelector(".site-header");
  if (header && "IntersectionObserver" in window) {
    var marker = document.createElement("div");
    marker.setAttribute("aria-hidden", "true");
    marker.style.cssText = "position:absolute;top:0;width:1px;height:1px;pointer-events:none";
    document.body.prepend(marker);
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(marker);
  }

  var cookieBanner = document.querySelector(".cookie-banner");
  if (cookieBanner) {
    var cookieHeading = cookieBanner.querySelector("h2");
    if (cookieHeading && !cookieHeading.querySelector(".cookie-title-icon")) {
      prependIcon(cookieHeading, "badge-check", "cookie-title-icon");
    }
    var storedChoice = null;
    try { storedChoice = localStorage.getItem("window-match-cookie-preference"); } catch (ignore) { /* Storage may be unavailable. */ }
    if (!storedChoice) cookieBanner.hidden = false;
    cookieBanner.querySelectorAll("[data-cookie-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        try { localStorage.setItem("window-match-cookie-preference", button.getAttribute("data-cookie-choice")); } catch (ignore) { /* Essential-only operation continues. */ }
        cookieBanner.hidden = true;
      });
    });
  }

  document.querySelectorAll("[data-cookie-reset]").forEach(function (button) {
    button.addEventListener("click", function () {
      try { localStorage.removeItem("window-match-cookie-preference"); } catch (ignore) { /* Preferences can still be chosen for this visit. */ }
      if (cookieBanner) {
        cookieBanner.hidden = false;
        var heading = cookieBanner.querySelector("h2");
        if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus(); }
      }
    });
  });

  function fieldMessage(field) {
    var value = typeof field.value === "string" ? field.value.trim() : "";
    if (field.type === "checkbox" && field.required && !field.checked) return "Please agree to the Privacy Policy before submitting.";
    if (field.required && !value && field.type !== "checkbox") return "Please complete this field.";
    if (field.name === "full_name" && value && value.length < 2) return "Enter your full name using at least two characters.";
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
    if (field.name === "zip_code" && value && !/^\d{5}$/.test(value)) return "Enter a valid five-digit ZIP code.";
    if (field.name === "project_details" && value && value.length < 15) return "Please share at least 15 characters about the project.";
    if (field.maxLength > 0 && value.length > field.maxLength) return "Please shorten this answer.";
    return "";
  }

  function showFieldError(form, field, message) {
    var error = form.querySelector('[data-error-for="' + field.name + '"]');
    if (error) {
      error.textContent = message || "";
      if (message && error.id) {
        var existing = (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
        if (existing.indexOf(error.id) === -1) existing.push(error.id);
        field.setAttribute("aria-describedby", existing.join(" "));
      }
    }
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  document.querySelectorAll(".request-form").forEach(function (form) {
    form.noValidate = true;
    var startedAt = form.querySelector('[name="form_started_at"]');
    var sourcePage = form.querySelector('[name="source_page"]');
    if (startedAt) startedAt.value = String(Math.floor(Date.now() / 1000));
    if (sourcePage) sourcePage.value = window.location.pathname;

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      if (field.type === "hidden" || field.name === "company_website") return;
      field.addEventListener(field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "blur", function () {
        showFieldError(form, field, fieldMessage(field));
      });
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      var firstInvalid = null;
      form.querySelectorAll("input, select, textarea").forEach(function (field) {
        if (field.type === "hidden" || field.name === "company_website") return;
        var message = fieldMessage(field);
        showFieldError(form, field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        status.hidden = false;
        status.classList.add("is-error");
        status.setAttribute("role", "alert");
        status.textContent = "Please review the highlighted fields and try again.";
        firstInvalid.focus();
        return;
      }

      var submit = form.querySelector('[type="submit"]');
      if (submit.disabled) return;
      var originalLabel = submit.textContent;
      var submitIcon = submit.querySelector(".submit-icon");
      submit.style.minWidth = submit.offsetWidth + "px";
      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
      submit.textContent = "Submitting…";
      if (submitIcon) submit.insertBefore(submitIcon, submit.firstChild);
      status.hidden = true;

      try {
        var response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          credentials: "same-origin",
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" }
        });
        var payload = await response.json();
        if (!response.ok || !payload.ok) {
          if (payload.errors && typeof payload.errors === "object") {
            Object.keys(payload.errors).forEach(function (name) {
              var invalidField = form.elements.namedItem(name);
              if (invalidField) showFieldError(form, invalidField, String(payload.errors[name]));
            });
          }
          throw new Error(payload.message || "Your request could not be sent. Please try again later.");
        }
        form.reset();
        if (startedAt) startedAt.value = String(Math.floor(Date.now() / 1000));
        if (sourcePage) sourcePage.value = window.location.pathname;
        status.classList.remove("is-error");
        status.setAttribute("role", "status");
        status.textContent = payload.message;
        status.hidden = false;
        status.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      } catch (error) {
        status.classList.add("is-error");
        status.setAttribute("role", "alert");
        status.textContent = error.message || "Your request could not be sent. Please try again later.";
        status.hidden = false;
      } finally {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        submit.textContent = originalLabel;
        if (submitIcon) submit.insertBefore(submitIcon, submit.firstChild);
        submit.style.minWidth = "";
      }
    });
  });
})();
