// stores/useAuthStore.js
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

const useAuthStore = create(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        
        // Actions
        login: (userData) => {
          console.log('🔧 Zustand - Login:', userData)
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false
          })
        },
        
        logout: () => {
          console.log('🔧 Zustand - Logout')
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          })
        },
        
        setLoading: (loading) => {
          set({ isLoading: loading })
        },
        
        updateUser: (userData) => {
          console.log('🔧 Zustand - Update user:', userData)
          set({ 
            user: { ...get().user, ...userData }
          })
        },
        
        // Test function for easy testing
        testLogin: () => {
          const testUser = {
            username: 'TestUser123',
            avatarUrl: 'https://via.placeholder.com/150',
            userId: '12345',
            userType: 'user',
            sessionToken: 'test_token_' + Date.now(),
          }
          
          console.log('🔧 Zustand - Test login with:', testUser)
          get().login(testUser)
        },
        
        // Debug function
        debug: () => {
          const state = get()
          console.log('🔧 ===========================================')
          console.log('🔧 ZUSTAND AUTH STORE DEBUG')
          console.log('🔧 ===========================================')
          console.log('🔧 User:', state.user)
          console.log('🔧 Is Authenticated:', state.isAuthenticated)
          console.log('🔧 Is Loading:', state.isLoading)
          console.log('🔧 LocalStorage:', localStorage.getItem('auth-storage'))
          console.log('🔧 ===========================================')
        }
      }),
      {
        name: 'auth-storage', // localStorage key
        // Zustand automatically syncs between tabs with this!
      }
    )
  )
)

// Optional: Subscribe to auth changes globally
useAuthStore.subscribe(
  (state) => state.isAuthenticated,
  (isAuthenticated, prevIsAuthenticated) => {
    if (isAuthenticated !== prevIsAuthenticated) {
      console.log('🔧 Auth state changed:', { isAuthenticated, prevIsAuthenticated })
    }
  }
)

export default useAuthStore