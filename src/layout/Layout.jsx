import React from 'react'
import ModalSidebar from '../components/modal/sidebar/ModalSidebar';
import Navbar from '../components/Navbar';
import { OpenTradeProvider } from "./../context/OpenTradeContext";
import { StrategieTradeProvider } from "./../context/StrategieTradeContext";
import { GoMarketTradeProvider } from "./../context/GoMarketTradeContext";
import { ClosedTradeProvider } from './../context/ClosedTradeContext';
import { SearchbarProvider } from "./../context/SearchbarContext";

export default function Layout(props) {
    const [isSidebarShow, setIsSidebarShow] = React.useState(false);
    return (
        <OpenTradeProvider>
            <StrategieTradeProvider>
                <GoMarketTradeProvider>
                    <ClosedTradeProvider>
                        <SearchbarProvider>
                            {isSidebarShow && <ModalSidebar isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />}
                            <Navbar isSidebarShow={isSidebarShow} setIsSidebarShow={setIsSidebarShow} />
                            {props.children}
                        </SearchbarProvider>
                    </ClosedTradeProvider>
                </GoMarketTradeProvider>
            </StrategieTradeProvider>
        </OpenTradeProvider>
    )
}
