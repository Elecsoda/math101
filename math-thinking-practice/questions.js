// Generated from the 51-page Feishu PDF export.
window.MATH_THINKING_CATEGORIES = [
    {
        "id": "classic",
        "name": "经典游戏与知识",
        "short": "经典游戏",
        "icon": "▣",
        "description": "作为背景材料的经典游戏、规则与策略"
    },
    {
        "id": "big",
        "name": "大问题",
        "short": "大问题",
        "icon": "⌛",
        "description": "有难度或扩展性、适合完整探究的问题"
    },
    {
        "id": "small",
        "name": "中小问题",
        "short": "中小问题",
        "icon": "◇",
        "description": "按编码、不变量、递推、几何、算法等方法分类"
    },
    {
        "id": "stem",
        "name": "STEM",
        "short": "STEM",
        "icon": "⚙",
        "description": "联系科学、技术与工程情境的数学探究"
    },
    {
        "id": "modeling",
        "name": "模型与建模",
        "short": "模型建模",
        "icon": "⌁",
        "description": "从真实情境抽象关系、建立与比较模型"
    },
    {
        "id": "extension",
        "name": "课内拓展与新知识",
        "short": "课内拓展",
        "icon": "∞",
        "description": "悖论、概率、密码、数论与课内知识延伸"
    }
];

