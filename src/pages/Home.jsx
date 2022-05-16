// components
import AddNewPost from "../components/posts/AddNewPost"
import PostsList from "../components/posts/PostsList"
import Authentication from '../components/auth/Authentication';
// others
import Cookies from 'js-cookie';

const Home = () => {

  const cookieAuth = Cookies.get('isAuth')

  return (
    <>
       {cookieAuth ? 
          <>
          <AddNewPost />
          <hr />
          <PostsList />
            
          </>
        : <Authentication />}
    </>
  );
}

export default Home