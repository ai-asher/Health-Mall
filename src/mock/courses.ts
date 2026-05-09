import { colors } from '../theme/colors';

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  doctor: string;
  doctorTitle: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  category: '精选' | '病症' | '名家' | '养生';
  gradient: readonly [string, string];
  tag?: string;
  description: string;
  chapters: { id: string; title: string; duration: string; free?: boolean }[];
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: '九种体质养生',
    subtitle: '知体质，辨健康，九种体质对症养',
    doctor: '林婉清',
    doctorTitle: '主任中医师 · 御君方名医堂',
    duration: '3 小时 45 分',
    lessons: 12,
    students: 38461,
    rating: 4.9,
    category: '精选',
    gradient: colors.gradRed,
    tag: '热门',
    description:
      '中医九种体质学说由王琦院士创立，本课程系统讲解平和、气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀九种体质的辨识方法、饮食起居调理及常见疾病预防。',
    chapters: [
      { id: 'ch1', title: '导论：什么是体质', duration: '08:21', free: true },
      { id: 'ch2', title: '平和质：最理想的体质', duration: '15:34', free: true },
      { id: 'ch3', title: '气虚质：易疲劳怕风', duration: '18:02' },
      { id: 'ch4', title: '阳虚质：怕冷手脚凉', duration: '17:11' },
      { id: 'ch5', title: '阴虚质：阴液不足', duration: '20:45' },
      { id: 'ch6', title: '痰湿质：体型肥胖', duration: '22:30' },
      { id: 'ch7', title: '湿热质：面垢油光', duration: '19:18' },
      { id: 'ch8', title: '血瘀质：肤色晦暗', duration: '21:09' },
      { id: 'ch9', title: '气郁质：情绪敏感', duration: '24:52' },
      { id: 'ch10', title: '特禀质：过敏体质', duration: '16:48' },
      { id: 'ch11', title: '混合体质如何调理', duration: '23:15' },
      { id: 'ch12', title: '四季体质调养总论', duration: '28:34' },
    ],
  },
  {
    id: 'c2',
    title: '健康好油 · 甘油二酯油',
    subtitle: '减少甘油三酯摄入，日常煎炒烹炸均可',
    doctor: '陈国强',
    doctorTitle: '中医健康达人',
    duration: '1 小时 12 分',
    lessons: 4,
    students: 6432,
    rating: 4.7,
    category: '养生',
    gradient: colors.gradPurple,
    description: '揭秘甘油二酯油的科学原理，对比传统食用油的差异，给出日常烹饪建议。',
    chapters: [
      { id: 'ch1', title: '什么是甘油二酯油', duration: '14:21', free: true },
      { id: 'ch2', title: '与普通食用油对比', duration: '16:33' },
      { id: 'ch3', title: '日常使用与注意事项', duration: '18:54' },
      { id: 'ch4', title: '常见烹饪场景演示', duration: '22:09' },
    ],
  },
  {
    id: 'c3',
    title: '失眠调理 · 千年古方',
    subtitle: '年轻人压力大，焦虑不安，容易失眠',
    doctor: '张伯礼',
    doctorTitle: '国医大师',
    duration: '2 小时 30 分',
    lessons: 8,
    students: 19464,
    rating: 4.95,
    category: '病症',
    gradient: colors.gradBlue,
    tag: '名家',
    description: '从中医辨证论治视角看失眠，给出针对不同证型的方剂、食疗、穴位按摩方案。',
    chapters: [
      { id: 'ch1', title: '失眠的中医认识', duration: '12:18', free: true },
      { id: 'ch2', title: '心脾两虚型失眠', duration: '18:24' },
      { id: 'ch3', title: '肝郁化火型失眠', duration: '19:30' },
      { id: 'ch4', title: '阴虚火旺型失眠', duration: '17:45' },
      { id: 'ch5', title: '心胆气虚型失眠', duration: '16:12' },
      { id: 'ch6', title: '安眠穴位按摩', duration: '22:08' },
      { id: 'ch7', title: '助眠食疗方', duration: '20:35' },
      { id: 'ch8', title: '日常起居调摄', duration: '23:18' },
    ],
  },
  {
    id: 'c4',
    title: '产后修复全程指南',
    subtitle: '黄金 42 天，让妈妈恢复元气',
    doctor: '吴明珠',
    doctorTitle: '妇科名医 · 副主任医师',
    duration: '4 小时 18 分',
    lessons: 14,
    students: 8821,
    rating: 4.85,
    category: '名家',
    gradient: colors.gradPeach,
    description: '产后气血、骨盆修复、母乳喂养、情绪调摄全方位指导。',
    chapters: [
      { id: 'ch1', title: '产后第一周', duration: '15:00', free: true },
      { id: 'ch2', title: '气血恢复', duration: '18:30' },
      { id: 'ch3', title: '骨盆修复', duration: '21:14' },
      { id: 'ch4', title: '母乳喂养', duration: '24:09' },
    ],
  },
  {
    id: 'c5',
    title: '儿童脾胃调理',
    subtitle: '宝宝挑食、积食、便秘怎么办',
    doctor: '赵慧',
    doctorTitle: '儿科主任医师',
    duration: '2 小时 08 分',
    lessons: 7,
    students: 12453,
    rating: 4.88,
    category: '病症',
    gradient: colors.gradGreen,
    description: '从中医儿科角度系统讲解婴幼儿脾胃常见问题。',
    chapters: [
      { id: 'ch1', title: '脾胃为后天之本', duration: '11:23', free: true },
      { id: 'ch2', title: '积食判断与处理', duration: '17:08' },
      { id: 'ch3', title: '挑食偏食调理', duration: '19:42' },
    ],
  },
  {
    id: 'c6',
    title: '二十四节气养生',
    subtitle: '顺应天时，未病先防',
    doctor: '李清',
    doctorTitle: '资深养生导师',
    duration: '6 小时 30 分',
    lessons: 24,
    students: 26710,
    rating: 4.92,
    category: '养生',
    gradient: colors.gradGreen,
    tag: '节气',
    description: '春夏秋冬二十四节气的饮食、起居、运动、情志调养。',
    chapters: [
      { id: 'ch1', title: '立春：万物始生', duration: '13:21', free: true },
      { id: 'ch2', title: '雨水：润物无声', duration: '15:44' },
      { id: 'ch3', title: '惊蛰：春雷乍动', duration: '14:30' },
    ],
  },
  {
    id: 'c7',
    title: '老年慢病管理',
    subtitle: '高血压、糖尿病、心脑血管疾病',
    doctor: '王建国',
    doctorTitle: '心内科主任医师',
    duration: '3 小时 22 分',
    lessons: 10,
    students: 9876,
    rating: 4.81,
    category: '病症',
    gradient: colors.gradBlue,
    description: '中西医结合视角下的老年慢病科普与调理方案。',
    chapters: [
      { id: 'ch1', title: '高血压的中医辨证', duration: '17:08', free: true },
      { id: 'ch2', title: '糖尿病饮食方案', duration: '19:30' },
      { id: 'ch3', title: '心脑血管保健', duration: '21:45' },
    ],
  },
  {
    id: 'c8',
    title: '黄帝内经入门',
    subtitle: '中医基础理论的经典之作',
    doctor: '钱穆生',
    doctorTitle: '中医典籍研究员',
    duration: '8 小时 12 分',
    lessons: 30,
    students: 15238,
    rating: 4.96,
    category: '名家',
    gradient: colors.gradOrange,
    tag: '经典',
    description: '《黄帝内经》核心篇章逐字精讲。',
    chapters: [
      { id: 'ch1', title: '上古天真论', duration: '22:18', free: true },
      { id: 'ch2', title: '四气调神大论', duration: '24:42' },
    ],
  },
];

export const courseCategories = ['精选', '病症', '名家', '养生'] as const;
