import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DisneyMovies from '../views/Home.vue'
import ShowDetails from '../views/ShowDetails.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'movies',
      component: DisneyMovies
    },
    {
      path: '/home/:name/:id',
      name: 'details',
      component: ShowDetails,
      props:true
    },
  ]
})

router.beforeEach(async (to, from) => {
  onAuthStateChanged(auth, (user) => {
    if (
      // make sure the user is authenticated
      user === null &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'login'
    ) 
    {
      // redirect the user to the login page
      router.push('/')
    }
    


  })
})
router.beforeEach(async (to, from) => {
  onAuthStateChanged(auth, (user) => {
    if (
      // make sure the user is authenticated
      user !== null &&
      // ❗️ Avoid an infinite redirect
      to.name == 'login'
    ) 
    {
      // redirect the user to the login page
      router.push('/home')
    }
  })
})

export default router
