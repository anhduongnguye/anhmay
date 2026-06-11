import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx"
import Header from "./header.jsx"
function PublicLayout() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
export default PublicLayout;