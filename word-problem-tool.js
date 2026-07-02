(() => {
    "use strict";

    const config = window.WORD_PROBLEM_TOOL;
    if (!config || !Array.isArray(config.tabs) || !config.tabs.length) return;

    if (Array.isArray(window.DOCX_PROBLEM_BANK)) {
        const correctedSteps = {
            1: ["一圈长度：(5＋1) ÷ (10－8) = 3（米）。", "绳子总长：3 × 8＋1 = 25（米）。", "绕5圈后剩下：25－3 × 5 = 10（米）。"],
            4: ["先把故事书都配成12本：136 × 3 = 408（元），150 × 4 = 600（元）。", "两种买法相减，16本漫画书共：600－408 = 192（元）。", "每本漫画书：192 ÷ 16 = 12（元）。", "每本故事书：(150－12 × 10) ÷ 3 = 10（元）。"],
            5: ["先把苹果都配成12筐：348 × 3 = 1044（千克），502 × 2 = 1004（千克）。", "两式相减，1筐香蕉重：1044－1004 = 40（千克）。", "5筐香蕉重：40 × 5 = 200（千克）。", "每筐苹果重：(348－200) ÷ 4 = 37（千克）。"],
            6: ["甲两天都吃原总数的1/5，最后剩下原总数的3/5。", "乙第一天吃原总数的1/5，第二天吃余下数量的1/5，最后剩下原总数的16/25。", "两人剩下的一样多，所以甲∶乙 = 16∶15。", "两人合计100多个且数量符合整除条件，只能是80个和75个。", "检验：甲剩80 × 3/5 = 48个；乙剩75 × 16/25 = 48个。"],
            11: ["汽车速度：200 ÷ 5 = 40（千米/时）。", "还剩路程：1600－200 = 1400（千米）。", "还需时间：1400 ÷ 40 = 35（小时）。"],
            17: ["展厅总面积：400 × 15 = 6000（平方米）。", "实际每天布置：6000 ÷ 12 = 500（平方米）。"],
            21: ["图片总数：13 × 4 = 52（张）。", "重新贴：52 ÷ 7 = 7（行）……3（张）。"],
            23: ["设银杏树今年a岁，槐树今年102－a岁。", "今年年龄差：a－(102－a) = 2a－102。", "槐树长到a岁时，两树年龄差为：(2a－27)－a = a－27。", "年龄差不变：2a－102 = a－27，解得a = 75。", "槐树今年：102－75 = 27（岁）；年龄乘积：75 × 27 = 2025。"],
            39: ["每小时涌水量：(10 × 20－15 × 10) ÷ (20－10) = 5（份）。", "原有水量：(10－5) × 20 = 100（份）。", "25部抽水机每小时净抽：25－5 = 20（份）。", "抽干时间：100 ÷ 20 = 5（小时）。"],
            62: ["把早晨看作1份，中午是2份，晚上是2份多5个。", "一份：(80－5) ÷ (1＋2＋2) = 15（个）。", "中午：15 × 2 = 30（个）。"],
            74: ["估算可知全书有64页。", "1到64页的页码和：64 × (64＋1) ÷ 2 = 2080。", "少加的页码：2080－2024 = 56。"],
            75: ["一位页码用9个数字，两位页码用90 × 2 = 180个数字。", "三位页码用了：723－9－180 = 534（个数字）。", "三位页码有：534 ÷ 3 = 178（页）。", "全书页数：99＋178 = 277（页）。"],
            77: ["个位上的5出现62次：5、15、25，依次到615。", "十位上的5出现60次：50～59、150～159，依次到550～559。", "百位上的5在500～599中出现100次。", "合计：62＋60＋100 = 222（次）。"],
            88: ["4段纸条粘在一起有4－1 = 3处重叠。", "重叠长度共：3 × 2 = 6（厘米）。", "4段纸条原总长：30＋6 = 36（厘米）。", "每段长度：36 ÷ 4 = 9（厘米）。"],
            89: ["把全程看作1，甲、乙速度分别是1/10和1/15。", "相遇时间：1 ÷ (1/10＋1/15) = 6（小时）。", "相遇时甲比乙多走全程的：(1/10－1/15) × 6 = 1/5。", "全程：120 ÷ 1/5 = 600（千米）。"],
            90: ["甲行驶：102 × 4 = 408（千米）。", "乙行驶：98 × 4 = 392（千米）。", "两地距离：408＋392 = 800（千米）。"],
            91: ["两人每分钟共走：55＋145 = 200（米）。", "桥长：200 × 14 = 2800（米）。"],
            94: ["两人的速度差：320－170 = 150（米/分）。", "甲追上一圈需要：600 ÷ 150 = 4（分钟）。"]
        };
        const correctedStories = {
            6: "甲、乙两只猴子一共摘了100多个桃子，然后各拿了一部分回家。甲第一天吃了自己桃子总数的1/5，第二天仍吃原总数的1/5；乙第一天吃了原总数的1/5，第二天吃了余下桃子数的1/5。这时两只猴子剩下的桃子数量相同，甲一开始有多少个桃子？"
        };
        const correctedTips = {
            6: "先分别求两只猴子最后剩下原有桃子的几分之几，再由剩余量相等确定原有数量比。"
        };
        const correctedAnswers = { 90: "A、B两地相距800千米。" };
        config.tabs.forEach(tab => {
            const additions = window.DOCX_PROBLEM_BANK.filter(problem => problem.target === tab.id);
            additions.forEach(problem => {
                problem.label = problem.label.replace(/^文档\d+\s*·\s*/, "");
                if (correctedSteps[problem.sourceNo]) problem.steps = correctedSteps[problem.sourceNo];
                if (correctedStories[problem.sourceNo]) problem.story = correctedStories[problem.sourceNo];
                if (correctedTips[problem.sourceNo]) problem.readingTip = correctedTips[problem.sourceNo];
                if (correctedAnswers[problem.sourceNo]) problem.answer = correctedAnswers[problem.sourceNo];
                problem.relations = inferTextRelations(problem);
                problem.steps = compactSolutionSteps(problem);
            });
            if (additions.length) tab.problems.push(...additions);
        });
    }

    // All classified word-problem tools use the same teaching rhythm:
    // 0 original problem, 1 read/highlight, 2 relation (+ diagram), 3 solution.
    const initialStep = () => 0;
    const requestedTab = new URLSearchParams(location.search).get("topic");
    const requestedTabIndex = requestedTab ? config.tabs.findIndex(tab => tab.id === requestedTab) : -1;
    const state = { tab: requestedTabIndex >= 0 ? requestedTabIndex : 0, problem: 0, step: initialStep() };
    const $ = id => document.getElementById(id);
    const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
    const currentTab = () => config.tabs[state.tab];
    const currentProblem = () => currentTab().problems[state.problem];

    function relationPhrases(problem) {
        const story = problem.story || "";
        const phrases = [];
        const add = value => {
            const text = String(value || "").trim();
            if (text && !phrases.includes(text)) phrases.push(text);
        };
        [
            // Only mark phrases that determine an addition, subtraction,
            // multiplication or division relationship. “同样的” is retained
            // because it says the unit quantity stays unchanged.
            "同样的", "照这样", "一共", "总共", "共重", "共同", "合计", "合起来",
            "和是", "和为", "平均", "平均分", "还剩", "剩下", "相差", "多出", "少装",
            "增加", "减少", "用去", "吃掉", "运走", "拿走", "少加", "同样多", "相等",
            "速度和", "速度差", "相向而行", "反向而行", "同向而行", "同向追及"
        ].forEach(word => { if (story.includes(word)) add(word); });

        const collect = regex => {
            for (const match of story.matchAll(regex)) add(match[0]);
        };
        const unit = "(?:个|本|元|米|厘米|千米|克|千克|岁|年|天|小时|分钟|秒|人|只|棵|支|把|张|筐|辆|台|页|道|份|倍)";
        collect(new RegExp(`比[^，。；！？]{1,16}?(?:多|少)\\d*(?:\\.\\d+)?${unit}?`, "g"));
        collect(new RegExp(`(?:是|为)[^，。；！？]{1,16}?的(?:\\d+(?:\\.\\d+)?|几|多少)倍`, "g"));
        collect(/(?:\d+(?:\.\d+)?|几|多少)倍/g);
        collect(/每(?:人|份|组|排|行|筐|千克|克|米|小时|分钟|秒|天|年|个|本|张|把|支|台|辆|次|套|盒|袋|段|边)/g);
        collect(/共(?:重|有|付|需|花|计|装|用|吃|行|赛|长)/g);

        (problem.keywords || []).forEach(keyword => {
            const text = typeof keyword === "string" ? keyword : keyword.text;
            if (text && /比|倍|共|同样|每|剩|差|增加|减少|平均|用去|吃掉|运走|拿走|相向|反向|同向/.test(text) && !/^多少$/.test(text)) add(text);
        });
        return phrases.sort((a, b) => b.length - a.length);
    }

    function inferTextRelations(problem) {
        const story = problem.story || "";
        const values = [];
        const add = value => {
            const text = String(value || "").replace(/^同样的/, "").trim();
            if (text && !values.includes(text)) values.push(text);
        };
        const quantity = "\\d+(?:\\.\\d+)?(?:个|本|元|米|厘米|千米|克|千克|岁|年|天|小时|分钟|秒|人|只|棵|支|把|张|筐|辆|台|页|道|份|排|行|套|部|亩)";
        const clauses = story.split(/[，。；！？]/).map(item => item.trim()).filter(Boolean);
        clauses.forEach(clause => {
            const sum = clause.match(new RegExp(`(${quantity}[^和，。；]{0,12})和(${quantity}[^共，。；]{0,12})共(?:重|有|付|需|花|计|装|用)?(${quantity})`));
            if (sum) add(`${sum[1]} ＋ ${sum[2]} ＝ ${sum[3]}`);

            const compare = clause.match(new RegExp(`([^，。；]{1,15})比([^，。；]{1,15})(多|少)(${quantity})`));
            if (compare) add(`${compare[1]} ＝ ${compare[2]} ${compare[3] === "多" ? "＋" : "－"} ${compare[4]}`);

            const multiple = clause.match(/([^，。；]{1,15})(?:是|为)([^，。；]{1,15})的(\d+(?:\.\d+)?)倍/);
            if (multiple) add(`${multiple[1]} ＝ ${multiple[2]} × ${multiple[3]}`);
        });

        const templates = {
            "profit-loss": "两种分法表示的总量相等",
            reverse: "原来的量 ＝ 把最后结果按相反顺序还原",
            substitution: "两种方案表示的总量相等",
            sports: "各部分数量之和 ＝ 总量",
            complex: "各部分数量之和 ＝ 总量",
            age: "不同时刻的年龄差相等",
            normalize: "单位量 × 份数 ＝ 总量",
            total: "变化前的总量 ＝ 变化后的总量",
            cycle: "总数 ＝ 完整周期数 × 每周期数量 ＋ 余数",
            interval: "总数 ＝ 每边数量按重叠情况合并后的数量",
            cow: "原有量 ＋ 新增量 × 天数 ＝ 消耗量 × 天数",
            page: "总数字数 ＝ 各位数页码所用数字数之和",
            proportion: "两种单价对应的总钱数相等",
            overlap: "实际总量 ＝ 各部分之和 － 重复部分",
            travel: "路程 ＝ 速度 × 时间"
        };
        if (!values.length) add(templates[problem.target] || "根据题目条件建立等量关系");
        return values.slice(0, 4).map((value, index) => ({ label: `数量关系${values.length > 1 ? index + 1 : ""}`, value }));
    }

    function answerSubject(answer, result) {
        if (!result) return "";
        const escaped = result.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        for (const part of String(answer || "").split(/[；;，,。]/)) {
            if (!new RegExp(`(^|\\D)${escaped}(?=\\D|$)`).test(part)) continue;
            const before = part.slice(0, part.search(new RegExp(escaped)))
                .replace(/^(答[:：]?|因此|所以)/, "").replace(/[：:=]/g, "").trim();
            if (before) return before.replace(/(是|为|有|重|共|需要|需|可以|等于)$/g, "").trim();
        }
        return "";
    }

    function compactSolutionSteps(problem) {
        const grouped = [];
        for (const raw of problem.steps || []) {
            const line = String(raw).trim();
            if (!line || /^(答[:：]|故答案|计算得到)/.test(line)) continue;
            if (/^方法二/.test(line)) break;
            if (/^[＝=]/.test(line) && grouped.length) grouped[grouped.length - 1] += ` ${line}`;
            else if (grouped.length && /[：:]$/.test(grouped[grouped.length - 1])) grouped[grouped.length - 1] += line;
            else grouped.push(line);
        }
        const fallbackLabels = {
            "profit-loss": ["先求每份量或份数", "再求总量"],
            reverse: ["从最后结果开始反推", "继续按相反顺序还原", "求出原来的量"],
            substitution: ["先把一种数量配成相同", "利用两式相减求一种量", "代回原关系求另一种量"],
            sports: ["先整理已知条件", "再根据总量关系推理"],
            complex: ["先求一份量", "再求多份量", "最后求题目所问的量"],
            age: ["先把年龄换算到同一时刻", "利用年龄差不变计算", "求出现在的年龄"],
            normalize: ["先求单位量", "再按目标份数计算"],
            total: ["先求不变的总量", "再按新条件计算"],
            cycle: ["先求一个周期的数量", "再求完整周期数和余数", "根据余数确定结果"],
            interval: ["先求点数与间隔数的关系", "再按层数或边数计算"],
            cow: ["先求每天新增或减少量", "再求原有量", "最后计算新情况"],
            page: ["先统计一位页码", "再统计两位页码", "再统计三位页码", "合并各段结果"],
            proportion: ["先写出对应量的比例", "再按比例求目标量"],
            overlap: ["先求各部分长度之和", "减去重复计算的部分"],
            travel: ["先求速度和或速度差", "再用路程、速度、时间关系计算"]
        };
        return grouped.map((step, index) => {
            if (/^[^：:]{1,24}[：:]/.test(step) || /[一-鿿]{3,}/.test(step.replace(/[（(][^）)]*[）)]/g, ""))) return step;
            const numbers = [...step.matchAll(/\d+(?:\.\d+)?/g)];
            const result = numbers.length ? numbers[numbers.length - 1][0] : "";
            const subject = answerSubject(problem.answer, result);
            const labels = fallbackLabels[problem.target] || ["根据数量关系计算"];
            const fallback = labels[Math.min(index, labels.length - 1)];
            return `${subject ? `求${subject}` : fallback}：${step}`;
        });
    }

    function highlightedStory(problem) {
        const keywords = relationPhrases(problem);
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
        $("tabs").innerHTML = config.tabs.length === 1 ? "" : config.tabs.map((tab, index) =>
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
            <p class="story">${state.step >= 1 ? highlightedStory(problem) : esc(problem.story)}</p>
            ${state.step >= 1 && problem.hint ? `<p class="hint">提示：${esc(problem.hint)}</p>` : ""}
        `;
    }

    function renderRelations(problem) {
        const relations = problem.relations || [];
        return `
            <h2>把条件翻译成数量关系</h2>
            <div class="relation-grid">
                ${relations.map(item => `<div class="relation"><small>${esc(item.label)}</small><strong>${esc(item.value)}</strong></div>`).join("")}
            </div>
        `;
    }

    function renderDiagram(problem) {
        const rows = problem.diagram || [];
        if (!rows.length) return "";
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

    function renderSolution(problem) {
        return `
            <h2>${esc(config.solutionTitle || "分步解答与检验")}</h2>
            ${config.sourceAnswerMode && problem.readingTip ? `<p class="source-analysis"><b>分析：</b>${esc(problem.readingTip)}</p>` : ""}
            <ol class="solution">${problem.steps.map(step => `<li>${esc(step)}</li>`).join("")}</ol>
            <div class="answer">答：${esc(problem.answer)}</div>
        `;
    }

    function renderContent() {
        const problem = currentProblem();
        if (state.step === 0) {
            $("content").innerHTML = `
                <div class="answer-gate">
                    <div class="answer-gate-icon">读</div>
                    <h2>先完整读一遍题目</h2>
                    <p>这一遍不标重点。读完后点击“读题”，再找数量关系词。</p>
                    <button class="button primary" id="revealBtn">读题</button>
                </div>
            `;
            return;
        }
        if (state.step === 1) {
            $("content").innerHTML = `<h2>圈出关键数量关系词</h2>
                <p class="teaching-note">这些完整短语能够决定加、减、乘、除关系。不要把普通问句中的“多少”等词当作数量关系。</p>`;
        } else if (state.step === 2) {
            $("content").innerHTML = renderRelations(problem) + (config.showDiagram === false ? "" : renderDiagram(problem));
        } else {
            $("content").innerHTML = renderSolution(problem);
        }
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
        const names = ["读题高亮", "数量关系与画图", "分步解答"];
        $("steps").style.gridTemplateColumns = `repeat(${names.length}, 1fr)`;
        $("steps").innerHTML = names.map((name, index) => {
            const step = index + 1;
            const status = step === state.step ? "active" : step < state.step ? "done" : "";
            return `<button class="step ${status}" data-step="${step}" ${state.step === 0 ? "disabled" : ""}>${step}. ${name}</button>`;
        }).join("");
        $("prevBtn").disabled = state.step === 0;
        $("nextBtn").textContent = state.step === 0 ? "读题" : state.step === names.length ? "下一题" : "下一步";
    }

    function bindDynamicEvents() {
        document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => {
            state.tab = Number(button.dataset.tab); state.problem = 0; state.step = initialStep(); render();
        }));
        document.querySelectorAll("[data-problem]").forEach(button => button.addEventListener("click", () => {
            state.problem = Number(button.dataset.problem); state.step = initialStep(); render();
        }));
        document.querySelectorAll("[data-step]").forEach(button => button.addEventListener("click", () => {
            state.step = Number(button.dataset.step); render();
        }));
        const revealButton = $("revealBtn");
        if (revealButton) revealButton.addEventListener("click", () => { state.step = 1; render(); });
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

    $("prevBtn").addEventListener("click", () => { state.step = Math.max(0, state.step - 1); render(); });
    $("nextBtn").addEventListener("click", () => {
        const stepCount = 3;
        if (state.step === 0) state.step = 1;
        else if (state.step < stepCount) state.step += 1;
        else {
            state.problem = (state.problem + 1) % currentTab().problems.length;
            state.step = initialStep();
        }
        render();
    });
    $("randomBtn").addEventListener("click", () => {
        const length = currentTab().problems.length;
        let next = state.problem;
        while (length > 1 && next === state.problem) next = Math.floor(Math.random() * length);
        state.problem = next; state.step = initialStep(); render();
    });

    render();
})();
