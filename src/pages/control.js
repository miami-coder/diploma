import { style } from '@mui/system'
import React from 'react'
import ClippedDrawer from '../components/ClippedDrawer'
import Info from '../components/Info'
import styles from '../styles/Control.module.scss'

export default function control() {
  return (
    <div className={styles.info}>
        <ClippedDrawer />
        <Info />
    </div>
  )
}
