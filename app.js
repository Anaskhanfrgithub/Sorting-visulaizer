let array = [];

function visualizeArray() {
  const input = document.getElementById("userInput").value;
  const container = document.getElementById("array");
  container.innerHTML = "";

  if (!input.trim()) {
    alert("Please enter some numbers!");
    return;
  }

  const values = input.split(",").map(num => parseInt(num.trim()));

  // Validate input
  if (values.some(isNaN)) {
    alert("Please enter valid numbers only!");
    return;
  }

  array = values;

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${array[i]}px`;
    bar.setAttribute("data-value", array[i]); // Store actual value

    // Show the number inside the bar (optional)
    bar.innerText = array[i];
    bar.style.color = "white";
    bar.style.fontSize = "10px";
    bar.style.textAlign = "center";

    container.appendChild(bar);
  }
}


function generateArray(size = 50) {
  array = [];
  const container = document.getElementById("array");
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      // Highlight the two bars being compared
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep(50); // Delay for animation

      let h1 = parseInt(bars[j].style.height);
      let h2 = parseInt(bars[j + 1].style.height);

      if (h1 > h2) {
        // Swap heights
        bars[j].style.height = `${h2}px`;
        bars[j + 1].style.height = `${h1}px`;
      }

      // Revert colors after comparison
      bars[j].style.backgroundColor = "steelblue";
      bars[j + 1].style.backgroundColor = "steelblue";
    }

    // Mark the last sorted bar
    bars[bars.length - i - 1].style.backgroundColor = "green";
  }

  // Mark the first bar as sorted
  bars[0].style.backgroundColor = "green";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "orange";

    for (let j = i + 1; j < bars.length; j++) {
      bars[j].style.backgroundColor = "red";
      await sleep(50);

      let h1 = parseInt(bars[j].style.height);
      let h2 = parseInt(bars[minIdx].style.height);

      if (h1 < h2) {
        bars[minIdx].style.backgroundColor = "steelblue";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "orange";
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }

    if (minIdx !== i) {
      let tempHeight = bars[i].style.height;
      bars[i].style.height = bars[minIdx].style.height;
      bars[minIdx].style.height = tempHeight;
    }

    bars[i].style.backgroundColor = "green";
  }
}
async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  for (let i = 1; i < bars.length; i++) {
    let key = parseInt(bars[i].style.height);
    let j = i - 1;

    bars[i].style.backgroundColor = "red";
    await sleep(100);

    while (j >= 0 && parseInt(bars[j].style.height) > key) {
      bars[j + 1].style.height = bars[j].style.height;
      bars[j].style.backgroundColor = "orange";
      j--;

      await sleep(100);
    }

    bars[j + 1].style.height = `${key}px`;

    for (let k = 0; k <= i; k++) {
      bars[k].style.backgroundColor = "green";
    }
  }
}
async function mergeSort(start = 0, end = null) {
  const bars = document.getElementsByClassName("bar");
  if (end === null) end = bars.length - 1;

  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(bars, start, mid, end);
}

async function merge(bars, start, mid, end) {
  const left = [];
  const right = [];

  for (let i = start; i <= mid; i++) {
    left.push(parseInt(bars[i].style.height));
    bars[i].style.backgroundColor = "red";
  }
  for (let i = mid + 1; i <= end; i++) {
    right.push(parseInt(bars[i].style.height));
    bars[i].style.backgroundColor = "blue";
  }

  await sleep(300);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      bars[k].style.height = `${right[j]}px`;
      j++;
    }
    bars[k].style.backgroundColor = "green";
    k++;
    await sleep(100);
  }

  while (i < left.length) {
    bars[k].style.height = `${left[i]}px`;
    bars[k].style.backgroundColor = "green";
    i++;
    k++;
    await sleep(100);
  }

  while (j < right.length) {
    bars[k].style.height = `${right[j]}px`;
    bars[k].style.backgroundColor = "green";
    j++;
    k++;
    await sleep(100);
  }
}

function mergeSortStart() {
  mergeSort(0, document.getElementsByClassName("bar").length - 1);
}
async function quickSort(start = 0, end = null) {
  const bars = document.getElementsByClassName("bar");
  if (end === null) end = bars.length - 1;

  if (start >= end) return;

  const pivotIdx = await partition(bars, start, end);
  await quickSort(start, pivotIdx - 1);
  await quickSort(pivotIdx + 1, end);
}

async function partition(bars, low, high) {
  let pivot = parseInt(bars[high].style.height);
  bars[high].style.backgroundColor = "orange";
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "red";
    await sleep(100);
    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
      bars[i].style.backgroundColor = "green";
      if (i !== j) bars[j].style.backgroundColor = "green";
      await sleep(100);
    } else {
      bars[j].style.backgroundColor = "steelblue";
    }
  }

  [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];
  bars[high].style.backgroundColor = "steelblue";
  bars[i + 1].style.backgroundColor = "green";

  return i + 1;
}

function quickSortStart() {
  quickSort(0, document.getElementsByClassName("bar").length - 1);
}

