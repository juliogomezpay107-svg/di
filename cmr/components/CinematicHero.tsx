import { forwardRef } from 'react'

export const CinematicHero = forwardRef<HTMLDivElement>(function CinematicHero(_, ref) {
  return (
    <div
      ref={ref}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background gradient animation simulating the dolly shot */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #e94560 70%, #533483 100%)
            `,
            backgroundSize: '200% 200%',
            animation: 'dollyPan 20s ease-in-out infinite alternate',
          }}
        />
        {/* Subtle architectural silhouette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 40px,
                rgba(0, 0, 0, 0.03) 40px,
                rgba(0, 0, 0, 0.03) 42px
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 40px,
                rgba(0, 0, 0, 0.02) 40px,
                rgba(0, 0, 0, 0.02) 42px
              )
            `,
          }}
        />
        {/* Atmospheric overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(13,15,18,0.3) 0%, rgba(13,15,18,0.7) 100%)',
          }}
        />
        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)',
          }}
        />
      </div>
      <style>{`
        @keyframes dollyPan {
          0% { background-position: 0% 0%; transform: scale(1); }
          100% { background-position: 100% 50%; transform: scale(1.02); }
        }
      `}</style>
    </div>
  )
})
