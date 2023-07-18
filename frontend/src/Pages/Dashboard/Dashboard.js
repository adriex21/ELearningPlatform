import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import studyImage from '../../assets/pictures/image1.png'
import studyImage2 from '../../assets/pictures/image2.png'



const Dashboard = (props) => {

    const { user } = useSelector((state) => state.user)

    return( 

        <Main>
            <div className="bg-gray-100 min-h-screen pt-[15px]">
                <div className="container mx-auto py-8 px-4">
                    <h1 className="text-4xl font-bold mb-6">Welcome to the Online Learning Platform</h1>
                    <p className="text-xl text-gray-700 mb-8">
                    Start your journey of lifelong learning today!
                    </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded shadow p-4">
                                <h2 className="text-2xl font-bold mb-4">Learn Anytime, Anywhere</h2>
                                <p className="text-gray-600 mb-4">
                                Our platform offers a wide range of courses taught by industry experts. Gain new skills
                                and knowledge from the comfort of your home.
                                </p>
                                <img
                                src={studyImage}
                                alt="Study"
                                className="rounded-md shadow-md mx-auto"
                                style={{ maxWidth: '600px' }}
                                />
                            </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-2xl font-bold mb-4">Interactive Learning Experience</h2>
                            <p className="text-gray-600 mb-4">
                            Engage with interactive lessons, quizzes, and assignments to enhance your understanding
                            and track your progress.
                            </p>
                            <img
                            src={studyImage2}
                            alt="Interactive Learning"
                            className="rounded-md shadow-md mx-auto"
                            style={{ maxWidth: '600px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        
        </Main>
        
    )
}

export default Dashboard