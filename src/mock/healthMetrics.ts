export const stepsByDay = [
  { day: '周一', steps: 8421 },
  { day: '周二', steps: 6730 },
  { day: '周三', steps: 12089 },
  { day: '周四', steps: 5432 },
  { day: '周五', steps: 9870 },
  { day: '周六', steps: 4218 },
  { day: '周日', steps: 7069 },
];

export const heartRate24h = [
  62, 60, 58, 57, 56, 58, 65, 72, 78, 85, 88, 92,
  95, 90, 86, 80, 76, 78, 82, 88, 84, 75, 70, 66,
];

export const sleepLast30d = Array.from({ length: 30 }, (_, i) => ({
  date: i + 1,
  hours: 5.5 + Math.sin(i * 0.4) * 1.2 + Math.random() * 0.6,
}));

export const constitutionRadar = [
  { name: '平和', value: 78 },
  { name: '气虚', value: 32 },
  { name: '阳虚', value: 28 },
  { name: '阴虚', value: 45 },
  { name: '痰湿', value: 62 },
  { name: '湿热', value: 38 },
  { name: '血瘀', value: 22 },
  { name: '气郁', value: 51 },
  { name: '特禀', value: 18 },
];

export const todayMetrics = {
  steps: { value: 7069, goal: 10000 },
  heartRate: { value: 76, range: '60-100' },
  sleep: { value: 7.2, goal: 8 },
  calories: { value: 412, goal: 600 },
  water: { value: 1500, goal: 2000 },
  weight: { value: 65.4, change: -0.3 },
};

export const constitutionResult = {
  primary: '痰湿质',
  secondary: ['气郁质', '阴虚质'],
  description:
    '您当前以痰湿质为主，兼有气郁、阴虚。建议清淡饮食，适度运动，调畅情志，多做有氧锻炼。',
  suggestions: [
    { icon: 'restaurant', title: '饮食建议', text: '少食肥甘厚腻，多食薏苡仁、赤小豆、冬瓜' },
    { icon: 'walk', title: '运动建议', text: '坚持有氧运动，每周不少于 4 次' },
    { icon: 'moon', title: '起居建议', text: '不要熬夜，保持午休 20 分钟' },
    { icon: 'happy', title: '情志调摄', text: '保持心情舒畅，避免过度焦虑' },
  ],
};
