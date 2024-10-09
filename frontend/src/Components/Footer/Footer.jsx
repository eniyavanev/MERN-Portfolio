import React from 'react'

const Footer = ({darkMode,setDarkMode}) => {
  return (
    <div className={darkMode ? "dark" : ""}>
     <div className="dark:bg-gray-800 dark:text-white text-center bg-gray-200 pb-3">
        <p className='text-xl'>Eniyavan Portfolio{" "}<b>© 2022 Copyright.</b></p>
     </div>
    </div>
  )
}

export default Footer
