'use client'

export default function Hero() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      {/* Embedded Endless Tools */}
      <iframe
        className="embed-fullscreen"
        src="https://app.endlesstools.io/embed/1fe2b2d9-18ac-48f7-8172-b9353f49dc94"
        title="Endless Tools Editor"
        frameBorder="0"
        allow="clipboard-write; encrypted-media; gyroscope; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 flex flex-col items-center">
        <h1
          className="text-5xl font-light tracking-tight text-center mb-4"
          style={{ fontFamily: "'Brown Light', system-ui" }}
        >
          POWERHOUSE LAB
        </h1>
        <p
          className="text-lg font-light text-center max-w-2xl opacity-80"
          style={{ fontFamily: "'Brown Light', system-ui" }}
        >
          Where innovation meets vision. Pushing the boundaries of creativity.
        </p>
      </div>

      {/* Bottom Call to Action */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <p
          className="text-sm font-light"
          style={{ fontFamily: "'Brown Light', system-ui" }}
        >
          Explore our creative possibilities
        </p>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  )
}
