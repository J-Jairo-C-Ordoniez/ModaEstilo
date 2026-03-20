import Header from "../components/landing/header/Header";
import Main from "../components/landing/main/Main";
import { Footer } from "../components/landing/footer/Footer";

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
