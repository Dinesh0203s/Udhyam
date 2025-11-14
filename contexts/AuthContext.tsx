"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User as FirebaseUser, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface UserData {
  firebaseUID: string
  email: string
  displayName?: string
  photoURL?: string
  isOnboarded: boolean
  fullName?: string
  collegeCode?: string
  collegeName?: string
  department?: string
  year?: string
  mobile?: string
}

interface AuthContextType {
  user: FirebaseUser | null
  userData: UserData | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = async (firebaseUser: FirebaseUser) => {
    try {
      const response = await fetch(`/api/users/${firebaseUser.uid}`)
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else if (response.status === 404) {
        // User doesn't exist in DB yet, create them
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firebaseUID: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }),
        })
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await fetchUserData(firebaseUser)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, signInWithGoogle, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


