import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Mic, 
  Users, 
  VolumeX, 
  FileText, 
  Play, 
  CheckCircle,
  ArrowRight,
  Lock,
  Hash,
  Globe,
  Server,
  Scale,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/dashboard/DashboardLayout'
import Overview from '@/dashboard/Overview'
import Dispatch from '@/dashboard/Dispatch'
import Transcripts from '@/dashboard/Transcripts'
import LitigationAI from '@/dashboard/LitigationAI'
import CaseCorpus from '@/dashboard/CaseCorpus'
import Dictionary from '@/dashboard/Dictionary'
import Payments from '@/dashboard/Payments'
import AuditTrail from '@/dashboard/AuditTrail'
import Team from '@/dashboard/Team'
import Settings from '@/dashboard/Settings'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

// Landing Page Component
function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [showDemoDialog, setShowDemoDialog] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const captureRef = useRef<HTMLDivElement>(null)
  const intelligenceRef = useRef<HTMLDivElement>(null)
  const verifyRef = useRef<HTMLDivElement>(null)
  const securityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.hero-bg', 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo('.hero-micro', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.8'
        )
        .fromTo('.hero-headline', 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
          '-=0.4'
        )
        .fromTo('.hero-subheadline', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.4'
        )
        .fromTo('.hero-cta', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.3'
        )
        .fromTo('.hero-card', 
          { x: '10vw', opacity: 0, scale: 0.98 }, 
          { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 
          '-=0.8'
        )

      // Hero scroll animation
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set('.hero-headline, .hero-subheadline, .hero-cta, .hero-card', { 
              opacity: 1, x: 0, y: 0 
            })
          }
        }
      })

      heroScrollTl
        .fromTo('.hero-bg', 
          { scale: 1 }, 
          { scale: 1.08, ease: 'none' }, 
          0
        )
        .fromTo('.hero-headline', 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo('.hero-subheadline', 
          { x: 0, opacity: 1 }, 
          { x: '-14vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo('.hero-cta', 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo('.hero-card', 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )

      // Section 2: Capture Engine
      const captureScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: captureRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      })

      captureScrollTl
        .fromTo('.capture-left', 
          { x: '-60vw' }, 
          { x: 0, ease: 'power2.out' }, 
          0
        )
        .fromTo('.capture-right', 
          { x: '45vw' }, 
          { x: 0, ease: 'power2.out' }, 
          0
        )
        .fromTo('.capture-headline', 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.1
        )
        .fromTo('.capture-body', 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.15
        )
        .fromTo('.capture-features', 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' }, 
          0.18
        )
        .fromTo('.capture-feed-card', 
          { y: '40vh', scale: 0.92, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out' }, 
          0.12
        )
        .to('.capture-left', 
          { x: '-20vw', opacity: 0.3, ease: 'power2.in' }, 
          0.7
        )
        .to('.capture-right', 
          { x: '20vw', opacity: 0.3, ease: 'power2.in' }, 
          0.7
        )
        .to('.capture-feed-card', 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        )

      // Section 3: Intelligence Core
      const intelligenceScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: intelligenceRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      })

      intelligenceScrollTl
        .fromTo('.intel-stack-card', 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo('.intel-headline', 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.05
        )
        .fromTo('.intel-body', 
          { y: '12vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.1
        )
        .fromTo('.intel-bullets', 
          { y: '8vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 
          0.15
        )
        .to('.intel-stack-card', 
          { x: '-22vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to('.intel-text-block', 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )

      // Section 4: Verify & Impeach
      const verifyScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: verifyRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      })

      verifyScrollTl
        .fromTo('.verify-text', 
          { x: '-50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo('.verify-card', 
          { x: '55vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0.05
        )
        .fromTo('.verify-line', 
          { y: 16, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' }, 
          0.15
        )
        .to('.verify-text', 
          { y: '-14vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to('.verify-card', 
          { y: '14vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )

      // Section 7: Security
      const securityScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: securityRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      })

      securityScrollTl
        .fromTo('.vault-card', 
          { scale: 0.82, y: '18vh', opacity: 0 }, 
          { scale: 1, y: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo('.vault-text', 
          { x: '-6vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.1
        )
        .fromTo('.vault-hash-row', 
          { x: '6vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 
          0.15
        )
        .to('.vault-card', 
          { scale: 0.92, opacity: 0, ease: 'power2.in' }, 
          0.7
        )

      // Flowing sections animations
      gsap.utils.toArray<HTMLElement>('.flowing-section').forEach((section) => {
        const heading = section.querySelector('.flow-heading')
        const content = section.querySelectorAll('.flow-content')
        
        if (heading) {
          gsap.fromTo(heading, 
            { y: 24, opacity: 0 }, 
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6,
              scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
        
        if (content.length) {
          gsap.fromTo(content, 
            { y: 40, opacity: 0, scale: 0.98 }, 
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              stagger: 0.1,
              duration: 0.6,
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

      // Global snap for pinned sections
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)
      
      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02)
            if (!inPinned) return value
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsNavOpen(false)
  }

  return (
    <div ref={mainRef} className="relative bg-ws-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[7vw] py-6 flex items-center justify-between bg-gradient-to-b from-ws-black/80 to-transparent">
        <div className="font-sora font-bold text-xl text-ws-text-primary tracking-tight">
          Wakili-Scribe
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('capture')} className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
            Product
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
            Pricing
          </button>
          <button onClick={() => scrollToSection('security')} className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
            Security
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
            Contact
          </button>
          <Button 
            onClick={() => setShowDemoDialog(true)}
            className="bg-ws-coral hover:bg-ws-coral/90 text-white text-sm font-medium px-5 py-2 rounded-full"
          >
            Request Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-ws-text-primary"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      {isNavOpen && (
        <div className="fixed inset-0 z-40 bg-ws-black/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => scrollToSection('capture')} className="text-2xl text-ws-text-primary">Product</button>
            <button onClick={() => scrollToSection('pricing')} className="text-2xl text-ws-text-primary">Pricing</button>
            <button onClick={() => scrollToSection('security')} className="text-2xl text-ws-text-primary">Security</button>
            <button onClick={() => scrollToSection('contact')} className="text-2xl text-ws-text-primary">Contact</button>
            <Button 
              onClick={() => { setShowDemoDialog(true); setIsNavOpen(false); }}
              className="bg-ws-coral hover:bg-ws-coral/90 text-white text-lg font-medium px-8 py-3 rounded-full mt-4"
            >
              Request Demo
            </Button>
          </div>
        </div>
      )}

      {/* Section 1: Hero - Shadow Record */}
      <section ref={heroRef} className="section-pinned z-10">
        <div className="hero-bg absolute inset-0 z-[1]">
          <img 
            src="/hero_courtroom_bench.jpg" 
            alt="Courtroom" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="vignette-overlay absolute inset-0 z-[2]" />
        <div className="grain-overlay absolute inset-0 z-[3]" />
        
        <div className="relative z-[5] h-full flex flex-col justify-center px-[7vw]">
          <div className="max-w-[46vw]">
            <p className="hero-micro mono-label text-ws-coral mb-4">WAKILI-SCRIBE v1.0</p>
            <h1 className="hero-headline heading-display text-[clamp(44px,6vw,84px)] text-ws-text-primary mb-6">
              Shadow Record
            </h1>
            <p className="hero-subheadline text-lg md:text-xl text-ws-text-secondary max-w-[34vw] mb-8 leading-relaxed">
              Capture virtual hearings without interference. Transcribe with Kenyan legal precision.
            </p>
            <div className="hero-cta flex items-center gap-4">
              <Button 
                onClick={() => setShowDemoDialog(true)}
                className="bg-ws-coral hover:bg-ws-coral/90 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2"
              >
                Request a Demo <ArrowRight size={18} />
              </Button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-ws-text-secondary hover:text-ws-text-primary transition-colors flex items-center gap-1"
              >
                View Pricing <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Capture Card */}
        <div className="hero-card absolute right-[6vw] top-[22vh] w-[34vw] h-[56vh] z-[6] rounded-2xl overflow-hidden shadow-card hidden lg:block">
          <img 
            src="/capture_feed_card.jpg" 
            alt="Courtroom Feed" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ws-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="mono-label text-ws-text-secondary text-[10px]">LIVE CAPTURE</span>
            </div>
            <p className="text-sm text-ws-text-primary font-medium">Virtual Court Session</p>
          </div>
        </div>
      </section>

      {/* Section 2: Capture Engine */}
      <section ref={captureRef} id="capture" className="section-pinned z-20">
        {/* Left Media Panel */}
        <div className="capture-left absolute left-0 top-0 w-[55vw] h-full z-[2] overflow-hidden">
          <img 
            src="/capture_laptop_closeup.jpg" 
            alt="Laptop Capture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ws-black/80" />
        </div>

        {/* Right Content Panel */}
        <div className="capture-right absolute right-0 top-0 w-[45vw] h-full z-[3] bg-ws-black flex flex-col justify-center px-[6vw]">
          <p className="capture-headline mono-label text-ws-coral mb-4">CAPTURE</p>
          <h2 className="capture-headline heading-2 text-[clamp(32px,3.5vw,56px)] text-ws-text-primary mb-6">
            Join silently.<br />Record cleanly.
          </h2>
          <p className="capture-body text-ws-text-secondary leading-relaxed mb-8 max-w-[30vw]">
            A headless browser enters as a branded observer—no notifications, no interference. 
            System audio is captured directly, not through a microphone.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="capture-features flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ws-coral/20 flex items-center justify-center">
                <Users size={16} className="text-ws-coral" />
              </div>
              <span className="text-ws-text-primary">5 concurrent rooms</span>
            </div>
            <div className="capture-features flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ws-coral/20 flex items-center justify-center">
                <Mic size={16} className="text-ws-coral" />
              </div>
              <span className="text-ws-text-primary">Direct system audio</span>
            </div>
            <div className="capture-features flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ws-coral/20 flex items-center justify-center">
                <VolumeX size={16} className="text-ws-coral" />
              </div>
              <span className="text-ws-text-primary">Zero platform alerts</span>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('workflow')}
            className="capture-features text-ws-coral hover:text-ws-coral/80 transition-colors flex items-center gap-1 text-sm"
          >
            See how it works <ArrowRight size={16} />
          </button>
        </div>

        {/* Floating Feed Card */}
        <div className="capture-feed-card absolute left-1/2 top-[54vh] -translate-x-1/2 w-[22vw] h-[30vh] z-[6] rounded-2xl overflow-hidden shadow-card hidden lg:block animate-float">
          <img 
            src="/capture_feed_card.jpg" 
            alt="Capture Feed" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ws-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <span className="mono-label text-[10px] text-ws-text-secondary">GHOST OBSERVER</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-green-500">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Intelligence Core */}
      <section ref={intelligenceRef} className="section-pinned z-30">
        <div className="absolute inset-0 z-[1]">
          <img 
            src="/intelligence_courtroom_wide.jpg" 
            alt="Courtroom" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="vignette-overlay absolute inset-0 z-[2]" />
        <div className="grain-overlay absolute inset-0 z-[3]" />

        {/* Left Stack Card */}
        <div className="intel-stack-card absolute left-[7vw] top-[18vh] w-[40vw] h-[64vh] z-[6] rounded-2xl card-glass p-6 hidden lg:block">
          <div className="space-y-4 h-full flex flex-col justify-center">
            <div className="bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-label text-ws-coral text-[10px]">ASR</span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
              <p className="text-sm text-ws-text-secondary">Faster-Whisper Turbo</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-ws-coral rounded-full" />
              </div>
            </div>
            
            <div className="bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-label text-ws-coral text-[10px]">DIARIZATION</span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
              <p className="text-sm text-ws-text-secondary">Pyannote 4.0</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-ws-coral rounded-full" />
              </div>
            </div>
            
            <div className="bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-label text-ws-coral text-[10px]">LEGAL LM</span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
              <p className="text-sm text-ws-text-secondary">Kenyan Legal Dictionary</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-ws-coral rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Text Block */}
        <div className="intel-text-block absolute right-[7vw] top-[22vh] w-[40vw] z-[5] lg:left-[54vw]">
          <h2 className="intel-headline heading-2 text-[clamp(32px,3.5vw,56px)] text-ws-text-primary mb-6">
            Built for how<br />Kenyans speak.
          </h2>
          <p className="intel-body text-ws-text-secondary leading-relaxed mb-8">
            Code-switching between English and Swahili is the norm in Kenyan courts. 
            Our pipeline keeps up—without missing legal terminology.
          </p>
          
          <div className="space-y-3">
            <div className="intel-bullets flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ws-coral" />
              <span className="text-ws-text-primary text-sm">Faster-Whisper Turbo (ASR)</span>
            </div>
            <div className="intel-bullets flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ws-coral" />
              <span className="text-ws-text-primary text-sm">Pyannote 4.0 (diarization)</span>
            </div>
            <div className="intel-bullets flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ws-coral" />
              <span className="text-ws-text-primary text-sm">Custom legal vocabulary</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Verify & Impeach */}
      <section ref={verifyRef} className="section-pinned z-40">
        <div className="absolute inset-0 z-[1]">
          <img 
            src="/verify_transcript_card.jpg" 
            alt="Judge" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="vignette-overlay absolute inset-0 z-[2]" />
        <div className="grain-overlay absolute inset-0 z-[3]" />

        {/* Left Text */}
        <div className="verify-text absolute left-[7vw] top-[18vh] w-[40vw] z-[5]">
          <h2 className="heading-2 text-[clamp(32px,3.5vw,56px)] text-ws-text-primary mb-6">
            Click a word.<br />Hear the truth.
          </h2>
          <p className="text-ws-text-secondary leading-relaxed mb-8">
            Every line is anchored to the original audio. Jump to any moment instantly—
            no scrubbing through recordings.
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <Play size={16} className="text-ws-coral" />
              <span className="text-ws-text-primary text-sm">Audio-synced transcript</span>
            </div>
            <div className="flex items-center gap-3">
              <Scale size={16} className="text-ws-coral" />
              <span className="text-ws-text-primary text-sm">Contradiction highlighting</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-ws-coral" />
              <span className="text-ws-text-primary text-sm">Export-ready PDF</span>
            </div>
          </div>

          <button className="text-ws-coral hover:text-ws-coral/80 transition-colors flex items-center gap-1 text-sm">
            Explore the viewer <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Verification Card */}
        <div className="verify-card absolute right-[6vw] top-[16vh] w-[42vw] h-[68vh] z-[6] rounded-2xl card-glass p-6 hidden lg:flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="mono-label text-ws-coral text-[10px]">TRANSCRIPT</span>
            <span className="text-[10px] text-ws-text-secondary">LIVE</span>
          </div>
          
          <div className="flex-1 overflow-hidden space-y-3">
            <div className="verify-line bg-ws-black/40 rounded-lg p-3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-ws-coral font-mono">JUDGE</span>
                <span className="text-[10px] text-ws-text-secondary">00:12:34</span>
              </div>
              <p className="text-sm text-ws-text-primary">Calling Case Number E123 of 2024...</p>
            </div>
            
            <div className="verify-line bg-ws-black/40 rounded-lg p-3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-blue-400 font-mono">COUNSEL</span>
                <span className="text-[10px] text-ws-text-secondary">00:12:45</span>
              </div>
              <p className="text-sm text-ws-text-primary">May it please Your Honor, I appear for the plaintiff...</p>
            </div>
            
            <div className="verify-line bg-ws-black/40 rounded-lg p-3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-green-400 font-mono">WITNESS</span>
                <span className="text-[10px] text-ws-text-secondary">00:13:02</span>
              </div>
              <p className="text-sm text-ws-text-primary">I was present at the meeting on the 15th...</p>
            </div>
            
            <div className="verify-line bg-ws-black/40 rounded-lg p-3 border border-ws-coral/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-ws-coral font-mono">FLAGGED</span>
                <span className="text-[10px] text-ws-text-secondary">00:13:28</span>
              </div>
              <p className="text-sm text-ws-text-primary">
                <span className="bg-ws-coral/20 px-1">The contract was signed on January 10th</span>
              </p>
              <p className="text-[10px] text-ws-coral mt-1">Contradicts affidavit: Witness stated January 12th</p>
            </div>
          </div>

          {/* Audio Player Bar */}
          <div className="mt-4 bg-ws-black/60 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-3">
              <Play size={16} className="text-ws-coral" />
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-ws-coral rounded-full animate-progress" />
              </div>
              <span className="text-[10px] text-ws-text-secondary font-mono">00:13:28</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Built for Kenyan Courts */}
      <section className="flowing-section relative z-50 bg-ws-black py-20 lg:py-28">
        <div className="px-[7vw]">
          <div className="flow-heading max-w-[52vw] mb-12">
            <h2 className="heading-2 text-[clamp(28px,3vw,48px)] text-ws-text-primary mb-4">
              Local language. Local infrastructure.
            </h2>
            <p className="text-ws-text-secondary leading-relaxed">
              Hosted in-region. Tuned for Kenyan legal terminology. Built to align with 
              the Evidence Act and data protection requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flow-content card-glass rounded-2xl p-6">
              <Globe size={28} className="text-ws-coral mb-4" />
              <h3 className="text-lg font-semibold text-ws-text-primary mb-2">
                English ↔ Swahili
              </h3>
              <p className="text-sm text-ws-text-secondary leading-relaxed">
                Handles mixed-language testimony in real time with contextual understanding.
              </p>
            </div>

            <div className="flow-content card-glass rounded-2xl p-6">
              <Server size={28} className="text-ws-coral mb-4" />
              <h3 className="text-lg font-semibold text-ws-text-primary mb-2">
                Sovereign Cloud
              </h3>
              <p className="text-sm text-ws-text-secondary leading-relaxed">
                Data stays within jurisdiction by default. Full compliance with local regulations.
              </p>
            </div>

            <div className="flow-content card-glass rounded-2xl p-6">
              <Scale size={28} className="text-ws-coral mb-4" />
              <h3 className="text-lg font-semibold text-ws-text-primary mb-2">
                Evidence Act Ready
              </h3>
              <p className="text-sm text-ws-text-secondary leading-relaxed">
                Immutable hashes, audit trails, access logs. Built for legal admissibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing" className="flowing-section relative z-50 bg-ws-white py-20 lg:py-28">
        <div className="px-[7vw]">
          <div className="flow-heading text-center mb-12">
            <h2 className="heading-2 text-[clamp(28px,3vw,48px)] text-ws-black mb-4">
              Pay for what you use. Scale when you need.
            </h2>
            <p className="text-ws-black/60 max-w-2xl mx-auto">
              Start with per-session transcripts. Upgrade when you're running multiple courts a day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Standard */}
            <div className="flow-content card-light rounded-2xl p-6">
              <p className="mono-label text-ws-black/50 mb-2">STANDARD PDF</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-ws-black">KES 500</span>
                <span className="text-sm text-ws-black/50">/transcript</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Clean verbatim text
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Speaker labels
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Timestamps
                </li>
              </ul>
              <Button variant="outline" className="w-full border-ws-black text-ws-black hover:bg-ws-black hover:text-white">
                Buy Standard
              </Button>
            </div>

            {/* Intelligence */}
            <div className="flow-content card-light rounded-2xl p-6 border-t-4 border-ws-coral relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ws-coral text-white text-[10px] font-mono px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <p className="mono-label text-ws-black/50 mb-2">INTELLIGENCE</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-ws-black">KES 1,000</span>
                <span className="text-sm text-ws-black/50">/session</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Everything in Standard
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Contradiction report
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Cross-exam prompts
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Audio links
                </li>
              </ul>
              <Button className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white">
                Buy Intelligence
              </Button>
            </div>

            {/* Firm Retainer */}
            <div className="flow-content card-light rounded-2xl p-6">
              <p className="mono-label text-ws-black/50 mb-2">FIRM RETAINER</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-ws-black">Custom</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Unlimited sessions
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Priority processing
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Dedicated support
                </li>
                <li className="flex items-center gap-2 text-sm text-ws-black/80">
                  <CheckCircle size={16} className="text-green-600" /> Custom dictionary
                </li>
              </ul>
              <Button variant="outline" className="w-full border-ws-black text-ws-black hover:bg-ws-black hover:text-white">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Security */}
      <section ref={securityRef} id="security" className="section-pinned z-[60]">
        <div className="absolute inset-0 z-[1]">
          <img 
            src="/security_vault_background.jpg" 
            alt="Security" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="vignette-overlay absolute inset-0 z-[2]" />
        <div className="grain-overlay absolute inset-0 z-[3]" />

        {/* Vault Card */}
        <div className="vault-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[1100px] h-[62vh] z-[6] rounded-2xl card-glass p-8 flex flex-col lg:flex-row gap-8">
          {/* Left Text */}
          <div className="vault-text flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={20} className="text-ws-coral" />
              <span className="mono-label text-ws-coral">SOVEREIGN VAULT</span>
            </div>
            <h2 className="heading-2 text-[clamp(28px,2.5vw,44px)] text-ws-text-primary mb-4">
              Your data never leaves.
            </h2>
            <p className="text-ws-text-secondary leading-relaxed mb-6">
              Audio never leaves the secure environment. Access is logged. 
              Exports are hashed. Compliance is built in.
            </p>
            <button className="text-ws-coral hover:text-ws-coral/80 transition-colors flex items-center gap-1 text-sm w-fit">
              Read the security brief <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Hash List */}
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <div className="vault-hash-row bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Hash size={14} className="text-ws-coral" />
                <span className="mono-label text-[10px] text-ws-text-secondary">SEGMENT HASH</span>
              </div>
              <p className="font-mono text-xs text-ws-text-primary break-all">
                a3f7c2d8e9b1...<span className="text-ws-coral">5f2a</span>
              </p>
            </div>

            <div className="vault-hash-row bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Hash size={14} className="text-ws-coral" />
                <span className="mono-label text-[10px] text-ws-text-secondary">TRANSCRIPT HASH</span>
              </div>
              <p className="font-mono text-xs text-ws-text-primary break-all">
                7e8d9f2a1b4c...<span className="text-ws-coral">8d3e</span>
              </p>
            </div>

            <div className="vault-hash-row bg-ws-black/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Hash size={14} className="text-ws-coral" />
                <span className="mono-label text-[10px] text-ws-text-secondary">EXPORT HASH</span>
              </div>
              <p className="font-mono text-xs text-ws-text-primary break-all">
                2c5d6e7f8a9b...<span className="text-ws-coral">1c7f</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Workflow */}
      <section id="workflow" className="flowing-section relative z-[70] bg-ws-black py-20 lg:py-28">
        <div className="px-[7vw]">
          <div className="flow-heading mb-12">
            <h2 className="heading-2 text-[clamp(28px,3vw,48px)] text-ws-text-primary mb-4">
              From link to transcript—fast.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flow-content card-glass rounded-2xl p-6">
              <span className="text-ws-coral font-mono text-2xl font-bold">01</span>
              <h3 className="text-lg font-semibold text-ws-text-primary mt-3 mb-2">Dispatch</h3>
              <p className="text-sm text-ws-text-secondary">Paste up to 5 meeting links. Our workers join instantly.</p>
            </div>

            <div className="flow-content card-glass rounded-2xl p-6">
              <span className="text-ws-coral font-mono text-2xl font-bold">02</span>
              <h3 className="text-lg font-semibold text-ws-text-primary mt-3 mb-2">Capture</h3>
              <p className="text-sm text-ws-text-secondary">Headless join + direct system audio capture.</p>
            </div>

            <div className="flow-content card-glass rounded-2xl p-6">
              <span className="text-ws-coral font-mono text-2xl font-bold">03</span>
              <h3 className="text-lg font-semibold text-ws-text-primary mt-3 mb-2">Review</h3>
              <p className="text-sm text-ws-text-secondary">Audio-synced editing with AI-assisted corrections.</p>
            </div>

            <div className="flow-content card-glass rounded-2xl p-6">
              <span className="text-ws-coral font-mono text-2xl font-bold">04</span>
              <h3 className="text-lg font-semibold text-ws-text-primary mt-3 mb-2">Export</h3>
              <p className="text-sm text-ws-text-secondary">PDF, timestamps, and verification hashes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Contact */}
      <section id="contact" className="flowing-section relative z-[80] bg-ws-black py-20 lg:py-28">
        <div className="px-[7vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Form */}
            <div className="flow-heading">
              <h2 className="heading-2 text-[clamp(28px,3vw,48px)] text-ws-text-primary mb-4">
                Get early access.
              </h2>
              <p className="text-ws-text-secondary leading-relaxed mb-8">
                We're onboarding a limited number of firms. Tell us what you're building 
                and we'll set up a secure pilot.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Name" 
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
                  />
                  <Input 
                    placeholder="Firm / Organization" 
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
                  />
                </div>
                <Input 
                  placeholder="Email" 
                  type="email"
                  className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
                />
                <Textarea 
                  placeholder="Message" 
                  rows={4}
                  className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary resize-none"
                />
                <Button 
                  onClick={() => setShowDemoDialog(true)}
                  className="bg-ws-coral hover:bg-ws-coral/90 text-white font-medium px-6 py-3 rounded-full"
                >
                  Request a Demo
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-ws-text-secondary">hello@wakiliscribe.co.ke</p>
                <p className="text-sm text-ws-text-secondary">+254 700 000 000</p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flow-content hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img 
                  src="/contact_courtroom_scene.jpg" 
                  alt="Courtroom" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-[80] bg-ws-black border-t border-white/10 py-8 px-[7vw]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-sora font-bold text-lg text-ws-text-primary">
            Wakili-Scribe
          </div>
          <p className="text-sm text-ws-text-secondary">
            © 2024 Wakili-Scribe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
              Privacy
            </button>
            <button className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
              Terms
            </button>
            <button className="text-sm text-ws-text-secondary hover:text-ws-text-primary transition-colors">
              Security
            </button>
          </div>
        </div>
      </footer>

      {/* Demo Dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora font-bold">Request a Demo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input 
              placeholder="Name" 
              className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
            />
            <Input 
              placeholder="Email" 
              type="email"
              className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
            />
            <Input 
              placeholder="Law Firm / Organization" 
              className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary"
            />
            <Textarea 
              placeholder="Tell us about your needs..." 
              rows={3}
              className="bg-ws-black/50 border-white/10 text-ws-text-primary placeholder:text-ws-text-secondary resize-none"
            />
            <Button 
              onClick={() => setShowDemoDialog(false)}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Main App with Router
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Overview />} />
            <Route path="dispatch" element={<Dispatch />} />
            <Route path="transcripts" element={<Transcripts />} />
            <Route path="litigation" element={<LitigationAI />} />
            <Route path="corpus" element={<CaseCorpus />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="payments" element={<Payments />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="team" element={<Team />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
