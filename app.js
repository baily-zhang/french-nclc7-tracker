const STORAGE_KEY = "french-nclc7-tracker-v1";
const TOTAL_DAYS = 180;

const TASKS = [
  { id: "pronunciation", title: "发音 / 影子跟读", detail: "录音并对照原音", minutes: 60 },
  { id: "anki", title: "Anki 词汇", detail: "新卡 + 复习清零", minutes: 90 },
  { id: "grammar", title: "语法 / 造句", detail: "20 个原创句", minutes: 120 },
  { id: "listening", title: "听力精听", detail: "听写或逐句复述", minutes: 120 },
  { id: "reading", title: "阅读", detail: "整理 10 个表达", minutes: 90 },
  { id: "writing", title: "写作", detail: "短文或 TEF 任务", minutes: 60 },
  { id: "speaking", title: "口语输出", detail: "连续录音", minutes: 120 },
  { id: "review", title: "复盘", detail: "错题 + 明日重点", minutes: 60 },
];

const SKILLS = [
  { id: "pronunciation", label: "发音" },
  { id: "vocabulary", label: "词汇" },
  { id: "grammar", label: "语法" },
  { id: "listening", label: "听力" },
  { id: "reading", label: "阅读" },
  { id: "writing", label: "写作" },
  { id: "speaking", label: "口语" },
  { id: "review", label: "复盘" },
];

const PHASES = [
  { id: "m1", days: "1-30", start: 1, end: 30, title: "A0 → A1", goal: "发音、基础句型、现在时、1000 高频词。" },
  { id: "m2", days: "31-60", start: 31, end: 60, title: "A1 → A2", goal: "过去时、代词、生活任务、短邮件。" },
  { id: "m3", days: "61-90", start: 61, end: 90, title: "A2 → B1", goal: "段落输出、观点表达、8 分钟口语。" },
  { id: "m4", days: "91-120", start: 91, end: 120, title: "B1 稳定", goal: "进入 TEF 四项题型，建立错题系统。" },
  { id: "m5", days: "121-150", start: 121, end: 150, title: "NCLC 7 专项", goal: "听读提速，写作和口语模板化。" },
  { id: "m6", days: "151-180", start: 151, end: 180, title: "模考冲刺", goal: "完整模考、补弱项、考前收敛。" },
];

const MILESTONES = [
  { id: "m1_speech", label: "第 1 月：能连续 3 分钟自我介绍" },
  { id: "m1_write", label: "第 1 月：能写 120-150 词基础短文" },
  { id: "m2_life", label: "第 2 月：能完成预约、租房、问路等生活对话" },
  { id: "m2_past", label: "第 2 月：能区分 passe compose / imparfait" },
  { id: "m3_opinion", label: "第 3 月：能说 8 分钟观点题" },
  { id: "m3_essay", label: "第 3 月：能写 250-300 词结构文" },
  { id: "m4_tef", label: "第 4 月：熟悉 TEF Canada 四项题型" },
  { id: "m4_speaking", label: "第 4 月：能完成 10 分钟说服型口语" },
  { id: "m5_timed", label: "第 5 月：四项都能限时完成" },
  { id: "m5_templates", label: "第 5 月：写作和口语模板稳定" },
  { id: "m6_mocks", label: "第 6 月：连续 2-3 次模拟接近目标" },
  { id: "m6_ready", label: "第 6 月：低级错误和时间问题明显减少" },
];

const DEFAULT_SKILL_MINUTES = {
  pronunciation: 60,
  vocabulary: 90,
  grammar: 120,
  listening: 120,
  reading: 90,
  writing: 60,
  speaking: 120,
  review: 60,
};

const els = {};
let state = loadState();

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function diffDays(start, end) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  return Math.floor((endDate - startDate) / 86400000);
}

function defaultDay() {
  return {
    status: "planned",
    tasks: {},
    minutes: {},
    notes: "",
    mainError: "",
    nextPriority: "",
    tef: {
      listening: "",
      reading: "",
      writing: "",
      speaking: "",
    },
  };
}

