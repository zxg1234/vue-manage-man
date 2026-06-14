import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home'
import UserView from '../views/User'
import MainView from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

const routes = [

  {
    path: '/',
    component: MainView,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: HomeView },
      { path: 'user', name: 'user', component: UserView },
      { path: 'mall', name: 'mall', component: Mall },
      { path: 'page1', name: 'page1', component: PageOne },
      { path: 'page2', name: 'page2', component: PageTwo }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router