import { useRef, useEffect, useCallback } from 'react'
import { CinematicHero } from '../components/CinematicHero'
import { Navbar } from '../components/navbar'
import { ThreeScene } from '../components/ThreeScene'
import { SecondaryContent } from '../components/SecondaryContent'
import { CTASection } from '../components/CTASection'
import { BentoGrid } from '../components/BentoGrid'
import { useAnimationTimeline } from '../hooks/useAnimationTimeline'
import type { CameraModelHandle } from '../components/CameraModel'

export default function CMRPage() {
  const navRef = useRef<HTMLDivElement>(null!)
  const heroTextRef = useRef<HTMLHeadingElement>(null!)
  const videoContainerRef = useRef<HTMLDivElement>(null!)
  const threeContainerRef = useRef<HTMLDivElement>(null!)
  const secondaryTitleRef = useRef<HTMLDivElement>(null!)
  const descriptionRef = useRef<HTMLParagraphElement>(null!)
  const ctaLeftRef = useRef<HTMLDivElement>(null!)
  const ctaRightRef = useRef<HTMLDivElement>(null!)
  const bentoRef = useRef<HTMLDivElement>(null!)
  const bentoCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const cameraHandleRef = useRef<CameraModelHandle | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null!)

  const animationRefs = {
    nav: navRef,
    heroText: heroTextRef,
    videoContainer: videoContainerRef,
    threeContainer: threeContainerRef,
    secondaryTitle: secondaryTitleRef,
    description: descriptionRef,
    ctaLeft: ctaLeftRef,
    ctaRight: ctaRightRef,
    bentoGrid: bentoRef,
    bentoCards: bentoCardsRef,
  }

  useAnimationTimeline(animationRefs)

  // Set video playback speed to 0.85x
  useEffect(() => {
    const vid = document.querySelector('video')
    if (vid) {
      vid.playbackRate = 0.85
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container"
      style={{
        position: 'relative',
        background: '#0D0F12',
        overflow: 'visible',
        height: '500vh',
      }}
    >
      {/* Phase 1: Video Background */}
      <CinematicHero ref={videoContainerRef} />

      {/* Hero title */}
      <h1
        ref={heroTextRef}
        className="fixed"
        style={{
          zIndex: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '0.06em',
          textAlign: 'center',
          fontFamily: "'Inter', system-ui, sans-serif",
          textTransform: 'uppercase',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        REV PRODUCTIONS
      </h1>

      {/* Navigation */}
      <Navbar ref={navRef} />

      {/* Three.js Scene */}
      <ThreeScene onCameraReady={(handle) => { cameraHandleRef.current = handle }} />

      {/* Secondary Content */}
      <SecondaryContent titleRef={secondaryTitleRef} descriptionRef={descriptionRef} />

      {/* CTA Buttons */}
      <CTASection ctaLeftRef={ctaLeftRef} ctaRightRef={ctaRightRef} />

      {/* Bento Grid */}
      <BentoGrid bentoRef={bentoRef} cardRefs={bentoCardsRef} />
    </div>
  )
}
