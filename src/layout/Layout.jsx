import React from 'react'
import ModalSidebar from '../components/modal/sidebar/ModalSidebar';
import Navbar from '../components/Navbar';

export default function Layout(props) {
    const [isSidebarShow, setIsSidebarShow] = React.useState(false);
    return (
        <>
            { isSidebarShow && <ModalSidebar isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />}
            <Navbar isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />
            { props.children}
        </>
    )
}
