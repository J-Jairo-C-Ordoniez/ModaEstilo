import Header from '../../../components/structure/header/Header';
import Login from '../../../components/structure/login/login';
import Footer from '../../../components/structure/footer/Footer';

/**
 * PARÁMETROS DE SEGURIDAD IMPLEMENTADOS:
 * 1. Hasheo de contraseñas con bcryptjs (algoritmo Blowfish con sal incorporada).
 * 2. Autenticación mediante NextAuth con estrategia JWT para manejo de sesiones.
 * 3. Protección de rutas administrativas mediante verificación de sesión en el Layout del servidor (SSR).
 * 4. Redirección automática a la raíz si no existe una sesión activa.
 * 5. Prevención de inyección SQL mediante el uso del ORM Prisma (queries parametrizadas).
 */

export default function LoginPage() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}