import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import React from "react"
import Layout from "./layouts/Layout"
import LoadingBlock from "./components/LoadingBlock"

const Login = React.lazy(() => import("src/features/auth/Login"))
const Course = React.lazy(() => import("src/features/courses/Course"))
const CourseMore = React.lazy(() => import("src/features/courses/CourseById"))
const Main = React.lazy(() => import("src/features/main/Main"))

const App = () => {

    return (
        <Router>
            <Layout>
                <React.Suspense fallback={<LoadingBlock />}>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/courses"} element={<Course />} />
                        <Route path={"/courses/:id"} element={<CourseMore />} />
                        <Route path={"/"} element={<Main />} />
                        <Route path="*" element={<div>Hello World!</div>} />
                    </Routes>
                </React.Suspense>
            </Layout>
        </Router>
    )
}
export default App