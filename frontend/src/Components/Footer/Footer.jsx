import React from 'react'

const Footer = ({darkMode,setDarkMode}) => {
  return (
    <div className={darkMode ? "dark" : ""}>
     <div className="dark:bg-gray-900 dark:text-white text-center">
        <p>Eniyavan Portfolio<b>© 2022 Copyright</b></p>
     </div>
    </div>
  )
}

export default Footer
