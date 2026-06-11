import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx"
import Header from "./header.jsx"
function PublicLayout() {
  return (
    <>
      <div>
        <Header />
        <div className="w-full xl:max-w-4xl mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
export default PublicLayout;