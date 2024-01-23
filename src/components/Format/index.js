import Header from "../Header";
import "./index.css"


export default function Format({children}){
    return(
        <div className="div">
            <Header/>
            <div className="view">
                <div className="view-div">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}