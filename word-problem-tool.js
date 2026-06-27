(() => {
    "use strict";

    const config = window.WORD_PROBLEM_TOOL;
    if (!config || !Array.isArray(config.tabs) || !config.tabs.length) return;

    const state = { tab: 0, problem: 0, step: 1 };
    const $ = id => document.getElementById(id);
    const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
    const currentTab = () => config.tabs[state.tab];
    const currentProblem = () => currentTab().problems[state.problem];

    function highlightedStory(problem) {
        const keywords = [...(problem.keywords || [])].sort((a, b) => b.length - a.length);
        if (!keywords.length) return esc(problem.story);
        const positions = [];
        keywords.forEach(keyword => {
            let from = 0;
            while (from < problem.story.length) {
                const index = problem.story.indexOf(keyword, from);
                if (index < 0) break;
                positions.push({ index, end: index + keyword.length, keyword });
                from = index + keyword.length;
            }
        });
        positions.sort((a, b) => a.index - b.index || b.end - a.end);
        let cursor = 0;
        let html = "";
        positions.forEach(position => {
            if (position.index < cursor) return;
            html += esc(problem.story.slice(cursor, position.index));
            html += `<span class="keyword">${esc(position.keyword)}</span>`;
            cursor = position.end;
        });
        return html + esc(problem.story.slice(cursor));
    }

    function renderTabs() {
        $("tabs").innerHTML = config.tabs.map((tab, index) =>
            `<button class="tab ${index === state.tab ? "active" : ""}" data-tab="${index}">${esc(tab.label)}</button>`
        ).join("");
        $("tabIntro").textContent = currentTab().intro || "";
    }

    function renderProblem() {
        const problem = currentProblem();
        const tab = currentTab();
        $("problem").innerHTML = `
            <div class="problem-head">
                <h2>${esc(problem.label)}</h2>
                <span class="badge">${esc(tab.label)} · ${state.problem + 1}/${tab.problems.length}</span>
            </div>
            <p class="story">${highlightedStory(problem)}</p>
            ${problem.hint ? `<p class="hint">提示：${esc(problem.hint)}</p>` : ""}
        `;
    }

    function renderRelations(problem) {
        const relations = problem.relations || [];
        return `
            <h2>把条件翻译成数量关系</h2>
            <div class="relation-grid">
                ${relations.map(item => `<div class="relation"><small>${esc(item.label)}</small><strong>${esc(item.value)}</strong></div>`).join("")}
            </div>
            <p class="teaching-note">${esc(problem.readingTip || "先统一比较标准，再判断题目给的是总量、差量、倍数还是每份量。")}</p>
        `;
    }

    function renderDiagram(problem) {
        const rows = problem.diagram || [];
        return `
            <h2>${esc(problem.diagramTitle || "画图整理条件")}</h2>
            <div class="diagram">
                ${rows.map(row => `
                    <div class="diagram-row">
                        <div class="diagram-label">${esc(row.label)}</div>
                        <div class="blocks">
                            ${Array.from({ length: Math.max(1, row.parts || 1) }, (_, index) => `<span class="block ${esc(row.tone || (index ? "alt" : ""))}"></span>`).join("")}
                            ${row.extra ? `<span class="block ghost"></span>` : ""}
                        </div>
                        <div class="row-note">${esc(row.note || "")}</div>
                    </div>
                `).join("")}
                <p class="teaching-note">${esc(problem.diagramNote || "图中的一格代表一份，先看份数关系，再处理多出或少掉的固定量。")}</p>
            </div>
        `;
    }

    function renderEquation(problem) {
        return `
            <h2>根据图和关系列式</h2>
            <div class="formula">${esc(problem.equation)}</div>
            <p class="teaching-note">${esc(problem.equationTip || "每一步都要能在题意或图中找到对应关系。")}</p>
        `;
    }

    function renderSolution(problem) {
        return `
            <h2>分步解答与检验</h2>
            <ol class="solution">${problem.steps.map(step => `<li>${esc(step)}</li>`).join("")}</ol>
            <div class="answer">答：${esc(problem.answer)}</div>
        `;
    }

    function renderContent() {
        const problem = currentProblem();
        const renderers = [renderRelations, renderDiagram, renderEquation, renderSolution];
        $("content").innerHTML = renderers[state.step - 1](problem);
    }

    function renderLibrary() {
        const problems = currentTab().problems;
        $("libraryCount").textContent = `${problems.length} 题`;
        $("items").innerHTML = problems.map((problem, index) => `
            <button class="item ${index === state.problem ? "active" : ""}" data-problem="${index}">
                <b>${esc(problem.label)}</b><span>${esc(problem.story)}</span>
            </button>
        `).join("");
    }

    function renderSteps() {
        const names = ["读题找关系", "画图整理", "列式分析", "解答检验"];
        $("steps").innerHTML = names.map((name, index) => {
            const step = index + 1;
            const status = step === state.step ? "active" : step < state.step ? "done" : "";
            return `<button class="step ${status}" data-step="${step}">${step}. ${name}</button>`;
        }).join("");
        $("prevBtn").disabled = state.step === 1;
        $("nextBtn").textContent = state.step === 4 ? "下一题" : "下一步";
    }

    function bindDynamicEvents() {
        document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => {
            state.tab = Number(button.dataset.tab); state.problem = 0; state.step = 1; render();
        }));
        document.querySelectorAll("[data-problem]").forEach(button => button.addEventListener("click", () => {
            state.problem = Number(button.dataset.problem); state.step = 1; render();
        }));
        document.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => {
            state.step = Number(button.dataset.step); render();
        }));
    }

    function render() {
        renderTabs(); renderProblem(); renderSteps(); renderContent(); renderLibrary(); bindDynamicEvents();
    }

    document.title = `${config.title} | Math101`;
    $("title").textContent = config.title;
    $("subtitle").textContent = config.subtitle || "";
    $("mark").textContent = config.mark || "题";
    document.documentElement.style.setProperty("--accent", config.accent || "#6d5dfc");
    document.documentElement.style.setProperty("--accent-dark", config.accentDark || "#5145cd");
    document.documentElement.style.setProperty("--accent-soft", config.accentSoft || "#f0eeff");

    $("prevBtn").addEventListener("click", () => { state.step = Math.max(1, state.step - 1); render(); });
    $("nextBtn").addEventListener("click", () => {
        if (state.step < 4) state.step += 1;
        else {
            state.problem = (state.problem + 1) % currentTab().problems.length;
            state.step = 1;
        }
        render();
    });
    $("randomBtn").addEventListener("click", () => {
        const length = currentTab().problems.length;
        let next = state.problem;
        while (length > 1 && next === state.problem) next = Math.floor(Math.random() * length);
        state.problem = next; state.step = 1; render();
    });

    render();
})();
