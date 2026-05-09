import { colors } from '../theme/colors';

export type Message = {
  id: string;
  type: 'doctor' | 'system' | 'logistics' | 'coupon';
  title: string;
  preview: string;
  time: string;
  unread: number;
  avatar: readonly [string, string];
  conversation?: { from: 'me' | 'them'; text: string; time: string }[];
};

export const messages: Message[] = [
  {
    id: 'm1',
    type: 'doctor',
    title: '林婉清医师',
    preview: '已查看您上传的舌苔图片，初步判断为脾虚湿盛，建议...',
    time: '21:32',
    unread: 2,
    avatar: colors.gradRed,
    conversation: [
      { from: 'them', text: '您好，已收到您的咨询', time: '21:20' },
      { from: 'me', text: '医生您好，最近老觉得疲乏，没什么胃口', time: '21:21' },
      { from: 'them', text: '请问您方便上传一张舌苔照片吗？', time: '21:22' },
      { from: 'me', text: '好的，已上传', time: '21:25' },
      { from: 'them', text: '已查看您上传的舌苔图片，初步判断为脾虚湿盛', time: '21:30' },
      { from: 'them', text: '建议从饮食和作息入手调理，避免生冷油腻', time: '21:32' },
    ],
  },
  {
    id: 'm2',
    type: 'system',
    title: '官方公告',
    preview: '【新春活动】芳华币双倍奉送，下单立返 200 币',
    time: '今天',
    unread: 1,
    avatar: colors.gradOrange,
  },
  {
    id: 'm3',
    type: 'logistics',
    title: '物流通知',
    preview: '您的订单【黄精阿胶黑芝麻丸】已发货，韵达 778856...',
    time: '昨天',
    unread: 0,
    avatar: colors.gradBlue,
  },
  {
    id: 'm4',
    type: 'coupon',
    title: '优惠券到账',
    preview: '满 100 减 20 优惠券到账，有效期 3 天',
    time: '昨天',
    unread: 1,
    avatar: colors.gradPurple,
  },
  {
    id: 'm5',
    type: 'doctor',
    title: '吴明珠医师',
    preview: '感谢您的好评，有问题随时联系我',
    time: '04-26',
    unread: 0,
    avatar: colors.gradPurple,
    conversation: [
      { from: 'them', text: '您好，关于产后调理有什么问题？', time: '昨天 14:20' },
      { from: 'me', text: '医生，孩子刚满月，腰酸乏力', time: '昨天 14:22' },
      { from: 'them', text: '产后第一个月以休养为主，气血恢复需要时间', time: '昨天 14:30' },
      { from: 'me', text: '好的，谢谢医生', time: '昨天 15:00' },
      { from: 'them', text: '感谢您的好评，有问题随时联系我', time: '昨天 16:42' },
    ],
  },
  {
    id: 'm6',
    type: 'system',
    title: '健康周报',
    preview: '本周您坚持记录健康数据 7 天，累计走 53,829 步！',
    time: '04-25',
    unread: 0,
    avatar: colors.gradGreen,
  },
];
