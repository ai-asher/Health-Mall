import { colors } from '../theme/colors';

export type Doctor = {
  id: string;
  name: string;
  title: string;
  hospital: string;
  department: string;
  expertise: string[];
  rating: number;
  consultations: number;
  fee: number;
  online: boolean;
  avatarColor: readonly [string, string];
};

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: '林婉清',
    title: '主任中医师',
    hospital: '御君方互联网医院',
    department: '中医内科',
    expertise: ['失眠', '脾胃调理', '体质辨识'],
    rating: 4.96,
    consultations: 12380,
    fee: 88,
    online: true,
    avatarColor: colors.gradRed,
  },
  {
    id: 'd2',
    name: '吴明珠',
    title: '副主任医师',
    hospital: '御君方互联网医院',
    department: '中医妇科',
    expertise: ['月经不调', '产后修复', '更年期'],
    rating: 4.92,
    consultations: 8921,
    fee: 99,
    online: true,
    avatarColor: colors.gradPurple,
  },
  {
    id: 'd3',
    name: '赵慧',
    title: '主任医师',
    hospital: '中医儿科诊疗中心',
    department: '中医儿科',
    expertise: ['小儿咳嗽', '积食', '抽动症'],
    rating: 4.94,
    consultations: 15238,
    fee: 128,
    online: true,
    avatarColor: colors.gradGreen,
  },
  {
    id: 'd4',
    name: '王建国',
    title: '主任医师',
    hospital: '中西医结合医院',
    department: '心内科',
    expertise: ['高血压', '冠心病', '心律失常'],
    rating: 4.88,
    consultations: 6432,
    fee: 168,
    online: false,
    avatarColor: colors.gradBlue,
  },
  {
    id: 'd5',
    name: '陈慕容',
    title: '副主任医师',
    hospital: '皮肤专科医院',
    department: '中医皮肤',
    expertise: ['痤疮', '湿疹', '荨麻疹'],
    rating: 4.85,
    consultations: 4521,
    fee: 88,
    online: true,
    avatarColor: colors.gradPeach,
  },
  {
    id: 'd6',
    name: '张伯礼',
    title: '国医大师',
    hospital: '国医馆',
    department: '中医内科',
    expertise: ['疑难杂病', '中医经典'],
    rating: 5.0,
    consultations: 38900,
    fee: 588,
    online: false,
    avatarColor: colors.gradOrange,
  },
  {
    id: 'd7',
    name: '李清',
    title: '资深养生导师',
    hospital: '养生学堂',
    department: '中医养生',
    expertise: ['节气养生', '药膳食疗', '导引术'],
    rating: 4.91,
    consultations: 7654,
    fee: 68,
    online: true,
    avatarColor: colors.gradGreen,
  },
  {
    id: 'd8',
    name: '钱穆生',
    title: '研究员',
    hospital: '中医典籍研究院',
    department: '中医文献',
    expertise: ['黄帝内经', '伤寒论', '本草纲目'],
    rating: 4.97,
    consultations: 5872,
    fee: 198,
    online: true,
    avatarColor: colors.gradBlue,
  },
];

export const departments = ['全部', '中医内科', '中医妇科', '中医儿科', '心内科', '中医皮肤', '中医养生'] as const;
