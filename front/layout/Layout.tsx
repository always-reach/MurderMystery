import * as React from 'react'
import Header from '../components/Header'

type LayoutProps={
    children:React.ReactNode
}
const Layout:React.FC<LayoutProps>=(props)=>{
    return(
        <>
        <Header/>
        {props.children}
        </>
    )
}

export default Layout