import { Link } from "react-router-dom";
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
      <div className="w-full xl:max-w-4xl mx-auto">
        <Contact company={company} />
        <Category />
      </div>
      <Post />
    </>
  );
}

export default Home;
