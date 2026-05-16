export type Lang = "en" | "zh";

export const STR = {
  brand: { en: "Beyond Matter", zh: "超越物质" },
  tagline_a: {
    en: "Reality is becoming less about things —",
    zh: "现实不再关乎事物本身——",
  },
  tagline_b: {
    en: "and more about structure.",
    zh: "而更关乎其结构。",
  },
  nav: {
    abstraction:  { en: "The Abstraction",  zh: "抽象的演进" },
    history:      { en: "History",          zh: "历史" },
    relations:    { en: "Relations",        zh: "关系" },
    information:  { en: "Information",      zh: "信息" },
    consciousness:{ en: "Consciousness",    zh: "意识" },
    mathematics:  { en: "Mathematics",      zh: "数学" },
    emergence:    { en: "Emergence",        zh: "涌现" },
    observer:     { en: "Observer",         zh: "观察者" },
    final:        { en: "The Final Question", zh: "终极之问" },
  },
  hero: {
    eyebrow: { en: "An essay in motion · 2026", zh: "一篇运动中的随笔 · 2026" },
    title_a: { en: "At every stage of history,", zh: "在历史的每一阶段，" },
    title_b: { en: "reality became less material —", zh: "现实变得更不物质，" },
    title_c: { en: "and more structural.", zh: "而更具结构。" },
    scroll: { en: "Scroll to descend", zh: "向下滚动" },
  },
  history: {
    eyebrow: { en: "01 — The History of Abstraction", zh: "第一章 · 抽象的历史" },
    title:   { en: "Six models of the world.", zh: "世界的六个模型。" },
    sub: {
      en: "Each revolution stripped away a layer of substance and replaced it with a deeper pattern. The arrow points in one direction.",
      zh: "每一次科学革命都剥离一层物质，代之以更深的模式。箭头始终指向同一方向。",
    },
  },
  relations: {
    eyebrow: { en: "02 — From Objects to Relations", zh: "第二章 · 从物到关系" },
    title_a: { en: "An electron may matter less", zh: "电子本身并不重要" },
    title_b: { en: "than the relations it participates in.", zh: "重要的是它所参与的关系。" },
    body: {
      en: "Gravity is curvature, not pull. Entanglement is correlation, not signal. The standard model is a symmetry group before it is a list of particles. Modern physics speaks in verbs.",
      zh: "引力是曲率，而非吸力。纠缠是关联，而非信号。标准模型首先是一个对称群，其次才是一份粒子清单。现代物理学讲述的是动词，而非名词。",
    },
    legend: {
      en: "Drag a node. The graph reorganises. Nothing here is a thing.",
      zh: "拖动节点。图自我重组。这里没有任何「物」。",
    },
  },
  information: {
    eyebrow: { en: "03 — Information Is Not the End", zh: "第三章 · 信息并非终点" },
    title:   { en: "What governs information itself?", zh: "是什么在统治信息本身？" },
    body: {
      en: "Bits require a substrate. Computation requires rules. Rules require a mathematics that already exists before the first bit is flipped. Each layer asks for a deeper one.",
      zh: "比特需要载体。计算需要规则。规则需要在第一个比特翻转之前就存在的数学。每一层都在请求更深的一层。",
    },
    chain: {
      matter:     { en: "Matter",       zh: "物质" },
      energy:     { en: "Energy",       zh: "能量" },
      information:{ en: "Information",  zh: "信息" },
      structure:  { en: "Structure",    zh: "结构" },
      observation:{ en: "Observation",  zh: "观察" },
      unknown:    { en: "???",          zh: "未知" },
    },
  },
  consciousness: {
    eyebrow: { en: "04 — The Consciousness Question", zh: "第四章 · 意识之问" },
    title_a: { en: "Why is there", zh: "为什么会有" },
    title_b: { en: "something it is like", zh: "「身在其中」的感受" },
    title_c: { en: "to be anything at all?", zh: "存在于任何事物之中？" },
    body: {
      en: "Subjective experience refuses to be reduced to mechanism. Maybe awareness is the substrate, and matter is the dream — or maybe the question itself is the wrong shape. Either way, the cosmos has produced an instrument that can ask it.",
      zh: "主观经验拒绝被还原为机制。也许觉察才是底层，而物质只是其梦境——也许问题本身的形态就是错的。无论如何，宇宙制造出了一种可以提问的工具。",
    },
  },
  mathematics: {
    eyebrow: { en: "05 — The Mathematical Universe", zh: "第五章 · 数学的宇宙" },
    title:   { en: "If a structure is consistent,", zh: "若一个结构自洽，" },
    title_b: { en: "does it already exist?", zh: "它是否已然存在？" },
    body: {
      en: "From category theory to symmetry groups, from topology to information geometry, the predictive engine of physics has become indistinguishable from pure form. Tegmark's hypothesis is the limit case: physical existence is mathematical existence.",
      zh: "从范畴论到对称群，从拓扑学到信息几何，物理学的预测引擎已与纯粹的形式无可分辨。泰格马克的假说是其极限：物理存在即数学存在。",
    },
  },
  emergence: {
    eyebrow: { en: "06 — Emergence", zh: "第六章 · 涌现" },
    title:   { en: "Simple rules.", zh: "简单的规则。" },
    title_b: { en: "Unimaginable consequences.", zh: "无法想象的后果。" },
    body: {
      en: "Three rules give you the Game of Life. A few neurons give you a thought. A million transactions give you an economy. Meaning is not stored anywhere — it is the shape of the interactions.",
      zh: "三条规则就能生成《生命游戏》。若干神经元就能产生一个念头。一百万笔交易就能构成一个经济体。意义并非储存于任何处——它是相互作用的形状本身。",
    },
    cell_label: { en: "Life · seed 0", zh: "生命 · 种子 0" },
  },
  observer: {
    eyebrow: { en: "07 — The Observer", zh: "第七章 · 观察者" },
    title:   { en: "Move your cursor.", zh: "移动你的光标。" },
    title_b: { en: "The page has already noticed.", zh: "页面已经察觉。" },
    body: {
      en: "Quantum measurement, the anthropic principle, recursion — every honest account of reality leaves a door open for the witness. You are not reading this page. You are co-authoring it.",
      zh: "量子测量、人择原理、自指——每一种对现实的诚实描述都为见证者留出一道门。你并非在「阅读」这一页。你与之共同书写。",
    },
  },
  final: {
    eyebrow: { en: "08 — The Final Question", zh: "第八章 · 终极之问" },
    title_a: { en: "If matter is not fundamental,", zh: "若物质不是根本，" },
    title_b: { en: "if energy is not fundamental,", zh: "若能量不是根本，" },
    title_c: { en: "if information is not fundamental —", zh: "若信息也不是根本——" },
    title_d: { en: "then what is?", zh: "那么，什么是？" },
    answers: {
      math:    { en: "Pure mathematics", zh: "纯粹数学" },
      mind:    { en: "Consciousness",    zh: "意识" },
      rel:     { en: "Relationships",    zh: "关系" },
      recur:   { en: "Recursive computation", zh: "递归计算" },
      unknown: { en: "Unknowable structure", zh: "不可知的结构" },
      inf:     { en: "Infinite abstraction", zh: "无限抽象" },
    },
    closing: {
      en: "No final answer is given. Only deeper questions.",
      zh: "并无最终答案。只有更深的问题。",
    },
  },
  layers: {
    title: { en: "The Reality Layer Explorer", zh: "实在层探索器" },
    sub: { en: "Drag the slider. Watch the world thin out.", zh: "拖动滑块。看世界一层层稀薄。" },
  },
  layerSet: [
    {
      key: "matter",
      label: { en: "Matter", zh: "物质" },
      caption: { en: "Earth · fire · water · air. Rocks. Apples. Iron.", zh: "土 · 火 · 水 · 气。石头、苹果、铁。" },
      thinker: { en: "Aristotle, c. 350 BCE", zh: "亚里士多德 · 公元前350年" },
    },
    {
      key: "energy",
      label: { en: "Energy", zh: "能量" },
      caption: { en: "Fields without bodies. Matter is condensed energy.", zh: "无形之场。物质是凝结的能量。" },
      thinker: { en: "Faraday → Einstein, c. 1905", zh: "法拉第 → 爱因斯坦 · 约1905年" },
    },
    {
      key: "information",
      label: { en: "Information", zh: "信息" },
      caption: { en: "It from bit. The universe distinguishes.", zh: "万物源于比特。宇宙在区分。" },
      thinker: { en: "Shannon · Wheeler, c. 1989", zh: "香农 · 惠勒 · 约1989年" },
    },
    {
      key: "structure",
      label: { en: "Structure", zh: "结构" },
      caption: { en: "Only the relations remain. Category, topology, group.", zh: "唯有关系存留。范畴、拓扑、群。" },
      thinker: { en: "Mac Lane · Grothendieck, c. 1960s", zh: "麦克莱恩 · 格罗滕迪克 · 约1960年代" },
    },
    {
      key: "observation",
      label: { en: "Observation", zh: "观察" },
      caption: { en: "The cut where structure becomes experience.", zh: "结构化为经验的那道切口。" },
      thinker: { en: "Bohr · Rovelli · IIT, ongoing", zh: "玻尔 · 罗韦利 · 整合信息论" },
    },
    {
      key: "unknown",
      label: { en: "?", zh: "?" },
      caption: { en: "Whatever runs the previous five.", zh: "支撑前五层的——尚不可名。" },
      thinker: { en: "Open question", zh: "悬而未决" },
    },
  ],
  eras: [
    {
      key: "ancient",
      title: { en: "Ancient World", zh: "古代世界" },
      years: { en: "c. 600 BCE — 1600 CE", zh: "约公元前600年 — 公元1600年" },
      ontology: { en: "Substance", zh: "实体" },
      elements: { en: "Earth · Fire · Water · Air", zh: "土 · 火 · 水 · 气" },
      thinkers: { en: "Thales · Empedocles · Aristotle · Wang Chong", zh: "泰勒斯 · 恩培多克勒 · 亚里士多德 · 王充" },
      equation: { en: "—", zh: "—" },
      body: {
        en: "The world is made of stuffs. Substances combine and separate. Form is added to matter from outside.",
        zh: "世界由「物」构成。诸物离合，形从外加。",
      },
    },
    {
      key: "mechanistic",
      title: { en: "Mechanistic Universe", zh: "机械宇宙" },
      years: { en: "1600 — 1860", zh: "1600 — 1860" },
      ontology: { en: "Force · Mass", zh: "力 · 质量" },
      elements: { en: "Particles · Forces · Trajectories", zh: "粒子 · 力 · 轨迹" },
      thinkers: { en: "Galileo · Newton · Laplace", zh: "伽利略 · 牛顿 · 拉普拉斯" },
      equation: { en: "F = m·a", zh: "F = m·a" },
      body: {
        en: "Reality is a clockwork. Given positions and forces, the future is computable. The cosmos is a billiard table extended.",
        zh: "现实如同钟表。位置与力一旦给定，未来可被计算。宇宙是一张延展的台球桌。",
      },
    },
    {
      key: "atomic",
      title: { en: "Atomic Universe", zh: "原子宇宙" },
      years: { en: "1860 — 1900", zh: "1860 — 1900" },
      ontology: { en: "Particles", zh: "粒子" },
      elements: { en: "Atoms · Molecules · Bonds", zh: "原子 · 分子 · 键" },
      thinkers: { en: "Maxwell · Boltzmann · Mendeleev", zh: "麦克斯韦 · 玻尔兹曼 · 门捷列夫" },
      equation: { en: "PV = nRT", zh: "PV = nRT" },
      body: {
        en: "Matter has parts. The parts have arrangements. Chemistry becomes geometry; geometry hints at law.",
        zh: "物质有部件。部件有排布。化学化为几何，几何提示规律。",
      },
    },
    {
      key: "relativistic",
      title: { en: "Relativistic Universe", zh: "相对论宇宙" },
      years: { en: "1905 — 1960", zh: "1905 — 1960" },
      ontology: { en: "Fields · Spacetime", zh: "场 · 时空" },
      elements: { en: "Curvature · Wavefunctions · Symmetry", zh: "曲率 · 波函数 · 对称" },
      thinkers: { en: "Einstein · Bohr · Dirac · Noether", zh: "爱因斯坦 · 玻尔 · 狄拉克 · 诺特" },
      equation: { en: "Gμν = 8πTμν", zh: "Gμν = 8πTμν" },
      body: {
        en: "Bodies dissolve into fields. Time is not background but participant. Conservation laws fall out of symmetries — the universe is structured, not stuffed.",
        zh: "物体化为场。时间不再是背景，而是参与者。守恒律源于对称——宇宙是有结构的，而非充塞之物。",
      },
    },
    {
      key: "information",
      title: { en: "Information Universe", zh: "信息宇宙" },
      years: { en: "1948 — present", zh: "1948 — 至今" },
      ontology: { en: "Bits · Entropy", zh: "比特 · 熵" },
      elements: { en: "Codes · Channels · Computation", zh: "编码 · 信道 · 计算" },
      thinkers: { en: "Shannon · Turing · Wheeler · Bekenstein", zh: "香农 · 图灵 · 惠勒 · 贝肯斯坦" },
      equation: { en: "S = k·ln Ω", zh: "S = k·ln Ω" },
      body: {
        en: "Black holes radiate. Bits are physical. Distinctions are the deepest ledger we know — and they obey their own conservation.",
        zh: "黑洞会辐射。比特是物理的。差异是我们所知最深的账本——并遵循自己的守恒。",
      },
    },
    {
      key: "structural",
      title: { en: "Structural Universe", zh: "结构的宇宙" },
      years: { en: "ongoing", zh: "进行中" },
      ontology: { en: "Relations · Form", zh: "关系 · 形式" },
      elements: { en: "Categories · Topology · Emergence", zh: "范畴 · 拓扑 · 涌现" },
      thinkers: { en: "Mac Lane · Grothendieck · Rovelli · Tegmark", zh: "麦克莱恩 · 格罗滕迪克 · 罗韦利 · 泰格马克" },
      equation: { en: "Hom(A,B)", zh: "Hom(A,B)" },
      body: {
        en: "The objects vanish into the arrows between them. What is real is what is preserved under transformation. The world becomes a diagram.",
        zh: "对象消融于其间的箭头。所谓真实，是变换下被保留之物。世界变成一张图。",
      },
    },
  ],
  ui: {
    lang: { en: "中文", zh: "EN" },
    sound: { en: "Sound", zh: "声音" },
    on: { en: "on", zh: "开" },
    off: { en: "off", zh: "关" },
    layer: { en: "Layer", zh: "层" },
    of: { en: "of", zh: "/" },
  },
  footer: {
    line: { en: "Reality is not made of things. Reality is made of structure.", zh: "现实并非由「物」构成。现实由结构构成。" },
    sub: { en: "An essay by Gewenbo, part of the Psyverse.", zh: "由 Gewenbo 撰写 · 隶属 Psyverse 系列。" },
  },
} as const;

export function pick<T extends Record<Lang, string>>(s: T, lang: Lang): string {
  return s[lang];
}
