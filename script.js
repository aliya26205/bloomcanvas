// 🌸 BloomCanvas Script — Final Enhanced Version with Rotation Icons & Smart Controls

const buttons = document.querySelectorAll(".side-btn");
const panelArea = document.getElementById("panel-area");
const canvasArea = document.getElementById("canvas-area");
const captureBtn = document.getElementById("capture-btn");
const clearCanvasBtn = document.getElementById("clear-canvas");

function getEventXY(e) {
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }
  return { x: e.clientX, y: e.clientY };
}


// 🌼 Handle side button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelType = button.dataset.panel;
    panelArea.innerHTML = "";

    if (panelType === "flowers") {
      panelArea.innerHTML = `
        <img src="assets/flower1.png">
        <img src="assets/flower2.png">
        <img src="assets/flower3.png">
        <img src="assets/flower4.png">
        <img src="assets/flower5.png">
        <img src="assets/flower6.png">
        <img src="assets/flower7.png">
        <img src="assets/flower8.png">
        <img src="assets/flower9.png">
        <img src="assets/flower10.png">
        <img src="assets/flower11.png">
        <img src="assets/flower13.png">
        <img src="assets/flower14.png">
        <img src="assets/flower15.png">
        <img src="assets/flower16.png">
      `;
    } else if (panelType === "pots") {
      panelArea.innerHTML = `
        <img src="assets/pot1.png">
        <img src="assets/pot2.png">
        <img src="assets/pot3.png">
        <img src="assets/pot4.png">
        <img src="assets/pot5.png">
        <img src="assets/pot6.png">
        <img src="assets/pot7.png">
        <img src="assets/pot8.png">
        <img src="assets/pot9.png">
        <img src="assets/pot10.png">
        <img src="assets/pot11.png">
        <img src="assets/pot12.png">
      `;
    } else if (panelType === "backgrounds") {
      panelArea.innerHTML = `
       <div class="bg-option" style="background:#FDE7EC;"></div>   <!-- pastel pink -->
<div class="bg-option" style="background:#FFE9D6;"></div>   <!-- peach cream -->
<div class="bg-option" style="background:#FFF6D8;"></div>   <!-- pastel yellow -->
<div class="bg-option" style="background:#E4F6E9;"></div>   <!-- mint green -->
<div class="bg-option" style="background:#DFF7F5;"></div>   <!-- aqua mint -->
<div class="bg-option" style="background:#E6F0FF;"></div>   <!-- baby blue -->
<div class="bg-option" style="background:#ECE6FF;"></div>   <!-- soft lavender -->
<div class="bg-option" style="background:#F7E6FF;"></div>   <!-- lilac rose -->
<div class="bg-option" style="background:#FFE5F3;"></div>   <!-- pastel rose -->
<div class="bg-option" style="background:#F6EDE6;"></div>   <!-- nude beige -->
<div class="bg-option" style="background:#E8F4F9;"></div>   <!-- sky mist -->

<div class="bg-option no-bg">
    <span class="no-bg-mark">✕</span>
</div>

      `;
    } else if (panelType === "text") {
      panelArea.innerHTML = `
        <div class="text-panel">
          <textarea id="temp-text" class="message-input" placeholder="Write something sweet..."></textarea>
          <div class="text-controls">
            <label>Color: <input type="color" id="text-color" value="#000000"></label>
            <select id="font-family">
              <option value="Poppins">Poppins</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Comic Sans MS">Comic Sans</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            <button id="bold-btn"><b>B</b></button>
            <button id="italic-btn"><i>I</i></button>
            <button id="underline-btn"><u>U</u></button>
          </div>
          <button id="text-ok-btn">OK</button>
        </div>
      `;

      const textarea = document.getElementById("temp-text");
      const colorPicker = document.getElementById("text-color");
      const fontSelect = document.getElementById("font-family");
      const boldBtn = document.getElementById("bold-btn");
      const italicBtn = document.getElementById("italic-btn");
      const underlineBtn = document.getElementById("underline-btn");

      colorPicker.addEventListener(
        "input",
        () => (textarea.style.color = colorPicker.value)
      );
      fontSelect.addEventListener(
        "change",
        () => (textarea.style.fontFamily = fontSelect.value)
      );
      boldBtn.addEventListener(
        "click",
        () =>
        (textarea.style.fontWeight =
          textarea.style.fontWeight === "bold" ? "normal" : "bold")
      );
      italicBtn.addEventListener(
        "click",
        () =>
        (textarea.style.fontStyle =
          textarea.style.fontStyle === "italic" ? "normal" : "italic")
      );
      underlineBtn.addEventListener(
        "click",
        () =>
        (textarea.style.textDecoration =
          textarea.style.textDecoration === "underline"
            ? "none"
            : "underline")
      );

      document.getElementById("text-ok-btn").addEventListener("click", () => {
        if (!textarea.value.trim()) return;
        const textStyles = {
          //color: textarea.style.color || "#000",
         // color: textarea.style.color || colorPicker.value || "#000",
          color: colorPicker.value, 
          fontFamily: textarea.style.fontFamily || "Poppins",
          fontWeight: textarea.style.fontWeight || "normal",
          fontStyle: textarea.style.fontStyle || "normal",
          textDecoration: textarea.style.textDecoration || "none",
        };
        addText(textarea.value, textStyles);
        panelArea.innerHTML = "";
      });
    }
  });
});

