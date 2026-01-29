"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);
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

  if (!mounted) return null;

  return (
    <main className="min-h-screen font-serif bg-[#FFF6D9] text-[#5a3a1b] relative overflow-hidden">
      {/* Music */}
      <audio ref={audioRef} loop>
        <source src="/music/song.mp3" type="audio/mpeg" />
      </audio>

      {/* Small Stylish Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full
             bg-[#f7f1dd] border border-[#d4af68]
             shadow-md flex items-center justify-center
             transition-all duration-300 hover:scale-105"
      >
        <span className="text-[#3a5543] text-xl">{playing ? "❚❚" : "▶"}</span>
      </button>

      {/* Opening Cover with Image */}
      {!invitationOpened && !showWelcome && (
        <section
          className="fixed inset-0 flex flex-col justify-start items-center text-center px-6 pt-46 pb-12 overflow-hidden z-50"
          style={{
            backgroundImage: "url('/images/karnika_open.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 max-w-lg text-center">
            <div className="mb-6">
              <div className="flex flex-col items-center">
                <div className="text-[#d4af68] text-5xl font-serif tracking-widest">
                  K&nbsp;&nbsp;✦&nbsp;&nbsp;V
                </div>
                <div className="w-24 h-px bg-[#d4af68] mt-2 opacity-70" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl text-[#f5e6c8] mb-4 font-serif tracking-wide">
              Wedding Invitation
            </h2>
            <p className="text-base text-[#e8d9b8] mb-10 italic">
              Together with their families
            </p>
            <button
              onClick={() => {
                setIsUnlocking(true);
                // Simple fade transition
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.inset = '0';
                overlay.style.background = '#FFF6D9';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.5s cubic-bezier(.4,0,.2,1)';
                overlay.style.zIndex = '99999';
                document.body.appendChild(overlay);
                setTimeout(() => {
                  overlay.style.opacity = '0.85'; // semi-transparent first
                }, 10);
                setTimeout(() => {
                  setInvitationOpened(true);
                  setShowWelcome(false);
                  window.scrollTo({ top: 0, behavior: 'auto' });
                  if (audioRef.current && audioRef.current.paused) {
                    audioRef.current.play();
                    setPlaying(true);
                  }
                  overlay.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1)';
                  overlay.style.opacity = '0'; // then fade to fully transparent
                  setTimeout(() => overlay.remove(), 700);
                }, 500);
              }}
              disabled={isUnlocking}
              className="px-10 py-4 bg-[#f7f1dd] text-[#2f4a3a] font-serif rounded-full transition-all duration-300 text-lg shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-90"
            >
              Join Us in Our Sacred Union
            </button>
          </div>
        </section>
      )}

      {/* Hero */}
      {invitationOpened && (
        <section
          className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-10 sm:py-12 overflow-hidden"
          style={{
            backgroundImage: "url('/images/karnika_main.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Animated Falling Flowers removed as per request */}

          {/* Content - Positioned in the clear middle area */}
          <div className="relative z-10 max-w-md mx-auto px-4 mt-28 sm:mt-0 md:-mt-10 pb-0 sm:pb-14 md:pb-22">
            {/* Names */}
            <div className="mb-3 sm:mb-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2f4a3a] flex items-center justify-center gap-2 sm:gap-3">
                <span className="tracking-wide">Karnika</span>
                <span className="text-[#c59b32] text-4xl sm:text-5xl md:text-6xl">
                  &
                </span>
                <span className="tracking-wide">Vraj</span>
              </h1>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
              <div className="w-12 sm:w-16 h-[1px] bg-[#d4af68]" />
              <div className="text-[#c59b32] text-xl sm:text-2xl">✦</div>
              <div className="w-12 sm:w-16 h-[1px] bg-[#d4af68]" />
            </div>

            {/* Invitation Text */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <p
                className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Together with their families
              </p>
              <p
                className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                request the pleasure of your company at their
              </p>
              <p
                className="text-base sm:text-lg md:text-xl text-[#5a5a5a] italic leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                wedding celebration
              </p>
            </div>

            {/* Save the Date */}
            <div className="mb-3 sm:mb-5">
              <p className="text-sm sm:text-base tracking-[0.3em] text-[#8a7a5a] uppercase mb-2 sm:mb-3">
                Save the Date
              </p>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2 sm:mb-3">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#3a5543] mb-1">
                    21
                  </div>
                  <div className="text-sm sm:text-base tracking-widest text-[#c59b32] uppercase">
                    Feb
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl text-[#d4af68]">—</div>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl font-light text-[#3a5543] mb-1">
                    22
                  </div>
                  <div className="text-sm sm:text-base tracking-widest text-[#c59b32] uppercase">
                    Feb
                  </div>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl text-[#5a5a5a] mb-2">
                2026
              </div>
              <div className="text-base sm:text-lg md:text-xl text-[#7a6a5a]">
                Dhansura, Gujarat
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-4 sm:mt-6 text-[#c59b32] text-xl sm:text-2xl animate-bounce">
              ⌄
            </div>
          </div>
        </section>
      )}

      {/* Decorative Border 1 */}
      {invitationOpened && (
        <div className="relative py-6 px-4 bg-[#f9f5f0]">
          {/* Top thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>

          {/* Center ornament */}
          <div className="flex justify-center my-3">
            <svg width="120" height="24" viewBox="0 0 120 24">
              <path
                d="M10 12 Q 30 0 60 12 Q 90 24 110 12"
                stroke="#c59b32"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <circle cx="60" cy="12" r="4" fill="#c59b32" />
              <circle cx="45" cy="12" r="2" fill="#c59b32" opacity="0.7" />
              <circle cx="75" cy="12" r="2" fill="#c59b32" opacity="0.7" />
            </svg>
          </div>

          {/* Bottom thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>
        </div>
      )}

      {/* Ganesh & Haldi Info Page */}
      {invitationOpened && (
        <section
          className="relative min-h-screen flex items-top justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden"
          style={{
            backgroundImage: "url('/images/karnika_ganesh_new.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 max-w-2xl w-full text-center px-4 sm:px-6 py-32 sm:py-22 text-[#2f4a3a]">
            <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.35em] mb-5">
              Auspicious Beginnings
            </p>

            <div className="space-y-4 sm:space-y-5">
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">
                  Mahendhi Ceremony
                </div>
                <p className="text-sm sm:text-base">
                  Friday, 20th February 2026 • 09:00 AM
                </p>
                <p className="text-sm sm:text-base">
                  Krushankunj Society, Behind Bus Station , Dhansura
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">
                  Haldi Ceremony
                </div>
                <p className="text-sm sm:text-base">
                  Saturday, 21th February 2026 • 09:00 AM
                </p>
                <p className="text-sm sm:text-base">
                  Krushankunj Society, Behind Bus Station , Dhansura
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">
                  Ganesh Sthapana
                </div>
                <p className="text-sm sm:text-base">
                  Saturday, 21th February 2026 • 01:15 PM
                </p>
                <p className="text-sm sm:text-base">
                  Krushankunj Society, Behind Bus Station , Dhansura
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">
                  {" "}
                  Rash Garba
                </div>
                <p className="text-sm sm:text-base">
                  Saturday, 21th February 2026 • 09:00 PM
                </p>
                <p className="text-sm sm:text-base">
                  Krushankunj Society, Behind Bus Station , Dhansura
                </p>
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg text-[#4a3a2b] italic">
              Blessings first, colors of turmeric to follow—join us in the
              morning for the sacred start.
            </p>
          </div>
        </section>
      )}

      {/* Decorative Border 2 */}
      {invitationOpened && (
        <div className="relative py-6 px-4 bg-[#f9f5f0]">
          {/* Top thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>

          {/* Center ornament */}
          <div className="flex justify-center my-3">
            <svg width="120" height="24" viewBox="0 0 120 24">
              <path
                d="M10 12 Q 30 0 60 12 Q 90 24 110 12"
                stroke="#c59b32"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <circle cx="60" cy="12" r="4" fill="#c59b32" />
              <circle cx="45" cy="12" r="2" fill="#c59b32" opacity="0.7" />
              <circle cx="75" cy="12" r="2" fill="#c59b32" opacity="0.7" />
            </svg>
          </div>

          {/* Bottom thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>
        </div>
      )}

      {/* Mameru, Dinner & Rasgarba Info Page */}
      {invitationOpened && (
        <section
          className="relative min-h-screen flex items-top justify-center px-4 sm:px-6 py-48 sm:py-16 overflow-hidden"
          style={{
            backgroundImage: "url('/images/karnika_weeding_theme.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 max-w-2xl w-full text-center px-1 sm:px-3py-20 sm:py-22 text-[#2f4a3a]">
            <div className="space-y-4 sm:space-y-5">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold">Mameru</div>
                <p className="text-sm sm:text-base">
                  Sunday, 22nd February 2026 • 4:00 PM
                </p>
                <p className="text-sm sm:text-base">
                  Near Devya Mahdev Mandir, Dhansura
                </p>
              </div>

              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">Dinner</div>
                <p className="text-sm sm:text-base">
                  Sunday, 22nd February 2026 • 6:00 PM
                </p>
                <p className="text-sm sm:text-base">
                  Near Devya Mahdev Mandir, Dhansura
                </p>
              </div>

              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">
                  Hast Milap
                </div>
                <p className="text-sm sm:text-base">
                  Sunday, 22nd February 2026 • 7:15 PM
                </p>
                <p className="text-sm sm:text-base">
                  Near Devya Mahdev Mandir, Dhansura
                </p>
              </div>
              <div className="pt-2">
                <div className="text-2xl sm:text-3xl font-semibold">
                  Kanya Vidaai
                </div>
                <p className="text-sm sm:text-base">
                  Sunday, 22nd February 2026 • 10:15 PM
                </p>
                <p className="text-sm sm:text-base">
                  Near Devya Mahdev Mandir, Dhansura
                </p>
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg text-[#3B2A1A] italic">
              From the joy of Mameru and Dinner to the warmth of Hast Milap and
              the emotions of Kanya Vidaai — come celebrate every precious
              moment with us.
            </p>
          </div>
        </section>
      )}

      {/* Decorative Border 3 */}
      {invitationOpened && (
        <div className="relative py-6 px-4 bg-[#f9f5f0]">
          {/* Top thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>

          {/* Center ornament */}
          <div className="flex justify-center my-3">
            <svg width="120" height="24" viewBox="0 0 120 24">
              <path
                d="M10 12 Q 30 0 60 12 Q 90 24 110 12"
                stroke="#c59b32"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <circle cx="60" cy="12" r="4" fill="#c59b32" />
              <circle cx="45" cy="12" r="2" fill="#c59b32" opacity="0.7" />
              <circle cx="75" cy="12" r="2" fill="#c59b32" opacity="0.7" />
            </svg>
          </div>

          {/* Bottom thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>
        </div>
      )}

      {/* Venues Section */}
      <section
        className="relative py-20 bg-[#FFFDF5] px-4 overflow-hidden"
        style={{
          backgroundImage: "url('/images/karnika_weeding_theme.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c59b32]">
            Venues
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#2f4a3a] mt-2">
            Celebration Locations
          </h2>
          <div className="w-16 h-[2px] bg-[#c59b32] mx-auto mt-4" />
        </div>

        <div className="relative max-w-2xl mx-auto space-y-12">
          {/* Venue 1 - Shreeji Charan */}
          <div className="bg-white rounded-3xl shadow-[0_18px_38px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Google Map */}
            <a
              href="https://maps.app.goo.gl/uwPuRU5kNCzk6SAt5"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-64 bg-gray-200 relative cursor-pointer"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d766.9639980472732!2d73.2083189929943!3d23.35172630278896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDIxJzA2LjUiTiA3M8KwMTInMzEuNCJF!5e0!3m2!1sen!2sin!4v1769706420234!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </a>

            {/* Venue Details */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#2f4a3a] mb-2">
                Krushankunj Society
              </h3>
              <p className="text-base text-[#7a6a5a] mb-4">Dhansura</p>

              {/* Event Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#ffd3c4] text-[#5a4a3a] text-sm rounded-full">
                  Mahendi Ceremony
                </span>
                <span className="px-4 py-2 bg-[#ffd3c4] text-[#5a4a3a] text-sm rounded-full">
                  Haldi Ceremony
                </span>
                <span className="px-4 py-2 bg-[#ffd3c4] text-[#5a4a3a] text-sm rounded-full">
                  Ganesh Sthapana
                </span>
              </div>
            </div>
          </div>

          {/* Venue 2 - For Mameru, Garba, Dinner */}
          <div className="bg-white rounded-3xl shadow-[0_18px_38px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Google Map */}
            <a
              href="https://maps.app.goo.gl/dxrwinTh6YCLmHzP7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-64 bg-gray-200 relative cursor-pointer"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3663.005806833067!2d73.20615597532375!3d23.35180417894427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDIxJzA2LjUiTiA3M8KwMTInMzEuNCJF!5e0!3m2!1sen!2sin!4v1769706356083!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </a>

            {/* Venue Details */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#2f4a3a] mb-2">
                Near Devya Mahadev Mandir
              </h3>
              <p className="text-base text-[#7a6a5a] mb-4">Dhansura</p>

              {/* Event Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#d7f0ff] text-[#5a4a3a] text-sm rounded-full">
                  Ras Garba
                </span>
                <span className="px-4 py-2 bg-[#d7f0ff] text-[#5a4a3a] text-sm rounded-full">
                  Mameru
                </span>
                <span className="px-4 py-2 bg-[#d7f0ff] text-[#5a4a3a] text-sm rounded-full">
                  Dinner
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Border 5 */}
      {invitationOpened && (
        <div className="relative py-6 px-4 bg-[#f9f5f0]">
          {/* Top thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>

          {/* Center ornament */}
          <div className="flex justify-center my-3">
            <svg width="120" height="24" viewBox="0 0 120 24">
              <path
                d="M10 12 Q 30 0 60 12 Q 90 24 110 12"
                stroke="#c59b32"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <circle cx="60" cy="12" r="4" fill="#c59b32" />
              <circle cx="45" cy="12" r="2" fill="#c59b32" opacity="0.7" />
              <circle cx="75" cy="12" r="2" fill="#c59b32" opacity="0.7" />
            </svg>
          </div>

          {/* Bottom thin line */}
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c59b32] to-transparent opacity-50" />
          </div>
        </div>
      )}

      {/* Footer / Thank You Section */}
      <section
        className="relative min-h-screen flex items-center justify-center py-32 text-center px-6 overflow-hidden"
        style={{
          backgroundImage: "url('/images/karnika_weeding_theme.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Animated Falling Flowers removed as per request */}

        {/* Top gold border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c59b32] to-transparent" />

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 border border-[#c59b32] rounded-full" />
          <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#c59b32] rounded-full" />
        </div>

        <div className="relative max-w-2xl mx-auto pt-2">
          {/* Monogram */}
          <div className="mb-6">
                   <div className="flex flex-col items-center">
                <div className="text-[#d4af68] text-5xl font-serif tracking-widest">
                  K&nbsp;&nbsp;✦&nbsp;&nbsp;V
                </div>
                <div className="w-24 h-px bg-[#d4af68] mt-2 opacity-70" />
              </div>
          </div>

          {/* Thank You Heading */}
          <h2 className="text-4xl md:text-5xl font-serif text-[#2f4a3a] mb-6">
            Thank You
          </h2>

          {/* Message */}
          <p className="text-base md:text-lg text-[#5a5a5a] max-w-lg mx-auto leading-relaxed mb-3">
            Your presence will make our special day even more memorable.
          </p>

          {/* Blessing Text */}
          <p
            className="text-base md:text-lg text-[#c59b32] italic mb-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            With love and blessings from both families
          </p>

          {/* Contact Button */}
          <a
            href="tel:+918320027046"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#c59b32]/60 rounded-full text-[#c59b32] text-lg hover:bg-[#c59b32]/10 transition-colors mb-10"
          >
            <span className="text-xl">📞</span>
            <span>+91 83200 27046</span>
          </a>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-6 my-8">
            <div className="w-16 h-[1px] bg-[#c59b32]/50" />
            <div className="text-2xl text-[#c59b32]">✦</div>
            <div className="w-16 h-[1px] bg-[#c59b32]/50" />
          </div>
        </div>
      </section>
    </main>
  );
}
