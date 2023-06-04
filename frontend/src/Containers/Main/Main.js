import Header from '../../Components/Header/Header'

const Main = (props) => {
    return(
        <div className="w-[100vw] h-[100hw]">
            <Header data={props.data}></Header>
            {props.children}
        </div>
    )
}

export default Main