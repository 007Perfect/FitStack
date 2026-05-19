import './Navbar.css'

export default function Navbar({ onMenuToggle, title }) {
  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <h2 className="navbar-title">{title}</h2>
    </header>
  )
}
