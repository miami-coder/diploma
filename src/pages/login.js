import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.scss'

export default function login() {

    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    const auth = getAuth()

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
          if (user) {
            
            setUser(user)
            router.push("/")
    
          } 
        })
    
        return () => {}
      }, [user])

    const signIn = () => {
        const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push('/')
         })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.authContainer}>
            
                <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email:"/>
                <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password"/>
            
            <div className={styles.btnContainer}>
                <div className={styles.authButton} onClick={signIn}>
                    <p>Sign In</p>
                </div>
                <div className={styles.goBack}>
                    <Link href="/registr">
                        <a>Sign Up</a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
