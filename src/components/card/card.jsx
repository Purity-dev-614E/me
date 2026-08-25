import React from 'react'
import styles from "./card.module.css"

const card = ({ children, className, style }) => {
  return (
    <div className={`${styles.shell} ${className || ""}`} style={style}>
      {children}
    </div>
  )
}

export default card
