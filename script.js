const buttons = document.querySelectorAll('.side-btn');
const panelArea = document.getElementById('panel-area');
const canvasArea = document.getElementById('canvas-area');
const captureBtn = document.getElementById('capture-btn');
const clearCanvasBtn = document.getElementById('clear-canvas');

// Panel button click
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const panelType = button.dataset.panel;
    panelArea.innerHTML = "";

    if (panelType === "flowers") {
      panelArea.innerHTML = `
        <img src="assets/flower1.png">
        <img src="assets/flower2.png">
        <img src="assets/flower3.png">
        <img src="assets/flower4.png">
      `;
    } 
    else if (panelType === "pots") {
      panelArea.innerHTML = `
        <img src="assets/pot1.png">
        <img src="assets/pot2.png">
      `;
    } 
    else if (panelType === "backgrounds") {
      panelArea.innerHTML = `
        <div class="bg-option" style="background:#ffe6f2;"></div>
        <div class="bg-option" style="background:#e3f2fd;"></div>
        <div class="bg-option" style="background:#fff3e0;"></div>
      `;
    } 
    else if (panelType === "text") {
      panelArea.innerHTML = `
        <textarea id="temp-text" class="message-input" placeholder="Write something sweet..."></textarea>
        <button id="text-ok-btn">OK</button>
      `;
      document.getElementById('text-ok-btn').addEventListener('click', () => {
        const input = document.getElementById('temp-text');
        if (!input.value.trim()) return;
        addText(input.value);
        panelArea.innerHTML = '';
      });
    }
  });
});

// Add image or background from panel
panelArea.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') addImage(e.target.src);
  if (e.target.classList.contains('bg-option')) canvasArea.style.background = e.target.style.background;
});

// Add Image
function addImage(src) {
  const wrapper = createWrapper();
  const img = document.createElement('img');
  img.src = src;
  img.style.width = '100px';
  img.style.height = '100px';
  wrapper.appendChild(img);

  canvasArea.appendChild(wrapper);
  makeDraggable(wrapper);
}

// Add Text
function addText(text) {
  const wrapper = createWrapper();
  const div = document.createElement('div');
  div.textContent = text;
  div.style.fontSize = '20px';
  div.style.color = '#b84d7a';
  div.style.padding = '5px';
  div.style.userSelect = 'none';
  wrapper.appendChild(div);

  canvasArea.appendChild(wrapper);
  makeDraggable(wrapper);
}

// Create wrapper with delete button & resize
function createWrapper() {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.left = '50%';
  wrapper.style.top = '50%';
  wrapper.style.transform = 'translate(-50%, -50%)';
  wrapper.style.cursor = 'move';
  wrapper.style.resize = 'both';
  wrapper.style.overflow = 'hidden';
  wrapper.style.display = 'inline-block';
  wrapper.style.minWidth = '50px';
  wrapper.style.minHeight = '50px';

  // Delete button
  const delBtn = document.createElement('div');
  delBtn.textContent = '×';
  delBtn.style.position = 'absolute';
  delBtn.style.top = '0';
  delBtn.style.right = '0';
  delBtn.style.background = 'red';
  delBtn.style.color = 'white';
  delBtn.style.fontWeight = 'bold';
  delBtn.style.cursor = 'pointer';
  delBtn.style.width = '20px';
  delBtn.style.height = '20px';
  delBtn.style.display = 'flex';
  delBtn.style.justifyContent = 'center';
  delBtn.style.alignItems = 'center';
  delBtn.style.borderRadius = '50%';
  delBtn.style.zIndex = '10';
  delBtn.addEventListener('click', () => {
    wrapper.remove();
  });

  wrapper.appendChild(delBtn);
  return wrapper;
}

// Drag function
function makeDraggable(el) {
  let offsetX, offsetY, isDragging = false;

  el.addEventListener('mousedown', e => {
    if (e.target.textContent === '×') return; // ignore delete button
    e.preventDefault();
    isDragging = true;
    const rect = el.getBoundingClientRect();
    const canvasRect = canvasArea.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    el.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const canvasRect = canvasArea.getBoundingClientRect();
    let x = e.clientX - canvasRect.left - offsetX;
    let y = e.clientY - canvasRect.top - offsetY;

    x = Math.max(0, Math.min(x, canvasArea.clientWidth - el.offsetWidth));
    y = Math.max(0, Math.min(y, canvasArea.clientHeight - el.offsetHeight));

    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.transform = 'translate(0,0)';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    el.style.zIndex = '';
  });
}

// Capture
captureBtn.addEventListener('click', () => {
  html2canvas(canvasArea).then(canvas => {
    const link = document.createElement('a');
    link.download = 'my-bloom-design.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Clear canvas
clearCanvasBtn.addEventListener('click', () => canvasArea.innerHTML = '');
