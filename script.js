const buttons = document.querySelectorAll('.side-btn');
const panelArea = document.getElementById('panel-area');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const panelType = button.dataset.panel;
    panelArea.innerHTML = ""; // clear old content first

    if (panelType === "flowers") {
      panelArea.innerHTML = `
        <img src="assets/flower1.png" alt="Flower 1">
        <img src="assets/flower2.png" alt="Flower 2">
        <img src="assets/flower3.png" alt="Flower 3">
      `;
    } 
    else if (panelType === "pots") {
      panelArea.innerHTML = `
        <img src="assets/pot1.png" alt="Pot 1">
        <img src="assets/pot2.png" alt="Pot 2">
      `;
    } 
    else if (panelType === "backgrounds") {
      panelArea.innerHTML = `
        <div class="bg-option" style="background:#ffe6f2;width:60px;height:60px;border-radius:10px;"></div>
        <div class="bg-option" style="background:#e3f2fd;width:60px;height:60px;border-radius:10px;"></div>
        <div class="bg-option" style="background:#fff3e0;width:60px;height:60px;border-radius:10px;"></div>
      `;
    } 
    else if (panelType === "text") {
      panelArea.innerHTML = `<textarea placeholder="Write something sweet..."></textarea>`;
    }
  });
});
