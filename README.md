# math101 · 小学数学计算工具

整数、小数、分数、比与比例、方程与计算训练。

线上地址：https://math101.yumath.com

## 姊妹站点

- [几何](https://math102.yumath.com) — `math102`
- [应用题](https://math103.yumath.com) — `math103`
- [奥数与思维](https://math104.yumath.com) — `math104`

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 结构

每个工具是一个自包含目录，入口为 `目录/index.html`。
根目录的 `ipad-touch-adapter.*`、`vendor/`
是各工具共享的资源，工具内以 `../` 引用。

## 按学习任务找入口

首页列出 30 个工具，提供三个学段的建议起点，卡片按知识点与用途浏览。待开发项目保存在 `data/tool-roadmap.json`。

- 一至二年级可从 [数到二十](number-line-place-value/#count) 开始，在十格框上数数、比较，再进入数位表和算珠。
- 三至四年级可从读写大数、多位数乘法竖式或小数面积方格开始。多位数除法的逐位演示在 [分物与除法竖式](remainder/)。
- 五至六年级可依次学习 [约分与通分](fraction-properties/)、[异分母加减](fraction-add/#unlike)，并直接进入 [分数加减练习](calc/#frac-addsub)。

拆站前已迁至几何、应用题和奥数站的 50 个工具目录，由 Netlify 按根目录的 `_redirects` 转到对应工具。

## 分层练习

每个工具都可打开「分层练习」，一次作答一题。基础题辨认概念，进阶题转换表示或运用方法，挑战题侧重推理、纠错和实际应用。输入、选择、读图、读表和步骤排序按题目需要使用。解析在作答后或点「看解析」时出现。教师也可以在工具地址后加 `?practice=1`、`?practice=2` 或 `?practice=3` 直达相应难度。

三个主题题库 `practice-number.js`、`practice-integer.js`、`practice-rational.js` 与 `practice-models.js` 中的题均为本站自编。`practice-sources.js` 按 math105 的册、讲、题号链接《小学数学思维培养教程》原题，在原站打开。练习面板和精确数值判分在 `lesson-practice.js`，样式在 `lesson-practice.css`。

## 工具列表（共 30 个）

- `/big-number-practice`
- `/calc`
- `/column-method`
- `/decimal-1`
- `/decimal-2`
- `/decimal-addsub`
- `/decimal-muldiv`
- `/fact-family`
- `/factor-multiple-practice`
- `/fast-calc`
- `/fraction`
- `/fraction-add`
- `/fraction-mul-div`
- `/fraction-properties`
- `/law_of_operation`
- `/make-ten`
- `/multi-digit-calc`
- `/multiply-model`
- `/multiply_and_div-1`
- `/number-line`
- `/number-line-place-value`
- `/operation-order`
- `/percent`
- `/place-value`
- `/quotient-invariance-practice`
- `/ratio-proportion`
- `/remainder`
- `/simple-equation`
- `/times-as-many`
- `/times-table`

---

由 [math101](https://github.com/Elecsoda/math101) 拆分而来。
