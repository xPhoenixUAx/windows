(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("motion-ready");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
  document.querySelectorAll(".reveal-on-scroll").forEach(function (element) { observer.observe(element); });

  var parallaxSection = document.querySelector(".about-section");
  var parallaxFrame = 0;
  function updateParallax() {
    parallaxFrame = 0;
    if (!parallaxSection || reduced.matches) return;
    var bounds = parallaxSection.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
    var progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
    var offset = (0.5 - Math.max(0, Math.min(1, progress))) * 72;
    parallaxSection.style.setProperty("--about-parallax-y", offset.toFixed(2) + "px");
  }
  function requestParallaxUpdate() {
    if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
  }
  if (parallaxSection) {
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    requestParallaxUpdate();
  }

  reduced.addEventListener("change", function (event) {
    if (event.matches) {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
      if (parallaxSection) parallaxSection.style.setProperty("--about-parallax-y", "0px");
    }
  });
})();
