import { Outlet } from "react-router-dom";
import { Navbar } from "../../features/home/components/common/Navbar";
import { Footer } from "../../features/home/components/common/Footer";

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
