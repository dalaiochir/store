import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = { title: 'MK Commerce', description: 'Premium e-commerce website' };

export default function RootLayout({ children }) {
  return <html lang="mn"><body><Header />{children}<Footer /></body></html>;
}
