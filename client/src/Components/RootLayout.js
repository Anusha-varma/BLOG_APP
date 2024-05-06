import React from 'react'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function RootLayout(){
    return(
        <div>
          <NavigationBar /> 
        
          {/* placeholder component*/}
          <Outlet /> 
          <Footer />
        </div>
    )
}
export default RootLayout;