export default {
  routes: [
    { path: '/login', component: 'login', layout: false },
    { path: '/register', component: 'register', layout: false },
    {
      path: '/',
      // component: '@/layouts/index',
      wrappers: [
        '@/wrappers/auth',
      ],
      routes: [
        { path: '/', component: 'home', layout: false },
        { path: '/userInfo', component: 'userInfo', layout: false },
        { path: '/personalInfo', component: 'personalInfo', layout: false },
        { path: '/dataManagement', component: 'dataManagement', layout: false },
        { path: '/logManagement', component: 'logManagement', layout: false },
        { path: '/adminInformation', component: 'adminInformation', layout: false },
        { path: '/permissionManagement', component: 'permissionManagement', layout: false },
        { path: '/roleAssignment', component: 'roleAssignment', layout: false },
      ],
      npmClient: 'yarn',
    },
    { path: '*', component: 'notFind', layout: false },
  ]
}