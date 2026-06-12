import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
import NavigationEffects from "../../../components/NavigationEffects";
import PageTransition from "../../../components/PageTransition";

function PublicLayout() {
  return (
    <>
      <NavigationEffects />
      <a href="#main-content" className="skip-link">
        Bỏ qua đến nội dung chính
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
