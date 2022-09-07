import {React, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import styles from '../styles/Home.module.scss'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const drawerWidth = 240;

export default function ClippedDrawer() {

    const [user, setUser] = useState()
  const [roomsJson, setRoomsJson] = useState({
    email: '',
    name: '',
    rooms: []
  })
  const [rooms, setRooms] = useState([])

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
          <Typography variant="h6" noWrap component="div">
            Керування
          </Typography>
            <Link href="/">
                <a>Головна</a>
            </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {rooms.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}