function handlePanelClick(e) {
  let target = e.target;

  // Fix mobile touch issues
  if (target.closest(".bg-option")) {
    target = target.closest(".bg-option");
  } else if (target.closest("img")) {
    target = target.closest("img");
  } else {
    return;
  }

  if (target.classList.contains("bg-option")) {
    canvasArea.style.background = target.style.background;
    canvasArea.style.backgroundImage = "none";
  } else if (target.tagName === "IMG") {
    addImage(target.src);
  }
}

// function handlePanelClick(e) {
//   //e.preventDefault();

//   const target = e.target.closest(".bg-option, img");
//   if (!target) return;

//   if (target.classList.contains("bg-option")) {
//     canvasArea.style.background = target.style.background;
//     canvasArea.style.backgroundImage = "none";
//   } else if (target.tagName === "IMG") {
//     addImage(target.src);
//   }
// }

panelArea.addEventListener("click", handlePanelClick);
//panelArea.addEventListener("touchstart", handlePanelClick, { passive: false });


// 🖼️ Add Image
function addImage(src) {
  const wrapper = createWrapper();
  const img = document.createElement("img");
  img.src = src;
  img.style.width = "120px";
  img.style.height = "auto";
  img.style.objectFit = "contain";
  img.classList.add("resizable");
  img.style.userSelect = "none";
  wrapper.appendChild(img);
  canvasArea.appendChild(wrapper);

  if (src.includes("flower")) wrapper.style.zIndex = 2;
  else if (src.includes("pot")) wrapper.style.zIndex = 3;

  makeDraggable(wrapper);
  makeResizable(wrapper);
  makeRotatable(wrapper);
  setActive(wrapper);
}

// ✍️ Add Styled Text
function addText(text, styleObj) {
  const wrapper = createWrapper();
  const div = document.createElement("div");
  div.textContent = text;
  Object.assign(div.style, {
    fontSize: "20px",
    color: styleObj.color,
    fontFamily: styleObj.fontFamily,
    fontWeight: styleObj.fontWeight,
    fontStyle: styleObj.fontStyle,
    textDecoration: styleObj.textDecoration,
    padding: "5px",
    userSelect: "none",
  });
  div.classList.add("resizable");
  wrapper.style.zIndex = 4;
  wrapper.appendChild(div);
  canvasArea.appendChild(wrapper);
  makeDraggable(wrapper);
  makeResizable(wrapper);
  makeRotatable(wrapper);
  setActive(wrapper);
}

// 🧩 Create draggable wrapper with control icons
function createWrapper() {
  const wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.left = "50%";
  wrapper.style.top = "50%";
  wrapper.style.transform = "translate(-50%, -50%)";
  wrapper.style.cursor = "move";
  wrapper.style.display = "inline-block";

  const delBtn = document.createElement("div");
  delBtn.innerHTML = "✖";
  delBtn.classList.add("delete-btn");
  Object.assign(delBtn.style, {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "red",
    color: "white",
    width: "20px",
    height: "20px",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: "10",
  });
  delBtn.addEventListener("click", () => wrapper.remove());
  wrapper.appendChild(delBtn);

  return wrapper;
}


