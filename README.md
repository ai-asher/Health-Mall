# Health Mall

健康商城 App — 基于 Expo + React Native + TypeScript 的跨平台框架，一套代码同时构建 iOS 和 Android。

## 当前状态

骨架阶段。已完成：
- 5 Tab 底部导航：消息 / 健康 / 精选 / 优选 / 我的
- 各 Tab 首页 UI 骨架（按设计稿配色与布局还原）
- TypeScript 严格模式
- 主题色 token 抽取

后续：业务逻辑、接口、登录、视频流、支付、芳华币系统等。

## 技术栈

- Expo SDK 54
- React Native 0.81
- React Navigation 7（bottom tabs + native stack）
- TypeScript 5.9
- expo-linear-gradient / @expo/vector-icons

## 目录结构

```
Health-Mall/
├── App.tsx                 # 根组件
├── app.json                # Expo 配置（iOS / Android bundle id）
├── src/
│   ├── theme/colors.ts     # 主题色 token
│   ├── navigation/
│   │   └── BottomTabs.tsx  # 底部 5 Tab 导航
│   └── screens/
│       ├── MessagesScreen.tsx   # 消息
│       ├── HealthScreen.tsx     # 健康
│       ├── FeaturedScreen.tsx   # 精选（视频流）
│       ├── SelectionScreen.tsx  # 优选（积分商城）
│       └── MineScreen.tsx       # 我的
└── package.json
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（扫码用 Expo Go 真机预览，或按 i 开 iOS 模拟器，按 a 开 Android）
npm start

# 直接打开 iOS 模拟器
npm run ios

# 直接打开 Android 模拟器
npm run android

# 浏览器预览（部分原生组件不可用）
npm run web
```

## 构建发布版

需要安装 `eas-cli`：

```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

## 许可

MIT
