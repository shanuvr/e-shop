import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import CompareBar from '../components/CompareBar';

export default function UserLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CompareBar />
    </div>
  );
}