function setActive(wrapper) {
  // Bring selected element to front
  let maxZ = 0;
  document.querySelectorAll("#canvas-area > div").forEach((el) => {
    maxZ = Math.max(maxZ, parseInt(el.style.zIndex) || 0);
  });
  wrapper.style.zIndex = maxZ + 1;

  // Hide controls for all objects
  canvasArea
    .querySelectorAll('div[style*="position: absolute"]')
    .forEach((w) => {
      w.querySelectorAll(".delete-btn, .resize-handle, .rotate-handle").forEach(
        (btn) => (btn.style.display = "none")
      );
    });

  // Show controls for selected object
  wrapper
    .querySelectorAll(".delete-btn, .resize-handle, .rotate-handle")
    .forEach((btn) => (btn.style.display = "flex"));

  wrapper.addEventListener("mousedown", () => setActive(wrapper));
}


function makeDraggable(el) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  function startDrag(e) {
    if (
      e.target.classList.contains("delete-btn") ||
      e.target.classList.contains("resize-handle") ||
      e.target.classList.contains("rotate-handle")
    ) return;

    e.preventDefault();
    isDragging = true;

    const pos = getEventXY(e);
    const rect = el.getBoundingClientRect();

    offsetX = pos.x - rect.left;
    offsetY = pos.y - rect.top;

    setActive(el);
  }

  function onDragMove(e) {
    if (!isDragging) return;

    const pos = getEventXY(e);
    const canvasRect = canvasArea.getBoundingClientRect();

    let x = pos.x - canvasRect.left - offsetX;
    let y = pos.y - canvasRect.top - offsetY;

    x = Math.max(0, Math.min(x, canvasArea.clientWidth - el.offsetWidth));
    y = Math.max(0, Math.min(y, canvasArea.clientHeight - el.offsetHeight));

    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.transform = "translate(0,0)";
  }

  function stopDrag() {
    isDragging = false;
  }

  // Mouse events
  el.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", stopDrag);

  // Touch events
  el.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", onDragMove, { passive: false });
  document.addEventListener("touchend", stopDrag);
  document.addEventListener("touchcancel", stopDrag);
}



function makeResizable(wrapper) {
  const handle = document.createElement("div");
  handle.classList.add("resize-handle");
  handle.innerHTML = "↔️";

  Object.assign(handle.style, {
    width: "24px",
    height: "24px",
    background: "#333",
    color: "#fff",
    fontSize: "12px",
    position: "absolute",
    right: "-12px",
    bottom: "-12px",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    cursor: "se-resize",
    borderRadius: "50%",
    zIndex: "10",
    touchAction: "none"
  });

  wrapper.appendChild(handle);

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  function startResize(e) {
    e.stopPropagation();
    e.preventDefault();
    isResizing = true;

    const pos = getEventXY(e);
    startX = pos.x;

    const target = wrapper.querySelector(".resizable");
    startWidth = target.offsetWidth;
  }

  function onResize(e) {
    if (!isResizing) return;

    const pos = getEventXY(e);
    const dx = pos.x - startX;
    const target = wrapper.querySelector(".resizable");

    if (target.tagName === "IMG") {
      target.style.width = Math.max(40, startWidth + dx) + "px";
    } else {
      target.style.fontSize = Math.max(12, (startWidth + dx) / 3) + "px";
    }
  }

  function stopResize() {
    isResizing = false;
  }

  // Mouse
  handle.addEventListener("mousedown", startResize);
  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", stopResize);

  // Touch
  handle.addEventListener("touchstart", startResize, { passive: false });
  document.addEventListener("touchmove", onResize, { passive: false });
  document.addEventListener("touchend", stopResize);
  document.addEventListener("touchcancel", stopResize);
}


