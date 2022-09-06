import Link from 'next/link'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../firebase';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.scss'

export default function registr() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const router = useRouter()

  const signUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user.uid)

        setDoc(doc(db, "users", `${user.uid}`), {
          name: fullName,
          email: email,
          rooms: []
        }).then(() => {
          router.push("/")
        })
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.authContainer}>
          <input onChange={e => setFullName(e.target.value)} type="text" id="fullname" name="email" placeholder="Full name:"/>
          <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email:"/>
          <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password"/>
          
        <div className={styles.btnContainer}>
          <div className={styles.authButton} onClick={signUp}>
            <p>Sign up</p>
          </div>
          <div className={styles.goBack}>
            <Link href="/login">
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
