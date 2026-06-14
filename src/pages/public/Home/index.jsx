import Category from "../categories/Category";
import Post from "../posts/Post";
import Paner from "../../../layouts/public/paner";
import ContactSocial from "../../../layouts/public/PublicLayout/contactSocial";
import { useSelector } from "react-redux";

function Home() {
  const company = useSelector((state) => state.company.company);
  return (
    <>
      <Paner company={company} />
      <div className="w-full">
        <Category />
        <Post />
        <ContactSocial />
      </div>
    </>
  );
}

export default Home;
