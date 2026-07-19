export default function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-white/30">
      made by{' '}
      <button
        onClick={() => window.anisav.openExternal('https://im.savsis.xyz')}
        className="text-white/50 hover:text-white/80"
      >
        im.savsis.xyz
      </button>{' '}
      with <span className="text-accent">♥</span>
    </footer>
  )
}
