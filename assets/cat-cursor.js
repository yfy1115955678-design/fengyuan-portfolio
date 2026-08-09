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
  document.documentElement.appendChild(cursor);

  var mouseX = 0,
    mouseY = 0;
  var curX = -100,
    curY = -100;
  var rafId = null;
  var threshold = 0.5;

  function animate() {
    curX += (mouseX - curX) * 0.35;
    curY += (mouseY - curY) * 0.35;
    cursor.style.left = curX + "px";
    cursor.style.top = curY + "px";

    if (Math.abs(mouseX - curX) < threshold && Math.abs(mouseY - curY) < threshold) {
      curX = mouseX;
      curY = mouseY;
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(animate);
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
