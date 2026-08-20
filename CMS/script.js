const originalCategories = [
  {
    id: "automation",
    title: "Process automation",
    description: "How consistently do routine tasks move forward without manual chasing?",
    questions: [
      { text: "How are recurring tasks, approvals and handovers managed?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "How often is the same information copied from one step or file to another?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "systems",
    title: "Systems & integration",
    description: "Can your core systems share information reliably?",
    questions: [
      { text: "How connected are your CRM, accounting, inventory or operations systems?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "When a process changes, how easily can your systems and team follow the new workflow?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "data",
    title: "Data quality",
    description: "Can people trust the information they use to make decisions?",
    questions: [
      { text: "How consistent are customer, product and supplier records across your files and systems?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "How much time is spent checking, correcting or reconciling data?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "sales",
    title: "Sales & customer processes",
    description: "Does every customer enquiry receive timely, visible and consistent follow-up?",
    questions: [
      { text: "How are leads, quotations and follow-ups tracked from first contact to close?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "How quickly can a team member see a customer’s history, open requests and next step?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "operations",
    title: "Operations & finance",
    description: "Are core fulfilment and financial controls consistent enough to scale?",
    questions: [
      { text: "How standardised are purchasing, fulfilment, invoicing and payment processes?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "How easy is it to see order status, cash position and operational exceptions?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "reporting",
    title: "Reporting & visibility",
    description: "Can leaders get a dependable view of performance without spreadsheet hunting?",
    questions: [
      { text: "How much manual work is needed to prepare regular management reports?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "Can you trace a report figure back to a clear, trusted source?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  },
  {
    id: "ai",
    title: "AI readiness",
    description: "Do your processes and data provide a safe foundation for useful AI?",
    questions: [
      { text: "How clearly are repeatable workflows, rules and responsibilities documented?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] },
      { text: "How confident are you that people can access accurate data with appropriate controls?", options: [{ label: "Not in place", score: 0 }, { label: "Mostly manual", score: 33 }, { label: "Partly consistent", score: 67 }, { label: "Consistent & connected", score: 100 }] }
    ]
  }
];

let categories = cloneCategories(originalCategories);
let selectedCategoryIndex = 0;

const categoryNav = document.getElementById("category-nav");
const questionsEditor = document.getElementById("questions-editor");
const previewContent = document.getElementById("preview-content");
const saveStatus = document.getElementById("save-status");

function cloneCategories(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentCategory() {
  return categories[selectedCategoryIndex];
}

function updateCounts() {
  const questionCount = categories.reduce((total, category) => total + category.questions.length, 0);
  const optionCount = categories.reduce((total, category) => total + category.questions.reduce((questionTotal, question) => questionTotal + question.options.length, 0), 0);
  document.getElementById("category-count").textContent = categories.length;
  document.getElementById("sidebar-count").textContent = categories.length;
  document.getElementById("question-count").textContent = questionCount;
  document.getElementById("option-count").textContent = optionCount;
}

function renderCategoryNav() {
  categoryNav.innerHTML = categories.map((category, index) => `
    <button class="${index === selectedCategoryIndex ? "active" : ""}" type="button" data-category-index="${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <span>${escapeHtml(category.title)}</span>
      <small>${category.questions.length} question${category.questions.length === 1 ? "" : "s"}</small>
    </button>
  `).join("");
  categoryNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategoryIndex = Number(button.dataset.categoryIndex);
      renderAll();
    });
  });
}

function renderEditor() {
  const category = currentCategory();
  document.getElementById("editor-title").textContent = category.title || "Untitled category";
  document.getElementById("category-title-input").value = category.title;
  document.getElementById("category-description-input").value = category.description;

  if (!category.questions.length) {
    questionsEditor.innerHTML = `<p class="empty-message">This category has no questions yet. Add one to start building the audit section.</p>`;
    return;
  }

  questionsEditor.innerHTML = category.questions.map((question, questionIndex) => `
    <article class="question-editor-card">
      <div class="question-card-top"><span class="question-number">QUESTION ${String(questionIndex + 1).padStart(2, "0")}</span><button class="delete-button" type="button" data-delete-question="${questionIndex}">Delete question</button></div>
      <textarea class="question-input" rows="2" data-question-text="${questionIndex}">${escapeHtml(question.text)}</textarea>
      <div class="options-heading"><span class="options-label">Answer options &amp; scores</span><button class="add-option-button" type="button" data-add-option="${questionIndex}">+ Add option</button></div>
      <div class="options-list">${question.options.length ? question.options.map((option, optionIndex) => `
        <div class="option-row">
          <input type="text" value="${escapeHtml(option.label)}" data-option-label="${questionIndex}" data-option-index="${optionIndex}" aria-label="Option label ${optionIndex + 1}" />
          <input class="score-input" type="number" min="0" max="100" step="1" value="${option.score}" data-option-score="${questionIndex}" data-option-index="${optionIndex}" aria-label="Option score ${optionIndex + 1}" />
          <button class="option-delete" type="button" data-delete-option="${questionIndex}" data-option-index="${optionIndex}" aria-label="Delete option ${optionIndex + 1}">×</button>
        </div>
      `).join("") : `<p class="empty-message">No options yet. Add an option to make this question answerable.</p>`}</div>
    </article>
  `).join("");

  questionsEditor.querySelectorAll("[data-question-text]").forEach((input) => {
    input.addEventListener("input", () => {
      category.questions[Number(input.dataset.questionText)].text = input.value;
      markEdited();
      renderPreview();
    });
  });
  questionsEditor.querySelectorAll("[data-option-label]").forEach((input) => {
    input.addEventListener("input", () => {
      category.questions[Number(input.dataset.optionLabel)].options[Number(input.dataset.optionIndex)].label = input.value;
      markEdited();
      renderPreview();
    });
  });
  questionsEditor.querySelectorAll("[data-option-score]").forEach((input) => {
    input.addEventListener("input", () => {
      const value = Math.max(0, Math.min(100, Number(input.value) || 0));
      category.questions[Number(input.dataset.optionScore)].options[Number(input.dataset.optionIndex)].score = value;
      markEdited();
      renderPreview();
    });
  });
  questionsEditor.querySelectorAll("[data-delete-question]").forEach((button) => {
    button.addEventListener("click", () => {
      category.questions.splice(Number(button.dataset.deleteQuestion), 1);
      markEdited();
      renderAll();
    });
  });
  questionsEditor.querySelectorAll("[data-add-option]").forEach((button) => {
    button.addEventListener("click", () => {
      category.questions[Number(button.dataset.addOption)].options.push({ label: "New option", score: 50 });
      markEdited();
      renderAll();
    });
  });
  questionsEditor.querySelectorAll("[data-delete-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = category.questions[Number(button.dataset.deleteOption)];
      if (question.options.length <= 1) {
        saveStatus.textContent = "Keep at least one option";
        return;
      }
      question.options.splice(Number(button.dataset.optionIndex), 1);
      markEdited();
      renderAll();
    });
  });
}

function renderPreview() {
  const category = currentCategory();
  previewContent.innerHTML = `
    <span class="preview-kicker">Category ${String(selectedCategoryIndex + 1).padStart(2, "0")}</span>
    <h3>${escapeHtml(category.title || "Untitled category")}</h3>
    <p class="preview-description">${escapeHtml(category.description || "No description yet.")}</p>
    ${category.questions.length ? category.questions.map((question, questionIndex) => `
      <div class="preview-question"><span class="preview-question-number">QUESTION ${questionIndex + 1}</span><p>${escapeHtml(question.text || "Untitled question")}</p>${question.options.map((option) => `<div class="preview-option">${escapeHtml(option.label || "Untitled option")} <span>· ${option.score}</span></div>`).join("")}</div>
    `).join("") : `<p class="empty-message">No questions to preview.</p>`}
  `;
}

function markEdited() {
  saveStatus.textContent = "Edited in session";
}

function renderAll() {
  updateCounts();
  renderCategoryNav();
  renderEditor();
  renderPreview();
}

document.getElementById("category-title-input").addEventListener("input", (event) => {
  currentCategory().title = event.target.value;
  document.getElementById("editor-title").textContent = event.target.value || "Untitled category";
  markEdited();
  renderCategoryNav();
  renderPreview();
});

document.getElementById("category-description-input").addEventListener("input", (event) => {
  currentCategory().description = event.target.value;
  markEdited();
  renderPreview();
});

document.getElementById("add-question-button").addEventListener("click", () => {
  currentCategory().questions.push({
    text: "New diagnostic question",
    options: [
      { label: "Not in place", score: 0 },
      { label: "Mostly manual", score: 33 },
      { label: "Partly consistent", score: 67 },
      { label: "Consistent & connected", score: 100 }
    ]
  });
  markEdited();
  renderAll();
});

document.getElementById("reset-button").addEventListener("click", () => {
  categories = cloneCategories(originalCategories);
  selectedCategoryIndex = 0;
  saveStatus.textContent = "Session reset";
  renderAll();
});

const projectStorageKey = "applivon-audit-cms-projects-v1";

function showProjectMessage(message, isError = false) {
  const messageElement = document.getElementById("project-message");
  messageElement.textContent = message;
  messageElement.style.color = isError ? "#ffd0bd" : "#b8ccca";
}

function getProjectName() {
  const name = document.getElementById("project-name").value.trim();
  if (!name) {
    showProjectMessage("Enter a project name before saving or creating files.", true);
    document.getElementById("project-name").focus();
    return "";
  }
  return name;
}

function safeFolderName(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/[. ]+$/g, "")
    .trim() || "Audit project";
}

function readSavedProjects() {
  try {
    return JSON.parse(localStorage.getItem(projectStorageKey) || "[]");
  } catch (error) {
    return [];
  }
}

function renderSavedProjects(selectedName = "") {
  const select = document.getElementById("saved-projects");
  const projects = readSavedProjects();
  select.innerHTML = projects.length ? `<option value="">Load a saved project...</option>${projects.map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)}</option>`).join("")}` : `<option value="">No saved projects yet</option>`;
  if (selectedName) select.value = selectedName;
}

function saveProjectData(showConfirmation = true) {
  const projectName = getProjectName();
  if (!projectName) return false;
  const projects = readSavedProjects();
  const project = { name: projectName, categories: cloneCategories(categories), updatedAt: new Date().toISOString() };
  const existingIndex = projects.findIndex((item) => item.name === projectName);
  if (existingIndex >= 0) projects[existingIndex] = project;
  else projects.push(project);
  try {
    localStorage.setItem(projectStorageKey, JSON.stringify(projects));
    renderSavedProjects(projectName);
    if (showConfirmation) showProjectMessage(`Saved “${projectName}” in this browser.`);
    return true;
  } catch (error) {
    showProjectMessage("The browser could not save this project. Check storage permissions and try again.", true);
    return false;
  }
}

function loadProjectData(projectName) {
  const project = readSavedProjects().find((item) => item.name === projectName);
  if (!project) return;
  categories = cloneCategories(project.categories);
  selectedCategoryIndex = 0;
  document.getElementById("project-name").value = project.name;
  saveStatus.textContent = "Project loaded";
  showProjectMessage(`Loaded “${project.name}”.`);
  renderAll();
}

function buildProjectIndex() {
  const projectConfig = JSON.stringify({ categories: cloneCategories(categories) }, null, 2).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A self-serve Business Automation and Data Connectivity Audit for Singapore SMEs." />
  <title>Applivon Business Automation Audit</title>
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Applivon Business Automation Audit home">
      <span class="brand-mark">A</span>
      <span>applivon<span class="brand-dot">.</span></span>
    </a>
    <span class="header-label">Business Automation Audit</span>
  </header>
  <main id="top">
    <section id="intro-screen" class="screen intro-screen" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="eyebrow">A practical starting point for better operations</p>
        <h1 id="intro-title">How connected and automated is your business today?</h1>
        <p class="intro-text">Answer a short set of questions to see where productivity is being lost across your processes, systems and data — and what to improve first.</p>
        <div class="intro-actions">
          <button id="start-button" class="button button-primary" type="button">Start the audit <span aria-hidden="true">→</span></button>
          <span class="time-note"><span class="clock-icon" aria-hidden="true">◷</span> Takes about 7 minutes</span>
        </div>
        <p class="privacy-note"><span aria-hidden="true">▣</span> Your answers are used only for this session and are not saved.</p>
      </div>
      <div class="intro-visual" aria-hidden="true">
        <div class="visual-grid"></div>
        <div class="visual-card visual-card-main"><div class="mini-label">Digital operations score</div><div class="mini-score">52<span>/100</span></div><div class="mini-bar"><i></i></div><div class="mini-status">Developing <span>↗</span></div></div>
        <div class="visual-card visual-card-float"><span class="float-icon">↗</span><span><strong>3</strong><small>quick wins</small></span></div>
        <div class="visual-orb"></div>
      </div>
    </section>
    <section id="audit-screen" class="screen audit-screen hidden" aria-labelledby="audit-title">
      <div class="audit-topline"><div><p class="eyebrow">Business Automation &amp; Data Connectivity Audit</p><h2 id="audit-title">Tell us how work gets done today.</h2></div><div class="progress-copy"><span id="step-label">1 of 7</span><strong id="progress-percent">14%</strong></div></div>
      <div class="progress-track" aria-hidden="true"><span id="progress-bar"></span></div>
      <div class="category-heading"><span id="category-number" class="category-number">01</span><div><p class="eyebrow" id="category-kicker">Category 01</p><h3 id="category-title">Process automation</h3><p id="category-description">How consistently do routine tasks move forward without manual chasing?</p></div></div>
      <form id="audit-form" novalidate><div id="question-list" class="question-list"></div><p id="form-message" class="form-message" role="alert"></p><div class="form-actions"><button id="back-button" class="button button-secondary" type="button">← Back</button><button id="next-button" class="button button-primary" type="button">Next category <span aria-hidden="true">→</span></button></div></form>
    </section>
    <section id="results-screen" class="screen results-screen hidden" aria-labelledby="results-title">
      <div class="results-header"><div><p class="eyebrow">Your audit results</p><h2 id="results-title">A clearer view of where to improve.</h2><p class="results-intro">Use this as a practical conversation starter. The score indicates where to investigate first — it is not a formal business rating.</p></div><button id="restart-button" class="text-button" type="button">Start again ↺</button></div>
      <div class="results-overview"><div class="score-panel"><p class="eyebrow">Overall digital operations score</p><div id="overall-score" class="overall-score">0<span>/100</span></div><div class="score-track"><span id="overall-score-bar"></span></div><p id="overall-status" class="score-status">Developing</p><p id="score-summary" class="score-summary"></p></div><div class="overview-note"><span class="note-icon" aria-hidden="true">i</span><div><strong>What this means</strong><p id="meaning-copy">Your results highlight the areas where better process design and system connectivity could release the most time.</p></div></div></div>
      <div class="section-title-row"><div><p class="eyebrow">The big picture</p><h3>Category scores</h3></div><span class="legend"><i class="legend-dot good"></i> Strong <i class="legend-dot watch"></i> Developing <i class="legend-dot priority"></i> Priority</span></div>
      <div id="category-results" class="category-results"></div>
      <div class="insight-grid"><article class="insight-card strengths-card"><div class="insight-heading"><span class="insight-icon good-icon">✓</span><div><p class="eyebrow">Keep building on it</p><h3>What you’re doing well</h3></div></div><ul id="strengths-list"></ul></article><article class="insight-card gaps-card"><div class="insight-heading"><span class="insight-icon gap-icon">!</span><div><p class="eyebrow">Where time is leaking</p><h3>Productivity gaps</h3></div></div><ul id="gaps-list"></ul></article></div>
      <div class="section-title-row recommendations-title"><div><p class="eyebrow">Quick wins &amp; strategic direction</p><h3>Recommended actions</h3></div></div><div id="recommendations-list" class="recommendations-list"></div>
      <div class="roadmap-section"><div class="section-title-row"><div><p class="eyebrow">A sensible sequence</p><h3>Suggested roadmap</h3></div></div><div class="roadmap-grid"><article class="roadmap-card now-card"><span class="roadmap-phase">01 · Now</span><h4>Stabilise the basics</h4><ul id="roadmap-now"></ul></article><article class="roadmap-card next-card"><span class="roadmap-phase">02 · Next</span><h4>Connect the workflow</h4><ul id="roadmap-next"></ul></article><article class="roadmap-card later-card"><span class="roadmap-phase">03 · Later</span><h4>Scale with insight</h4><ul id="roadmap-later"></ul></article></div></div>
      <div class="results-footer"><div><strong>Ready to turn the findings into a practical plan?</strong><span>Start with the highest-priority gap and validate the workflow with your team.</span></div><a class="button button-primary" href="mailto:hello@applivon.com?subject=Business%20Automation%20Audit">Discuss your results <span aria-hidden="true">→</span></a></div>
    </section>
  </main>
  <footer class="site-footer"><span>Applivon</span><span>Advisory-led business automation</span></footer>
  <script>window.auditConfig = ${projectConfig};</script>
  <script src="../script.js"></script>
</body>
</html>`;
}

async function writeTextFile(directoryHandle, fileName, contents) {
  const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

async function createProjectFiles() {
  const projectName = getProjectName();
  if (!projectName) return;
  if (!window.showDirectoryPicker) {
    showProjectMessage("This browser cannot create folders directly. Use “Save index.html to a chosen location” or open the CMS in Chromium.", true);
    return;
  }

  if (!saveProjectData(false)) return;
  const folderName = safeFolderName(projectName);
  try {
    const parentDirectory = await window.showDirectoryPicker({ mode: "readwrite" });
    let projectDirectory;
    let alreadyExists = false;
    try {
      projectDirectory = await parentDirectory.getDirectoryHandle(folderName);
      alreadyExists = true;
    } catch (error) {
      projectDirectory = await parentDirectory.getDirectoryHandle(folderName, { create: true });
    }
    if (alreadyExists && !window.confirm(`The folder “${folderName}” already exists. Replace its audit files?`)) {
      showProjectMessage("Project creation cancelled.");
      return;
    }
    await writeTextFile(projectDirectory, "index.html", buildProjectIndex());
    showProjectMessage(`Created ${folderName}/index.html. It uses ../styles.css and ../script.js from the parent folder.`);
  } catch (error) {
    if (error.name === "AbortError") showProjectMessage("Folder selection cancelled.");
    else showProjectMessage(`Could not create the project folder. ${error.message || "Check the selected folder permission and try again."}`, true);
  }
}

function downloadTextFile(fileName, contents) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

async function downloadProjectFiles() {
  const projectName = getProjectName();
  if (!projectName) return;
  try {
    const indexContents = buildProjectIndex();
    if (window.showSaveFilePicker) {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "index.html",
        types: [{ description: "HTML file", accept: { "text/html": [".html"] } }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(indexContents);
      await writable.close();
      showProjectMessage("Saved the customized index.html to your chosen location. Keep it one folder below styles.css and script.js.");
      return;
    }
    const filePrefix = safeFolderName(projectName).replace(/\s+/g, "-");
    downloadTextFile(`${filePrefix}-index.html`, indexContents);
    showProjectMessage("Downloaded the customized index.html. Place it in a project folder one level below styles.css and script.js.");
  } catch (error) {
    if (error.name === "AbortError") showProjectMessage("Folder selection cancelled.");
    else showProjectMessage(`Could not save the project file. ${error.message || "Try again or use the browser download fallback."}`, true);
  }
}

document.getElementById("save-project-button").addEventListener("click", () => saveProjectData());
document.getElementById("create-files-button").addEventListener("click", createProjectFiles);
document.getElementById("download-files-button").addEventListener("click", downloadProjectFiles);
document.getElementById("saved-projects").addEventListener("change", (event) => {
  if (event.target.value) loadProjectData(event.target.value);
});

const supportMessage = document.getElementById("file-support");
if (window.showDirectoryPicker && window.showSaveFilePicker) supportMessage.textContent = "Folder creation and chosen-location saving are available in this browser.";
else if (window.showDirectoryPicker) supportMessage.textContent = "Folder creation is available. Chosen-location file saving may use the browser download fallback.";
else if (window.showSaveFilePicker) supportMessage.textContent = "Chosen-location file saving is available. Folder creation requires a browser with directory access.";
else supportMessage.textContent = "This browser only supports its normal download location; it cannot create folders or ask for a save location from a directly opened file.";

renderSavedProjects();
renderAll();
