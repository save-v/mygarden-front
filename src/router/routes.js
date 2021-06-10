/* eslint-disable object-property-newline */

const routes = [
  { path: '/', component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '/feedback', component: () => import('pages/Feedback.vue'), name: 'Feedback' },
      { path: '/messages', component: () => import('pages/Messages.vue'), name: 'Messages' },
      { path: '/about', component: () => import('pages/About.vue'), name: 'About' },
      { path: '/profile', component: () => import('components/Profile.vue'), name: 'Profile' },
      { path: '/plant', component: () => import('pages/plant/Plants.vue'), name: 'Plants' },
      { path: '/plant', component: () => import('pages/plant/Plant.vue'),
        children: [
          { path: '/plant/general/:id', component: () => import('pages/plant/General.vue'), name: 'General', props: true } // ,
          // { path: '/plant/test/:id', component: () => import('pages/plant/General.vue'), name: 'Test', props: true }
        ]
      },
      { path: '/cat', component: () => import('pages/plant/Plant1.vue'),
        children: [
          { path: '/cat/:id', component: () => import('pages/plant/General1.vue'), name: 'General1', props: true }
        ]
      },
      { path: '/', component: () => import('pages/plant/Plant1.vue'),
        children: [
          { path: '/', component: () => import('pages/plant/General1.vue'), name: 'General1', props: true }
        ]
      } // ,
      // { path: '/', component: () => import('pages/plant/General1.vue'), name: 'General0' }
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
