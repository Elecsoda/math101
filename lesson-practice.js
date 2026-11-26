(() => {
    'use strict';

    const levelNames = ['基础', '进阶', '挑战'];
    const clean = value => String(value).normalize('NFKC').trim().replace(/\s+/gu, '').replace(/−/g, '-');

    function rational(text) {
        if (text.length > 64) return null;
        const fraction = text.match(/^([+-]?\d+)\/([+-]?\d+)$/);
        if (fraction) {
            const denominator = BigInt(fraction[2]);
            return denominator === 0n ? null : [BigInt(fraction[1]), denominator];
        }
        if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
        const places = (text.split('.')[1] || '').length;
        return [BigInt(text.replace('.', '')), 10n ** BigInt(places)];
    }

    function accepts(item, draft) {
        const input = clean(draft);
        if (!input) return false;
        if (item.sequence) return input === item.sequence.map((_, i) => i).join(',');
        if (item.choices) return input === String(item.correct);
        if (item.format === 'decimal' && !/^[+-]?(?:\d+\.\d+|\.\d+)$/.test(input)) return false;
        if (item.format === 'fraction' && !/^[+-]?\d+\/[1-9]\d*$/.test(input)) return false;
        const value = !item.exact && rational(input);
        return item.answer.some(answer => {
            const expected = clean(answer);
            if (input === expected) return true;
            const target = value && rational(expected);
            return Boolean(target && value[0] * target[1] === target[0] * value[1]);
        });
    }

    function mount() {
        const slug = location.pathname.split('/').filter(part => part && part !== 'index.html').pop();
        const lesson = window.math101Lessons[slug];
        if (!lesson) return;
        const title = document.title.split(/\s*[|｜]\s*/)[0];
        const host = document.createElement('div');
        host.id = 'math101-lesson';
        const shadow = host.attachShadow({mode: 'open'});
        shadow.innerHTML = `
          <link rel="stylesheet" href="../lesson-practice.css">
          <link rel="stylesheet" href="/suite-lesson.css">
          <aside class="launcher" aria-label="本课">
            <span id="prompt" class="prompt"></span>
            <a class="open-course" href="/#study-route">课程顺序</a>
            <button id="open" class="open-practice" type="button" aria-haspopup="dialog">分层练习</button>
          </aside>
          <dialog aria-labelledby="lesson-title">
            <div class="sheet">
              <header class="dialog-head">
                <div><p class="eyebrow">分层练习</p><h2 id="lesson-title"></h2></div>
                <button type="button" id="close" aria-label="关闭练习，返回工具">关闭</button>
              </header>
              <nav id="levels" aria-label="选择练习难度"></nav>
              <div id="body"></div>
              <details id="sources" hidden>
                <summary>学而思题库拓展</summary><ul></ul>
              </details>
            </div>
          </dialog>`;
        const get = id => shadow.getElementById(id);
        const make = (tag, label, cls) => {
            const element = document.createElement(tag);
            if (label != null) element.textContent = label;
            if (cls) element.className = cls;
            return element;
        };
        function setMathText(element, text) {
            element.replaceChildren();
            let start = 0;
            for (const match of text.matchAll(/(\d+)\/(\d+)/g)) {
                element.append(text.slice(start, match.index));
                const fraction = make('span', null, 'fraction');
                fraction.setAttribute('role', 'math');
                fraction.setAttribute('aria-label', match[2] + '分之' + match[1]);
                fraction.append(make('span', match[1]), make('span', '/', 'sr'), make('span', match[2]));
                element.append(fraction);
                start = match.index + match[0].length;
            }
            element.append(text.slice(start));
        }
        function createFigure(figure) {
            const wrapper = make('div', null, 'figure');
            if (figure.headers) {
                const grid = make('table');
                const head = grid.createTHead().insertRow();
                for (const label of figure.headers) {
                    const cell = make('th', label);
                    cell.scope = 'col';
                    head.append(cell);
                }
                const body = grid.createTBody();
                for (const row of figure.rows) {
                    const tr = body.insertRow();
                    for (const value of row) tr.insertCell().textContent = value;
                }
                wrapper.append(grid);
            } else if (figure.strips) {
                for (const [label, parts, filled] of figure.strips) {
                    const row = make('div', null, 'strip-row');
                    if (label) row.append(make('span', label));
                    const strip = make('div', null, 'strip');
                    strip.setAttribute('role', 'img');
                    strip.setAttribute('aria-label', label + '平均分成 ' + parts + ' 份，涂了 ' + filled + ' 份');
                    for (let i = 0; i < parts; i++) strip.append(make('i', null, i < filled ? 'filled' : ''));
                    row.append(strip);
                    wrapper.append(row);
                }
            } else if (figure.divisions) {
                const line = make('div', null, 'axis');
                line.setAttribute('role', 'img');
                line.setAttribute('aria-label', figure.left + ' 到 ' + figure.right + ' 平均分成 ' + figure.divisions +
                    ' 段，A 在从左端向右数第 ' + figure.point + ' 段的终点。');
                for (let i = 0; i <= figure.divisions; i++) {
                    const tick = make('span', null, 'tick');
                    tick.style.left = (100 * i / figure.divisions) + '%';
                    if (i === 0 || i === figure.divisions) tick.append(make('b', i === 0 ? figure.left : figure.right));
                    if (i === figure.point) tick.append(make('strong', 'A'));
                    line.append(tick);
                }
                wrapper.append(line);
            } else {
                const grid = make('div', null, figure.width === 10 ? 'hundred-grid' : 'dot-grid');
                grid.style.setProperty('--columns', figure.width);
                grid.setAttribute('role', 'img');
                grid.setAttribute('aria-label', figure.height + ' 行，每行 ' + figure.width + ' 格，已填 ' + figure.filled + ' 格');
                for (let i = 0; i < figure.width * figure.height; i++) grid.append(make('i', null, i < figure.filled ? 'filled' : ''));
                wrapper.append(grid);
            }
            return wrapper;
        }
        const button = (label, handler, cls) => {
            const control = make('button', label, cls);
            control.type = 'button';
            control.addEventListener('click', handler);
            return control;
        };
        const dialog = shadow.querySelector('dialog');
        const panel = get('body');
        setMathText(get('prompt'), lesson.prompt);
        get('lesson-title').textContent = title;
        const sources = window.math101SourceExercises?.[slug] || [];
        for (const source of sources) {
            const li = make('li');
            const anchor = make('a', source.label);
            anchor.href = source.href;
            anchor.target = '_blank';
            anchor.rel = 'noopener';
            li.append(anchor);
            shadow.querySelector('#sources ul').append(li);
        }
        get('sources').hidden = sources.length === 0;

        let level = 0;
        const positions = [0, 0, 0];
        const newAttempt = () => ({draft: '', status: '', revealed: false, assisted: false});
        const attempts = lesson.levels.map(items => items.map(newAttempt));

        function move(change) {
            positions[level] += change;
            render(true);
        }
        function selectLevel(next, focusQuestion) {
            level = next;
            render(focusQuestion);
        }
        const levelButtons = levelNames.map((name, index) => {
            const control = button(name, () => selectLevel(index, true));
            get('levels').append(control);
            return control;
        });

        function render(focusQuestion = false) {
            panel.replaceChildren();
            levelButtons.forEach((tab, i) => tab.setAttribute('aria-pressed', String(i === level)));
            const items = lesson.levels[level], index = positions[level];
            const heading = make('h3');
            heading.tabIndex = -1;
            if (index === items.length) {
                heading.textContent = levelNames[level] + '练习完成';
                const correct = attempts[level].filter(a => a.status === 'correct' && !a.assisted).length;
                panel.append(heading, make('p', '独立答对 ' + correct + ' / ' + items.length + ' 题。', 'progress'));
                const controls = make('div', null, 'actions');
                controls.append(button('回看本组', () => { positions[level] = 0; render(true); }));
                controls.append(button('再练本组', () => {
                    positions[level] = 0;
                    attempts[level] = items.map(newAttempt);
                    render(true);
                }));
                if (level < 2) controls.append(button('进入' + levelNames[level + 1], () => selectLevel(level + 1, true), 'primary'));
                else controls.append(button('返回工具', () => dialog.close(), 'primary'));
                panel.append(controls);
            } else {
                const item = items[index], attempt = attempts[level][index];
                panel.append(make('p', '本站自编　·　第 ' + (index + 1) + ' / ' + items.length + ' 题', 'progress'));
                setMathText(heading, item.q);
                panel.append(heading);
                if (item.figure) panel.append(createFigure(item.figure));
                const form = make('form');
                const feedback = make('p', '', 'feedback');
                feedback.setAttribute('role', 'status');
                const inputs = [];
                let updateSteps;
                if (item.sequence) {
                    const options = make('div', null, 'sequence');
                    const chosen = make('ol', null, 'chosen');
                    chosen.setAttribute('aria-label', '已选步骤');
                    const undo = button('撤回一步', () => changeSteps(readSteps().slice(0, -1)));
                    const readSteps = () => attempt.draft ? attempt.draft.split(',').map(Number) : [];
                    function changeSteps(steps) {
                        attempt.draft = steps.join(',');
                        attempt.status = '';
                        refresh();
                    }
                    // Display a permutation distinct from the intended calculation order.
                    const cards = item.sequence.map((label, i) =>
                        button(label, () => changeSteps([...readSteps(), i])));
                    options.append(...cards.slice(1), cards[0]);
                    updateSteps = () => {
                        const steps = readSteps();
                        chosen.replaceChildren(...steps.map(i => make('li', item.sequence[i])));
                        cards.forEach((card, i) => { card.disabled = steps.includes(i); });
                        undo.disabled = !steps.length || attempt.status === 'correct';
                    };
                    form.append(options, chosen, undo);
                } else if (item.choices) {
                    const group = make('fieldset');
                    const legend = make('legend', '选择一个答案', 'sr');
                    group.append(legend);
                    item.choices.forEach((label, i) => {
                        const option = make('label', null, 'option');
                        const input = make('input');
                        input.type = 'radio';
                        input.name = 'answer';
                        input.value = String(i);
                        input.checked = attempt.draft === input.value;
                        inputs.push(input);
                        const caption = make('span');
                        setMathText(caption, label);
                        option.append(input, caption);
                        group.append(option);
                    });
                    form.append(group);
                } else {
                    const label = make('label', '你的答案', 'entry');
                    const input = make('input');
                    input.type = 'text';
                    input.autocomplete = 'off';
                    if (item.format === 'fraction' || item.answer.some(answer => String(answer).includes('/'))) input.placeholder = '例如 1/2';
                    input.value = attempt.draft;
                    input.maxLength = 100;
                    inputs.push(input);
                    label.append(input);
                    form.append(label);
                }

                const submit = make('button', '核对', 'primary');
                submit.type = 'submit';
                const next = button(index + 1 === items.length ? '本组小结' : '下一题', () => move(1), 'primary');
                const reveal = button('看解析', () => {
                    attempt.revealed = true;
                    if (attempt.status !== 'correct') attempt.assisted = true;
                    refresh();
                    explanation.focus();
                });
                const controls = make('div', null, 'actions');
                if (index) controls.append(button('上一题', () => move(-1)));
                controls.append(submit, next, reveal);
                const explanation = make('p', '', 'explanation');
                explanation.tabIndex = -1;

                function refresh() {
                    const passed = attempt.status === 'correct';
                    const finished = passed || attempt.revealed;
                    if (updateSteps) updateSteps();
                    submit.disabled = item.sequence ? attempt.draft.split(',').length !== item.sequence.length : !clean(attempt.draft);
                    submit.hidden = passed;
                    next.hidden = !finished;
                    reveal.hidden = attempt.revealed || passed;
                    inputs.forEach(input => { input.disabled = passed; });
                    feedback.textContent = passed ? '答对了。' : attempt.status === 'wrong' ? '再想一想，可以修改答案。' : '';
                    feedback.className = 'feedback ' + attempt.status;
                    explanation.hidden = !finished;
                    const answer = item.sequence ? item.sequence.join(' → ') : item.choices ? item.choices[item.correct] : item.answer[0];
                    if (finished) setMathText(explanation, (passed ? '' : '参考答案：' + answer + '。') + item.why);
                }
                inputs.forEach(input => input.addEventListener('input', () => {
                    attempt.draft = input.value;
                    attempt.status = '';
                    refresh();
                }));
                form.addEventListener('submit', event => {
                    event.preventDefault();
                    if (submit.disabled || attempt.status === 'correct') return;
                    attempt.status = accepts(item, attempt.draft) ? 'correct' : 'wrong';
                    refresh();
                    if (attempt.status === 'correct') next.focus();
                });
                form.append(controls, feedback, explanation);
                panel.append(form);
                refresh();
            }
            if (focusQuestion) heading.focus();
        }

        get('open').addEventListener('click', () => {
            render();
            dialog.showModal();
            get('close').focus();
        });
        get('close').addEventListener('click', () => dialog.close());
        dialog.addEventListener('close', () => get('open').focus());
        shadow.querySelector('.open-course').href = '/#unit-' + encodeURIComponent(slug);
        const siteNav = document.querySelector('.ym-suite-nav');
        if (siteNav) siteNav.after(host);
        else document.body.prepend(host);
        const linkedLevel = new URLSearchParams(location.search).get('practice');
        if (['1', '2', '3'].includes(linkedLevel)) {
            level = Number(linkedLevel) - 1;
            get('open').click();
        }
    }
    if (typeof module === 'object' && module.exports) {
        module.exports = {accepts};
    } else {
        // The deferred topic scripts populate this catalogue before DOMContentLoaded.
        window.math101Lessons = Object.create(null);
        document.addEventListener('DOMContentLoaded', mount, {once:true});
    }
})();
