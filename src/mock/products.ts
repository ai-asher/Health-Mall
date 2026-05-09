import { colors } from '../theme/colors';

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  category: '热门产品' | '养生滋补' | '米面粮油' | '日用百货' | '茶饮花草';
  price: number;
  originalPrice?: number;
  coinPrice?: number;
  sales: number;
  rating: number;
  spec: string;
  gradient: readonly [string, string];
  badge?: string;
  description: string;
  specs: { name: string; options: string[] }[];
};

export const products: Product[] = [
  {
    id: 'p1',
    title: '黄精阿胶黑芝麻丸',
    subtitle: '九蒸九晒 匠心传承 营养高钙',
    brand: '神农御君方',
    category: '养生滋补',
    price: 59.0,
    originalPrice: 89.0,
    coinPrice: 3900,
    sales: 12380,
    rating: 4.92,
    spec: '54g/袋',
    gradient: colors.gradBlue,
    badge: '热销',
    description:
      '精选黑芝麻、黄精、阿胶，遵循古法九蒸九晒工艺，钙含量 NRV%113%，适合气血不足、需要补养的人群。',
    specs: [
      { name: '规格', options: ['54g/袋', '108g/盒', '270g/罐'] },
      { name: '套餐', options: ['单盒装', '三盒装（赠 1）', '六盒装（赠 3）'] },
    ],
  },
  {
    id: 'p2',
    title: '茯苓粉 · 药食同源',
    subtitle: '湿气去一去 脾胃养一养 吃饭香精神旺',
    brand: '神农御君方',
    category: '养生滋补',
    price: 39.9,
    originalPrice: 59.9,
    coinPrice: 2600,
    sales: 8932,
    rating: 4.88,
    spec: '90g (3g × 30 袋)',
    gradient: colors.gradGreen,
    badge: '新品',
    description: '精选道地茯苓，独立小袋装，方便冲饮，去湿、健脾、宁心安神。',
    specs: [
      { name: '规格', options: ['30 袋装', '60 袋装', '90 袋装'] },
    ],
  },
  {
    id: 'p3',
    title: '甘油二酯食用油',
    subtitle: '减少甘油三酯摄入 日常煎炒烹炸均可',
    brand: '神农御君方',
    category: '米面粮油',
    price: 128.0,
    originalPrice: 168.0,
    sales: 5432,
    rating: 4.85,
    spec: '500ml × 2 瓶',
    gradient: colors.gradOrange,
    description: '采用先进酯化工艺，更适合三高人群、注重健康的家庭日常使用。',
    specs: [
      { name: '规格', options: ['500ml × 1', '500ml × 2', '500ml × 4'] },
    ],
  },
  {
    id: 'p4',
    title: '草本精油 · 浣花颜',
    subtitle: '芋萃精油 滴滴滋润 鲜润锁水 舒缓肌肤',
    brand: '浣花颜',
    category: '日用百货',
    price: 79.0,
    coinPrice: 4800,
    sales: 3214,
    rating: 4.81,
    spec: '15ml',
    gradient: colors.gradGreen,
    description: '清爽柔和，芬芳宜人，细腻润滑，天然草本配方。',
    specs: [
      { name: '香型', options: ['薰衣草', '迷迭香', '茶树', '甜橙'] },
      { name: '规格', options: ['15ml', '30ml'] },
    ],
  },
  {
    id: 'p5',
    title: '食用糯米纸',
    subtitle: '不易破损 触感轻薄 入口即化',
    brand: '神农御君方',
    category: '日用百货',
    price: 9.9,
    coinPrice: 2000,
    sales: 8761,
    rating: 4.78,
    spec: '50 张/包',
    gradient: ['#F4C04A', '#FFA500'] as const,
    description: '食品级糯米纸，密封袋装，激光切割，防潮防黏。',
    specs: [
      { name: '规格', options: ['50 张装', '100 张装'] },
    ],
  },
  {
    id: 'p6',
    title: '带手柄百洁布清洁刷',
    subtitle: '强力去污 易清洗 纤维毛刷',
    brand: '清洁达人',
    category: '日用百货',
    price: 5.9,
    coinPrice: 1200,
    sales: 15238,
    rating: 4.82,
    spec: '随机发货',
    gradient: ['#E6A37A', '#D97706'] as const,
    description: '人体工学手柄，纤维毛刷清洁彻底。',
    specs: [
      { name: '颜色', options: ['粉色', '蓝色', '随机'] },
      { name: '套装', options: ['1 个装', '3 个装', '5 个装'] },
    ],
  },
  {
    id: 'p7',
    title: '红枣枸杞茶',
    subtitle: '滋阴养颜 气血双补',
    brand: '神农御君方',
    category: '茶饮花草',
    price: 36.0,
    originalPrice: 49.0,
    sales: 6789,
    rating: 4.89,
    spec: '8g × 30 袋',
    gradient: colors.gradRed,
    description: '精选宁夏枸杞、新疆若羌红枣，独立小袋装。',
    specs: [
      { name: '规格', options: ['30 袋装', '60 袋装'] },
    ],
  },
  {
    id: 'p8',
    title: '玫瑰花茶',
    subtitle: '疏肝理气 美容养颜',
    brand: '茶语',
    category: '茶饮花草',
    price: 28.0,
    sales: 4521,
    rating: 4.86,
    spec: '60g/罐',
    gradient: ['#FB7185', '#F43F5E'] as const,
    description: '甘肃苦水玫瑰，自然晾晒，花蕾饱满。',
    specs: [
      { name: '规格', options: ['60g 罐装', '120g 罐装'] },
    ],
  },
  {
    id: 'p9',
    title: '东北长粒香米',
    subtitle: '当季新米 颗颗饱满',
    brand: '禾家',
    category: '米面粮油',
    price: 88.0,
    sales: 9876,
    rating: 4.91,
    spec: '5kg',
    gradient: ['#FBBF24', '#D97706'] as const,
    description: '东北黑土地，自然成熟，米粒修长。',
    specs: [
      { name: '规格', options: ['5kg', '10kg'] },
    ],
  },
  {
    id: 'p10',
    title: '古法红糖 · 姜枣味',
    subtitle: '暖宫驱寒 经期养护',
    brand: '神农御君方',
    category: '养生滋补',
    price: 49.0,
    coinPrice: 3200,
    sales: 7654,
    rating: 4.93,
    spec: '15g × 12 块',
    gradient: ['#B91C1C', '#7F1D1D'] as const,
    badge: '推荐',
    description: '云南甘蔗熬制，姜母+红枣黄金配比。',
    specs: [
      { name: '口味', options: ['原味', '姜枣味', '玫瑰味'] },
      { name: '套餐', options: ['单盒', '三盒装', '六盒装'] },
    ],
  },
];

export const productCategories = ['全部', '热门产品', '养生滋补', '米面粮油', '日用百货', '茶饮花草'] as const;
