import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import ExperienceImage from "./components/ExperienceImage";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-body">
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Services />
        <Projects />
        <Skills />
        <Achievements />
        <Certifications />
        <ExperienceImage />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />
    </div>
  );
}

export default App;
