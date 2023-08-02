import { defineStore } from 'pinia'

// firebase import
import { auth } from '../firebase/config'
import { useRouter } from 'vue-router';
import {
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
const provider = new GoogleAuthProvider()

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        authIsReady: false
    }),
    getters: {
    },
    actions: {
         async handleAuth() {
            const res = await signInWithPopup(auth, provider)
            if(res){
                this.user = res.user
            }else{
                throw new Error('could not complete signup')
            }
        },
        async signOutStore() {
            console.log('logout action')
            await signOut(auth)
            this.user = null
        }
    }
})



const unsub = onAuthStateChanged(auth, (user) => {
    const userStore = useUserStore()
    userStore.authIsReady = true
    userStore.user = user
    // console.log(user)
    unsub()
})

