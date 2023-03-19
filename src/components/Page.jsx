import React, {useEffect} from "react";
import NavPanel from "./Nav/NavPanel";
import BottomNavPanel from "./Nav/BottomNavPanel";
import {useSelector} from "react-redux";
import BarContactsPanel from "./Bar/BarContactsPanel";

const Page = ({showTopPanel, showBottomPanel, navType, element}) => {
    return (
        <div className={"page "+(showTopPanel ? "with-top-panel" : "")+" "+(showBottomPanel ? "with-bottom-panel" : "")}>
            {showTopPanel ? <NavPanel type={navType}/> : ""}
                {element}
            {showBottomPanel ? <BottomNavPanel/> : ""}

        </div>
    );
}

export default Page;
