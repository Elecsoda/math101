(() => {
    "use strict";

    const config = window.WORD_PROBLEM_TOOL;
    if (!config || config.dualMethod || config.disableTeachingAdapter) return;

    const sourceNames = {
        1:"绕树绳长",2:"小提琴款",3:"果树棵数",4:"图书单价",5:"果筐重量",6:"猴子桃数",
        8:"速算比赛",9:"机器组装",10:"农机耕地",11:"汽车行程",12:"制作队服",13:"三月星期",
        14:"循环报数",15:"串珠白珠",16:"彩灯颜色",17:"布置展厅",18:"紫砂订单",19:"游园排队",
        20:"寒假看书",21:"展板贴图",29:"木条拼接",30:"音乐小组",31:"划船人数",32:"猴子分桃",
        33:"苹果分配",34:"绕树绳长",35:"羽毛球筒",36:"美猴分桃",37:"水池排水",38:"牧场吃草",
        39:"水池抽水",40:"减少草量",41:"深秋牧场",42:"零花钱",43:"三天喝水",44:"菠萝售价",
        45:"乌鸦喝水",46:"中国结绳",47:"方阵衣服",48:"啦啦操阵",49:"三层方阵",50:"围棋两层",
        51:"百人方阵",52:"花盆方阵",54:"姐妹速度",68:"师徒零件",69:"桌椅单价",70:"水果筐重",
        71:"桌椅套数",72:"电线倒推",73:"编码888",74:"漏加页码",75:"书本页数",76:"数字零数",
        77:"数字五数",78:"编码300",79:"挂钟敲响",80:"父子下楼",81:"漏船淘水",82:"冬季牧场",
        83:"公园划船",84:"新兵宿舍",85:"加工零件",86:"铅笔分配",87:"木板重叠",88:"纸条粘接",
        89:"两车全程",90:"两车相遇",91:"桥上相遇",92:"同反方向",93:"自行车追人",94:"环形追及",
        95:"火车过桥",96:"火车过隧"
    };
    const labelNames = {
        "一个数的28倍少87":"倍数少87",
        "阅览室平均人数":"阅览人数",
        "货车能否一次运完":"货车运货",
        "剩余每天看多少":"剩余日均"
    };

    const compactLabel = problem => {
        if (Number.isInteger(problem.sourceNo) && sourceNames[problem.sourceNo]) return sourceNames[problem.sourceNo];
        let label = String(problem.label || "例题").replace(/^文档\d+\s*·\s*/, "").trim();
        if (labelNames[label]) return labelNames[label];
        if (label.includes("·")) label = label.split("·").pop().trim();
        label = label.replace(/[（(][^）)]*[）)]/g, "").replace(/[①②③④⑤⑥⑦⑧⑨⑩]/g, "").trim();
        return [...label].length <= 6 ? label : [...label].slice(0, 6).join("");
    };

    const splitSteps = steps => (steps || []).flatMap(step => String(step).split(/[。；]/))
        .map(step => step.trim()).filter(step => step && !/^(答[:：]?|计算得到)/.test(step));
    const relationAt = (problem, index) => (problem.relations || [])[index] || null;
    const textAt = (steps, index) => steps[index] || steps[steps.length - 1] || "观察图示中的数量关系。";
    const frame = (title, visual, text, relation = null) => ({ title, visual, text, relation });

    function cycleItems(problem) {
        const story = problem.story || "";
        if (/星期/.test(story)) return ["一","二","三","四","五","六","日"];
        const counted = [...story.matchAll(/(\d+)\s*(?:颗|盏)?(白珠|灰珠|蓝珠|红|绿|黄)/g)];
        if (counted.length) {
            const items = counted.flatMap(match => Array.from({ length: Math.min(10, Number(match[1])) }, () => match[2].replace("珠", "")));
            if (items.length > 1 && items.length <= 12) return items;
        }
        const quoted = story.match(/[“"]([^”"]+)[”"]/);
        if (quoted && /[、，,]/.test(quoted[1])) return quoted[1].split(/[、，,]/).map(item => item.trim()).filter(Boolean).slice(0, 10);
        const sequence = story.match(/按([^。；]{3,35}?)(?:的规律|顺序)/);
        if (sequence) return sequence[1].split(/[、，,]/).map(item => item.replace(/\s/g, "")).filter(Boolean).slice(0, 10);
        return ["1","2","3","4"];
    }

    function cycleStages(problem, steps) {
        const items = cycleItems(problem);
        const remainderText = steps.find(step => /余数|……/.test(step)) || "用总位置除以周期长度，观察余数。";
        const match = remainderText.match(/(?:余数|……)\s*(\d+)/);
        const highlight = match ? (Number(match[1]) || items.length) - 1 : -1;
        return [
            frame("圈出一个周期", {type:"cycle",items,caption:`一个完整周期有 ${items.length} 个位置。`}, textAt(steps,0), relationAt(problem,0)),
            frame("用余数定位", {type:"cycle",items,highlight:Math.min(items.length - 1, highlight),caption:remainderText}, textAt(steps,1), relationAt(problem,1)),
            ...steps.slice(2).map((text,index) => frame(`说明结果${index + 1}`, {type:"cycle",items,highlight:Math.min(items.length - 1, highlight),caption:"回到一个周期内确定位置。"}, text))
        ];
    }

    function pageStages(problem, steps) {
        const story = problem.story || "";
        if (/少加|累加/.test(story)) {
            return steps.map((text,index) => frame(["估计末页","完整页码和","比较差值"][index] || `继续倒推${index + 1}`,
                {type:"table",headers:["比较项","数量"],rows:[["完整计算", index ? "逐步求完整页码和" : "先确定可能的末页"],["题目结果", "2024"],["两者之差", index > 1 ? "就是漏加页码" : "待求"]]}, text, relationAt(problem,index)));
        }
        if (/出现/.test(story)) {
            return steps.map((text,index) => frame(["统计个位","统计十位","统计百位","合并次数"][index] || `继续统计${index + 1}`,
                {type:"table",headers:["数位","统计范围","当前结论"],rows:Array.from({length:index + 1},(_,i)=>[["个位","十位","百位","合计"][i] || `第${i+1}步`,"按完整十或百分段",steps[i] || "继续统计"])}, text, relationAt(problem,index)));
        }
        const ranges = [
            {label:"1～9页",value:"9页 × 1个数字"},
            {label:"10～99页",value:"90页 × 2个数字"},
            {label:"100页以后",value:"每页3个数字"}
        ];
        return steps.map((text,index) => frame(["一位页码","两位页码","三位页码","合并各段"][index] || `继续统计${index + 1}`,
            {type:"range",ranges:ranges.slice(0,Math.min(ranges.length,index + 1))}, text, relationAt(problem,index)));
    }

    function tableStages(problem, steps, labels, headers = ["阶段","当前只处理这一项"]) {
        const rows = [];
        return steps.map((text,index) => {
            rows.push([labels[index] || `第${index + 1}步`, text]);
            return frame(labels[index] || `第${index + 1}步`, {type:"table",headers,rows:rows.map(row => [...row])}, text, relationAt(problem,index));
        });
    }

    function profitStages(problem, steps) {
        return tableStages(problem, steps, ["方案一","方案二","求份数","求总量","检验"], ["分配方案","只记录当前变化"]);
    }

    function reverseStages(problem, steps) {
        const nodes = [{label:"最后结果",value:"从题目最后的数量开始"}];
        return steps.map((text,index) => {
            nodes.push({label:`倒推${index + 1}`,value:text});
            return frame(`逆推第${index + 1}步`, {type:"flow",reverse:true,nodes:nodes.map(node=>({...node}))}, text, relationAt(problem,index));
        });
    }

    function intervalStages(problem, steps) {
        return steps.map((text,index) => frame(["画出点位","数清间隔","扩展到目标","得到结果"][index] || `继续计算${index + 1}`,
            {type:"points",count:Math.min(9,Math.max(3,index + 3)),caption:index ? "在图上同时数点和间隔，避免混淆。" : "先从少量点开始观察。"}, text, relationAt(problem,index)));
    }

    function travelStages(problem, steps) {
        const story = problem.story || "";
        const opposite = /相向|反向/.test(story);
        return steps.map((text,index) => frame(["标出起终点","画出运动方向","计算路程关系","得到结果"][index] || `继续计算${index + 1}`,
            {type:"route",start:"A",end:"B",travellers:[{label:"甲",direction:"right"},{label:"乙",direction:opposite?"left":"right"}],caption:text}, text, relationAt(problem,index)));
    }

    function lineFallback(problem, steps) {
        const relations = problem.relations || [];
        const baseRows = (problem.diagram || []).length ? problem.diagram : relations.map((item,index) => ({
            label:item.label || `关系${index + 1}`,parts:index + 1,note:item.value,tone:index ? "alt" : ""
        }));
        const rows = baseRows.length ? baseRows : [{label:"已知",parts:1,note:"先表示题目的已知量"},{label:"所求",parts:2,note:"再表示所求量",tone:"alt"}];
        return steps.map((text,index) => frame(index ? `补充第${index + 1}个关系` : "表示已知条件",
            {type:"lines"},text,relationAt(problem,index))).map((stage,index,all) => ({
                ...stage,
                rows:rows.slice(0,Math.max(1,Math.ceil(rows.length*(index + 1)/all.length))),
                note:index===all.length-1?(problem.diagramNote||"对照图示完成计算。") : "这一小步只增加当前需要的信息。"
            }));
    }

    function stagesFor(problem, target, steps) {
        if (target === "cycle") return cycleStages(problem,steps);
        if (target === "page") return pageStages(problem,steps);
        if (target === "profit-loss") return profitStages(problem,steps);
        if (target === "reverse") return reverseStages(problem,steps);
        if (target === "normalize") return tableStages(problem,steps,["已知总量","归到1份","扩大到目标","得到结果"],["归一步骤","数量关系"]);
        if (target === "total") return tableStages(problem,steps,["原方案","求不变总量","新方案","比较结果"],["归总步骤","数量关系"]);
        if (["planting","interval"].includes(target)) return intervalStages(problem,steps);
        if (target === "travel") return travelStages(problem,steps);
        if (["cow","engineering","substitution","proportion","promotion","interest","concentration","sports"].includes(target))
            return tableStages(problem,steps,["整理已知","建立关系","求中间量","求目标量","检验"],["推理阶段","当前关系"]);
        return lineFallback(problem,steps);
    }

    const letPrompts = {
        "profit-loss":"设分配对象的数量为 x，只比较两种分配方案。",
        reverse:"设原来的数量为 x；也可以从最后结果开始逐步逆推。",
        normalize:"设1个对象在1个单位时间内完成的量为 x。",
        total:"设题目中保持不变的总量为 x。",
        cycle:"设完整周期数为 x，剩余位置单独处理。",
        page:"设所求页数或数字总数为 x，按页码位数分段。",
        travel:"设所求路程、速度或时间为 x，只使用同一时刻的等量关系。",
        planting:"设间隔数为 x，先分清点数和间隔数。",
        interval:"设间隔数或每边数量为 x，先处理端点和重复点。"
    };

    const originalPrepare = config.prepare;
    config.dualMethod = true;
    config.methodOneTitle = "图示分析";
    config.methodTwoTitle = "列式方程";
    config.subtitle = "按题目选择线段、表格、周期格、流程图或路线图；两种方法均在同页逐步揭示。";
    config.prepare = tool => {
        if (typeof originalPrepare === "function") originalPrepare(tool);
        tool.tabs = tool.tabs.slice(0,4);
        tool.tabs.forEach(tab => {
            tab.problems.forEach(problem => {
                const target = problem.target || tab.id || "general";
                const steps = splitSteps(problem.steps);
                problem.label = compactLabel(problem);
                problem.typeLabel = tab.label || "应用题";
                problem.diagramMethod = {
                    insight: target === "cycle" ? "把重复规律排成一个周期格，再用余数定位。"
                        : target === "reverse" ? "从最后结果沿逆向流程一步步还原。"
                        : ["normalize","total"].includes(target) ? "用表格分开已知量、单位量、不变量和目标量。"
                        : "选择最适合这道题的图或表，一步只整理一个关系。",
                    steps,
                    stages: stagesFor(problem,target,steps)
                };
                problem.equationMethod = {
                    insight:"先设元，再逐条写数量关系；每次只显示一个方程或一次化简。",
                    let:letPrompts[target] || "设题目所求的关键数量为 x。",
                    equations:problem.equation ? [problem.equation] : [],
                    steps
                };
                problem.check = problem.check || "把结果代回题目给出的数量关系，逐项核对单位、总量和变化条件。";
            });
        });
    };
})();
