import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects'; // ✅ use Projects, not ProjectsPage
import Footer from '@/components/Footer';
import HomePage from './experience/page'; // ✅ Import HomePage from experience/page.js

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a23] text-white">
      <Hero />
      <Skills />
      <Projects limit={6} /> {/* ✅ Show only 4 projects on home */}
      <HomePage/>
      <Footer />
    </main>
  );
}
