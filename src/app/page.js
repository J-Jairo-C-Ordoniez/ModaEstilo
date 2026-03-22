import Header from "../components/structure/header/Header";
import Main from "../components/structure/main/Main";
import Footer from "../components/structure/footer/Footer";

export const metadata = {
  title: "Moda y Estilo",
  description: "Diseño de la página principal - Moda y Estilo",
};

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