function makeRotatable(wrapper) {
  const rotateHandle = document.createElement("div");
  rotateHandle.classList.add("rotate-handle");
  rotateHandle.innerHTML = "⟳";

  Object.assign(rotateHandle.style, {
    width: "24px",
    height: "24px",
    background: "#4a90e2",
    color: "#fff",
    fontSize: "14px",
    position: "absolute",
    top: "-28px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "grab",
    zIndex: "10",
    touchAction: "none"
  });

  wrapper.appendChild(rotateHandle);

  let isRotating = false;
  let centerX = 0;
  let centerY = 0;
  let startAngle = 0;

  function startRotate(e) {
    e.preventDefault();
    e.stopPropagation();
    isRotating = true;

    const rect = wrapper.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;

    const pos = getEventXY(e);
    startAngle =
      Math.atan2(pos.y - centerY, pos.x - centerX) -
      (parseFloat(wrapper.dataset.rotation) || 0);

    setActive(wrapper);
  }

  function onRotate(e) {
    if (!isRotating) return;

    const pos = getEventXY(e);
    const angle =
      Math.atan2(pos.y - centerY, pos.x - centerX) - startAngle;

    wrapper.dataset.rotation = angle;
    wrapper.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
  }

  function stopRotate() {
    isRotating = false;
  }

  // Mouse
  rotateHandle.addEventListener("mousedown", startRotate);
  document.addEventListener("mousemove", onRotate);
  document.addEventListener("mouseup", stopRotate);

  // Touch
  rotateHandle.addEventListener("touchstart", startRotate, { passive: false });
  document.addEventListener("touchmove", onRotate, { passive: false });
  document.addEventListener("touchend", stopRotate);
  document.addEventListener("touchcancel", stopRotate);
}







captureBtn.addEventListener("click", () => {
  // Re-select control icons each time before capturing
  const hideElems = canvasArea.querySelectorAll(
    ".delete-btn, .resize-handle, .rotate-handle"
  );

  // Hide all control icons
  hideElems.forEach((e) => (e.style.display = "none"));

  html2canvas(canvasArea).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-bloom-design.png";
    link.href = canvas.toDataURL();
    link.click();

    // Restore controls after capture
    hideElems.forEach((e) => (e.style.display = "flex"));
  });
});

// 🧼 Clear Canvas (includes background)
clearCanvasBtn.addEventListener("click", () => {
  canvasArea.innerHTML = "";
  canvasArea.style.background = "";
});

// Hide controls when clicking empty canvas
canvasArea.addEventListener("mousedown", (e) => {
  if (e.target === canvasArea) {
    canvasArea
      .querySelectorAll('div[style*="position: absolute"]')
      .forEach((w) => {
        w.querySelectorAll(
          ".delete-btn, .resize-handle, .rotate-handle"
        ).forEach((btn) => {
          btn.style.display = "none";
        });
      });
  }
});
// BG & text-panel hookup (add at bottom of script.js)
document.addEventListener('DOMContentLoaded', () => {
  const canvasArea = document.getElementById('canvas-area');
  if (!canvasArea) return;

  // helper to set background (color or image)
  function setCanvasBackground(value) {
    if (!value) return;
    // if looks like a color (# or rgb)
    if (/^#|^rgb|^hsl/.test(value)) {
      canvasArea.style.backgroundImage = 'none';
      canvasArea.style.backgroundColor = value;
    } else {
      // otherwise treat as image url (or src)
      canvasArea.style.backgroundImage = `url("${value}")`;
      canvasArea.style.backgroundSize = 'cover';
      canvasArea.style.backgroundPosition = 'center';
      canvasArea.style.backgroundColor = '';
    }
  }

  // click handlers for .bg-option elements
  document.querySelectorAll('.bg-option').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      // prefer data-bg attribute, then data-type, then contained img src
      const bg = el.dataset.bg || '';
      const img = el.querySelector('img');
      if (bg) setCanvasBackground(bg);
      else if (img && img.src) setCanvasBackground(img.src);
    });
  });

  // also allow clicking images inside panel-area (thumbnails) to set bg (if desired)
  document.querySelectorAll('.panel-area img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      // if image has data-bg then use that, otherwise use its src as background
      const bg = img.dataset.bg || img.src || null;
      if (bg) setCanvasBackground(bg);
    });
  });

  // color input preview inside text-panel (if present)
  const colorInput = document.querySelector('.text-panel input[type="color"]');
  if (colorInput) {
    colorInput.addEventListener('input', (e) => {
      const preview = document.querySelector('.text-color-preview');
      if (preview) preview.style.background = e.target.value;
    });
  }

});
