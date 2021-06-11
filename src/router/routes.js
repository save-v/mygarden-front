/* eslint-disable object-property-newline */

const routes = [
  { path: '/', component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/About.vue'), name: 'About' },
      { path: '/users', component: () => import('pages/Users.vue'), name: 'Users' },
      { path: '/feedback', component: () => import('pages/Feedback.vue'), name: 'Feedback' },
      { path: '/messages', component: () => import('pages/Messages.vue'), name: 'Messages' },
      { path: '/profile', component: () => import('components/Profile.vue'), name: 'Profile' },
      { path: '/plant', component: () => import('pages/plant/MyList.vue'), name: 'MyList' },
      { path: '/plant', component: () => import('pages/plant/MyMenu.vue'),
        children: [
          { path: '/plant/info/:id', component: () => import('pages/plant/MyInfo.vue'), name: 'MyInfo', props: true }
        ]
      },
      { path: '/cat', component: () => import('pages/plant/SearchMenu.vue'),
        children: [
          { path: '/cat/:id', component: () => import('pages/plant/SearchList.vue'), name: 'SearchList', props: true },
          { path: '/cat/info/:id', component: () => import('pages/plant/SearchInfo.vue'), name: 'SearchInfo', props: true }
        ]
      }
    ]
  },
  { path: '/login', component: () => import('components/Login.vue'), name: 'Login' },
  { path: '/registration', component: () => import('components/Registration.vue'), name: 'Registration' }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
