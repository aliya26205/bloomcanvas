// 🌸 BloomCanvas Script — Final Enhanced Version with Rotation Icons & Smart Controls

const buttons = document.querySelectorAll(".side-btn");
const panelArea = document.getElementById("panel-area");
const canvasArea = document.getElementById("canvas-area");
const captureBtn = document.getElementById("capture-btn");
const clearCanvasBtn = document.getElementById("clear-canvas");

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
          color: textarea.style.color || "#000",
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

panelArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("bg-option")) {
    canvasArea.style.background = e.target.style.background;
  }
  if (e.target.tagName === "IMG") addImage(e.target.src);
});

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

// 🔘 Show active controls only on selected element
// function setActive(wrapper) {
//   canvasArea.querySelectorAll('div[style*="position: absolute"]').forEach(w => {
//     w.querySelectorAll('.delete-btn, .resize-handle, .rotate-handle').forEach(btn => btn.style.display = 'none');
//   });
//   wrapper.querySelectorAll('.delete-btn, .resize-handle, .rotate-handle').forEach(btn => btn.style.display = 'flex');
//   wrapper.addEventListener('mousedown', () => setActive(wrapper));
// }
// 🔘 Show active controls only on selected element + bring front
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

// 🖱️ Draggable
function makeDraggable(el) {
  let offsetX,
    offsetY,
    isDragging = false;
  el.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("delete-btn") ||
      e.target.classList.contains("resize-handle") ||
      e.target.classList.contains("rotate-handle")
    )
      return;
    e.preventDefault();
    isDragging = true;
    const rect = el.getBoundingClientRect();
    const canvasRect = canvasArea.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    setActive(el);
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const canvasRect = canvasArea.getBoundingClientRect();
    let x = e.clientX - canvasRect.left - offsetX;
    let y = e.clientY - canvasRect.top - offsetY;
    x = Math.max(0, Math.min(x, canvasArea.clientWidth - el.offsetWidth));
    y = Math.max(0, Math.min(y, canvasArea.clientHeight - el.offsetHeight));
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.transform = "translate(0,0)";
  });
  document.addEventListener("mouseup", () => (isDragging = false));
}

// ↔️ Resize
function makeResizable(wrapper) {
  const handle = document.createElement("div");
  handle.classList.add("resize-handle");
  handle.innerHTML = "↔️";
  Object.assign(handle.style, {
    width: "20px",
    height: "20px",
    background: "#333",
    color: "#fff",
    fontSize: "12px",
    position: "absolute",
    right: "-10px",
    bottom: "-10px",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    cursor: "se-resize",
    borderRadius: "50%",
  });
  wrapper.appendChild(handle);

  let isResizing = false;
  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isResizing = true;
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const rect = wrapper.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;
    const target = wrapper.querySelector(".resizable");
    if (target.tagName === "IMG") {
      target.style.width = newWidth + "px";
    } else {
      target.style.fontSize = Math.max(10, newHeight / 3) + "px";
    }
  });
  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.userSelect = "";
  });
}

// 🔄 Rotate (with icon)
function makeRotatable(wrapper) {
  const rotateHandle = document.createElement("div");
  rotateHandle.classList.add("rotate-handle");
  rotateHandle.innerHTML = "⟳";
  Object.assign(rotateHandle.style, {
    width: "20px",
    height: "20px",
    background: "#4a90e2",
    color: "#fff",
    fontSize: "14px",
    position: "absolute",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "grab",
    zIndex: "10",
  });
  wrapper.appendChild(rotateHandle);

  let isRotating = false;
  let startAngle = 0;

  rotateHandle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isRotating = true;
    document.body.style.userSelect = "none";
    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startX = e.clientX - centerX;
    const startY = e.clientY - centerY;
    startAngle =
      Math.atan2(startY, startX) - (parseFloat(wrapper.dataset.rotation) || 0);
    wrapper.dataset.centerX = centerX;
    wrapper.dataset.centerY = centerY;
    setActive(wrapper);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isRotating) return;
    const centerX = parseFloat(wrapper.dataset.centerX);
    const centerY = parseFloat(wrapper.dataset.centerY);
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x) - startAngle;
    wrapper.dataset.rotation = angle;
    wrapper.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
  });

  document.addEventListener("mouseup", () => {
    isRotating = false;
    document.body.style.userSelect = "";
  });
}

// 📸 Capture Canvas
// const hideElems = document.querySelectorAll('.delete-btn, .resize-handle, .rotate-handle');
// captureBtn.addEventListener('click', () => {
//   hideElems.forEach(e => (e.style.display = 'none'));

//   html2canvas(canvasArea).then(canvas => {
//     const link = document.createElement('a');
//     link.download = 'my-bloom-design.png';
//     link.href = canvas.toDataURL();
//     link.click();
//     hideElems.forEach(e => (e.style.display = 'flex'));
//   });
// });
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
