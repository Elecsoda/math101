const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const {accepts} = require('../lesson-practice.js');

const root = path.join(__dirname, '..');
const tools = fs.readdirSync(root).filter(slug => fs.existsSync(path.join(root, slug, 'index.html')));

function loadLesson(slug) {
    const html = fs.readFileSync(path.join(root, slug, 'index.html'), 'utf8');
    const scripts = [...html.matchAll(/<script src="\.\.\/(lesson-practice|practice-[\w-]+)\.js" defer><\/script>/g)]
        .map(match => match[1]);
    assert.equal(scripts[0], 'lesson-practice');
    const window = {math101Lessons: {}};
    for (const script of scripts.slice(1)) {
        vm.runInNewContext(fs.readFileSync(path.join(root, script + '.js'), 'utf8'), {window});
    }
    return {lesson: window.math101Lessons[slug], sources: window.math101SourceExercises[slug]};
}

test('每个工具都有三个难度、一组看图或排序题，以及直达原题的拓展入口', () => {
    const seen = new Set();
    for (const slug of tools) {
        const {lesson, sources} = loadLesson(slug);
        assert.ok(lesson?.prompt, slug);
        assert.equal(lesson.levels.length, 3);
        assert.ok(lesson.levels.flat().some(q => q.figure || q.sequence), slug);
        for (const group of lesson.levels) {
            assert.ok(group.length >= 3);
            for (const q of group) {
                assert.ok(q.q && q.why && !seen.has(q.q), q.q);
                seen.add(q.q);
                if (q.choices) {
                    assert.equal(new Set(q.choices).size, q.choices.length);
                    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.choices.length);
                } else if (q.sequence) {
                    assert.ok(q.sequence.length >= 2);
                    assert.equal(new Set(q.sequence).size, q.sequence.length);
                } else {
                    for (const answer of q.answer) assert.ok(accepts(q, answer), q.q);
                }
            }
        }
        assert.ok(sources.length, slug);
        for (const source of sources) {
            const url = new URL(source.href);
            assert.equal(url.origin + url.pathname, 'https://math105.yumath.com/xes-miji/teach.html');
            const params = new URLSearchParams(url.hash.slice(1));
            assert.ok(params.get('question').startsWith(params.get('chapter') + '-'));
            assert.ok(params.get('chapter').startsWith(params.get('book') + '-'));
            assert.ok(source.label.includes('级'));
        }
    }
});

test('数值判等保持精确，指定表示形式、顺序和非零分母有效', () => {
    const value = {answer: ['0.25']};
    for (const equivalent of [' ０．２５０ ', '2/8', '1/4']) assert.ok(accepts(value, equivalent));
    for (const wrong of ['', '0.25000000000000001', '1/0', '2+2', '0.26']) assert.ok(!accepts(value, wrong));
    assert.ok(accepts({answer: ['-0.5']}, '−1/2'));
    assert.ok(!accepts({answer: ['1/2'], format: 'fraction'}, '0.5'));
    assert.ok(accepts({answer: ['1/2'], format: 'fraction'}, '2/4'));
    assert.ok(!accepts({answer: ['0.50'], format: 'decimal'}, '1/2'));
    assert.ok(accepts({answer: ['0.50'], format: 'decimal'}, '0.5'));
    assert.ok(!accepts({answer: ['1/2'], exact: true}, '2/4'));
    assert.ok(!accepts({answer: ['25%']}, '25'));
    const steps = {sequence: ['甲', '乙', '丙']};
    assert.ok(accepts(steps, '0,1,2'));
    assert.ok(!accepts(steps, '1,0,2'));
});
