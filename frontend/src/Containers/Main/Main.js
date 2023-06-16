import Header from '../../Components/Header/Header'

const Main = (props) => {
    return(
        <div className="w-[100vw] h-[100vh] flex flex-col">
            <Header></Header>
            {props.children}
        </div>
    )
}

export default Main