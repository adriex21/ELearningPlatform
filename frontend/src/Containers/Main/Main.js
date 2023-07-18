import Header from '../../Components/Header/Header'

const Main = (props) => {
    return(
        <div className="h-screen flex flex-row ">
            
            <Header></Header>
            <div className="flex-grow overflow-y-auto ml-[200px]">{props.children}</div>
            
        </div>
    )
}

export default Main