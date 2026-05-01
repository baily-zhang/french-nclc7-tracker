const STORAGE_KEY = "french-nclc7-tracker-v1";
const TOTAL_DAYS = 180;

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

const PLAN_WEEKS = {
  m1w1: {
    label: "第 1 月 · 第 1 周",
    title: "发音和生存句",
    goal: "建立法语读音系统，能说 1 分钟自我介绍。",
    tags: ["字母和音节", "鼻化元音", "Je suis / J'ai", "1 分钟录音"],
    checks: ["能读规则单词", "能说姓名、国籍、职业、语言", "每天有录音"],
    tasks: [
      { id: "sound_rules", title: "发音规则", detail: "字母、重音、音节；练 e/eu/ou/oi/ai/au/eau/ch/gn/ill 和鼻化元音。", minutes: 60, skill: "pronunciation" },
      { id: "survival_sentences", title: "生存句型", detail: "Je suis, J'ai, J'aime, Je veux, Je vais 各写 5 句并读出来。", minutes: 45, skill: "grammar" },
      { id: "first_words", title: "高频词 40 个", detail: "每个词必须造 1 个短句，加入 Anki。", minutes: 60, skill: "vocabulary" },
      { id: "intro_sentences", title: "自我介绍 10 句", detail: "姓名、职业、城市、语言、学习目标；先写准再读顺。", minutes: 35, skill: "writing" },
      { id: "a1_listening", title: "A1 慢速听力", detail: "30-60 秒对话，听 3 遍，写大意和关键词。", minutes: 35, skill: "listening" },
      { id: "one_min_recording", title: "1 分钟录音", detail: "录自我介绍，标出 3 个发音问题。", minutes: 30, skill: "speaking" },
      { id: "daily_review", title: "当天复盘", detail: "记录 3 个最难发音和明天要修的 1 个问题。", minutes: 20, skill: "review" },
    ],
  },
  m1w2: {
    label: "第 1 月 · 第 2 周",
    title: "名词、冠词、形容词",
    goal: "能描述人、物、房间和城市，减少冠词与性数错误。",
    tags: ["un/une/des", "le/la/les", "形容词配合", "否定句"],
    checks: ["20 个名词短语", "20 个肯定句改否定句", "2 分钟描述录音"],
    tasks: [
      { id: "noun_phrases", title: "名词短语 20 个", detail: "un livre rouge, une grande ville 这种结构，标阴阳性和复数。", minutes: 45, skill: "grammar" },
      { id: "article_drill", title: "冠词训练", detail: "un/une/des 与 le/la/les/l' 各造句，错的放进错题本。", minutes: 45, skill: "grammar" },
      { id: "negation_drill", title: "否定句改写", detail: "写 20 个肯定句，再改成 ne ... pas。", minutes: 40, skill: "writing" },
      { id: "a1_dialogues", title: "A1 对话阅读", detail: "读 2 篇短对话，整理 8 个描述表达。", minutes: 40, skill: "reading" },
      { id: "describe_room_city", title: "2 分钟描述录音", detail: "描述房间、城市或日常用品，强制使用形容词。", minutes: 30, skill: "speaking" },
      { id: "anki_articles", title: "Anki 冠词卡", detail: "新增 40 张名词+冠词+例句卡。", minutes: 45, skill: "vocabulary" },
      { id: "daily_review", title: "当天复盘", detail: "只抓冠词、性数、否定句 3 类错误。", minutes: 20, skill: "review" },
    ],
  },
  m1w3: {
    label: "第 1 月 · 第 3 周",
    title: "现在时核心动词",
    goal: "能说自己每天做什么，并能提出和回答简单问题。",
    tags: ["etre/avoir", "aller/faire", "-er 动词", "疑问句"],
    checks: ["核心动词变位", "10 问 10 答", "日常活动表达"],
    tasks: [
      { id: "verb_conjugation", title: "核心动词变位", detail: "etre, avoir, aller, faire 加 4 个 -er 动词，写 6 个人称。", minutes: 60, skill: "grammar" },
      { id: "verb_sentences", title: "动词造句 20 句", detail: "用当天动词写 20 句，覆盖 je/tu/il/nous/vous/ils。", minutes: 45, skill: "writing" },
      { id: "question_forms", title: "疑问句训练", detail: "ou, quand, comment, pourquoi, est-ce que 各造 3 问。", minutes: 35, skill: "grammar" },
      { id: "qa_recording", title: "10 问 10 答录音", detail: "自己问自己答，主题是日常、学习、工作。", minutes: 35, skill: "speaking" },
      { id: "a1_listening_recap", title: "A1 对话复述", detail: "听 1 段对话，写人物、地点、动作，再口头复述。", minutes: 45, skill: "listening" },
      { id: "verb_anki", title: "动词 Anki", detail: "新增高频动词卡，卡片必须包含完整例句。", minutes: 45, skill: "vocabulary" },
      { id: "daily_review", title: "当天复盘", detail: "整理最常错的 5 个变位。", minutes: 20, skill: "review" },
    ],
  },
  m1w4: {
    label: "第 1 月 · 第 4 周",
    title: "时间、日程、近将来",
    goal: "月底完成 A1 检查：3 分钟介绍、120 词短文、A1 听读。",
    tags: ["数字日期", "近将来", "请求表达", "A1 月测"],
    checks: ["3 分钟自我介绍", "120 词学习计划", "A1 听读 70%+"],
    tasks: [
      { id: "time_numbers", title: "时间和数字", detail: "数字、日期、星期、时间表达；听写 20 个数字/时间。", minutes: 45, skill: "listening" },
      { id: "near_future", title: "近将来造句", detail: "aller + infinitif 写 15 句：今天、明天、周末计划。", minutes: 45, skill: "grammar" },
      { id: "polite_requests", title: "请求表达", detail: "Je voudrais, Pouvez-vous, S'il vous plait 各写 5 个场景句。", minutes: 35, skill: "speaking" },
      { id: "daily_schedule", title: "120 词日程短文", detail: "写今天和明天的安排，包含时间、地点和动作。", minutes: 50, skill: "writing" },
      { id: "life_texts", title: "生活文本阅读", detail: "菜单、广告、时间表或邮件 2 篇，整理 10 个表达。", minutes: 45, skill: "reading" },
      { id: "three_min_intro", title: "3 分钟介绍录音", detail: "自己、日程、周末计划；听完后重录一版。", minutes: 40, skill: "speaking" },
      { id: "month_gate", title: "A1 月度检查", detail: "记录听读正确率、作文问题和口语最长连续时间。", minutes: 30, skill: "review" },
    ],
  },
  m2w1: {
    label: "第 2 月 · 第 1 周",
    title: "过去时 passe compose",
    goal: "能讲昨天、上周和一次旅行/搬家经历。",
    tags: ["avoir 助动词", "etre 动词", "过去时间", "经历叙述"],
    checks: ["20 句过去经历", "3 分钟昨天做了什么", "180 词经历短文"],
    tasks: [
      { id: "pc_rules", title: "passe compose 规则", detail: "avoir + participe passe；整理 etre 动词清单。", minutes: 55, skill: "grammar" },
      { id: "past_sentences", title: "过去经历 20 句", detail: "用 hier, la semaine derniere, il y a... 写具体动作。", minutes: 45, skill: "writing" },
      { id: "timeline_listening", title: "经历听力时间线", detail: "听 A2 经历对话，列出发生顺序。", minutes: 45, skill: "listening" },
      { id: "past_reading", title: "A2 经历阅读", detail: "读 1 篇个人经历，标出所有过去时。", minutes: 40, skill: "reading" },
      { id: "yesterday_recording", title: "3 分钟昨天录音", detail: "说昨天做了什么，至少 8 个过去时动词。", minutes: 35, skill: "speaking" },
      { id: "pc_anki", title: "过去分词 Anki", detail: "新增 30-50 个常用过去分词例句卡。", minutes: 45, skill: "vocabulary" },
      { id: "daily_review", title: "当天复盘", detail: "区分 avoir/etre 助动词错误。", minutes: 20, skill: "review" },
    ],
  },
  m2w2: {
    label: "第 2 月 · 第 2 周",
    title: "代词和日常任务",
    goal: "能处理购物、预约、问路、看病、租房等场景。",
    tags: ["直接宾语", "间接宾语", "y/en 入门", "生活邮件"],
    checks: ["15 组代词改写", "4 段场景对话", "2 封生活邮件"],
    tasks: [
      { id: "pronoun_rewrite", title: "代词改写 15 组", detail: "Je vois Marie -> Je la vois；Je parle a Paul -> Je lui parle。", minutes: 50, skill: "grammar" },
      { id: "life_dialogue", title: "生活场景对话", detail: "购物、预约、问路、看病或租房，模拟 2 个场景。", minutes: 45, skill: "speaking" },
      { id: "short_email", title: "生活邮件", detail: "写预约、请求、取消或感谢邮件 100 词。", minutes: 45, skill: "writing" },
      { id: "a2_dialogue_listening", title: "A2 生活听力", detail: "听对话后复述需求、时间、地点和结果。", minutes: 45, skill: "listening" },
      { id: "service_reading", title: "服务信息阅读", detail: "读租房/医疗/交通说明，找出关键信息。", minutes: 40, skill: "reading" },
      { id: "phrase_bank", title: "场景表达库", detail: "整理 15 个请求、确认、取消、感谢表达。", minutes: 35, skill: "vocabulary" },
      { id: "daily_review", title: "当天复盘", detail: "记录代词位置和邮件格式错误。", minutes: 20, skill: "review" },
    ],
  },
  m2w3: {
    label: "第 2 月 · 第 3 周",
    title: "imparfait 和比较",
    goal: "能比较过去和现在的生活，讲习惯与具体事件。",
    tags: ["imparfait", "pc vs imparfait", "比较级", "最高级"],
    checks: ["10 句习惯 + 10 句事件", "5 分钟过去/现在", "200 词比较文"],
    tasks: [
      { id: "imparfait_forms", title: "imparfait 变位", detail: "状态、背景、习惯；写 10 句过去习惯。", minutes: 45, skill: "grammar" },
      { id: "pc_vs_imp", title: "两种过去时对比", detail: "写 10 句具体事件，和 imparfait 句配对。", minutes: 45, skill: "writing" },
      { id: "comparison_drill", title: "比较表达", detail: "plus/moins/aussi...que 与 le plus/la plus 各造句。", minutes: 40, skill: "grammar" },
      { id: "childhood_recording", title: "5 分钟过去/现在", detail: "讲小时候生活 vs 现在生活。", minutes: 40, skill: "speaking" },
      { id: "past_forms_reading", title: "过去时阅读标注", detail: "读 A2 文章，标出每个过去时为什么这样用。", minutes: 40, skill: "reading" },
      { id: "comparison_listening", title: "比较主题听力", detail: "听城市/工作/生活方式比较，记录优缺点。", minutes: 40, skill: "listening" },
      { id: "daily_review", title: "当天复盘", detail: "整理 pc vs imparfait 的 3 个判断规则。", minutes: 20, skill: "review" },
    ],
  },
  m2w4: {
    label: "第 2 月 · 第 4 周",
    title: "条件、建议和计划",
    goal: "月底完成 A2 检查：5 分钟口语、200 词邮件/短文。",
    tags: ["futur simple", "conditionnel", "建议表达", "A2 月测"],
    checks: ["20 句建议", "5 分钟学习计划", "A2 听读 70%+"],
    tasks: [
      { id: "advice_sentences", title: "建议句 20 个", detail: "il faut, on devrait, vous pouvez，用移民生活主题造句。", minutes: 45, skill: "grammar" },
      { id: "future_plan", title: "未来计划", detail: "写 10 句 futur proche/futur simple 学习和移民计划。", minutes: 40, skill: "writing" },
      { id: "polite_conditionnel", title: "礼貌条件式", detail: "je voudrais, j'aimerais, pourriez-vous 用于请求和服务场景。", minutes: 35, skill: "speaking" },
      { id: "canada_life_reading", title: "加拿大生活阅读", detail: "住房、银行、交通、医疗或找工作网页 1 篇。", minutes: 45, skill: "reading" },
      { id: "five_min_plan", title: "5 分钟学习计划录音", detail: "说未来 6 个月怎么学法语。", minutes: 35, skill: "speaking" },
      { id: "a2_listening", title: "A2 听力检查", detail: "做 A2 听力并记录正确率和错因。", minutes: 45, skill: "listening" },
      { id: "month_gate", title: "A2 月度检查", detail: "写是否能进入第 3 月，以及最弱项。", minutes: 30, skill: "review" },
    ],
  },
  m3w1: {
    label: "第 3 月 · 第 1 周",
    title: "连接词和段落结构",
    goal: "从短句输出转向段落输出。",
    tags: ["因果", "转折", "顺序", "观点+理由+例子"],
    checks: ["每天 2 段观点", "5 分钟观点录音", "250 词优缺点文"],
    tasks: [
      { id: "connectors", title: "连接词造句", detail: "parce que, donc, cependant, ensuite, par exemple 各造句。", minutes: 45, skill: "grammar" },
      { id: "two_paragraphs", title: "观点段落 2 段", detail: "每段 80-100 词：一个观点、一个理由、一个例子。", minutes: 55, skill: "writing" },
      { id: "merge_sentences", title: "合并简单句", detail: "把 10 组简单句改成复杂句。", minutes: 35, skill: "grammar" },
      { id: "opinion_recording", title: "5 分钟观点录音", detail: "立场 + 两个理由 + 一个具体例子。", minutes: 40, skill: "speaking" },
      { id: "b1_slow_listening", title: "B1 慢速摘要", detail: "听材料后口头摘要主旨和 3 个细节。", minutes: 50, skill: "listening" },
      { id: "expression_bank", title: "表达库 10 个", detail: "整理可复用观点和转折表达。", minutes: 30, skill: "vocabulary" },
      { id: "daily_review", title: "当天复盘", detail: "检查段落是否只有一个中心。", minutes: 20, skill: "review" },
    ],
  },
  m3w2: {
    label: "第 3 月 · 第 2 周",
    title: "关系代词和复杂句",
    goal: "能介绍人、城市、职业，句子不再只有主谓宾。",
    tags: ["qui/que/ou/dont", "ce qui/ce que", "pour/afin de", "对比"],
    checks: ["20 个关系从句", "不看原文复述", "8 分钟理想生活"],
    tasks: [
      { id: "relative_clauses", title: "关系从句 20 个", detail: "qui, que, ou, dont 每类至少 5 句。", minutes: 55, skill: "grammar" },
      { id: "complex_reading", title: "B1 复杂句阅读", detail: "读 1 篇短文，标出关系从句和目的表达。", minutes: 45, skill: "reading" },
      { id: "no_text_recap", title: "不看原文复述", detail: "用自己的话复述文章，录音 4-6 分钟。", minutes: 45, skill: "speaking" },
      { id: "describe_person", title: "介绍人/城市/职业", detail: "写 250 词，强制使用 6 个关系从句。", minutes: 55, skill: "writing" },
      { id: "contrast_listening", title: "对比听力", detail: "听两个观点或两个选择，记录相同点和不同点。", minutes: 45, skill: "listening" },
      { id: "daily_review", title: "当天复盘", detail: "找出关系代词误用并重写。", minutes: 20, skill: "review" },
    ],
  },
  m3w3: {
    label: "第 3 月 · 第 3 周",
    title: "虚拟式入门和观点表达",
    goal: "能对社会/学习/工作话题表达立场。",
    tags: ["il faut que", "je ne pense pas que", "让步", "观点文"],
    checks: ["10 个建议句", "8 分钟观点", "280 词观点文"],
    tasks: [
      { id: "subjunctive_intro", title: "虚拟式入门", detail: "il faut que, je veux que, je ne pense pas que 各造句。", minutes: 55, skill: "grammar" },
      { id: "opinion_phrases", title: "观点表达", detail: "a mon avis, selon moi, je suis convaincu que 写 10 句。", minutes: 35, skill: "writing" },
      { id: "social_listening", title: "社会主题听力", detail: "听远程工作、语言学习或教育主题，写 100 词摘要。", minutes: 55, skill: "listening" },
      { id: "eight_min_opinion", title: "8 分钟观点录音", detail: "是否应该远程工作/学习第二语言，包含让步。", minutes: 45, skill: "speaking" },
      { id: "rewrite_speech", title: "口语改写成书面版", detail: "把昨天录音改写成更准确的 220-280 词短文。", minutes: 55, skill: "writing" },
      { id: "daily_review", title: "当天复盘", detail: "整理 5 个可以重复使用的观点句。", minutes: 20, skill: "review" },
    ],
  },
  m3w4: {
    label: "第 3 月 · 第 4 周",
    title: "B1 综合输出",
    goal: "月底完成 B1 入门检查：8 分钟口语、300 词文章。",
    tags: ["限时阅读", "段落摘要", "篇章完整", "B1 月测"],
    checks: ["B1 阅读 70%+", "300 词结构文", "8 分钟观点表达"],
    tasks: [
      { id: "timed_reading", title: "B1 限时阅读", detail: "25-35 分钟完成 1 篇，解释每个错题。", minutes: 50, skill: "reading" },
      { id: "listening_summary", title: "听力摘要 100 词", detail: "听 B1 材料，写主旨、细节、说话人态度。", minutes: 55, skill: "listening" },
      { id: "b1_essay", title: "300 词结构文", detail: "引入、两段论证、结论；主题从移民/工作/教育中选。", minutes: 70, skill: "writing" },
      { id: "b1_speaking_test", title: "8 分钟观点录音", detail: "立场、理由、例子、结论完整说完。", minutes: 45, skill: "speaking" },
      { id: "connector_cleanup", title: "连接词升级", detail: "替换重复的 mais/parce que，加入 cependant/par consequent。", minutes: 30, skill: "vocabulary" },
      { id: "month_gate", title: "B1 月度检查", detail: "记录四项是否达到进入 TEF 题型的最低状态。", minutes: 30, skill: "review" },
    ],
  },
  m4w1: {
    label: "第 4 月 · 第 1 周",
    title: "TEF Canada 题型适应",
    goal: "熟悉四项任务、时间压力和错题分类。",
    tags: ["TEF 阅读", "TEF 听力", "错题分类", "半模考"],
    checks: ["阅读/听力限时", "错题分类", "半模考复盘"],
    tasks: [
      { id: "tef_reading_entry", title: "TEF 阅读入门", detail: "30-45 分钟题型练习，记录定位失败题。", minutes: 45, skill: "reading" },
      { id: "tef_listening_entry", title: "TEF 听力入门", detail: "30-45 分钟题型练习，记录速度和干扰项问题。", minutes: 45, skill: "listening" },
      { id: "error_taxonomy", title: "错题分类", detail: "词汇、语法、题型、速度、理解偏差五类。", minutes: 30, skill: "review" },
      { id: "small_writing", title: "写作小任务", detail: "写 150-220 词，不追求模板，先完成任务。", minutes: 45, skill: "writing" },
      { id: "section_a_speaking", title: "口语 Section A 入门", detail: "根据广告/服务信息准备 8 个具体问题。", minutes: 45, skill: "speaking" },
      { id: "tef_vocab", title: "TEF 高频词", detail: "整理服务、租房、课程、活动类词汇 20 个。", minutes: 35, skill: "vocabulary" },
    ],
  },
  m4w2: {
    label: "第 4 月 · 第 2 周",
    title: "写作 Section A",
    goal: "能自然续写故事/消息，时态一致。",
    tags: ["承接开头", "叙事结构", "转折", "重写"],
    checks: ["每天 1 篇 Section A", "30 分钟限时", "选 1 篇重写"],
    tasks: [
      { id: "section_a_reading", title: "读叙事文本", detail: "读 2 个短新闻/生活文本，拆开头、发展、结尾。", minutes: 45, skill: "reading" },
      { id: "section_a_write", title: "Section A 写作", detail: "先不限时，再 30 分钟限时续写。", minutes: 65, skill: "writing" },
      { id: "narrative_connectors", title: "叙事连接词", detail: "Tout a commence, soudain, finalement 等 10 个表达造句。", minutes: 35, skill: "vocabulary" },
      { id: "oral_recap_article", title: "口头复述作文", detail: "把自己写的故事说出来，检查逻辑是否自然。", minutes: 35, skill: "speaking" },
      { id: "dictation_narrative", title: "叙事听力听写", detail: "听一个故事/新闻片段，抓时间线和转折。", minutes: 45, skill: "listening" },
      { id: "rewrite_one", title: "重写一版", detail: "从结构、时态、表达三个角度重写。", minutes: 45, skill: "review" },
    ],
  },
  m4w3: {
    label: "第 4 月 · 第 3 周",
    title: "写作 Section B",
    goal: "形成观点文模板，但每篇都有具体例子。",
    tags: ["改写题目", "明确立场", "让步", "结论"],
    checks: ["每天 1 篇观点文", "250-300 词", "口语版同题"],
    tasks: [
      { id: "outline_ten", title: "10 分钟提纲", detail: "立场、理由一、理由二、反方、结论。", minutes: 25, skill: "writing" },
      { id: "section_b_write", title: "Section B 观点文", detail: "250-300 词，必须有两个具体例子。", minutes: 65, skill: "writing" },
      { id: "complex_rewrite", title: "简单句升级", detail: "改写 5 个简单句为复杂句。", minutes: 30, skill: "grammar" },
      { id: "same_topic_speech", title: "同题口语版", detail: "把作文观点录成 8 分钟口语。", minutes: 45, skill: "speaking" },
      { id: "opinion_reading", title: "观点文章阅读", detail: "读 1 篇观点文，提取论证句和让步句。", minutes: 45, skill: "reading" },
      { id: "template_review", title: "模板复盘", detail: "整理个人高频观点模板，不背空话。", minutes: 30, skill: "review" },
    ],
  },
  m4w4: {
    label: "第 4 月 · 第 4 周",
    title: "口语 Section A / B",
    goal: "能完成询问信息和说服型口语任务。",
    tags: ["Section A 问题", "Section B 说服", "10 分钟", "月测"],
    checks: ["A+B 录音", "写作 60 分钟", "完整听读各 1 套"],
    tasks: [
      { id: "section_a_questions", title: "Section A 10 问", detail: "价格、时间、地点、条件、取消、文件、折扣等具体问题。", minutes: 45, skill: "speaking" },
      { id: "section_b_persuade", title: "Section B 说服", detail: "8-10 分钟：理解顾虑、理由、例子、处理反对。", minutes: 55, skill: "speaking" },
      { id: "recording_review", title: "录音复盘", detail: "记录重复错误，写 10 个更自然表达。", minutes: 35, skill: "review" },
      { id: "tef_full_writing", title: "写作 A+B 限时", detail: "Section A + B 60 分钟完成。", minutes: 70, skill: "writing" },
      { id: "tef_read_listen", title: "听读完整练习", detail: "阅读和听力各做 1 组完整限时。", minutes: 90, skill: "listening" },
      { id: "tef_vocab_review", title: "TEF 任务词汇", detail: "复习广告、投诉、建议、课程、服务表达。", minutes: 30, skill: "vocabulary" },
    ],
  },
  m5w1: {
    label: "第 5 月 · 第 1 周",
    title: "听力专项",
    goal: "快速识别场景、关系、目的、态度，不被单词卡住。",
    tags: ["限时听力", "精听", "数字听写", "错题解释"],
    checks: ["每天限时听力", "数字/日期/价格", "错题原因清楚"],
    tasks: [
      { id: "timed_listening", title: "限时听力题", detail: "按考试节奏做 1 组，不暂停不回听。", minutes: 55, skill: "listening" },
      { id: "intensive_listening", title: "精听复述", detail: "1 段材料听写、跟读、复述。", minutes: 55, skill: "listening" },
      { id: "numbers_dictation", title: "数字细节听写", detail: "日期、价格、地址、电话号码 10 分钟起步。", minutes: 20, skill: "listening" },
      { id: "listening_summary_speech", title: "听力口头总结", detail: "用 5 分钟总结当天材料。", minutes: 30, skill: "speaking" },
      { id: "distractor_log", title: "干扰项错题本", detail: "每个错题写：没听到、理解错、被干扰、题干没读清。", minutes: 30, skill: "review" },
      { id: "listening_vocab", title: "听力高频表达", detail: "整理 15 个态度、转折、预约、服务表达。", minutes: 30, skill: "vocabulary" },
    ],
  },
  m5w2: {
    label: "第 5 月 · 第 2 周",
    title: "阅读专项",
    goal: "提升扫读、定位和同义替换识别。",
    tags: ["限时阅读", "定位", "同义替换", "文章总结"],
    checks: ["限时完成", "错题不是时间问题", "15 个同义替换"],
    tasks: [
      { id: "timed_reading_set", title: "限时阅读题", detail: "做 1 组，先定位再判断，不逐字翻译。", minutes: 60, skill: "reading" },
      { id: "article_structure", title: "文章结构分析", detail: "标标题、段落功能、作者观点、转折。", minutes: 45, skill: "reading" },
      { id: "synonym_bank", title: "同义替换 15 个", detail: "题干和原文的对应表达成对记录。", minutes: 35, skill: "vocabulary" },
      { id: "five_min_article_summary", title: "5 分钟文章口述", detail: "不看原文总结文章。", minutes: 25, skill: "speaking" },
      { id: "reading_error_review", title: "阅读错题复盘", detail: "区分定位错、推论错、常识代替原文。", minutes: 30, skill: "review" },
      { id: "grammar_from_reading", title: "阅读句法拆解", detail: "选 5 个长句拆主干。", minutes: 30, skill: "grammar" },
    ],
  },
  m5w3: {
    label: "第 5 月 · 第 3 周",
    title: "写作专项",
    goal: "A/B 两类写作能稳定限时完成，错误不影响理解。",
    tags: ["Section A", "Section B", "重写", "表达密度"],
    checks: ["每天至少 1 篇", "60 分钟 A+B", "每篇有具体例子"],
    tasks: [
      { id: "daily_tef_writing", title: "TEF 写作 1 篇", detail: "Section A 或 B 轮换，严格限时。", minutes: 65, skill: "writing" },
      { id: "three_step_edit", title: "三步修改", detail: "先结构，再语法，最后表达。", minutes: 35, skill: "review" },
      { id: "phrase_upgrade", title: "可复用表达 10 个", detail: "积累并造句，不只背中文意思。", minutes: 35, skill: "vocabulary" },
      { id: "rewrite_old_essay", title: "旧作文升级", detail: "把一篇旧作文重写成更高级但不冒险的版本。", minutes: 50, skill: "writing" },
      { id: "spoken_argument", title: "作文口语化", detail: "把当天观点文录成 6-8 分钟口语。", minutes: 35, skill: "speaking" },
      { id: "writing_grammar", title: "写作语法清理", detail: "检查动词、性数、冠词、连接词。", minutes: 30, skill: "grammar" },
    ],
  },
  m5w4: {
    label: "第 5 月 · 第 4 周",
    title: "口语专项",
    goal: "Section A 问得具体，Section B 能连续说服。",
    tags: ["A 题 2 个", "B 题 1 个", "10 分钟", "月底模考"],
    checks: ["A 题追问", "B 题 8-10 分钟", "完整四项模拟 1 次"],
    tasks: [
      { id: "section_a_two", title: "Section A 两题", detail: "每题准备 8-12 个问题并录音。", minutes: 50, skill: "speaking" },
      { id: "section_b_one", title: "Section B 一题", detail: "录 8-10 分钟说服型任务。", minutes: 55, skill: "speaking" },
      { id: "natural_phrases", title: "自然表达 10 个", detail: "听录音后把中式表达改成法语自然说法。", minutes: 30, skill: "vocabulary" },
      { id: "conversation_practice", title: "法语对话", detail: "真人或 AI 对话 20-30 分钟。", minutes: 35, skill: "speaking" },
      { id: "mock_snapshot", title: "四项模拟快照", detail: "做 1 次完整或接近完整模拟，列第 6 月三大弱项。", minutes: 100, skill: "review" },
      { id: "fluency_shadowing", title: "流利度跟读", detail: "跟读 15 分钟，再重录 Section B。", minutes: 30, skill: "pronunciation" },
    ],
  },
  m6w1: {
    label: "第 6 月 · 第 1 周",
    title: "真实基线模考",
    goal: "建立最后一个月的真实分数和弱项地图。",
    tags: ["完整四项", "不暂停", "不查词", "基线报告"],
    checks: ["完整模考 1 次", "四项失分原因", "下周重点"],
    tasks: [
      { id: "full_mock", title: "完整四项模拟", detail: "不暂停、不查词、不超时。", minutes: 180, skill: "review" },
      { id: "mock_listening_review", title: "听力错题复盘", detail: "按关键词、态度、干扰项、速度分类。", minutes: 40, skill: "listening" },
      { id: "mock_reading_review", title: "阅读错题复盘", detail: "按定位、推论、同义替换、时间分类。", minutes: 40, skill: "reading" },
      { id: "mock_writing_review", title: "写作复盘", detail: "检查任务完成、结构、语法、表达。", minutes: 40, skill: "writing" },
      { id: "mock_speaking_review", title: "口语复盘", detail: "听录音，找影响理解的 3 个问题。", minutes: 40, skill: "speaking" },
      { id: "baseline_report", title: "基线报告", detail: "写当前最弱项、最常见错因、下周训练重点。", minutes: 35, skill: "review" },
    ],
  },
  m6w2: {
    label: "第 6 月 · 第 2 周",
    title: "弱项集中修复",
    goal: "只修最影响分数的弱项，不再铺新材料。",
    tags: ["弱项 +1h", "错题减少", "正确版本", "稳定输出"],
    checks: ["10 个常错正确版本", "弱项错题减少", "每日输出不断"],
    tasks: [
      { id: "weakest_skill_block", title: "最弱项 +1 小时", detail: "听力/阅读/写作/口语四选一，连续 7 天修同一类问题。", minutes: 60, skill: "review" },
      { id: "targeted_drills", title: "定向训练", detail: "只做和弱项错因直接相关的题。", minutes: 60, skill: "review" },
      { id: "correct_versions", title: "10 个正确版本", detail: "把最常错表达、变位或句型写成可背版本。", minutes: 35, skill: "grammar" },
      { id: "daily_output", title: "每日输出", detail: "一篇短写作或一段 8 分钟口语，不中断。", minutes: 55, skill: "speaking" },
      { id: "light_listen_read", title: "听读保温", detail: "轻量限时听力/阅读，保持速度。", minutes: 60, skill: "listening" },
      { id: "progress_review", title: "弱项进展复盘", detail: "今天错题是否比昨天少，原因是什么。", minutes: 25, skill: "review" },
    ],
  },
  m6w3: {
    label: "第 6 月 · 第 3 周",
    title: "稳定达线训练",
    goal: "每次模拟后只改最影响分数的错误。",
    tags: ["2 次模考", "考试节奏", "最终模板", "稳定"],
    checks: ["2 次完整/近完整模拟", "最终写作模板", "最终口语流程"],
    tasks: [
      { id: "mock_one_part", title: "模考或半模考", detail: "按考试日节奏完成，不临时暂停。", minutes: 120, skill: "review" },
      { id: "top_score_fix", title: "只改最大扣分点", detail: "每次模拟后只选一个最高收益问题。", minutes: 35, skill: "review" },
      { id: "final_writing_template", title: "写作模板最终版", detail: "Section A/B 开头、连接、让步、结尾定稿。", minutes: 45, skill: "writing" },
      { id: "final_speaking_flow", title: "口语流程最终版", detail: "Section A 问题顺序；Section B 说服顺序。", minutes: 45, skill: "speaking" },
      { id: "exam_day_rehearsal", title: "考试日彩排", detail: "休息、饮食、计时、设备按考试当天模拟。", minutes: 30, skill: "review" },
      { id: "anki_cleanup", title: "Anki 清理", detail: "只保留高频、常错、考试表达。", minutes: 35, skill: "vocabulary" },
    ],
  },
  m6w4: {
    label: "第 6 月 · 第 4 周",
    title: "考前收敛",
    goal: "保持手感，不换教材，不追新难题。",
    tags: ["轻复习", "模板", "睡眠优先", "考前 48 小时"],
    checks: ["每天法语输入输出", "隔天写作", "只看错题和模板"],
    tasks: [
      { id: "anki_light", title: "Anki 轻复习", detail: "30-60 分钟，只看高频和常错卡。", minutes: 45, skill: "vocabulary" },
      { id: "shadowing_light", title: "跟读保温", detail: "30 分钟跟读，维持发音和语速。", minutes: 30, skill: "pronunciation" },
      { id: "one_speaking_prompt", title: "口语 1 题", detail: "只练熟悉题，保持连续表达。", minutes: 35, skill: "speaking" },
      { id: "alternate_writing", title: "隔天写作", detail: "Section A 或 B，写完只改高频错误。", minutes: 45, skill: "writing" },
      { id: "light_listen_read", title: "听读轻量题", detail: "保持考试手感，不追难题。", minutes: 45, skill: "listening" },
      { id: "final_review", title: "错题和模板", detail: "只看错题本、常错变位、最终模板。", minutes: 35, skill: "review" },
    ],
  },
};

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

