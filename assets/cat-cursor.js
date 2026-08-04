(function () {
  "use strict";

  // 仅在支持 hover 的设备上启用
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var cursor = document.createElement("div");
  cursor.className = "cat-cursor";
  var img = document.createElement("img");
  img.src = "/assets/cat-cursor-icon.png";
  img.alt = "";
  cursor.appendChild(img);
  cursor.style.left = "-100px";
  cursor.style.top = "-100px";
  document.body.appendChild(cursor);

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

  // 悬停在可交互元素上
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

  // 点击动效 + 涟漪
  document.addEventListener("mousedown", function (e) {
    cursor.classList.remove("click");
    void cursor.offsetWidth; // 强制重排以重启动画
    cursor.classList.add("click");

    var ripple = document.createElement("div");
    ripple.className = "cat-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 500);
  });

  document.addEventListener("mouseup", function () {
    setTimeout(function () {
      cursor.classList.remove("click");
    }, 200);
  });

  // 鼠标离开窗口时隐藏
  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function () {
    cursor.style.opacity = "1";
  });
})();
