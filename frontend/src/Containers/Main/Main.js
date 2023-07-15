import Header from '../../Components/Header/Header'

const Main = (props) => {
    return(
        <div className="h-screen flex flex-col">
            
            <Header></Header>
            <div className="flex-grow overflow-y-auto mt-20">{props.children}</div>
            
        
        </div>
    )
}

export default Main