function completedTaskCount(day, date = state.selectedDate) {
  return tasksForDate(date).filter((task) => day.tasks[task.id]).length;
}

function dayCompletionLevel(day, date = state.selectedDate) {
  const done = completedTaskCount(day, date);
  const taskCount = tasksForDate(date).length;
  if (day.status === "mock") return "mock";
  if (day.status === "rest") return "rest";
  if (done >= Math.ceil(taskCount * 0.85)) return "level-3";
  if (done >= Math.ceil(taskCount * 0.5)) return "level-2";
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
    if (!day || completedTaskCount(day, cursor) < Math.min(6, tasksForDate(cursor).length)) break;
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
    "currentPlanCard",
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
  const plan = currentWeekPlan(dayNumber);

  els.startDateInput.value = state.startDate;
  els.selectedDateInput.value = state.selectedDate;
  els.dayNumber.textContent = `Day ${dayNumber}`;
  els.phaseName.textContent = `${phase.title} · ${plan.label}`;
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

  renderCurrentPlan(plan, dayNumber);
  renderTasks(day);
  renderSkills(day);
  renderPhases(dayNumber);
  renderMilestones();
  renderHeatmap();
}

function currentWeekPlan(dayNumber = currentDayNumber()) {
  const month = Math.min(Math.ceil(dayNumber / 30), 6);
  const dayInMonth = ((dayNumber - 1) % 30) + 1;
  let week = 4;
  if (dayInMonth <= 7) week = 1;
  else if (dayInMonth <= 14) week = 2;
  else if (dayInMonth <= 21) week = 3;
  return PLAN_WEEKS[`m${month}w${week}`];
}

