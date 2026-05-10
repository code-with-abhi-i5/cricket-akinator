import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsTicker from '../components/StatsTicker';
import TacticalAnalysis from '../components/TacticalAnalysis';
import TeamShowcase from '../components/TeamShowcase';
import Playbook from '../components/Playbook';
import Leaderboard from '../components/Leaderboard';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsTicker />
        <TacticalAnalysis />
        <TeamShowcase />
        <Playbook />
        <Leaderboard />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
