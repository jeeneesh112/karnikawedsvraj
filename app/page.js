"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState(0); // 0 = not started, 1 = main, 2 = events, 3 = venues, 4 = thank you
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [flowers] = useState(() => {
    const flowerTypes = ["🌼", "🌸", "🌹", "🌺", "🥀"];
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 4,
      size: 1.2 + Math.random() * 1.2,
      type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
    }));
  });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

    // Countdown timer to wedding date (Feb 5, 2026 9:00 AM)
    const weddingDate = new Date("2026-02-22T19:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const events = [
    {
      title: "Haldi Ceremony",
      date: "Thursday, 5th February 2026",
      time: "9:00 AM",
      location: "B-48 Shreeji Charan, Bayad",
      description: "Traditional turmeric ceremony to bless the couple",
      color: "#d9a300",
      accent: "from-[#fbe389] via-[#f7d147] to-[#e2b72f]",
      icon: "🌼",
    },

    {
      title: "Ganesh Sthapana",
      date: "Thursday, 5th February 2026",
      time: "11:30 AM",
      location: "B-48 Shreeji Charan, Bayad",
      description: "Invocation of Lord Ganesh for an auspicious beginning",
      color: "#c73c30",
      accent: "from-[#ffd3c4] via-[#ffb4a0] to-[#e96b5c]",
      icon: "🕉️",
    },
    {
      title: "Ras Garba",
      date: "Thursday, 4th February 2026",
      time: "10:00 PM",
      location: "Venue lawn",
      description: "Dandiya night filled with joy and music",
      color: "#2f6f8f",
      accent: "from-[#d7f0ff] via-[#a1d8ff] to-[#5ea6d4]",
      icon: "🎶",
    },
  ];

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };


  // Animation helpers
  const [sceneAnim, setSceneAnim] = useState(false);
  useEffect(() => {
    if (scene > 0) {
      setSceneAnim(true);
      const t = setTimeout(() => setSceneAnim(false), 700);
      return () => clearTimeout(t);
    }
  }, [scene]);

  // Auto-advance logic
