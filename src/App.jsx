import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TacticalAnalysis from './components/TacticalAnalysis';
import Playbook from './components/Playbook';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <TacticalAnalysis />
        <Playbook />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