function loadState() {
  const fallback = {
    startDate: todayISO(),
    selectedDate: todayISO(),
    days: {},
    milestones: {},
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.saveState.textContent = `已保存 ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
}

function getDay(date = state.selectedDate) {
  if (!state.days[date]) state.days[date] = defaultDay();
  return state.days[date];
}

function currentDayNumber(date = state.selectedDate) {
  return Math.min(Math.max(diffDays(state.startDate, date) + 1, 1), TOTAL_DAYS);
}

function currentPhase(dayNumber = currentDayNumber()) {
  return PHASES.find((phase) => dayNumber >= phase.start && dayNumber <= phase.end) || PHASES[PHASES.length - 1];
}

function completedTaskCount(day) {
  return TASKS.filter((task) => day.tasks[task.id]).length;
}

function dayCompletionLevel(day) {
  const done = completedTaskCount(day);
  if (day.status === "mock") return "mock";
  if (day.status === "rest") return "rest";
  if (done >= 7) return "level-3";
  if (done >= 4) return "level-2";
  if (done >= 1) return "level-1";
  return "";
}

function totalMinutes() {
  return Object.values(state.days).reduce((sum, day) => {
    return sum + Object.values(day.minutes || {}).reduce((dailySum, value) => dailySum + (Number(value) || 0), 0);
  }, 0);
}

function streakCount() {
  let streak = 0;
  let cursor = state.selectedDate;

  while (streak < TOTAL_DAYS) {
    const day = state.days[cursor];
    if (!day || completedTaskCount(day) < 6) break;
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function qs(id) {
  return document.getElementById(id);
}

function initElements() {
  [
    "startDateInput",
    "selectedDateInput",
    "dayNumber",
    "phaseName",
    "overallProgress",
    "streakCount",
    "totalHours",
    "taskList",
    "skillGrid",
    "dayStatus",
    "dailyNotes",
    "mainError",
    "nextPriority",
    "tefListening",
    "tefReading",
    "tefWriting",
    "tefSpeaking",
    "phaseList",
    "milestoneList",
    "heatmap",
    "fillDefaultButton",
    "copyBriefButton",
    "exportButton",
    "importButton",
    "importFile",
    "printButton",
    "resetDayButton",
    "resetAllButton",
    "saveState",
  ].forEach((id) => {
    els[id] = qs(id);
  });
}

function render() {
  const day = getDay();
  const dayNumber = currentDayNumber();
  const phase = currentPhase(dayNumber);

  els.startDateInput.value = state.startDate;
  els.selectedDateInput.value = state.selectedDate;
  els.dayNumber.textContent = `Day ${dayNumber}`;
  els.phaseName.textContent = phase.title;
  els.overallProgress.textContent = `${Math.round((dayNumber / TOTAL_DAYS) * 100)}%`;
  els.streakCount.textContent = `${streakCount()} 天`;
  els.totalHours.textContent = `${(totalMinutes() / 60).toFixed(1)} h`;
  els.dayStatus.value = day.status;
  els.dailyNotes.value = day.notes || "";
  els.mainError.value = day.mainError || "";
  els.nextPriority.value = day.nextPriority || "";
  els.tefListening.value = day.tef?.listening || "";
  els.tefReading.value = day.tef?.reading || "";
  els.tefWriting.value = day.tef?.writing || "";
  els.tefSpeaking.value = day.tef?.speaking || "";

  renderTasks(day);
  renderSkills(day);
  renderPhases(dayNumber);
  renderMilestones();
  renderHeatmap();
}

function renderTasks(day) {
  els.taskList.innerHTML = "";

  TASKS.forEach((task) => {
    const row = document.createElement("label");
    row.className = "task-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(day.tasks[task.id]);
    checkbox.addEventListener("change", () => {
      getDay().tasks[task.id] = checkbox.checked;
      saveState();
      render();
    });

    const copy = document.createElement("span");
    copy.innerHTML = `<span class="task-title">${task.title}</span><br><span class="task-detail">${task.detail}</span>`;

    const minutes = document.createElement("span");
    minutes.className = "task-minutes";
    minutes.textContent = `${task.minutes} min`;

    row.append(checkbox, copy, minutes);
    els.taskList.append(row);
  });
}

function renderSkills(day) {
  els.skillGrid.innerHTML = "";

  SKILLS.forEach((skill) => {
    const label = document.createElement("label");
    label.className = "skill-input";
    label.textContent = skill.label;

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "5";
    input.inputMode = "numeric";
    input.value = day.minutes[skill.id] || "";
    input.addEventListener("input", () => {
      getDay().minutes[skill.id] = Number(input.value) || 0;
      saveState();
      updateMetricsOnly();
    });

    const suffix = document.createElement("span");
    suffix.textContent = "min";

    label.append(input, suffix);
    els.skillGrid.append(label);
  });
}

function renderPhases(dayNumber) {
  els.phaseList.innerHTML = "";

  PHASES.forEach((phase) => {
    const item = document.createElement("article");
    item.className = `phase-item ${dayNumber >= phase.start && dayNumber <= phase.end ? "active" : ""}`;
    item.innerHTML = `
      <div class="phase-title">
        <span>${phase.title}</span>
        <span class="phase-days">Day ${phase.days}</span>
      </div>
      <p class="phase-goal">${phase.goal}</p>
    `;
    els.phaseList.append(item);
  });
}

function renderMilestones() {
  els.milestoneList.innerHTML = "";

  MILESTONES.forEach((milestone) => {
    const label = document.createElement("label");
    label.className = "milestone-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(state.milestones[milestone.id]);
    checkbox.addEventListener("change", () => {
      state.milestones[milestone.id] = checkbox.checked;
      saveState();
    });

    const span = document.createElement("span");
    span.textContent = milestone.label;

    label.append(checkbox, span);
    els.milestoneList.append(label);
  });
}

function renderHeatmap() {
  els.heatmap.innerHTML = "";

  for (let index = 0; index < TOTAL_DAYS; index += 1) {
    const date = addDays(state.startDate, index);
    const day = state.days[date] || defaultDay();
    const button = document.createElement("button");
    const level = dayCompletionLevel(day);
    button.type = "button";
    button.className = `day-cell ${level} ${date === state.selectedDate ? "selected" : ""}`;
    button.title = `Day ${index + 1} · ${date} · ${completedTaskCount(day)}/${TASKS.length}`;
    button.textContent = String(index + 1);
    button.addEventListener("click", () => {
      state.selectedDate = date;
      saveState();
      render();
    });
    els.heatmap.append(button);
  }
}

function updateMetricsOnly() {
  const dayNumber = currentDayNumber();
  els.overallProgress.textContent = `${Math.round((dayNumber / TOTAL_DAYS) * 100)}%`;
  els.streakCount.textContent = `${streakCount()} 天`;
  els.totalHours.textContent = `${(totalMinutes() / 60).toFixed(1)} h`;
}

function bindEvents() {
  els.startDateInput.addEventListener("change", () => {
    state.startDate = els.startDateInput.value || todayISO();
    if (diffDays(state.startDate, state.selectedDate) < 0) state.selectedDate = state.startDate;
    saveState();
    render();
  });

  els.selectedDateInput.addEventListener("change", () => {
    state.selectedDate = els.selectedDateInput.value || todayISO();
    saveState();
    render();
  });

  els.dayStatus.addEventListener("change", () => {
    getDay().status = els.dayStatus.value;
    saveState();
    renderHeatmap();
  });

  [
    ["dailyNotes", "notes"],
    ["mainError", "mainError"],
    ["nextPriority", "nextPriority"],
  ].forEach(([elementId, field]) => {
    els[elementId].addEventListener("input", () => {
      getDay()[field] = els[elementId].value;
      saveState();
    });
  });

  [
    ["tefListening", "listening"],
    ["tefReading", "reading"],
    ["tefWriting", "writing"],
    ["tefSpeaking", "speaking"],
  ].forEach(([elementId, field]) => {
    els[elementId].addEventListener("input", () => {
      getDay().tef[field] = els[elementId].value;
      saveState();
    });
  });

  els.fillDefaultButton.addEventListener("click", () => {
    getDay().minutes = { ...DEFAULT_SKILL_MINUTES };
    saveState();
    render();
  });

  els.copyBriefButton.addEventListener("click", copyDailyBrief);
  els.exportButton.addEventListener("click", exportData);
  els.importButton.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", importData);
  els.printButton.addEventListener("click", () => window.print());
  els.resetDayButton.addEventListener("click", resetCurrentDay);
  els.resetAllButton.addEventListener("click", resetAllData);
}

async function copyDailyBrief() {
  const day = getDay();
  const lines = [
    `French NCLC 7 · ${state.selectedDate} · Day ${currentDayNumber()}`,
    `Status: ${day.status}`,
    `Tasks: ${completedTaskCount(day)}/${TASKS.length}`,
    `Minutes: ${Object.values(day.minutes || {}).reduce((sum, value) => sum + (Number(value) || 0), 0)}`,
    `TEF Listening: ${day.tef.listening || "-"}`,
    `TEF Reading: ${day.tef.reading || "-"}`,
    `TEF Writing: ${day.tef.writing || "-"}`,
    `TEF Speaking: ${day.tef.speaking || "-"}`,
    `Main error: ${day.mainError || "-"}`,
    `Next priority: ${day.nextPriority || "-"}`,
    "",
    day.notes || "",
  ];

  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    els.saveState.textContent = "今日简报已复制";
  } catch {
    els.saveState.textContent = "复制失败，请手动复制";
  }
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "french-nclc7-tracker",
    version: 1,
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `french-nclc7-progress-${todayISO()}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const importedState = parsed.state || parsed;
      if (!importedState.startDate || !importedState.days) throw new Error("Invalid tracker data");
      state = {
        startDate: importedState.startDate,
        selectedDate: importedState.selectedDate || importedState.startDate,
        days: importedState.days || {},
        milestones: importedState.milestones || {},
      };
      saveState();
      render();
    } catch {
      els.saveState.textContent = "导入失败：JSON 格式不正确";
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function resetCurrentDay() {
  if (!confirm(`清空 ${state.selectedDate} 的记录？`)) return;
  delete state.days[state.selectedDate];
  saveState();
  render();
}

function resetAllData() {
  if (!confirm("重置全部本地数据？这个操作不会删除 GitHub repo，但会清空当前浏览器里的进度。")) return;
  state = {
    startDate: todayISO(),
    selectedDate: todayISO(),
    days: {},
    milestones: {},
  };
  saveState();
  render();
}

initElements();
bindEvents();
render();
saveState();
