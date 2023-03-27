export const routes = [
  { path: '/', redirect: '/history' },
  {
    path: '/history',
    component: '@/pages/mockDemo1',
    name: 'history',
    icon: 'icon-neirongguanli',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'icon-xiaoxi',
    routes: [
      {
        path: '/dashboard/today',
        component: '@/pages/mockDemo2',
        name: 'today',
      },
      {
        path: '/dashboard/week',
        component: '@/pages/mockDemo4',
        name: 'week',
      },
    ],
  },
  {
    path: '/demandManagement',
    component: '@/pages/mockDemo3',
    name: 'demandManagement',
    icon: 'icon-jichushuju',
  },
  {
    path: '/sqlDemo',
    component: '@/pages/sqlDemo',
    name: 'sqlDemo',
  },
];