function tasksForDate(date = state.selectedDate) {
  return currentWeekPlan(currentDayNumber(date)).tasks;
}

function defaultMinutesForCurrentPlan() {
  return tasksForDate().reduce((minutes, task) => {
    const skill = task.skill || "review";
    minutes[skill] = (minutes[skill] || 0) + task.minutes;
    return minutes;
  }, {});
}

function renderCurrentPlan(plan, dayNumber) {
  els.currentPlanCard.innerHTML = `
    <div>
      <p class="eyebrow">Day ${dayNumber} · ${plan.label}</p>
      <h3>${plan.title}</h3>
    </div>
    <p>${plan.goal}</p>
    <div class="plan-tags">${plan.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    <div class="check-list">${plan.checks.map((check) => `<span>${check}</span>`).join("")}</div>
  `;
}

function renderTasks(day) {
  els.taskList.innerHTML = "";

  tasksForDate().forEach((task) => {
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
    const taskCount = tasksForDate(date).length;
    const button = document.createElement("button");
    const level = dayCompletionLevel(day, date);
    button.type = "button";
    button.className = `day-cell ${level} ${date === state.selectedDate ? "selected" : ""}`;
    button.title = `Day ${index + 1} · ${date} · ${completedTaskCount(day, date)}/${taskCount}`;
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
    getDay().minutes = defaultMinutesForCurrentPlan();
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
    `Plan: ${currentWeekPlan().label} · ${currentWeekPlan().title}`,
    `Status: ${day.status}`,
    `Tasks: ${completedTaskCount(day)}/${tasksForDate().length}`,
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
