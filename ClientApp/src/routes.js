/*import route here*/
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Novelty from './components/Novelty';
import TagNews from './pages/TagNews';

var routes= [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/novelty/:id",
        name: "Novelty",
        component: Novelty
    },
    {
        path: "/tag/:tag",
        name: "TagNews",
        component: TagNews,
    },
    {
        path: "*",
        name: "Home",
        component: Home,
    }
]

export default routes;