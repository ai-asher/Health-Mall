import { colors } from '../theme/colors';

export type Video = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  authorAvatar: readonly [string, string];
  likes: number;
  comments: number;
  collects: number;
  shares: number;
  bgGradient: readonly [string, string];
  posterText: string;
  posterSubtext: string;
};

export const videos: Video[] = [
  {
    id: 'v1',
    title: '失眠的人看过来！',
    subtitle: '年轻人压力大 焦虑不安 容易失眠',
    author: '张伯礼名医堂',
    authorTitle: '国医大师',
    authorAvatar: colors.gradGreen,
    likes: 19464,
    comments: 2,
    collects: 7003,
    shares: 4936,
    bgGradient: ['#1F2937', '#0F172A'] as const,
    posterText: '失眠',
    posterSubtext: '千年古方',
  },
  {
    id: 'v2',
    title: '一招识破假冒中药',
    subtitle: '老中医亲授辨别方法',
    author: '本草说',
    authorTitle: '中药知识普及',
    authorAvatar: colors.gradOrange,
    likes: 38291,
    comments: 421,
    collects: 12480,
    shares: 8902,
    bgGradient: ['#7C2D12', '#431407'] as const,
    posterText: '辨真伪',
    posterSubtext: '中药识别',
  },
  {
    id: 'v3',
    title: '春季养肝必喝这道茶',
    subtitle: '简单3味 老少皆宜',
    author: '李清养生堂',
    authorTitle: '资深养生导师',
    authorAvatar: colors.gradGreen,
    likes: 24813,
    comments: 192,
    collects: 6781,
    shares: 3024,
    bgGradient: ['#14532D', '#052E16'] as const,
    posterText: '春养肝',
    posterSubtext: '一茶三材',
  },
  {
    id: 'v4',
    title: '九种体质你属哪一种？',
    subtitle: '一分钟自测 对症养生',
    author: '御君方名医堂',
    authorTitle: '中医体质研究',
    authorAvatar: colors.gradRed,
    likes: 51029,
    comments: 891,
    collects: 21304,
    shares: 14210,
    bgGradient: ['#7F1D1D', '#450A0A'] as const,
    posterText: '九体质',
    posterSubtext: '一分钟自测',
  },
  {
    id: 'v5',
    title: '这些食物千万别一起吃',
    subtitle: '常见的 10 种食物相克',
    author: '健康饮食指南',
    authorTitle: '营养师团队',
    authorAvatar: colors.gradPurple,
    likes: 18472,
    comments: 312,
    collects: 9821,
    shares: 5430,
    bgGradient: ['#581C87', '#2E1065'] as const,
    posterText: '食物相克',
    posterSubtext: '10 大禁忌',
  },
  {
    id: 'v6',
    title: '宝宝积食的 3 个信号',
    subtitle: '宝妈必看 早识别早调理',
    author: '赵慧儿科',
    authorTitle: '儿科主任',
    authorAvatar: colors.gradGreen,
    likes: 27310,
    comments: 543,
    collects: 14029,
    shares: 8120,
    bgGradient: ['#1E40AF', '#1E3A8A'] as const,
    posterText: '宝宝积食',
    posterSubtext: '三大信号',
  },
  {
    id: 'v7',
    title: '高血压调理 · 名医亲授',
    subtitle: '中西医结合疗法',
    author: '王建国医生',
    authorTitle: '心内科主任',
    authorAvatar: colors.gradBlue,
    likes: 12483,
    comments: 287,
    collects: 6291,
    shares: 3812,
    bgGradient: ['#0C4A6E', '#082F49'] as const,
    posterText: '降血压',
    posterSubtext: '名医亲授',
  },
  {
    id: 'v8',
    title: '黄帝内经 · 上古天真论',
    subtitle: '经典古文 通俗讲解',
    author: '钱穆生研究员',
    authorTitle: '中医典籍研究',
    authorAvatar: colors.gradOrange,
    likes: 9821,
    comments: 124,
    collects: 4521,
    shares: 2103,
    bgGradient: ['#92400E', '#451A03'] as const,
    posterText: '内经精讲',
    posterSubtext: '上古天真论',
  },
];
