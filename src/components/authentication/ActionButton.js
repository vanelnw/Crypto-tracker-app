import React from 'react'

const ActionButton = ({onClick, children}) => {
  return (
      <div styles={styles.div} onClick={onClick}>{children }</div>
  )
}

export default ActionButton


const styles = {
  width: "100%",
  backgroundColor: "#EEBC1D",
  display: "flex",
  justifyContent: "center",
  margin: "5px 0px",
};