import React from 'react'
import styles from "./button.module.css"
import "@fontsource/crimson-text"

const Button = ({ link, children }) => {
  return (
    <a href={link} className={styles.button}>
      {children ?? "button"}
    </a>
  )
}

export default Button