export default {
  routes: [
    { path: '/login', component: 'login', layout: false },
    {
      path: '/',
      // component: '@/layouts/index',
      wrappers: [
        '@/wrappers/auth',
      ],
      routes: [
        { path: '/', component: 'home',layout: false },
        { path: '/dataManagement', component: 'dataManagement',layout: false },
        { path: '/logManagement', component: 'logManagement',layout: false },
        { path: '/userInformation', component: 'userInformation',layout: false },
        { path: '/adminInformation', component: 'adminInformation',layout: false },
        { path: '/permissionManagement', component: 'permissionManagement',layout: false },
        { path: '/roleAssignment', component: 'roleAssignment',layout: false },
      ],
      npmClient: 'yarn',
    },
  ],
}