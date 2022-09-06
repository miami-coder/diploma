import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { doc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {db} from '../firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function NestedModal(props) {

  const {isOpen, bumer} = props

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState()
  const [nameRoom, setNameRoom] = useState("");
  const [roomsJson, setRoomsJson] = useState({
    email: '',
    name: '',
    rooms: []
  })
  const [rooms, setRooms] = useState([])

  const auth = getAuth()

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

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        user = auth.currentUser.uid

        setUser(user)

      }
    })

    return () => {}
  }, [user])

  const addRoom = () => {
    bumer(false);

    if(rooms.length === 0){
      setDoc(doc(db, "users", `${user}`), {
        rooms: [nameRoom]
      }, { merge: true });
    }

    updateDoc(doc(db, "users", `${user}`), {
      rooms: arrayUnion(nameRoom)
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Введіть назву кімнати</h2>
          <input type="text" onChange={e => setNameRoom(e.target.value)}/>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Button onClick={addRoom}>Створити</Button>
            {/* <Button onClick={handleClose}>Скасувати</Button> */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
