import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import NestedModal from '../components/NestedModal'
import RoomCard from '../components/RoomCard'
import addIcon from '../../public/plus.png'

export default function Home() {

  const [user, setUser] = useState()
  const [roomsJson, setRoomsJson] = useState({
    email: '',
    name: '',
    rooms: []
  })
  const [rooms, setRooms] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const bumerOpen = (value) => {
    setOpen(value)
  }

  const router = useRouter()
  const auth = getAuth()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        user = auth.currentUser.uid

        setUser(user)

      } else {
        
        router.push("/login")
      }
    })

    return () => {}
  }, [user])

  useEffect(() => {

    if(!user) return

    onSnapshot(doc(db, "users", `${user}`), (doc) => {
    
      setRoomsJson(doc.data())

    });
  

  },[user])

  useEffect(() => {

    if(!roomsJson) return

    setRooms(Object.values(roomsJson["rooms"]))

  }, [roomsJson])

  return (
    <div>
      <Head>
        <title>PalamarHome</title>
      </Head>

      <NestedModal isOpen={open} bumer={bumerOpen}/>

      <Navbar />

      <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.cardContainer}>
              {rooms.map((item, index) => {
                return (
                  <div className={styles.roomCard}>
                    <RoomCard roomName={item} />
                    
                  </div>
                )
              })}
              <div className={styles.addBtn} onClick={handleOpen}>
                <Image src={addIcon} alt="Add room"/>
              </div>
            </div>
          </div>
      </div>

    </div>
  )
}
