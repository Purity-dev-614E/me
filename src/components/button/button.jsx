import React from 'react'
import styles from "./button.module.css"
import "@fontsource/crimson-text"

const Button = ({ link, children, className }) => {
  return (
    <a href={link} className={`${styles.button} ${className || ""}`}>
      {children ?? "button"}
    </a>
  )
}

export default Button