window.MATH_THINKING_QUESTIONS = [
    {
        "id": "T001",
        "title": "翻转木块",
        "category": "classic",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "1–2",
        "context": "",
        "prompt": "问题描述：\n翻木块（微软商城中叫Bloxorz）。\n游戏规则很简单：\n木块可立着、躺着◦\n不可立在黄块上，平躺时必须躺在2块上◦\n最终，立在红块上获胜◦",
        "answer": "这是一道开放策略题。可把每一步记录成“位置＋姿态”：竖立、横躺或竖躺；只保留完全落在地板上的合法状态，并以竖直立在红色方块上为终点。",
        "explanation": "木块每翻一次，姿态会按“竖立 ↔ 横躺/竖躺”变化。若要系统寻找最短路线，可以从起点开始逐层枚举所有合法且未重复的状态；第一次到达红色终点时，得到的就是最少步数路线。",
        "media": [
            "assets/source-t001-1.jpg",
            "assets/source-t001-2.jpg"
        ]
    },
    {
        "id": "T002",
        "title": "过桥谜题",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "2",
        "context": "",
        "prompt": "晚上有四个人要过桥，只有一个手电筒，每次过桥都需要手电筒。桥不太结实，每次最多可同时\n过两个人，其中爸爸过桥要 1 分钟，妈妈要 2 分钟，儿子要 5 分钟，爷爷要 10 分钟。\n求最短的过桥时间及策略。",
        "answer": "最短时间是 <strong>17 分钟</strong>：爸爸和妈妈过桥（2）→ 爸爸返回（1）→ 儿子和爷爷过桥（10）→ 妈妈返回（2）→ 爸爸和妈妈再次过桥（2）。",
        "explanation": "让最慢的两人一起过桥，避免分别支付 10 分钟和 5 分钟；同时用最快的两人接送手电筒。总时间为 2＋1＋10＋2＋2＝17 分钟。",
        "media": [
            "assets/source-t002.jpg"
        ]
    },
    {
        "id": "T003",
        "title": "过桥问题升级",
        "category": "big",
        "subcategory": "",
        "topic": "过桥谜题",
        "type": "变式 / 子题",
        "sourcePages": "2–3",
        "context": "晚上有四个人要过桥，只有一个手电筒，每次过桥都需要手电筒。桥不太结实，每次最多可同时\n过两个人，其中爸爸过桥要 1 分钟，妈妈要 2 分钟，儿子要 5 分钟，爷爷要 10 分钟。\n求最短的过桥时间及策略。",
        "prompt": "晚上有四个人要过桥，只有一个手电筒，每次过桥都需要手电筒。桥不太结实，每次最多可同时\n过两个人，其中爸爸过桥要 1 分钟，妈妈要 3分钟，儿子要 5 分钟，爷爷要 10 分钟。最优的策略会\n发生变化吗？\n一家四口的过桥时间分别为：爸爸过桥要T1分钟，妈妈要T2分钟，儿子要T3分钟，爷爷要T4分\n钟，且T1<T2<T3<T4.\n这个时候最短的过桥时间是什么？（用T1，T2，T3，T4来表示），策略又是什么？",
        "answer": "最短时间是 <strong>20 分钟</strong>。原策略仍然最优，但不再唯一：既可以让两个最快者协作接送，也可以由最快者分别陪另外三人过桥，两种策略都是 20 分钟。",
        "explanation": "设用时为 a≤b≤c≤d。两种常见方案的代价分别为 a＋3b＋d 与 2a＋b＋c＋d，相差 2b－a－c。本题 a＝1、b＝3、c＝5，差为 0，所以两种方案同样快。",
        "media": [
            "assets/source-t003-1.jpg",
            "assets/source-t003-2.jpg"
        ]
    },
    {
        "id": "T004",
        "title": "更多人过桥",
        "category": "big",
        "subcategory": "",
        "topic": "过桥谜题",
        "type": "变式 / 子题",
        "sourcePages": "3",
        "context": "晚上有四个人要过桥，只有一个手电筒，每次过桥都需要手电筒。桥不太结实，每次最多可同时\n过两个人，其中爸爸过桥要 1 分钟，妈妈要 2 分钟，儿子要 5 分钟，爷爷要 10 分钟。\n求最短的过桥时间及策略。",
        "prompt": "5个人过桥，仍然是之前的规则，只有一盏灯，所需时间分别为1,3,6,8,12分钟，如何在30分钟\n内过桥？\n如果共10个人，所需时间分别为1、2、3、4、5、6、7、8、9、10分钟，你能得出的最短时间\n是多少？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t004.jpg"
        ]
    },
    {
        "id": "T005",
        "title": "下落的猴子",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "3",
        "context": "",
        "prompt": "有 4 根并排放置的木杆，每根木杆的顶端都有一只猴子，每根木杆底端都有 一根香蕉。猴子们会一\n个一个地沿着木杆爬到底端去吃香蕉。 在此之前，你可以在这 4 根木杆之间添加任意数量的横梁，\n横梁必须加在两根相邻木杆之间，所有横梁高度互不相同 (如图所示，给出了一个例子，还可能有很\n多种其他情况)。 然后，猴子会依次地沿着木杆往下落，每次遇到一根横梁都必须爬到横梁的 另一端\n去。 请问: 这 4 个猴子都能吃到香蕉吗? 尝试说明你的结论。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t005.jpg"
        ]
    },
    {
        "id": "T006",
        "title": "扩展：",
        "category": "big",
        "subcategory": "",
        "topic": "下落的猴子",
        "type": "变式 / 子题",
        "sourcePages": "3–4",
        "context": "有 4 根并排放置的木杆，每根木杆的顶端都有一只猴子，每根木杆底端都有 一根香蕉。猴子们会一\n个一个地沿着木杆爬到底端去吃香蕉。 在此之前，你可以在这 4 根木杆之间添加任意数量的横梁，\n横梁必须加在两根相邻木杆之间，所有横梁高度互不相同 (如图所示，给出了一个例子，还可能有很\n多种其他情况)。 然后，猴子会依次地沿着木杆往下落，每次遇到一根横梁都必须爬到横梁的 另一端\n去。 请问: 这 4 个猴子都能吃到香蕉吗? 尝试说明你的结论。",
        "prompt": "如果在一个奇怪的岛上，有不同颜色的猴子和不同颜色的香蕉。灰、红、蓝、绿 4 只不同颜色的猴\n子，它们只喜欢吃和自己颜色一样的香蕉。 若猴子们下落的规则与上题一样，遇到横梁就一定爬到\n横梁的另一端。 请帮忙设计横梁，让猴子们都能吃到自己喜欢的香蕉。并思考，最少需要多少根横\n梁？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t006-1.jpg",
            "assets/source-t006-2.jpg"
        ]
    },
    {
        "id": "T007",
        "title": "Bash游戏及其变形",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "4",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t007.jpg"
        ]
    },
    {
        "id": "T008",
        "title": "前进的皇后",
        "category": "big",
        "subcategory": "",
        "topic": "前进的皇后&Whythoff's game",
        "type": "变式 / 子题",
        "sourcePages": "4–5",
        "context": "",
        "prompt": "在 8×8 的国际象棋棋盘中，皇后只能沿着横、竖、斜的直线走。现在皇后的目标是去往右上角，所\n以只能向上、向右、或者右上方向前进。你和妈妈一起玩这个游戏。你先将棋子放在第一行或第一列\n的任意位置，然后由妈妈行动， 再由你行动……先到达右上角的获胜。\n问：你在第一步，会选择将棋子放在哪一格？为什么 ？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t008-1.jpg",
            "assets/source-t008-2.jpg"
        ]
    },
    {
        "id": "T009",
        "title": "Wythoff's Game",
        "category": "big",
        "subcategory": "",
        "topic": "前进的皇后&Whythoff's game",
        "type": "变式 / 子题",
        "sourcePages": "5",
        "context": "",
        "prompt": "有两堆硬币 (一堆 10 枚，另一堆 20 枚)，你和妈妈一起玩取硬币的游戏。 你们俩交替行动，可以在\n某一堆中拿走任意数目的硬币，也可以同时在两堆 里拿走相同数目的硬币，拿走最后一枚的获胜。\n请问：你会选择先行动还是后行动？你的策略是什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t009.jpg"
        ]
    },
    {
        "id": "T010",
        "title": "AI Riddle",
        "category": "big",
        "subcategory": "",
        "topic": "NIM游戏",
        "type": "变式 / 子题",
        "sourcePages": "5–6",
        "context": "",
        "prompt": "AI NIM控制了全世界的电脑，你有唯一一次机会去关掉NIM。\n你发现NIM被藏在一个25层的水塔底部。这个水塔是通电的，你只能通过一个充气船逐渐下降。\n你手上有一个遥控装置，每次可下降1、3或4层。但是NIM监控着你的一切，它也能控制你下降1、3\n或4层。你们交替行动，你要是先到达0层就能关掉NIM，但如果NIM控制你到达0层，就能通过排水\n洞把你排出去。\nNIM能计算出所有可能性，你先行动，请问要如何取胜？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t010-1.jpg",
            "assets/source-t010-2.jpg"
        ]
    },
    {
        "id": "T011",
        "title": "无路可走",
        "category": "big",
        "subcategory": "",
        "topic": "NIM游戏",
        "type": "变式 / 子题",
        "sourcePages": "6",
        "context": "",
        "prompt": "A、B在4×10棋盘的两个顶点，随后轮流行动，每次可沿横或竖移动任意格。要求，双方不可处于同\n一直线，也不可越过对方所在直线。轮到谁无路可走就算输。\n请问你有何策略？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t011.jpg"
        ]
    },
    {
        "id": "T012",
        "title": "The Hardest Logic Puzzle Ever",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "6",
        "context": "",
        "prompt": "有A、B、C三位神，名为“真实、虚谎、任性”，他们外表完全一样。真实之神只说真话，虚谎之神\n只说假话，而任性之神会随意说真话或假话。\n目标：向它们提3个是非问题（可以用“是”或“否”回答的问题），找出A、B、C的身份。\n•\n你可以向他们提问，神也能听懂你的问题，但只会用他们的语言回答“Da”或“Ja”。这两个回\n答，一个代表“是”，一个代表“否”，但你不知道Da和Ja谁代表“是”、谁代表“否”。\n•每次只能向一位神发问，你可以问一位神多个问题，也可以完全不问他问题。•任性之神回答时，可以想象为他在脑袋里掷硬币，正面则回答真话，反面则回答假话。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t012.jpg"
        ]
    },
    {
        "id": "T013",
        "title": "升级牧师与野人",
        "category": "big",
        "subcategory": "",
        "topic": "牧师与野人",
        "type": "变式 / 子题",
        "sourcePages": "7",
        "context": "有三位牧师和三个野人要乘船渡河，小船一次最多容纳两个人，他们都可以划船。野人有坏脾气，如\n果河的某一岸，野人的数量比牧师多，野人就会攻击牧师。\n请设计渡河方式，让所有人都能安全渡河。",
        "prompt": "改变牧师和野人的数量，有何发现？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t013.jpg"
        ]
    },
    {
        "id": "T014",
        "title": "开灯谜题",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "7",
        "context": "",
        "prompt": "有3个触摸开关，分别控制3盏灯。\n如果闭着眼只能区分全灭、全亮，和其它状态（有灯亮，但不是全亮）。\n若一开始灯不是全灭、全亮，你最少需要触摸多少次开关，才能将其调为全灭或全亮？\n7个灯围成一圈，现在2号、6号灯是打开的，其它都是关闭状态。我们想要把7个灯全部打开。如果\n这7个灯可以单独控制，任务很简单。\n可如果你每次必须控制相邻的3个灯，你又能否实现任务呢？如果每次控制相邻的5个灯呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t014.jpg"
        ]
    },
    {
        "id": "T015",
        "title": "闭眼开灯",
        "category": "big",
        "subcategory": "",
        "topic": "开灯谜题",
        "type": "变式 / 子题",
        "sourcePages": "7–8",
        "context": "有3个触摸开关，分别控制3盏灯。\n如果闭着眼只能区分全灭、全亮，和其它状态（有灯亮，但不是全亮）。\n若一开始灯不是全灭、全亮，你最少需要触摸多少次开关，才能将其调为全灭或全亮？\n7个灯围成一圈，现在2号、6号灯是打开的，其它都是关闭状态。我们想要把7个灯全部打开。如果\n这7个灯可以单独控制，任务很简单。\n可如果你每次必须控制相邻的3个灯，你又能否实现任务呢？如果每次控制相邻的5个灯呢？",
        "prompt": "现在有2个开关，分别控制2个灯泡。\n我们闭着眼睛，只能区分全亮和非全亮（包括全灭）。\n开始灯非全亮我们的目标是把灯全部打开每次只能按个开关\n⼀开始灯非全亮，我们的目标是把灯全部打开。每次只能按一个开关。\n问：你最少需要触摸开关多少次，才能确保完成任务？\n如果有3个灯、4个灯呢（开始非全亮），你最少需要多少次？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t015-1.jpg",
            "assets/source-t015-2.jpg"
        ]
    },
    {
        "id": "T016",
        "title": "找出内奸",
        "category": "big",
        "subcategory": "",
        "topic": "开灯谜题",
        "type": "变式 / 子题",
        "sourcePages": "8",
        "context": "有3个触摸开关，分别控制3盏灯。\n如果闭着眼只能区分全灭、全亮，和其它状态（有灯亮，但不是全亮）。\n若一开始灯不是全灭、全亮，你最少需要触摸多少次开关，才能将其调为全灭或全亮？\n7个灯围成一圈，现在2号、6号灯是打开的，其它都是关闭状态。我们想要把7个灯全部打开。如果\n这7个灯可以单独控制，任务很简单。\n可如果你每次必须控制相邻的3个灯，你又能否实现任务呢？如果每次控制相邻的5个灯呢？",
        "prompt": "国王有4个大臣，其中一个是内奸。他们要开会商讨找出内奸，内奸要想办法阻碍会议召开。\n他们4个坐在圆周四周（如图），每位大臣面前都有一个灯和开关。\n国家有规定，只有4位大臣的灯都亮起来，才能开始会议。当有灯没亮时，国王会提醒没亮的大臣按\n下开关，如果不按就表示心虚。\n而内奸早就对开关动了手脚，他可以在大家按下开关之前，悄悄控制开关电路进行旋转，例如将\n1234旋转为2341或3412等。\n如果你是国王，你能让会议正常召开吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t016.jpg"
        ]
    },
    {
        "id": "T017",
        "title": "找出假币",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "8",
        "context": "",
        "prompt": "9 枚硬币中，一枚假币（较重），用天平称。 你最少几次就能确保找出这枚假币？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t017.jpg"
        ]
    },
    {
        "id": "T018",
        "title": "奇怪的电子天平",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "8",
        "context": "",
        "prompt": "现在，我们换了一个奇怪的电子天平，称量后不能马上知道哪边轻哪边重，必须等你称完几次后，统\n一将结果打出来。 请问：用这个奇怪的天平，你最少需要称量几次，就一定能找出假币？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t018.jpg"
        ]
    },
    {
        "id": "T019",
        "title": "找出假币堆1",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "8",
        "context": "",
        "prompt": "有 10 袋外观一模一样的金币，遗憾的是有一袋是假币。我们知道一枚真币重 10 克，而一枚假币重\n11 克。 现在你有一个电子秤，可以用来称量这些硬币 的重量。 请问：你最少需要称量几次，就判断\n出哪一堆是假币？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t019.jpg"
        ]
    },
    {
        "id": "T020",
        "title": "找出假币堆2",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "8–9",
        "context": "",
        "prompt": "有 10 堆 外观完全一致的硬币，其中有几堆全部都是假币，其它各堆中的硬币都是真币。所有真\n币重量都是10 克假币则重11 克你有一把示数可读的秤问：最少称几次才能将假币堆辨别出\n币重量都是 10 克，假币则重 11 克。你有一把示数可读的秤，问：最少称几次才能将假币堆辨别出\n来？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t020-1.jpg",
            "assets/source-t020-2.jpg"
        ]
    },
    {
        "id": "T021",
        "title": "钞票组合",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "9",
        "context": "",
        "prompt": "你手里有1000张1元钞票。如何将其分装到10个信封里，使得从1到1000元的任何数都可用若干\n信封组合给出？不允许找零。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t021.jpg"
        ]
    },
    {
        "id": "T022",
        "title": "砝码问题",
        "category": "big",
        "subcategory": "",
        "topic": "找出假币",
        "type": "变式 / 子题",
        "sourcePages": "9",
        "context": "",
        "prompt": "现在有一个天平，需要称量1g~1000g的任意重量的物品（重量是整数克数）。最少需要多少个\n砝码就一定能称出来？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t022.jpg"
        ]
    },
    {
        "id": "T023",
        "title": "相遇几次",
        "category": "big",
        "subcategory": "",
        "topic": "Alice 历险记",
        "type": "变式 / 子题",
        "sourcePages": "9",
        "context": "Alice 和 6 个小伙伴出去觅食，不小心掉落在一根 1 米长的升降杆上。它们掉落在杆上的时候，位置\n是随机的，但 Alice 在 7 只蚂蚁的中间。然后每只蚂蚁都开始以每秒 1 厘米的速度向前走，当两只蚂\n蚁碰面时，它们就掉头往回走。此时，升降杆也在往下运动着…",
        "prompt": "若一开始，Alice 及其左的蚂蚁都面朝右，Alice 右侧的 3 只蚂蚁都面朝左。 请问：在所有蚂蚁掉下\n杆前，所有蚂蚁总共会相遇 (碰撞) 多少次？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t023.jpg"
        ]
    },
    {
        "id": "T024",
        "title": "能否成功着陆",
        "category": "big",
        "subcategory": "",
        "topic": "Alice 历险记",
        "type": "变式 / 子题",
        "sourcePages": "9",
        "context": "Alice 和 6 个小伙伴出去觅食，不小心掉落在一根 1 米长的升降杆上。它们掉落在杆上的时候，位置\n是随机的，但 Alice 在 7 只蚂蚁的中间。然后每只蚂蚁都开始以每秒 1 厘米的速度向前走，当两只蚂\n蚁碰面时，它们就掉头往回走。此时，升降杆也在往下运动着…",
        "prompt": "如果一开始所有蚂蚁的朝向和位置都是随机的（朝左朝右都有可能，落在杆的任何地方都有可能，下\n图仅供参考），但 Alice 还是中间那只蚂蚁。升降杆还有 50 秒就落地了，到时候还在杆上的蚂蚁就\n能成功着陆了。\n请问：最开始蚂蚁们的朝向和位置满足什么条件时，Alice 能成功着陆？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t024.jpg"
        ]
    },
    {
        "id": "T025",
        "title": "要不要调头",
        "category": "big",
        "subcategory": "",
        "topic": "Alice 历险记",
        "type": "变式 / 子题",
        "sourcePages": "9–10",
        "context": "Alice 和 6 个小伙伴出去觅食，不小心掉落在一根 1 米长的升降杆上。它们掉落在杆上的时候，位置\n是随机的，但 Alice 在 7 只蚂蚁的中间。然后每只蚂蚁都开始以每秒 1 厘米的速度向前走，当两只蚂\n蚁碰面时，它们就掉头往回走。此时，升降杆也在往下运动着…",
        "prompt": "如果 Alice 一开始头朝右，而且它知道一个消息，杆的右边是悬崖，左边是陆地。这时候 Alice 看到\n面前的 3 只蚂蚁，有两只朝向它（也就是面朝左），但 Alice 看不到它身后蚂蚁的朝向。由于 Alice\n是主角，我们在一开始，给它一 次可以原地调头的机会。 请问：Alice 为了成功从左侧登陆，该不该\n调头？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t025-1.jpg"
        ]
    },
    {
        "id": "T026",
        "title": "感冒传染",
        "category": "big",
        "subcategory": "",
        "topic": "Alice 历险记",
        "type": "变式 / 子题",
        "sourcePages": "10",
        "context": "Alice 和 6 个小伙伴出去觅食，不小心掉落在一根 1 米长的升降杆上。它们掉落在杆上的时候，位置\n是随机的，但 Alice 在 7 只蚂蚁的中间。然后每只蚂蚁都开始以每秒 1 厘米的速度向前走，当两只蚂\n蚁碰面时，它们就掉头往回走。此时，升降杆也在往下运动着…",
        "prompt": "如果 Alice 感冒了，和它接触的蚂蚁都会被传染。而且被传染的蚂蚁，都能进一步传染其它蚂蚁。被\n感染前如果跳下杆，就成功脱逃了。问题改为 9 只蚂 蚁，Alice 在中间，所有蚂蚁的位置和朝向都是\n随机的（下图的朝向和位置仅供参考，蚂蚁们可能落在杆的任何地方，朝向也可能不同）。 请问：\n你认为 Alice 会传染几只蚂蚁？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t026.jpg"
        ]
    },
    {
        "id": "T027",
        "title": "Josephus problem",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "10",
        "context": "",
        "prompt": "将猴子们编号 1∼41，然后所有猴子围成一个圈，从 1 号开始数数，数到 2 的 就淘汰出局，离开圈。\n下一个猴子重新从 1 开始数，一直到最后只剩下一只猴子，那么它就是大王。\n为了清晰规则，我们拿 5 只猴子来做个示例，下面 是它们的淘汰顺序： 现在 41 只猴子马上就要去领\n号码了，所有猴子都想拿到能留到最后的号码。 所以大家都开始在地上画圈，模拟待会儿战斗的过\n程。\n请问：如果你是 Josephus，你会选择哪个号码？你能找到什么规律，来快速计算结果吗？（算太慢\n可能就被其它猴子抢走了）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t027.jpg"
        ]
    },
    {
        "id": "T028",
        "title": "扩展问题",
        "category": "big",
        "subcategory": "",
        "topic": "Josephus problem",
        "type": "变式 / 子题",
        "sourcePages": "10–11",
        "context": "将猴子们编号 1∼41，然后所有猴子围成一个圈，从 1 号开始数数，数到 2 的 就淘汰出局，离开圈。\n下一个猴子重新从 1 开始数，一直到最后只剩下一只猴子，那么它就是大王。\n为了清晰规则，我们拿 5 只猴子来做个示例，下面 是它们的淘汰顺序： 现在 41 只猴子马上就要去领\n号码了，所有猴子都想拿到能留到最后的号码。 所以大家都开始在地上画圈，模拟待会儿战斗的过\n程。\n请问：如果你是 Josephus，你会选择哪个号码？你能找到什么规律，来快速计算结果吗？（算太慢\n可能就被其它猴子抢走了）",
        "prompt": "上面的方案中，显然偶数全都会被淘汰。猴子们认为应该增加一轮选举，先\n选出候选人然后再按上面的办法选出最后的猴王\n选出候选人，然后再按上面的办法选出最后的猴王。\n第一轮的选举办法如下：将 41 张选票放在地上，全部背面朝上，选择几号的\n猴子，就将号码倍数的选票翻过来。为了清晰规则，我们让前 8 只猴子来做\n示范：\n• 一开始，所有选票都背面朝上\n• 1 号猴子将所有选票翻转过来，此时所有选票都正面朝上\n• 2 号猴子将所有 2 的倍数都翻一遍，现在只有单数是正面朝上\n• 3 号猴子将所有 3 的倍数翻一遍，此时朝上的有 1、5、6、7\n• 后面的猴子以此类推……\n• 最后只有 1 号和 4 号成为候选人\n41 只猴子中进入下一轮的，将按照号码从小到大围成圈，再进行上一个问题\n的角逐。\n请问：哪些号码最后能正面朝上，让对应的猴子进入下一轮？为了连胜两轮，\nJosephus 应该选择哪个号码？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t028-1.jpg",
            "assets/source-t028-2.jpg"
        ]
    },
    {
        "id": "T029",
        "title": "Five Houses Riddle",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "11",
        "context": "",
        "prompt": "有 5 个具有 5 种不同颜色的房间； 每个房间里分别住着一个不同国籍的人； 每个人都喝特定品牌的\n饮料；抽特定品牌的香烟；养特定的宠物； 没有任何两个人在抽相同品牌的烟、或喝相同品牌饮\n料、或养相同的宠物。 请问：谁养金鱼？写出你的推理过程。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t029.jpg"
        ]
    },
    {
        "id": "T030",
        "title": "Futoshiki游戏",
        "category": "big",
        "subcategory": "",
        "topic": "Five Houses Riddle",
        "type": "变式 / 子题",
        "sourcePages": "11–12",
        "context": "有 5 个具有 5 种不同颜色的房间； 每个房间里分别住着一个不同国籍的人； 每个人都喝特定品牌的\n饮料；抽特定品牌的香烟；养特定的宠物； 没有任何两个人在抽相同品牌的烟、或喝相同品牌饮\n料、或养相同的宠物。 请问：谁养金鱼？写出你的推理过程。",
        "prompt": "上面的爱因斯坦 Five Houses riddle，和我们熟悉的数独很像，都是在一些方格中填空，最后要满足\n所有约束条件。 其实像这样的谜题还有很多，例如 Futoshiki 游戏，一个起源于日本的逻辑谜题。\n要求：\n1. 每行每列的数字各不相同，且必须包含 1、2、3、4\n2. 需满足不等符号的约束，例如 > 的左边必须大于右边\n例如，下图就是一个成功完成的 Futoshiki 游戏。\n请同学们尝试挑战一下，下面这两个 Futoshiki 游戏，并尝试总结你的策略是什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t030-1.jpg",
            "assets/source-t030-2.jpg"
        ]
    },
    {
        "id": "T031",
        "title": "翻纸杯游戏",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "12",
        "context": "",
        "prompt": "桌上摆着 5 个纸杯（开口朝上），现在允许你每次翻转 2 个纸杯（2 个纸杯不用连着）. 请问：翻转\n多少次可以让纸杯全部开口朝下？如果每次可翻转 3 个纸杯呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t031.jpg"
        ]
    },
    {
        "id": "T032",
        "title": "变式1:",
        "category": "big",
        "subcategory": "",
        "topic": "翻纸杯游戏",
        "type": "变式 / 子题",
        "sourcePages": "12",
        "context": "桌上摆着 5 个纸杯（开口朝上），现在允许你每次翻转 2 个纸杯（2 个纸杯不用连着）. 请问：翻转\n多少次可以让纸杯全部开口朝下？如果每次可翻转 3 个纸杯呢？",
        "prompt": "如果杯子数量变为 101 个 (都开口向上)，每次可翻转 5 个纸杯，你需要多少次操作就能实现全部翻\n转？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t032.jpg"
        ]
    },
    {
        "id": "T033",
        "title": "变式2：",
        "category": "big",
        "subcategory": "",
        "topic": "翻纸杯游戏",
        "type": "变式 / 子题",
        "sourcePages": "12–13",
        "context": "桌上摆着 5 个纸杯（开口朝上），现在允许你每次翻转 2 个纸杯（2 个纸杯不用连着）. 请问：翻转\n多少次可以让纸杯全部开口朝下？如果每次可翻转 3 个纸杯呢？",
        "prompt": "把 5 个纸杯摆成圆形，然后每次翻转 3 个相连的纸杯，你能完成任务吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t033-1.jpg",
            "assets/source-t033-2.jpg"
        ]
    },
    {
        "id": "T034",
        "title": "变式3:",
        "category": "big",
        "subcategory": "",
        "topic": "翻纸杯游戏",
        "type": "变式 / 子题",
        "sourcePages": "13",
        "context": "桌上摆着 5 个纸杯（开口朝上），现在允许你每次翻转 2 个纸杯（2 个纸杯不用连着）. 请问：翻转\n多少次可以让纸杯全部开口朝下？如果每次可翻转 3 个纸杯呢？",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t034.jpg"
        ]
    },
    {
        "id": "T035",
        "title": "藏宝大作战",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "13–14",
        "context": "",
        "prompt": "下图分别是藏宝记号 (左图)，和宝箱的真实位置 (中图)。\n你认为图中的数字代表什么意思呢？用猜测的规则找出右图中的宝箱。\n你现在有 4 个宝箱，你把宝箱藏在了下图中的位置中。为了便于以后挖宝箱，你还做了一些标记。做\n完后你感觉 6 个标记太多了，容易被别人猜出来。 于是你想减少记号数量，但也不能太少，至少要\n确保以后能找出宝箱。\n问：你最少用几个记号，就能达到藏宝的要求？（所有空余位置都可以做标记）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t035-1.jpg",
            "assets/source-t035-2.jpg"
        ]
    },
    {
        "id": "T036",
        "title": "哥尼斯堡的七桥问题",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "14–15",
        "context": "",
        "prompt": "在 18 世纪哥尼斯堡有一条河穿过，河上有两个小岛，有七座桥把两个岛与河岸连起来。许多市民喜\n欢在城市中闲逛以打发他们周日下午的时光。\n请问：你能否从某个位置 (河岸或岛屿) 出发，不重复、不遗漏地穿过哥尼斯堡 7 座桥各一次？给出\n你的理由。\n如图，9 个正方形水池，边长均为 1 米，相互间隔一致（宽度可忽略），形成了一个 3 × 3 的平方方\n格，其间小路 (黑线部分) 可以行走。现在从任一位置出发，沿小路围绕正方形水池行走，不走重复\n路线。 请问：最多能走多少米（不能超出大正方形）？给出你的方案。\n邮递员从邮局（左上角）出发，要经过每一条街（黑线部分）送信，每条街要走 10 分钟，最后邮递\n员要回到邮局。 请问：邮递员最少需要多少时间，才能完成每个街道的送信，并回到邮局？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t036-1.jpg",
            "assets/source-t036-2.jpg"
        ]
    },
    {
        "id": "T037",
        "title": "神奇的第七层",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "15",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t037.jpg"
        ]
    },
    {
        "id": "T038",
        "title": "骑士的回路",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "15–16",
        "context": "",
        "prompt": "在国际象棋中，骑士（马）只能走”L° 形，如右图。现在棋盘上有一个骑士，两个人拿着骑士交替\n行动，走过的方格不能再走，谁无路可走了，就算输。\n问：你认为先手更容易赢，还是后手？\n骑士在前两个问题中都没能走完全场，很难过。但他并不灰心，他坚持要不重复地走完棋盘的每个方\n格！你能帮助骑士实现这一愿望吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t038-1.jpg",
            "assets/source-t038-2.jpg"
        ]
    },
    {
        "id": "T039",
        "title": "猫抓老鼠",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "16",
        "context": "",
        "prompt": "老鼠Jerry逃到圆形游泳池里，但猫咪Tom不会游泳，它就只能沿着游泳池跑。\n现在知道Tom沿着游泳池跑的速度，是Jerry游泳速度的4倍。而日Jerry在陆地上跑得比Tom快。\n问：Jerry能从游泳池逃离吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t039.jpg"
        ]
    },
    {
        "id": "T040",
        "title": "回到起点",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "16",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t040.jpg"
        ]
    },
    {
        "id": "T041",
        "title": "倒水谜题",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "16",
        "context": "",
        "prompt": "用一个4升和一个9升的容器，如何从一条河中怡好取出6升水？你能用这两个容器取出其它体积的水\n吗？（比如，能取出2升、3升、7升、8升吗？）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t041.jpg"
        ]
    },
    {
        "id": "T042",
        "title": "电影院问题",
        "category": "big",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "16–17",
        "context": "",
        "prompt": "有100个人拿着电影票依次进入电影院（刚好100个座位），可是第一个进入电影院的人不小心把电\n影票弄丢了，于是第一个人随便找了个座位坐下。后面进来的人如果位置还在，就对号入座；如果位\n置不在了，就随便找个座位坐下。\n问：最后一个人刚好坐到自己座位的可能性是多少？\n魔法杖问题\n你代表魔法学院参加魔法比赛。你的对手其中一个人有90%的概率将人变成石头，另一个人有70%的\n概率将人变成鱼。\n从你开始，按顺时针的顺序施法，每次最多只能向一个人施法。你有3个道具可以选择，击败对手的\n概率分别是60%、80%、100%。\n如果一轮过后，你们3个都还正常地站在场上那么都会被变成猫咪。\n请问你选择哪个道具获胜的概率最大？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t042-1.jpg",
            "assets/source-t042-2.jpg"
        ]
    },
    {
        "id": "T043",
        "title": "被污染的药水",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "17",
        "context": "",
        "prompt": "现有配好的20瓶药水，其中有一瓶被强力安眠药污染了。被污染的药只要喝上一滴，就会在1小时内\n陷入睡眠状态。现在时间紧急，我们必须在2小时内，用实验小白鼠找出被污染的药。\n问：你最少需要多少只小白鼠？写出你的方案。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t043.jpg"
        ]
    },
    {
        "id": "T044",
        "title": "警察抓小偷",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "17–18",
        "context": "",
        "prompt": "警察抓小偷，每次走一步到邻近 (线段相连的) 圆圈，如果警察和小偷在同一个圆圈中，警察就抓住\n小偷了。 问：若警察先行动，最少需要几步才能抓到？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t044-1.jpg",
            "assets/source-t044-2.jpg"
        ]
    },
    {
        "id": "T045",
        "title": "问题变式",
        "category": "small",
        "subcategory": "编码",
        "topic": "警察抓小偷",
        "type": "变式 / 子题",
        "sourcePages": "18",
        "context": "警察抓小偷，每次走一步到邻近 (线段相连的) 圆圈，如果警察和小偷在同一个圆圈中，警察就抓住\n小偷了。 问：若警察先行动，最少需要几步才能抓到？",
        "prompt": "将问题规模扩大到4*4的方格中，会发现警察与小偷初始奇偶性相同，每行动完一轮后仍然保持奇偶\n性相同。而相同的奇偶性不存在相邻的格子，所以警察永远抓不到小偷。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t045.jpg"
        ]
    },
    {
        "id": "T046",
        "title": "青蛙&蟾蜍游戏",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "18–19",
        "context": "",
        "prompt": "在一维棋盘的7个相连方格上，一端有3只青蛙，另一端有3只蟾蜍。\n青蛙只能向右跳，且只能跳到空格中：\n•如果相邻的是空格，可以直接跳到空格中\n•如果相邻的是蟾蜍，而蟾蜍右侧是空格，那么可以越过这一只蟾蜍跳到后面的空格中。\n蟾蜍只能向左跳，其余规则与青蛙类似，只能跳到相邻空格，或越过一只青蛙跳到空格中。\n问：你能否实现青蛙和蟾蜍互换位置？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t046-1.jpg",
            "assets/source-t046-2.jpg"
        ]
    },
    {
        "id": "T047",
        "title": "周期大富翁",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "19",
        "context": "",
        "prompt": "在一个神奇的世界中，存在一个方形的循环通道。4个顶点处各有一个门，可以进入和离开。每走过\n一条通道，需要花1分钟的时间，且本金都会发生对应的变化（例如，经过上面的通道，本金会\n+3）。你从一个门进入后，必须一直绕着顺时针转，直到选择一个门离开。\n你现在有1元钱本金，你的任务是用尽量少的时间，让本金达到123元。\n问：你会选择从那个门进、哪个门出，为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t047.jpg"
        ]
    },
    {
        "id": "T048",
        "title": "Autobiographical Numbers",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "19–20",
        "context": "",
        "prompt": "Autobiographical Number（自传数）又叫Self-descriptive Number（自描述数），因为这类数的\n每一位数字都在做自我描述。例如，1210就是一个自传数：\n•第一个数字1表示，在1210中，0出现了1次；•第二个数字2表示，在1210中，1出现了2次；•第三个数字1表示，在1210中，2出现了1次；•第四格数字0表示，在1210中，3出现了0次。\n又例如，3211000是一个7位的自传数（请同学们自行验证）。而4位的自传数除了1210，还有另一\n种情况。\n问：你能否得到另一种情况的4位自传数？你能否得到5、8、9位的自传数？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t048-1.jpg",
            "assets/source-t048-2.jpg"
        ]
    },
    {
        "id": "T049",
        "title": "二进制与读心术",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "20",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t049.jpg"
        ]
    },
    {
        "id": "T050",
        "title": "二维码的秘密",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "20",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t050.jpg"
        ]
    },
    {
        "id": "T051",
        "title": "魔术师的奥秘",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "20–21",
        "context": "",
        "prompt": "魔术师和助手一起表演魔术。\n桌上放有8枚硬币，摆成一排。助手请一位观众上去，随意改变硬币的正反，然后用手指认一枚硬\n币。（整个过程，魔术师都不能看）\n然后，助手思考一会儿，改动其中一枚硬币的正反，再请魔术师过来。\n此时，魔术师看一下这一排有正有反的硬币，就能准确说出，观众指认的是哪一枚硬币。\n请问，你能否设计一个规则，只有魔术师和助手知道，让魔术师能成功完成该魔术？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t051-1.jpg",
            "assets/source-t051-2.jpg"
        ]
    },
    {
        "id": "T052",
        "title": "电池问题",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "21",
        "context": "",
        "prompt": "10节电池混装在一起，5节有电，5节没有电，外观一样。你每次可装2节到手电筒里，只有两节都有\n电，手电筒才会亮。你最少试多少次，就一定会成功？\n问：如果改成6节有电、4节没电，你又最少需要多少次呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t052.jpg"
        ]
    },
    {
        "id": "T053",
        "title": "外星人问题",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "21",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t053.jpg"
        ]
    },
    {
        "id": "T054",
        "title": "组合锁问题",
        "category": "small",
        "subcategory": "编码",
        "topic": "",
        "type": "主题题",
        "sourcePages": "21",
        "context": "",
        "prompt": "一把组合锁密码有3位，每一位都是数字1～8中的一个。这把锁有点毛病，只要其中两个号码正确就\n可以打开它。\n你至少尝试多少次3个号码的组合就可以确保打开它？\n•",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t054.jpg"
        ]
    },
    {
        "id": "T055",
        "title": "变色龙问题",
        "category": "small",
        "subcategory": "寻找不变量",
        "topic": "",
        "type": "主题题",
        "sourcePages": "21–22",
        "context": "",
        "prompt": "在一个小岛上，有三种颜色的神奇的变色龙，其中有 10 只棕色的，14 只灰色的和 15 只绿色\n的。当两只不同颜色的变色龙相遇时，它们会一起变成第三种颜色。\n请问：所有变色龙是否有可能都变成同一种颜色？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t055-1.jpg"
        ]
    },
    {
        "id": "T056",
        "title": "蠕虫融合",
        "category": "small",
        "subcategory": "寻找不变量",
        "topic": "变色龙问题",
        "type": "变式 / 子题",
        "sourcePages": "22",
        "context": "在一个小岛上，有三种颜色的神奇的变色龙，其中有 10 只棕色的，14 只灰色的和 15 只绿色\n的。当两只不同颜色的变色龙相遇时，它们会一起变成第三种颜色。\n请问：所有变色龙是否有可能都变成同一种颜色？",
        "prompt": "有A、B、C三种类型的蠕虫，任何两条不同类型的蠕虫都可以融合，变成一条第三种类型的蠕虫。如\n果最开始，面前的虫子A型有20条，B型有21条，C型有22条，最后剩下的蠕虫是什么型的？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t056.jpg"
        ]
    },
    {
        "id": "T057",
        "title": "狐狸与野兔",
        "category": "small",
        "subcategory": "寻找不变量",
        "topic": "",
        "type": "主题题",
        "sourcePages": "22",
        "context": "",
        "prompt": "一维棋盘从左到右有 30 个格子，并且编号 1 到 30。一个代表狐狸的棋子从 1 号格子开始，代表\n野兔的棋子可以从任意位置大于 1 的格子起跑。它们交替移动，狐狸先开始。狐狸只能先左或向右移\n动 1 格，而野兔则向左或向右移动 3 格。\n野兔不能落在狐狸占据的格子里，狐狸的目标是抓住兔子，兔子无法移动也算输。\n请问，狐狸如何才能赢得比赛？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t057.jpg"
        ]
    },
    {
        "id": "T058",
        "title": "一维跳棋",
        "category": "small",
        "subcategory": "寻找不变量",
        "topic": "",
        "type": "主题题",
        "sourcePages": "22–23",
        "context": "",
        "prompt": "在 10 个格子里玩一维跳棋。 跳棋规则：若棋子 A 和 B 相邻，且 B 另一侧是空格，则棋子 A 可绕过 B\n跳 到空格中，并吃掉棋子 B（将 B 从棋盘拿走）。\n注：下图中 B 也可吃掉 A，跳到 A 的左侧空格；只能跳过一个棋子。\n若棋盘初始有 9 枚棋子，只有一个空格。经过一系列吃子操作后，棋盘上只剩下一枚棋子。 请问：\n最初的空格，在哪个位置，才能实现最后只剩 1 枚棋子\n•",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t058-1.jpg",
            "assets/source-t058-2.jpg"
        ]
    },
    {
        "id": "T059",
        "title": "超强鸡蛋",
        "category": "small",
        "subcategory": "优化迭代",
        "topic": "",
        "type": "主题题",
        "sourcePages": "23",
        "context": "",
        "prompt": "一个公司发明了一种超坚固的鸡蛋，现在他们想在一个 100 层楼的大厦检测一下，看看鸡蛋最\n高可以到多少层不会碎。可惜现在他们只有 2 个鸡蛋供测试者来检测。当然，一个鸡蛋在碎之前可以\n重复使用。请问最少要检测多少次能保证检测出来？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t059.jpg"
        ]
    },
    {
        "id": "T060",
        "title": "猴子搬香蕉",
        "category": "small",
        "subcategory": "优化迭代",
        "topic": "",
        "type": "主题题",
        "sourcePages": "23",
        "context": "",
        "prompt": "一只小猴摘了 300 个香蕉，需要搬回家，每次最多搬 100 个。小猴离家 100 米，它每走 1 米，\n都需要吃掉 1 个香蕉来补充能量，请问它最多能够搬回家多少个？\n•",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t060.jpg"
        ]
    },
    {
        "id": "T061",
        "title": "取数字",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "23",
        "context": "",
        "prompt": "A、B两人轮流从1，2，3，4，5，6，7，8，9中取数，取过的数不能再取。谁手中先攒到了3个加起\n来等于15的数，就算获胜。\nA先取数，请问A有必胜的策略吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t061.jpg"
        ]
    },
    {
        "id": "T062",
        "title": "取数字2",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "取数字",
        "type": "变式 / 子题",
        "sourcePages": "23–24",
        "context": "A、B两人轮流从1，2，3，4，5，6，7，8，9中取数，取过的数不能再取。谁手中先攒到了3个加起\n来等于15的数，就算获胜。\nA先取数，请问A有必胜的策略吗？",
        "prompt": "你和妈妈两人轮流从 1、2、3、4、5、6、7、8、9 中取数，取过的数不能再取。\n规则如下： • 两个人取出的数，放到一起 • 只要被取出的数中，有 3 个数相加能得到 15，最后取\n数的算输\n例如，你先行动，你和妈妈分别取了：3、4、7、2、6。此时 7 + 2 + 6 = 15， 且最后一个 6 是你取出\n来的，你就输了。\n请问: 你会选择先手还是后手，你有什么获胜策略吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t062-1.jpg"
        ]
    },
    {
        "id": "T063",
        "title": "Tic tac toe",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "取数字",
        "type": "变式 / 子题",
        "sourcePages": "24",
        "context": "A、B两人轮流从1，2，3，4，5，6，7，8，9中取数，取过的数不能再取。谁手中先攒到了3个加起\n来等于15的数，就算获胜。\nA先取数，请问A有必胜的策略吗？",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t063.jpg"
        ]
    },
    {
        "id": "T064",
        "title": "雪碧与可乐",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "24",
        "context": "",
        "prompt": "一杯可乐与一杯雪碧各 500 毫升，先倒 100 毫升的雪碧到可乐杯中，混合均 匀后，再从可乐杯中倒\n100 毫升液体到雪碧杯中。 请问：此时雪碧杯中的可乐多，还是可乐杯中的雪碧多？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t064.jpg"
        ]
    },
    {
        "id": "T065",
        "title": "如何翻牌",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "24",
        "context": "",
        "prompt": "一副扑克牌里有 10 张牌正面向上。这副扑克牌的正反面都十分光滑，只用手 摸是没办法分出正反面\n的。 请问：你能否闭着眼将这副牌分为两堆，且两堆牌正面朝上的数量相等？（分堆时，你可以随\n意翻牌，但必须全程闭眼）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t065.jpg"
        ]
    },
    {
        "id": "T066",
        "title": "兔子找朋友",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "24–25",
        "context": "",
        "prompt": "在一个小王国中，有 8 个村子 (A H)，各村之间又道路相连。而你要寻找流 浪在这个王国里的一位朋\n友。你的朋友住在一个村子里。他每个月都会搬到 邻村去，但选择哪个村子是随机的，预测不了。\n例如，如果朋友这个月住在 G 村，那么下个月就住在“C、F、H”中的某个 村子里。你现在手上有\n确凿的信息，12 个月前，你的朋友住在 G 村。 请问: 它现在住在 A 村的可能性大吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t066-1.jpg",
            "assets/source-t066-2.jpg"
        ]
    },
    {
        "id": "T067",
        "title": "Guarini谜题",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "25",
        "context": "",
        "prompt": "在 3×3 的国际象棋棋盘有 4 枚骑士：白方的两枚骑士位于底部两个角落，黑 方的两枚骑士位于顶部\n两个角落。骑士只能走日字（横 2 竖 1，或横 1 竖 2） 请问：你能否通过移动骑士（走日字），让黑\n白骑士互换位置。你最少需要多少步？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t067.jpg"
        ]
    },
    {
        "id": "T068",
        "title": "成绩比较",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "25",
        "context": "",
        "prompt": "学生的语文、数学成绩均被评定为四个等级：A、B、C、D（其中 A 最好）。 若要比较甲、乙两人的\n成绩，存在 3 种情况：\n1. 若甲有一门成绩比乙好，且另一门不比乙差，则甲比乙好（例如，“语文 A 数学 A”，优于“语文\nA 数学 B”）\n2. 若两门成绩等级完全一样，则甲、乙成绩相同\n3. 若甲一门成绩比乙好，另一门比乙差，则甲、乙成绩无法比较（例如，“语文 A 数学 B”，和“语\n文 C 数学 A”就无法比较）\n如果一组学生中，任何两个人的成绩都无法比较。 请问: 这组学生最多有几人？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t068.jpg"
        ]
    },
    {
        "id": "T069",
        "title": "最快到达",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "25–26",
        "context": "",
        "prompt": "你在放学回家的路上，接到爸爸的电话。他刚好下班，可以开车在中途带上你回家。 问：你为了更\n快到家，应该往回走快点坐上车，还是在原地等待，还是继续朝 着家的方向走呢？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t069-1.jpg"
        ]
    },
    {
        "id": "T070",
        "title": "到底转了几圈",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "26",
        "context": "",
        "prompt": "小圆周长是大圆周长的一半。小圆在平地滚一圈，移动的距离就等于它的周 长。显然，小圆滚两圈\n移动的距离，刚好是大圆的周长。 问：大圆固定不动，若小圆绕着大圆滚动一周，回到起点。这个\n过程中，小圆总共转了多少圈？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t070.jpg"
        ]
    },
    {
        "id": "T071",
        "title": "充满整个试管",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "26",
        "context": "",
        "prompt": "一个试管中初始有 1 个细胞，细胞每分钟分裂一次（变成 2 个细胞），1 小时后充满了整个试管。\n问：充满一半试管需要多少时间？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t071.jpg"
        ]
    },
    {
        "id": "T072",
        "title": "换不换牌",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "26",
        "context": "",
        "prompt": "有编号为 1-6 的纸牌，你和一个非常聪明的人抽牌比大小（当然你也很聪明），大的获胜。此刻，你\n抽到一个 2，对方看了看牌，突然和你说到：“我想和你换手上的牌”。 问：你和他换吗？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t072.jpg"
        ]
    },
    {
        "id": "T073",
        "title": "最少检查几张卡片？",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "26–27",
        "context": "",
        "prompt": "下面这些卡片，每一张一面有字母，另一面有数字。\n规则：如果一张卡片的一面是元音字母（A、E、I、O、U），那么它的另一面一定是偶数。\n问：为了验证这一规则是否正确，你最少需要翻开哪几张卡片？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t073-1.jpg",
            "assets/source-t073-2.jpg"
        ]
    },
    {
        "id": "T074",
        "title": "送药",
        "category": "small",
        "subcategory": "换个角度，形式转化",
        "topic": "",
        "type": "主题题",
        "sourcePages": "27",
        "context": "",
        "prompt": "A、B两人分别在两座岛上。有一天，B生病了，A要给B送药。C有小船和可以装药的箱子。A、B各\n有一把锁和只能开自己锁的钥匙。现在C愿意帮忙送药，但是如果箱子没上锁，C就一定会把箱子里\n的东西偷走。小船从一座岛到另一座岛需要花一天的时间。\n请问，最快要多少天，B才能拿到药？\n•",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t074.jpg"
        ]
    },
    {
        "id": "T075",
        "title": "汉诺塔 - 最少步数",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "27",
        "context": "",
        "prompt": "汉诺塔是源于印度一个古老传说的益智游戏。\n游戏规则很简单：①每次移动1个圆盘；②将这一堆圆盘全部移动到另一个柱子上；③移动过程中，\n大圆盘不能放在小圆盘上面。\n尝试在下面的网址中完成3~5阶的汉诺塔游戏，并记录你完成的最少步数。\n游戏网址：https://www.mathsisfun.com/games/towerofhanoi.html\n思考：改变Discs数量，观察右下角Minimum Moves(最少步数)的变化，能否发现其中的规律？并\n猜测如果有9个圆盘，最少步数是多少？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t075.jpg"
        ]
    },
    {
        "id": "T076",
        "title": "斐波那契数列",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "27",
        "context": "",
        "prompt": "一开始有一对小兔子，一个月后变为大兔子。大兔子每个月能生出一对小兔子。如此下去，我们便能\n计算出每个月兔子的数量：\n从上表可以看出：1+1=2；1+2=3：2+3=5……后一个月的兔子始终等于前两个月兔子的和。\n问：请解释，为什么存在上面的递推规律？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t076.jpg"
        ]
    },
    {
        "id": "T077",
        "title": "小猪吃饼干",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "27–28",
        "context": "",
        "prompt": "一只名为ormie的小猪，突然发现冰箱上有一罐曲奇饼干，于是它尝试各种办法来拿到饼干。\n其中有一个场景，ormie堆了6个纸箱子。若假定ormie每一步只能往上走1个或2个纸箱子。\n请问，它走上6个纸箱子，有多少种不同的办法？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t077-1.jpg",
            "assets/source-t077-2.jpg"
        ]
    },
    {
        "id": "T078",
        "title": "Alice找蜂蜜",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "28",
        "context": "",
        "prompt": "蚂蚁Alice感应到了不远处有蜂蜜，它沿着路线寻找，不断靠近蜂蜜。\n问：Alice找到蜂蜜的最短路径有几条？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t078.jpg"
        ]
    },
    {
        "id": "T079",
        "title": "Alice与Bob相遇概率",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "28",
        "context": "",
        "prompt": "Alice和Bob分别住在街区的右上角和左下角。有一天，它们同时出发，沿着街道去找对方。已知它\n们的行走速度相同。\n请问，他们相遇的概率是多少？\n（Alice只会朝着左下角走，Bob只会朝着右上角走。）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t079.jpg"
        ]
    },
    {
        "id": "T080",
        "title": "杨辉三角",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "28",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t080.jpg"
        ]
    },
    {
        "id": "T081",
        "title": "末尾有几个零",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "28–29",
        "context": "",
        "prompt": "观察下图，请问第二行数字与第一行数字存在什么关系？你能根据此规律，推出第三行数字吗？\n你能否推出最下面一个方格中的数字末尾有几个零？\n(Question from TED-Ed)",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t081-1.jpg",
            "assets/source-t081-2.jpg"
        ]
    },
    {
        "id": "T082",
        "title": "猜帽子颜色",
        "category": "small",
        "subcategory": "归纳递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "29",
        "context": "",
        "prompt": "一次聚会里有很多朋友，每个人都戴了一顶帽子，帽子有白色和黑色两种，每个人只能看见别人头上\n的帽子颜色。\n现在主持人说：“我现在负责关灯和开灯，每次开灯，如果觉得自己头上戴着白帽子的朋友，就鼓\n掌”\n结果第一次关灯开灯，没人鼓掌\n第二次，还是一片寂静\n可到了第三次，房间里突然响起了稀稀拉拉的掌声。\n请问共有多少人带白帽子",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t082.jpg"
        ]
    },
    {
        "id": "T083",
        "title": "青蛙派对",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "29–30",
        "context": "",
        "prompt": "一群青蛙在荷叶上开派对。一开始，每只青蛙都分别站在一片荷叶上，排成一排。\n现在规定，某一片荷叶上有几只青蛙，这片荷叶上的所有青蛙就必须跳几格。只要参加游戏的青蛙全\n都跳到同一片荷叶上去，它们就获胜了。（这些青蛙不需要同时跳，某片荷叶上的青蛙一起行动就行\n了）\n例如，3只青蛙的时候，可以先让中间的青蛙往左跳1格，然后左边两只青蛙再一起跳两格，都跳到\n最右的荷叶上，就成功了。\n问：如果有10只青蛙排成一排，你能否让它们都跳到一片荷叶上去？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t083-1.jpg",
            "assets/source-t083-2.jpg"
        ]
    },
    {
        "id": "T084",
        "title": "The prisoner hat riddle",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "30",
        "context": "",
        "prompt": "外星人入侵地球，抓了包括你在内的 10 个地球人。 为了考察你们是否聪明、合作，就让 10 个人按\n从高到低排列，每个人头上戴 一顶帽子（黑或白）。 所有人都不准回头，也不能有任何形式的交\n流。从最高的人开始猜自己头上 是白或黑帽子。如果有 9 个人猜对了，就放了所有人。 分配帽子\n前，你们可以商量一段时间。 问：你有何策略，来应对这场危机？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t084.jpg"
        ]
    },
    {
        "id": "T085",
        "title": "帽子颜色",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "30–31",
        "context": "",
        "prompt": "如图，四个人头上各戴着一顶帽子。他们看不见自己头上的帽子，也看不见身后人的帽子，也就是只\n能看见前面人的帽子（例，D能看见B、C）。A和B之间隔着一堵墙，将A和BCD彻底分开，看不到彼\n此。\n现在有人告诉他们，4个人中有两顶白帽子，两顶黑帽子。如果谁能判断出自己帽子的颜色了，就必\n须马上说出来，而且说错了会受到惩罚。\n问：谁最先能确定自己头上帽子的颜色？谁是第二个确定的呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t085-1.jpg"
        ]
    },
    {
        "id": "T086",
        "title": "黑白帽子 - 续",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "帽子颜色",
        "type": "变式 / 子题",
        "sourcePages": "31",
        "context": "如图，四个人头上各戴着一顶帽子。他们看不见自己头上的帽子，也看不见身后人的帽子，也就是只\n能看见前面人的帽子（例，D能看见B、C）。A和B之间隔着一堵墙，将A和BCD彻底分开，看不到彼\n此。\n现在有人告诉他们，4个人中有两顶白帽子，两顶黑帽子。如果谁能判断出自己帽子的颜色了，就必\n须马上说出来，而且说错了会受到惩罚。\n问：谁最先能确定自己头上帽子的颜色？谁是第二个确定的呢？",
        "prompt": "A、B、C 3个聪明人，后面的人能看到前面所有人。他们知道总共有5顶帽子，3白2黑。\n现在给ABC都带上白帽子，然后按A、B、C顺序提问（先问A，再问B，再问C），你知道自己所戴帽\n子的颜色吗？\n要求他们必须诚实回答，且只能说“知道”或“不知道”。\n请问：A、B、C分别会怎么回答？为什么？\n高年级挑战：如果有4个人ABCD，且都知道有4白3黑。还是给他们全带上白帽子，依次提问，此时\n他们又会如何回答？如果有100个人呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t086.jpg"
        ]
    },
    {
        "id": "T087",
        "title": "蓝眼睛岛的故事",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "31",
        "context": "",
        "prompt": "某座岛上有100个人，他们的眼睛可能是棕色，也可能是蓝色。所有人都不知道自己眼睛的颜色，也\n没法看到自己眼睛的颜色。他们只能通过观察别人的眼睛颜色，来推断自己的眼睛颜色；除此之外，\n他们之间不能有任何形式的交流。\n每天午夜都会有一艘渡船停在岛边，如果有人推出自己眼睛颜色，就必须离开这座岛。\n岛上的人都非常聪明，也都非常清楚上面这些条件和规则。\n有一天，一位大法师来到了岛上。他把岛上所有人都叫来，然后向所有人宣布了一个消息：岛上至少\n有一个人是蓝色的眼睛。\n问：如果有10人是蓝眼睛，接下来的每一个午夜里，都有哪些人会离开这座岛？\n提示：可以先减少蓝眼睛人数，如果只有1人是蓝眼睛会怎么样，2人呢，3人呢……",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t087.jpg"
        ]
    },
    {
        "id": "T088",
        "title": "大鱼吃小鱼",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "31–32",
        "context": "",
        "prompt": "在一片奇怪的海洋中，有一群大小不等的鱼儿。在它们的世界中，大鱼可以吃小鱼，但必须同时满足\n下面两个条件时才能吃：\n•\n只有相邻大小的鱼，大鱼才可以吃小鱼。例如，最大的鱼可以吃第二大的，但是不能吃第三大\n的，因为它们大小不相邻。\n•只有最小的鱼才能被吃。例如，在最小的鱼被吃之前，第三小的鱼不能吃第二小的鱼。\n现在，有10条大小不同的鱼。对它们来说，保命最重要；但如果确定能保命时，它们也想要填饱肚\n子。\n问：有哪些鱼会被吃掉？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t088-1.jpg",
            "assets/source-t088-2.jpg"
        ]
    },
    {
        "id": "T089",
        "title": "密码是多少？",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "32",
        "context": "",
        "prompt": "根据已知的5个条件，推断出正确的开锁密码！\n问：请问密码锁正确的密码是什么？尽量写出你的推理过程。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t089.jpg"
        ]
    },
    {
        "id": "T090",
        "title": "我知道你不知道……",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "32–33",
        "context": "",
        "prompt": "Alice和Bob是两位很聪明的小孩，有一天他们一起玩一个猜牌游戏。\n桌子上摆着16张扑克牌：\n•红桃♥ A、4 、Q•黑桃♠ J、8、3 、2、7、 4•梅花♣ K、Q、5、4、6•方块♦ A、5现在Eve从这16张牌中挑出一张牌来，并把这张牌的点数告诉Alice，把花色告诉Bob.\n这时，Eve问：你们能推理出这张牌是什么牌吗?\nAlice：“我不知道这张牌.”\nBob：“我知道你不知道这张牌.”\nAlice：“现在我知道这张牌了.”\nBob：“我也知道了.”\n问这张牌是什么牌?\n问：这张牌是什么牌?\n注：本题对逻辑要求较高，因此作为附加题思考，同学们加油。\n提示1：Bob知道Alice不知道，因为Bob得知的花色中，任何一个点数，在牌堆中都有多张；\n提示2：Alice从不知道变为知道，说明Bob说的话，能消除Alice一开始不确定的疑虑。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t090-1.jpg",
            "assets/source-t090-2.jpg"
        ]
    },
    {
        "id": "T091",
        "title": "有多少“说谎者 - Liars”？",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "33",
        "context": "",
        "prompt": "一个聚会里有 100 个人，其中部分人是只说真话的 Truth teller，部分人是只说假话的 Liars。当聚会\n结束后，你去问了这一百个人，他们分别与多少个 Truth teller 握过手。结果得到的回答,分别是 0、\n1、2、……、99，各不相同。\n问，聚会中总共有多少个 Liars？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t091.jpg"
        ]
    },
    {
        "id": "T092",
        "title": "鬼谷子谜题",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "33",
        "context": "",
        "prompt": "一天，鬼谷子随意从2-99（1～10）中选取了两个数。他把这两个数的和告诉了庞涓，把这两个数的\n乘积告诉了孙膑。但孙膑和庞涓彼此不知到对方得到的数。第二天，庞涓很有自信的对孙膑说：虽然\n我不知到这两个数是什麽，但我知道你一定也不知道。随后，孙膑说：那我知道了。庞涓说：那我也\n知道了。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t092.jpg"
        ]
    },
    {
        "id": "T093",
        "title": "抓住狐狸",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "33",
        "context": "",
        "prompt": "四个洞排成一排，其中有一个洞藏着一只狐狸。每个夜晚，狐狸都会跳到一个相邻的洞里。每个\n白天，你都只允许检查其中一个洞。你能抓住狐狸吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t093.jpg"
        ]
    },
    {
        "id": "T094",
        "title": "今天星期几",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "33",
        "context": "",
        "prompt": "传说有个说谎国，这个国家的男人在星期四、五、六、日说真话，在星期一、二、三说假话；女人在\n星期一、二、三、日说真话，在星期四、五、六说假话。有一天，说谎国一男一女在聊天。\n男人说：“昨天是我说假话的日子”\n女人说：“昨天也是我说假话的日子”\n请根据他们的说话，判断出今天是星期几。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t094.jpg"
        ]
    },
    {
        "id": "T095",
        "title": "海盗分金币",
        "category": "small",
        "subcategory": "简化入手，逻辑递推",
        "topic": "",
        "type": "主题题",
        "sourcePages": "33–34",
        "context": "",
        "prompt": "5个海盗抢得100枚金币他们按顺序提分配方案\n5个海盗抢得100枚金币，他们按顺序提分配方案：\n首先由1号提，然后5人表决，超过半数同意方案才被通过，否则他将被扔入大海，然后由2号提，以\n此类推。\n假设：这些海盗都是极度聪明（都想保全性命，同时又多分金币）\n问：最后金币将如何分配？\n•",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t095-1.jpg",
            "assets/source-t095-2.jpg"
        ]
    },
    {
        "id": "T096",
        "title": "光的反射问题（WMO试题改编）",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "34",
        "context": "",
        "prompt": "Bob在科学课上利用激光进行了光的反射实验，下面是一个长 78 m，宽 49 m，四面被镜子包围\n的长方形盒子。激光从 A 点，以 45°角度射出，然后射出的光一直呈直角反射。到达 A、B、C、D 任\n意一个顶点后停止。\n问：激光最后到达了哪一个顶点？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t096.jpg"
        ]
    },
    {
        "id": "T097",
        "title": "直线分面",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "34",
        "context": "",
        "prompt": "6条直线最多把一个平面分成多少个部分？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t097.jpg"
        ]
    },
    {
        "id": "T098",
        "title": "分割正方形",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "34",
        "context": "",
        "prompt": "你有几种办法，将一个大的正方形，分割为 9 个小的正方形？（显然不止下面一种办法）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t098.jpg"
        ]
    },
    {
        "id": "T099",
        "title": "麦乐鸡块问题",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "分割正方形",
        "type": "变式 / 子题",
        "sourcePages": "34",
        "context": "你有几种办法，将一个大的正方形，分割为 9 个小的正方形？（显然不止下面一种办法）",
        "prompt": "在某个快餐店里，鸡块是以每盒4块、6块、9块和20块打包出售的。\n这就意味着你可能买不到一些数量的鸡块，比如1块，2块，3块还有5块。\n如果我想买11个麦乐鸡块能做到吗？12块呢？更多呢？\n我能不能买到任意很多数量的麦乐鸡呢（比如，101块）？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t099.jpg"
        ]
    },
    {
        "id": "T100",
        "title": "分割三角形",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "34–35",
        "context": "",
        "prompt": "用7条线段，将一个钝角三角形，划分为多个小的锐角三角形。如图所示，给出了一种分割方法，但\n显然里面包含了钝角三角形，不符合题意。请问该怎样画呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t100-1.jpg",
            "assets/source-t100-2.jpg"
        ]
    },
    {
        "id": "T101",
        "title": "回到起点",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "35",
        "context": "",
        "prompt": "一个长方形的房间中，四面墙壁都装上镜子。如果我们从一个点发出一条光线，它就会不断反射。如\n下图，你有什么办法，找到一个精确的位置和角度，使得光线反射一圈后，刚好能够回到起点（得到\n封闭的图形）？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t101.jpg"
        ]
    },
    {
        "id": "T102",
        "title": "求面积",
        "category": "small",
        "subcategory": "几何问题",
        "topic": "",
        "type": "主题题",
        "sourcePages": "35–36",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t102-1.jpg",
            "assets/source-t102-2.jpg"
        ]
    },
    {
        "id": "T103",
        "title": "均分图形",
        "category": "small",
        "subcategory": "打破思维定势",
        "topic": "",
        "type": "变式 / 子题",
        "sourcePages": "36",
        "context": "",
        "prompt": "将一个平面用两条垂直直线分成四个部分，我们将这四个部分称为四个象限。 挑战对右图中黑框内\n非阴影区域（空白区）进行均匀划分。\n要求： 1. 将第一象限框内空白区分为完全相等的 2 块； 2. 将第二象限框内空白区分为完全相等的 3\n块； 3. 将第三象限框内空白区分为完全相等的 4 块。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t103.jpg"
        ]
    },
    {
        "id": "T104",
        "title": "遵循医嘱",
        "category": "small",
        "subcategory": "打破思维定势",
        "topic": "",
        "type": "变式 / 子题",
        "sourcePages": "36–37",
        "context": "",
        "prompt": "某种药方要求非常严格，你每天需要同时服用 A、B 两种药品各一粒。一天， 你打开装 A 的药瓶，倒\n出一片放在手心；然后打开 B 药品，不小心倒出 2 片 B。\n现在，你手心有一片 A，2 片 B，它们长得一样，无法区分。 请问：你如何才能严格遵循药方服药，\n且不能有任何浪费？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t104-1.jpg"
        ]
    },
    {
        "id": "T105",
        "title": "蠕虫和水",
        "category": "small",
        "subcategory": "打破思维定势",
        "topic": "",
        "type": "变式 / 子题",
        "sourcePages": "37",
        "context": "",
        "prompt": "Lori 去度假时遇到麻烦了。她房间外的草丛中有很多小蠕虫，这些虫子不会飞，但是会爬到她的床\n上去。Lori 知道这些虫子怕水，为了阻止它们，她把床腿放在水桶里面。可这些蠕虫可以先爬到墙上\n和天花板上，然后掉到她的床上，非常讨厌！ 请问：Lori 怎样才能阻止这些蠕虫爬到她的床上呢？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t105.jpg"
        ]
    },
    {
        "id": "T106",
        "title": "九点连线",
        "category": "small",
        "subcategory": "打破思维定势",
        "topic": "",
        "type": "变式 / 子题",
        "sourcePages": "37",
        "context": "",
        "prompt": "你最少能用几条直线将一张纸上的 9 个点连起来，连线过程中手不能抬起来 （一笔画）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t106.jpg"
        ]
    },
    {
        "id": "T107",
        "title": "哪个杯子先装满水",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "37–38",
        "context": "",
        "prompt": "如图所示，图中水龙头打开，下方的几号杯子会先装满水呢？ (注意观察图中细节）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t107-1.jpg",
            "assets/source-t107-2.jpg"
        ]
    },
    {
        "id": "T108",
        "title": "填数字（小升初试题）",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "38",
        "context": "",
        "prompt": "从0-100选择12个数填入下图圆圈里，使得每个数均为与它相邻的两个数的最大公约数或最小公倍数",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t108.jpg"
        ]
    },
    {
        "id": "T109",
        "title": "扔硬币",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "38",
        "context": "",
        "prompt": "甲和乙因为一件事争执不休，希望通过扔硬币来判定谁胜谁负。但他们又觉得“一次定胜负”或“三\n局两胜”都不够惊心动魄，于是提出一种用序列来判定胜负的方式。甲选择“正反反”，而乙选择\n“反反正”，他们一直扔硬币，谁的序列先出现就算赢。\n请问，上述规则对双方公平吗？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t109.jpg"
        ]
    },
    {
        "id": "T110",
        "title": "Rope- burning Timer",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "38",
        "context": "",
        "prompt": "多根不均匀的绳子，一根烧1个小时，如何计时40分钟？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t110.jpg"
        ]
    },
    {
        "id": "T111",
        "title": "单位分数之和",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "38–39",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t111-1.jpg",
            "assets/source-t111-2.jpg"
        ]
    },
    {
        "id": "T112",
        "title": "古怪的水龙头",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "39–40",
        "context": "",
        "prompt": "周期：",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t112-1.jpg",
            "assets/source-t112-2.jpg"
        ]
    },
    {
        "id": "T113",
        "title": "扑克牌游戏",
        "category": "small",
        "subcategory": "运算",
        "topic": "",
        "type": "主题题",
        "sourcePages": "40",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t113.jpg"
        ]
    },
    {
        "id": "T114",
        "title": "N皇后问题",
        "category": "small",
        "subcategory": "算法",
        "topic": "",
        "type": "主题题",
        "sourcePages": "40–41",
        "context": "",
        "prompt": "国际象棋的皇后可以沿直线“横”、“竖”、“斜”走任意格。现在我们要在一个4行4列的棋盘\n中，放入4个皇后，使它们之间不能互相攻击（也就是不能有两个皇后处于同一行、同一列、同一45°\n斜线上）。例如，下图中的b3与c2两个皇后就能互相攻击，所以不满足题目要求。\n问：你能将4个皇后都放入棋盘中，让它们和平相处吗？\n[注：高年级的同学可以思考，如何将5个皇后放入5×5的棋盘中]",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t114-1.jpg",
            "assets/source-t114-2.jpg"
        ]
    },
    {
        "id": "T115",
        "title": "三格骨牌谜题",
        "category": "small",
        "subcategory": "算法",
        "topic": "",
        "type": "主题题",
        "sourcePages": "41",
        "context": "",
        "prompt": "现在一个 8×8 的棋盘上缺了一格（可以是 64 格中的任何一格）。使用适当的 L 形的三格骨牌\n来覆盖这个缺了一格的 8×8 的棋盘。三格骨牌必须覆盖除空格以外的全部其它格，且不能有重叠。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t115.jpg"
        ]
    },
    {
        "id": "T116",
        "title": "地球的轨迹",
        "category": "stem",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "41–42",
        "context": "",
        "prompt": "我们已经知道，太阳在银河系中飞速穿梭，而地球同时绕着太阳旋转，所以地球在银河系中的轨迹是\n一个螺旋线。\n试想，如果太阳和地球的运动，在同一个平面内。太阳延直线运动，地球始终绕着太阳转圈，那此时\n地球的运动轨迹又是什么样的呢？在下图中选出你认为正确的轨迹，并说明你选择的理由。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t116-1.jpg",
            "assets/source-t116-2.jpg"
        ]
    },
    {
        "id": "T117",
        "title": "为什么我们看不到月球的背面？",
        "category": "stem",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "42",
        "context": "",
        "prompt": "月球不断绕着地球转，但我们不管在地球上任何位置，都只能看见月球的一面，而另一面始终躲在背\n后。如果我们用algodoo做一个模拟，发现在地球的不同位置，理应能看到月球的不同面。\n问：为什么，我们在地球上始终无法看到月球的背面？[提示：右图的模拟中，月球没有自转]",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t117.jpg"
        ]
    },
    {
        "id": "T118",
        "title": "周期与调色",
        "category": "stem",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "42–43",
        "context": "",
        "prompt": "人眼看到的五颜六色，其实都是由“红、绿、蓝”这三种颜色组合而成。尝试在下面的链接中，组合\n出黄色、品红色、白色和黑色。\nhttps://phet.colorado.edu/sims/html/color-vision/latest/color-vision_en.html\n现在，我们分别得到了两行不同颜色的小球，这两行都按周期排列，第一行的周期为2，第二行的周\n期为3。如果我们把上下两行小球融合成1行，对应位置的颜色也进行融合（RGB红绿蓝三种颜色求\n了平均值），如下图：\n问：新的这行小球，是否仍然按周期排列？如果是，周期是多少？若不是，说明理由。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t118-1.jpg",
            "assets/source-t118-2.jpg"
        ]
    },
    {
        "id": "T119",
        "title": "圆的滚动轨迹",
        "category": "stem",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "43–44",
        "context": "",
        "prompt": "在一个大圆中套着一个小圆，大圆的半径是小圆的2倍。小圆上有两个点，圆周上有个红点A，圆心\n有个蓝点B。现在有个小人，推着小圆在大圆中滚动一圈。\n请问，小圆上的这两个点A、B，分别会经过什么轨迹？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t119-1.jpg",
            "assets/source-t119-2.jpg"
        ]
    },
    {
        "id": "T120",
        "title": "微信跳一跳的建模",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "44",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t120.jpg"
        ]
    },
    {
        "id": "T121",
        "title": "增长模型",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "44–45",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t121-1.jpg",
            "assets/source-t121-2.jpg"
        ]
    },
    {
        "id": "T122",
        "title": "SEIR模型",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "45",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t122.jpg"
        ]
    },
    {
        "id": "T123",
        "title": "机械传动模型",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "45",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t123.jpg"
        ]
    },
    {
        "id": "T124",
        "title": "博弈模型",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "45–46",
        "context": "",
        "prompt": "每个人手上有一张红牌和一张黑牌，你先选择出红牌或黑牌。选择完后，进行随机配对：如果两人都\n是红牌则各加2分；如果一红一黑，则黑方加3分，红方得0分；如果两黑，则都加1分。\n得分高则获胜，请问你会选择出什么牌？\n两个共谋犯罪的人被关入监狱，不能互相沟通情况。如果两个人都不揭发对方，则由于证据不确定，\n每个人都坐牢一年；若一人揭发，而另一人沉默，则揭发者因为立功而立即获释，沉默者因不合作而\n入狱五年；若互相揭发，则因证据确实，二者都判刑三年。\n你认为最终他们会作何选择，原因是什么？\n红蓝两方选择合作和不合作。都合作均得3分；都不合作均得1分；一人合作一人不合作，合作得0\n分，不合作得5分。\n连续玩8轮游戏，累积得分高的获胜。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t124-1.jpg",
            "assets/source-t124-2.jpg"
        ]
    },
    {
        "id": "T125",
        "title": "模型等价",
        "category": "modeling",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "46–47",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t125-1.jpg",
            "assets/source-t125-2.jpg"
        ]
    },
    {
        "id": "T126",
        "title": "芝诺悖论",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "47",
        "context": "",
        "prompt": "阿基里斯是古希腊神话中善跑的英雄。他和乌龟赛跑，他的速度是乌龟两倍。一开始，乌龟在阿基里\n斯前100米的地方起跑。于是就产生了如下过程：\n•当阿基里斯跑了100米，追到乌龟之前所在的地方时，乌龟已经向前爬了50米；•于是阿基里斯继续追，追了50米，可乌龟又向前爬了25米；•阿基里斯不甘心，继续追25米，刚到这里，发现乌龟又爬了12.5米……就这样，每当阿基里斯追到乌龟之前的位置，乌龟总能向前爬一段距离，使得阿基里斯永远追不上乌\n龟！这便是有名的芝诺悖论。\n问：你觉得阿基里斯能追上乌龟吗？如果能，上面的推理过程错在哪儿了？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t126.jpg"
        ]
    },
    {
        "id": "T127",
        "title": "辛普森悖论",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "47–48",
        "context": "",
        "prompt": "在一所大学里，校长正在办公室办公。突然，一位老师冲进来说：“校长，不好了，有很多女生在校\n门口抗议，他们说今年学校女生录取率30%，而男生录取率是45%。她们抗议，说我们学校遴选学生\n有性别歧视。”\n校长满脸疑惑的问秘书：“我不是特别交代，录取时一定要秉持公正吗？”\n请仔细查看下面的录取表，你认为该校录取真的有性别歧视吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t127-1.jpg",
            "assets/source-t127-2.jpg"
        ]
    },
    {
        "id": "T128",
        "title": "贝特朗箱子悖论",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "48",
        "context": "",
        "prompt": "有三个箱子，每个箱子被隔成两半，每一半各放一枚硬币，且盖子可以单独打开。现在这三个箱子里\n放硬币的情况如下：\n1.①号箱子里放了两枚金币，代号GG（G是Gold的缩写，表示金）\n2.②号箱子里放了两枚银币，代号SS（S是Silver的缩写，表示银）\n3.③号箱子里放了一金一银，代号GS\n问：在没打开盖子的情况下，让你随机选，选到③号箱子GS的概率是多少？\n如果打开某个箱子的半边盖子，发现里面是金币，这时候该箱子是GS箱的概率是多少？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t128.jpg"
        ]
    },
    {
        "id": "T129",
        "title": "幸存者偏差",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "48–49",
        "context": "",
        "prompt": "二战期间，数学家瓦德尔被卷入战争，他在一个统计研究小组工作，秘密为美国二战服务。当时美国\n军方不希望自己的飞机被敌方击落，因此要为飞机披上装甲。但是装甲会增加飞机的重量，机动性就\n会减弱。防御过度不可取，防御不足也会出问题。军官们希望把装甲加到最需要的地方。他们对参加\n过战斗的飞机不同部位的弹孔数量进行统计，得到下表。\n请问，应该把装甲加到哪个部位，原因是什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t129-1.jpg",
            "assets/source-t129-2.jpg"
        ]
    },
    {
        "id": "T130",
        "title": "三门问题",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "49",
        "context": "",
        "prompt": "有三扇关闭着的门，一扇的后面是一辆汽车，选中就可以赢得该汽车，而另外两扇门后面则各藏有一\n只山羊。当参赛者选定了一扇门，但未去开启它的时候，主持人会开启剩下两扇门中的一扇，露出其\n中一只山羊。主持人其后会问参赛者要不要更换选择，选另一扇仍然关着的门。\n你会更换选择吗？为什么？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t130.jpg"
        ]
    },
    {
        "id": "T131",
        "title": "凯撒密码",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "49–50",
        "context": "",
        "prompt": "恺撒密码（英语：Caesar cipher），是一种最简单且最广为人知的加密技术。这个加密方法是\n以罗马共和时期恺撒的名字命名的，当年恺撒曾用此方法与其将军们进行联系。它是一种替换加密的\n技术，明文中的所有字母都在字母表上向后（或向前）按照一个固定数目进行偏移后被替换成密文。\n例如，当偏移量是-3的时候，所有的字母A将被替换成X，B变成Y，以此类推。\n那么，单词BAG，就变为了YXD。\n问：有一段凯撒密码，不知道究竟是向左还是向右移动，也不知道移动了几位，该如何破译该密码？\n密码为：IWPD EO BQJ",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t131-1.jpg",
            "assets/source-t131-2.jpg"
        ]
    },
    {
        "id": "T132",
        "title": "圆与正多边形的关系？",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "同学们在小学，都学习了三角形、长方形等图形，它们都是由多条线段首尾相连组成的，又被称为多\n边形。如果多边形的每条边都相等，就叫做“正多边形”。\n下图是，正三角形、正四边形（正方形）、正五边形、正六边形：\n问：你认为圆和这些正多边形，有什么相同和不同之处呢？圆和正多边形有什么关联吗？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t132.jpg"
        ]
    },
    {
        "id": "T133",
        "title": "如果地球长胖了……",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "我们知道，地球可以近似为一个球形，那么赤道可以近似看成一个圆，地球半径约为6400千米。如\n果有一天，地球长胖了一圈，半径往外扩了1米。请问，赤道的周长和面积，大概增加多少？（你可\n以凭感觉估计，但最好能说明你估计的理由）",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t133.jpg"
        ]
    },
    {
        "id": "T134",
        "title": "如何计算圆周率",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t134.jpg"
        ]
    },
    {
        "id": "T135",
        "title": "等周定理证明",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t135.jpg"
        ]
    },
    {
        "id": "T136",
        "title": "速算原理",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t136.jpg"
        ]
    },
    {
        "id": "T137",
        "title": "几何中的转化",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t137.jpg"
        ]
    },
    {
        "id": "T138",
        "title": "几何中的模型",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t138.jpg"
        ]
    },
    {
        "id": "T139",
        "title": "整除规律",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "50–51",
        "context": "",
        "prompt": "能被2、3、4、5、6、7、8、9、11等整除的数都有什么特征？",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t139-1.jpg"
        ]
    },
    {
        "id": "T140",
        "title": "抽屉原理",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "51",
        "context": "",
        "prompt": "某天晚上，家里的电灯坏了，漆黑一片。这时你急着出门，要拿双袜子出来。你的袜子放在一起，而\n且只有黑、白、灰色。这时你抓了一把袜子出来找，请问至少要拿出几只袜子，才能保证一定会有成\n对的袜子？\n从一副完整的扑克牌中，至少抽出多少张牌，才能保证至少有6张牌的花色相同？\n证明：从1.3.5.……99中任选26个数，其中必有两个数的和是100。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t140.jpg"
        ]
    },
    {
        "id": "T141",
        "title": "为什么少了一块",
        "category": "extension",
        "subcategory": "",
        "topic": "",
        "type": "主题题",
        "sourcePages": "51",
        "context": "",
        "prompt": "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。",
        "answer": "",
        "explanation": "",
        "media": [
            "assets/source-t141.jpg"
        ]
    }
];
