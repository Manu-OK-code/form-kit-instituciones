import './globals.css';
import '../../src/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

export const metadata = {
  title: 'form-kit | Playground',
  description: 'Vista interactiva de los componentes compartidos de form-kit.',
};

const RootLayout = ({ children }) => (
  <html lang="es">
    <body>{children}</body>
  </html>
);

export default RootLayout;
