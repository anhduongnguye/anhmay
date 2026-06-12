import Category from "../categories/Category";
import Post from "../posts/Post";
import Contact from "../../../layouts/public/PublicLayout/contact";
import { useSelector } from "react-redux";
import Paner from "../../../layouts/public/paner";


function Home() {
  const company = useSelector((state) => state.company.company)
  return (
    <>
      <Paner company={company} />
      <div className="w-full">
        <Category />
        <Post />
        <Contact company={company} />
      </div>
    </>
  );
}

export default Home;
