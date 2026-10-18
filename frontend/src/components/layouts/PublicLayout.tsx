import { Outlet } from "react-router-dom";
import { Navbar } from "../../features/home/components/Navbar";
import { Footer } from "../../features/home/components/Footer";

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
