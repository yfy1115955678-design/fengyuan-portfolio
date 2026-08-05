(function () {
  "use strict";

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var cursor = document.createElement("div");
  cursor.className = "cat-cursor";
  var img = document.createElement("img");
  img.src = "/assets/cat-cursor-icon.png";
  img.alt = "";
  cursor.appendChild(img);
  cursor.style.left = "-100px";
  cursor.style.top = "-100px";

  function ensureCursor() {
    if (!cursor.parentNode) {
      document.documentElement.appendChild(cursor);
    }
    if (!document.documentElement.classList.contains("cat-cursor-ready")) {
      document.documentElement.classList.add("cat-cursor-ready");
    }
  }

  ensureCursor();

  var observer = new MutationObserver(function () {
    ensureCursor();
  });
  observer.observe(document.documentElement, { childList: true, subtree: false, attributes: true, attributeFilter: ["class"] });

  var mouseX = 0,
    mouseY = 0;
  var curX = 0,
    curY = 0;
  var rafId = null;

  function animate() {
    curX += (mouseX - curX) * 0.35;
    curY += (mouseY - curY) * 0.35;
    cursor.style.left = curX + "px";
    cursor.style.top = curY + "px";
    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) animate();
  });

  var hoverSelector =
    'a, button, [role="button"], input, textarea, select, label, [tabindex], .project-card, .hero-feature';

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.add("hover");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.remove("hover");
    }
  });

  document.addEventListener("mousedown", function (e) {
    cursor.classList.remove("click");
    void cursor.offsetWidth;
    cursor.classList.add("click");

    var ripple = document.createElement("div");
    ripple.className = "cat-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.documentElement.appendChild(ripple);
    setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 500);
  });

  document.addEventListener("mouseup", function () {
    setTimeout(function () {
      cursor.classList.remove("click");
    }, 200);
  });

  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    cursor.style.opacity = "1";
  });
})();
