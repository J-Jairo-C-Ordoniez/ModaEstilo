import Header from '../../../components/structure/header/Header';
import ForgotPasswordMain from '../../../components/structure/login/ForgotPasswordMain';
import Footer from '../../../components/structure/footer/Footer';

export const metadata = {
  title: 'Recuperar Contraseña | Moda y Estilo',
  description: 'Proceso de recuperación de contraseña para la administración.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <ForgotPasswordMain />
      <Footer />
    </>
  );
}