useEffect(() => {
  if (scene === 0) return;
  let timeout;

  if (scene === 1) timeout = setTimeout(() => setScene(2), 5000);   // 9 sec
  if (scene === 2) timeout = setTimeout(() => setScene(3), 7000);  // 11 sec
  if (scene === 3) timeout = setTimeout(() => setScene(4), 7000);  // 11 sec

  return () => clearTimeout(timeout);
}, [scene]);


  if (!mounted) return null;

  return (
    <main className="min-h-screen font-serif bg-[#FFF6D9] text-[#5a3a1b] relative overflow-hidden">
      {/* Music */}
      <audio ref={audioRef} loop>
        <source src="/music/song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full bg-[#f7f1dd] border border-[#d4af68] shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
      >
        <span className="text-[#3a5543] text-xl">{playing ? "❚❚" : "▶"}</span>
      </button>

      {/* Cinematic Scenes */}
      {scene === 0 && (
       <section
  className="fixed inset-0 flex flex-col justify-start items-center text-center px-6 pt-32 pb-12 overflow-hidden z-50"
  style={{
    backgroundImage: "url('/images/karnika_open.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 max-w-lg text-center mt-24 sm:mt-32">
    <div className="mb-6">
      <div className="flex flex-col items-center">
        <div className="text-[#d4af68] text-5xl font-serif tracking-widest">K&nbsp;&nbsp;✦&nbsp;&nbsp;V</div>
        <div className="w-24 h-px bg-[#d4af68] mt-2 opacity-70" />
      </div>
    </div>
    <h2 className="text-3xl md:text-4xl text-[#f5e6c8] mb-4 font-serif tracking-wide fadein">Wedding Invitation</h2>
    <p className="text-base text-[#e8d9b8] mb-10 italic fadein" style={{animationDelay:'0.3s'}}>Together with their families</p>
    <button
      onClick={() => {
        setScene(1);
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play();
          setPlaying(true);
        }
      }}
      className="px-10 py-4 bg-[#f7f1dd] text-[#2f4a3a] font-serif rounded-full transition-all duration-300 text-lg shadow-md hover:shadow-lg hover:scale-[1.02]"
    >
      Join Us in Our Sacred Union
    </button>
  </div>
</section>

      )}

      {/* Scene 1: Main Invite */}
      {scene === 1 && (
        <section
          className={`fixed inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12 sm:py-12 overflow-hidden z-40 ${sceneAnim ? 'fadein' : ''}`}
          style={{
            backgroundImage: "url('/images/karnika_main.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 max-w-md mx-auto px-4 mt-40 sm:mt-10 md:-mt-10 pb-0 sm:pb-14 md:pb-22">
            <div className="mb-3 sm:mb-5 fadein" style={{animationDelay:'0.2s'}}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2f4a3a] flex items-center justify-center gap-2 sm:gap-3">
                <span className="tracking-wide">Karnika</span>
                <span className="text-[#c59b32] text-4xl sm:text-5xl md:text-6xl">&</span>
                <span className="tracking-wide">Vraj</span>
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3 my-3 sm:my-4 fadein" style={{animationDelay:'0.4s'}}>
              <div className="w-12 sm:w-16 h-[1px] bg-[#d4af68]" />
              <div className="text-[#c59b32] text-xl sm:text-2xl">✦</div>
              <div className="w-12 sm:w-16 h-[1px] bg-[#d4af68]" />
            </div>
            <div className="mb-4 sm:mb-6 px-2 sm:px-4 fadein" style={{animationDelay:'0.6s'}}>
              <p className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>Together with their families</p>
              <p className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>request the pleasure of your company at their</p>
              <p className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>wedding celebration</p>
            </div>
            <div className="mb-3 sm:mb-5 fadein" style={{animationDelay:'0.8s'}}>
              <p className="text-sm sm:text-base tracking-[0.3em] text-[#8a7a5a] uppercase mb-2 sm:mb-3">Save the Date</p>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2 sm:mb-3">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#3a5543] mb-1">21</div>
                  <div className="text-sm sm:text-base tracking-widest text-[#c59b32] uppercase">Feb</div>
                </div>
                <div className="text-3xl sm:text-4xl text-[#d4af68]">—</div>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#3a5543] mb-1">22</div>
                  <div className="text-sm sm:text-base tracking-widest text-[#c59b32] uppercase">Feb</div>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl text-[#5a5a5a] mb-2">2026</div>
              <div className="text-base sm:text-lg md:text-xl text-[#7a6a5a]">Dhansura, Gujarat</div>
            </div>
          </div>
        </section>
      )}

      {/* Scene 2: Ganesh & Haldi Info Page */}
      {scene === 2 && (
        <section
          className={`fixed inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden z-30 ${sceneAnim ? 'fadein' : ''}`}
          style={{
            backgroundImage: "url('/images/karnika_ganesh_new.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 max-w-2xl w-full text-center px-4 sm:px-6 py-32 sm:py-22 text-[#2f4a3a]">
            <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] mb-5 fadein" style={{animationDelay:'0.2s'}}>Auspicious Beginnings</p>
            <div className="space-y-4 sm:space-y-5 fadein" style={{animationDelay:'0.4s'}}>
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">Mahendhi Ceremony</div>
                <p className="text-sm sm:text-base">Friday, 20th February 2026 • 09:00 AM</p>
                <p className="text-sm sm:text-base">Krushankunj Society, Behind Bus Station , Dhansura</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">Haldi Ceremony</div>
                <p className="text-sm sm:text-base">Saturday, 21th February 2026 • 09:00 AM</p>
                <p className="text-sm sm:text-base">Krushankunj Society, Behind Bus Station , Dhansura</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">Ganesh Sthapana</div>
                <p className="text-sm sm:text-base">Saturday, 21th February 2026 • 01:15 PM</p>
                <p className="text-sm sm:text-base">Krushankunj Society, Behind Bus Station , Dhansura</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">Rash Garba</div>
                <p className="text-sm sm:text-base">Saturday, 21th February 2026 • 09:00 PM</p>
                <p className="text-sm sm:text-base">Krushankunj Society, Behind Bus Station , Dhansura</p>
              </div>
            </div>
            <p className="mt-6 text-base sm:text-lg text-[#4a3a2b] italic fadein" style={{animationDelay:'0.7s'}}>Blessings first, colors of turmeric to follow—join us in the morning for the sacred start.</p>
          </div>
        </section>
      )}

      {/* Scene 3: Mameru, Dinner & Rasgarba Info Page */}
      {scene === 3 && (
        <section
          className={`fixed inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-48 sm:py-16 overflow-hidden z-20 ${sceneAnim ? 'fadein' : ''}`}
          style={{
            backgroundImage: "url('/images/karnika_weeding_theme.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 max-w-2xl w-full text-center px-1 sm:px-3py-20 sm:py-22 text-[#2f4a3a]">
            <div className="space-y-4 sm:space-y-5 fadein" style={{animationDelay:'0.2s'}}>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">Mameru</div>
                <p className="text-sm sm:text-base">Sunday, 22nd February 2026 • 4:00 PM</p>
                <p className="text-sm sm:text-base">Near Devya Mahdev Mandir, Dhansura</p>
              </div>
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">Dinner</div>
                <p className="text-sm sm:text-base">Sunday, 22nd February 2026 • 6:00 PM</p>
                <p className="text-sm sm:text-base">Near Devya Mahdev Mandir, Dhansura</p>
              </div>
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">Hast Milap</div>
                <p className="text-sm sm:text-base">Sunday, 22nd February 2026 • 7:15 PM</p>
                <p className="text-sm sm:text-base">Near Devya Mahdev Mandir, Dhansura</p>
              </div>
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">Kanya Vidaai</div>
                <p className="text-sm sm:text-base">Sunday, 22nd February 2026 • 10:15 PM</p>
                <p className="text-sm sm:text-base">Near Devya Mahdev Mandir, Dhansura</p>
              </div>
            </div>
            <p className="mt-6 text-base sm:text-lg text-[#3B2A1A] italic fadein" style={{animationDelay:'0.7s'}}>From the joy of Mameru and Dinner to the warmth of Hast Milap and the emotions of Kanya Vidaai — come celebrate every precious moment with us.</p>
          </div>
        </section>
      )}

      {/* Scene 4: Thank You Section */}
      {scene === 4 && (
        <section
          className={`fixed inset-0 flex items-center justify-center py-32 text-center px-6 overflow-hidden z-10 ${sceneAnim ? 'fadein' : ''}`}
          style={{
            backgroundImage: "url('/images/karnika_weeding_theme.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative max-w-2xl mx-auto pt-2">
            <div className="mb-6">
              <div className="flex flex-col items-center">
                <div className="text-[#d4af68] text-5xl font-serif tracking-widest">K&nbsp;&nbsp;✦&nbsp;&nbsp;V</div>
                <div className="w-24 h-px bg-[#d4af68] mt-2 opacity-70" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2f4a3a] mb-6 fadein" style={{animationDelay:'0.2s'}}>Thank You</h2>
            <p className="text-base md:text-lg text-[#5a5a5a] max-w-lg mx-auto leading-relaxed mb-3 fadein" style={{animationDelay:'0.4s'}}>Your presence will make our special day even more memorable.</p>
            <p className="text-base md:text-lg text-[#c59b32] italic mb-8 fadein" style={{ fontFamily: "Georgia, serif", animationDelay:'0.6s' }}>With love and blessings from both families</p>
            <a
              href="tel:+918320027046"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#c59b32]/60 rounded-full text-[#c59b32] text-lg hover:bg-[#c59b32]/10 transition-colors mb-10 fadein"
              style={{animationDelay:'0.8s'}}>
              <span className="text-xl">📞</span>
              <span>+91 83200 27046</span>
            </a>
            <div className="flex items-center justify-center gap-6 my-8 fadein" style={{animationDelay:'1s'}}>
              <div className="w-16 h-[1px] bg-[#c59b32]/50" />
              <div className="text-2xl text-[#c59b32]">✦</div>
              <div className="w-16 h-[1px] bg-[#c59b32]/50" />
            </div>
            <button
              onClick={() => setScene(1)}
              className="mt-4 px-8 py-3 bg-[#f7f1dd] text-[#2f4a3a] font-serif rounded-full shadow-md hover:scale-105 transition-all"
            >Replay Invitation</button>
          </div>
        </section>
      )}

      {/* Fade-in animation style */}
      <style jsx global>{`
        .fadein {
          opacity: 0;
          animation: fadein 0.8s forwards;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
