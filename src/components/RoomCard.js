import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import trashIcon from '../../public/delete.png'

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {db} from '../firebase'

export default function RoomCard({roomName}) {

  const [user, setUser] = useState()

  const auth = getAuth()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        user = auth.currentUser.uid

        setUser(user)

      }
    })

    return () => {}
  }, [user])

  const removeRoom = () => {
    updateDoc(doc(db, "users", `${user}`), {
      rooms: arrayRemove(roomName)
    });
  }

  return (
    <Card 
        sx={{
             minWidth: 410,
             minHeight: 250,
             backgroundColor: '#145ea8',
             '.css-10xx7c7-MuiPaper-root-MuiCard-root': {
                backgroundColor: '#fff'
             }
             
        }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Typography variant="h5" component="div">
            {roomName}
          </Typography>
          <Box onClick={removeRoom} sx={{
            cursor: 'pointer'
          }}>
            <Image src={trashIcon} width="30px" height="30px" alt="Trash"/>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{
        display: 'flex'
      }}>
        <CardActions>
          <Button size="large">Info</Button>
        </CardActions>
      </Box>
    </Card>
  );
}
