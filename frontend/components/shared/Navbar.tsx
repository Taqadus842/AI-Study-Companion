import {
  BellIcon,
  MenuIcon,
  UserIcon,
} from "@/components/icons";

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Navbar({
  title,
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="navbar-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <MenuIcon size={20} />
        </button>

        <h1 className="navbar-title">
          {title}
        </h1>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="Notifications"
        >
          <BellIcon size={18} />
        </button>

        <button
          type="button"
          className="navbar-avatar"
          aria-label="User profile"
        >
          <UserIcon size={16} />
        </button>
      </div>
    </header>
  );
}