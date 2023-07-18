import Header from '../../Components/Header/Header'

const Main = (props) => {
    return(
        <div className="h-screen flex flex-row bg-gray-100">
            
            <Header></Header>
            <div className="flex-grow overflow-y-auto ml-[200px]">{props.children}</div>
            
        </div>
    )
}

export default Main