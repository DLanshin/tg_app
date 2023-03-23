import NavPanel from "./Nav/NavPanel";
import BottomNavPanel from "./Nav/BottomNavPanel";

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
