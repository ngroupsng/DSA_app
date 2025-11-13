const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
// Tab switching
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  // Bubble Sort Visualizer
  let array = [5, 2, 8, 1, 4];
  const blocksContainer = document.getElementById("blocks-container");
  const iValue = document.getElementById("i-value");
  const jValue = document.getElementById("j-value");
  const codeSnippet = document.getElementById("bubble-code");
  const userArrayInput = document.getElementById("user-array");

  const setArrayBtn = document.getElementById("set-array");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");

  let speed = 500; // ms per step

  function renderBlocks(arr, highlight = {}) {
    blocksContainer.innerHTML = "";
    arr.forEach((num, idx) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.textContent = num;

      if (highlight.compare?.includes(idx)) block.classList.add("compare");
      if (highlight.swap?.includes(idx)) block.classList.add("swap");
      if (highlight.sorted?.includes(idx)) block.classList.add("sorted");

      blocksContainer.appendChild(block);
    });
  }

  setArrayBtn.addEventListener("click", () => {
    const val = userArrayInput.value.trim();
    if (val) {
      array = val.split(",").map(Number);
      renderBlocks(array);
      iValue.textContent = 0;
      jValue.textContent = 0;
      resetCodeHighlight();
    }
  });

  function highlightCode(line) {
    const lines = codeSnippet.querySelector("code").textContent.split("\n");
    codeSnippet.innerHTML = "";
    lines.forEach((l, idx) => {
      const codeLine = document.createElement("div");
      codeLine.textContent = l;
      if (idx === line) codeLine.classList.add("highlight");
      codeSnippet.appendChild(codeLine);
    });
  }

  function resetCodeHighlight() {
    highlightCode(-1);
  }

  async function bubbleSortVisualizer(arr) {
    const n = arr.length;
    let sortedIndices = [];
    for (let i = 0; i < n; i++) {
      iValue.textContent = i;
      for (let j = 0; j < n - i - 1; j++) {
        jValue.textContent = j;
        highlightCode(2); // if condition line
        renderBlocks(arr, { compare: [j, j + 1], sorted: sortedIndices });
        await new Promise(r => setTimeout(r, speed));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          highlightCode(3); // swap line
          renderBlocks(arr, { swap: [j, j + 1], sorted: sortedIndices });
          await new Promise(r => setTimeout(r, speed));
        }
      }
      sortedIndices.push(n - i - 1);
      renderBlocks(arr, { sorted: sortedIndices });
    }
    renderBlocks(arr, { sorted: arr.map((_, i) => i) });
    resetCodeHighlight();
  }

  startBtn.addEventListener("click", () => {
    bubbleSortVisualizer([...array]);
  });

  resetBtn.addEventListener("click", () => {
    renderBlocks(array);
    iValue.textContent = 0;
    jValue.textContent = 0;
    resetCodeHighlight();
  });

  // Initial render
  renderBlocks(array);
});
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      target.classList.add("active");
    });
  });

  // Only run visualizer logic on the bubble sort page
  const blocksContainer = document.getElementById("blocks-container");
  if (!blocksContainer) return;

  let array = [5, 2, 8, 1, 4];
  const iValue = document.getElementById("i-value");
  const jValue = document.getElementById("j-value");
  const codeSnippet = document.getElementById("bubble-code");
  const userArrayInput = document.getElementById("user-array");
  const setArrayBtn = document.getElementById("set-array");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  let speed = 600;

  function renderBlocks(arr, highlight = {}) {
    blocksContainer.innerHTML = "";
    arr.forEach((num, idx) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.height = num * 20 + "px";
      block.textContent = num;
      if (highlight.compare?.includes(idx)) block.classList.add("compare");
      if (highlight.swap?.includes(idx)) block.classList.add("swap");
      if (highlight.sorted?.includes(idx)) block.classList.add("sorted");
      blocksContainer.appendChild(block);
    });
  }

  function highlightCode(line) {
    const lines = codeSnippet.querySelector("code").textContent.split("\n");
    codeSnippet.innerHTML = "";
    lines.forEach((l, idx) => {
      const div = document.createElement("div");
      div.textContent = l;
      if (idx === line) div.classList.add("highlight");
      codeSnippet.appendChild(div);
    });
  }

  setArrayBtn.addEventListener("click", () => {
    const val = userArrayInput.value.trim();
    if (val) {
      array = val.split(",").map(Number);
      renderBlocks(array);
      iValue.textContent = 0;
      jValue.textContent = 0;
      highlightCode(-1);
    }
  });

  async function bubbleSortVisualizer(arr) {
    const n = arr.length;
    let sortedIndices = [];
    for (let i = 0; i < n; i++) {
      iValue.textContent = i;
      for (let j = 0; j < n - i - 1; j++) {
        jValue.textContent = j;
        highlightCode(2);
        renderBlocks(arr, { compare: [j, j + 1], sorted: sortedIndices });
        await new Promise(r => setTimeout(r, speed));

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          highlightCode(3);
          renderBlocks(arr, { swap: [j, j + 1], sorted: sortedIndices });
          await new Promise(r => setTimeout(r, speed));
        }
      }
      sortedIndices.push(n - i - 1);
      renderBlocks(arr, { sorted: sortedIndices });
    }
    renderBlocks(arr, { sorted: arr.map((_, i) => i) });
    highlightCode(-1);
  }

  startBtn.addEventListener("click", () => bubbleSortVisualizer([...array]));
  resetBtn.addEventListener("click", () => {
    renderBlocks(array);
    iValue.textContent = 0;
    jValue.textContent = 0;
    highlightCode(-1);
  });

  renderBlocks(array);
});
function startBubbleSort() {
  const input = document.getElementById("userArray").value;
  let arr = input ? input.split(",").map(Number) : [5, 3, 8, 4, 2];
  visualizeArray(arr);

  let codeLines = document.getElementById("code").innerText.split("\n");
  let container = document.getElementById("array-container");
  let bars = Array.from(container.children);

  let i = 0, j = 0;
  function step() {
    if (i < arr.length - 1) {
      if (j < arr.length - i - 1) {
        highlightCode(3);
        bars[j].style.background = "#ff5959";
        bars[j+1].style.background = "#ff5959";

        if (arr[j] > arr[j + 1]) {
          highlightCode(4);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          visualizeArray(arr);
        }

        setTimeout(() => {
          bars[j].style.background = "#0077ff";
          bars[j+1].style.background = "#0077ff";
          j++;
          step();
        }, 600);
      } else {
        j = 0;
        i++;
        step();
      }
    }
  }
  step();
}

function visualizeArray(arr) {
  let container = document.getElementById("array-container");
  container.innerHTML = "";
  arr.forEach(num => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = num * 20 + "px";
    bar.innerText = num;
    container.appendChild(bar);
  });
}

function highlightCode(lineNumber) {
  const code = document.getElementById("code");
  const lines = code.innerText.split("\n");
  code.innerHTML = lines.map((line, i) =>
    `<div style="background:${i===lineNumber ? '#fff176':'transparent'}">${line}</div>`
  ).join("");
}
