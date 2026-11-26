(() => {
    'use strict';

    const root = document.getElementById('grade-route');
    if (!root) return;

    // On the calculation and geometry sites the static, accessible directory is
    // also the source for the grade route. The other sites supply full lesson plans.
    function catalogFromDirectory() {
        const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
        const units = [];
        for (const group of root.querySelectorAll('.directory-groups .unit')) {
            const block = group.querySelector('h3').textContent;
            for (const item of group.querySelectorAll('a[data-grade]')) {
                const href = item.getAttribute('href');
                const url = new URL(href, location.origin);
                url.searchParams.set('practice', '1');
                const activities = [
                    {kind: '工具', label: '进入工具', href},
                    {kind: '练习', label: '分层练习', href: url.pathname + url.search + url.hash}
                ];
                if (item.dataset.extraHref) {
                    activities.push({kind: '工具', label: item.dataset.extraLabel, href: item.dataset.extraHref});
                }
                units.push({
                    id: url.pathname.split('/')[1],
                    block,
                    grade: Number(item.dataset.grade),
                    order: Number(item.dataset.order),
                    title: item.textContent,
                    method: item.dataset.method,
                    prereq: [],
                    activities
                });
            }
        }
        units.sort((a, b) => a.grade - b.grade || a.order - b.order);
        return {site: root.dataset.site, grades, units};
    }

    const catalog = window.GradeCourses || catalogFromDirectory();
    const {units} = catalog;
    const byId = new Map(units.map(unit => [unit.id, unit]));
    const blocks = [...new Set(units.map(unit => unit.block))];
    const storageKey = catalog.site + '-course-route-v1';
    const gradeName = grade => catalog.grades[grade - 1];
    const courseURL = unit => '/?grade=' + unit.grade + '#unit-' + unit.id;

    const filter = root.querySelector('#block');
    const gradeNav = root.querySelector('#grades');
    const routeLink = root.querySelector('#course-link');
    const allLink = root.querySelector('#all-link');
    const controls = root.querySelector('#course-controls');
    const courseView = root.querySelector('#interactive-route');
    const directoryView = root.querySelector('#tool-directory');
    const heading = root.querySelector('#route-title');
    const progress = root.querySelector('#progress');
    const list = root.querySelector('#units');
    let grade = 1;
    let block = '';
    let collection = null;
    let directory = false;
    let state = readProgress();

    function readProgress(fallback = {done: []}) {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
            return {grade: stored?.grade, done: Array.isArray(stored?.done) ? stored.done : []};
        } catch {
            return fallback;
        }
    }

    function remember(change) {
        // Merge with the latest data so a lesson marked in another tab is retained.
        state = change(readProgress(state));
        try {
            localStorage.setItem(storageKey, JSON.stringify(state));
        } catch {
            // Continue with the in-memory progress when storage is unavailable.
        }
    }

    function element(tag, text, className) {
        const node = document.createElement(tag);
        if (text != null) node.textContent = text;
        if (className) node.className = className;
        return node;
    }

    function link(text, href, className) {
        const node = element('a', text, className);
        node.href = href;
        return node;
    }

    function button(text, action, className) {
        const node = element('button', text, className);
        node.type = 'button';
        node.onclick = action;
        return node;
    }

    function activityLink(unit, activity) {
        const url = new URL(activity.href, location.origin);
        if (window.GradeCourses) url.searchParams.set('fromUnit', unit.id);
        const anchor = link('', url.pathname + url.search + url.hash, 'activity');
        if (window.GradeCourses) anchor.append(element('span', activity.kind, 'kind'));
        anchor.append(element('span', activity.label));
        return anchor;
    }

    function activityGroup(unit) {
        const group = element('div', null, 'activities');
        const activities = unit.activities;
        let primary = activities;
        if (activities.length > 3) {
            const practice = activities.find((activity, index) => index > 0 && activity.kind === '练习');
            primary = [activities[0], practice || activities[1]];
        }
        for (const activity of primary) group.append(activityLink(unit, activity));
        const remaining = activities.filter(activity => !primary.includes(activity));
        if (remaining.length) {
            const more = element('details', null, 'more-activities');
            const additional = element('div', null, 'activities');
            for (const activity of remaining) additional.append(activityLink(unit, activity));
            more.append(element('summary', '更多活动（' + remaining.length + '）'), additional);
            group.append(more);
        }
        return group;
    }

    function readLocation() {
        const url = new URL(location.href);
        const target = byId.get(url.hash.replace(/^#unit-/, ''));
        directory = ['#all', '#all-tools', '#tool-directory'].includes(url.hash);
        const requestedGrade = url.searchParams.get('grade');
        grade = target?.grade ?? (/^[0-6]$/.test(requestedGrade) ? Number(requestedGrade) : preferredGrade());
        const requestedBlock = url.searchParams.get('block');
        block = !target && blocks.includes(requestedBlock) ? requestedBlock : '';
        const section = document.getElementById(url.searchParams.get('section') || '');
        collection = null;
        if (!target && section?.dataset.coursePaths) {
            collection = {
                heading: section.dataset.courseHeading,
                paths: new Set(section.dataset.coursePaths.split(' '))
            };
        }
    }

    function select(nextGrade, nextBlock, saveGrade = true) {
        grade = nextGrade;
        block = nextBlock;
        collection = null;
        directory = false;
        const url = new URL(location.href);
        url.hash = '';
        url.searchParams.delete('section');
        url.searchParams.set('grade', grade);
        if (block) url.searchParams.set('block', block);
        else url.searchParams.delete('block');
        if (url.href !== location.href) history.pushState(null, '', url);
        if (saveGrade) remember(previous => ({...previous, grade}));
        render();
    }

    function preferredGrade() {
        return Number.isInteger(state.grade) && state.grade >= 0 && state.grade <= 6 ? state.grade : 1;
    }

    // Modified clicks keep their normal browser behaviour, including opening a new tab.
    function navigate(anchor, action) {
        anchor.addEventListener('click', event => {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            action();
        });
    }

    const bands = ['一至二年级', '三至四年级', '五至六年级'].map(title => {
        const group = element('div', null, 'grade-band');
        group.append(element('strong', title));
        gradeNav.append(group);
        return group;
    });
    const gradeButtons = new Map();
    for (const value of [1, 2, 3, 4, 5, 6, 0]) {
        const control = button(value ? gradeName(value) : '全部年级', () => {
            const hasBlock = units.some(unit => (!value || unit.grade === value) && unit.block === block);
            select(value, hasBlock ? block : '');
        });
        if (value) {
            bands[Math.floor((value - 1) / 2)].append(control);
        } else {
            control.className = 'all-grades';
            gradeNav.append(control);
        }
        gradeButtons.set(value, control);
    }

    for (const name of blocks) filter.add(new Option(name, name));
    filter.onchange = () => select(filter.value ? 0 : preferredGrade(), filter.value, false);
    navigate(routeLink, () => select(preferredGrade(), '', false));
    navigate(allLink, () => {
        if (!directory) history.pushState(null, '', allLink.href);
        readLocation();
        render();
    });

    function current(anchor, selected) {
        if (selected) anchor.setAttribute('aria-current', 'true');
        else anchor.removeAttribute('aria-current');
    }

    function progressButton(unit) {
        const done = state.done.includes(unit.id);
        const control = button(done ? '已学过' : '标记学过', () => {
            remember(previous => ({
                ...previous,
                done: previous.done.includes(unit.id)
                    ? previous.done.filter(id => id !== unit.id)
                    : [...previous.done, unit.id]
            }));
            render();
            document.getElementById('mark-' + unit.id)?.focus({preventScroll: true});
        }, 'mark');
        control.id = 'mark-' + unit.id;
        control.setAttribute('aria-pressed', String(done));
        control.setAttribute('aria-label', unit.title + '，' + control.textContent);
        return control;
    }

    function lessonCard(unit) {
        const card = element('article', null, 'unit');
        card.id = 'unit-' + unit.id;
        card.tabIndex = -1;

        const top = element('div', null, 'unit-top');
        const sequence = units.filter(item => item.grade === unit.grade).indexOf(unit) + 1;
        const prefix = grade ? '' : gradeName(unit.grade) + ' · ';
        top.append(element('span', prefix + '第 ' + sequence + ' 课　' + unit.block, 'order'));
        if (unit.type === '拓展') top.append(element('span', '拓展', 'extension'));

        const title = element('div', null, 'title-row');
        title.append(element('h3', unit.title), progressButton(unit));
        card.append(top, title, element('p', unit.method, 'method'), activityGroup(unit));

        const prerequisites = (unit.prereq || []).map(id => byId.get(id)).filter(Boolean);
        if (prerequisites.length) {
            const prior = element('div', null, 'prior');
            prior.append(element('span', '先会'));
            for (const item of prerequisites) prior.append(link(item.title, courseURL(item)));
            card.append(prior);
        }
        return card;
    }

    function render() {
        controls.hidden = false;
        directoryView.hidden = !directory;
        courseView.hidden = directory;
        routeLink.href = '/?grade=' + preferredGrade();
        current(routeLink, !directory && !block && !collection);
        current(allLink, directory);
        filter.classList.toggle('selected', !directory && Boolean(block));
        filter.value = directory ? '' : block;
        for (const [value, control] of gradeButtons) {
            control.setAttribute('aria-pressed', String(!directory && value === grade));
        }

        const visible = units.filter(unit => {
            if (grade && unit.grade !== grade) return false;
            if (block && unit.block !== block) return false;
            return !collection || unit.activities.some(activity =>
                collection.paths.has(new URL(activity.href, location.origin).pathname)
            );
        });
        const gradeLabel = grade ? gradeName(grade) : '全部年级';
        heading.textContent = collection?.heading || gradeLabel + (block ? ' · ' + block : '学习顺序');
        const completed = visible.filter(unit => state.done.includes(unit.id)).length;
        progress.replaceChildren(element('span', '已学 ' + completed + ' / ' + visible.length + ' 课'));
        const next = visible.find(unit => !state.done.includes(unit.id));
        if (next) {
            const label = completed ? '下一课 · ' + next.title : '开始学习';
            progress.append(link(label, '#unit-' + next.id, 'continue'));
        }
        list.replaceChildren(...visible.map(lessonCard));
        if (!visible.length) {
            const empty = element('div', null, 'empty');
            empty.append(
                element('p', '这个年级没有安排该板块。'),
                button('查看本年级全部板块', () => select(grade, '')),
                button('查看这个板块的所有年级', () => select(0, block))
            );
            list.append(empty);
        }
    }

    function refresh() {
        const alias = document.getElementById(location.hash.slice(1))?.dataset.routeTarget;
        if (alias) history.replaceState(history.state, '', alias);
        state = readProgress(state);
        readLocation();
        render();
        if (location.hash.startsWith('#unit-')) {
            requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({block: 'start'}));
        }
    }

    window.addEventListener('popstate', refresh);
    window.addEventListener('hashchange', refresh);
    window.addEventListener('storage', event => {
        if (event.key === storageKey) {
            state = readProgress(state);
            render();
        }
    });
    refresh();
})();
