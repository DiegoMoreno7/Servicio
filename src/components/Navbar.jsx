import { Link } from "react-router-dom";
import { Home, UserX  } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar bg-gray px-6">
      <div className="flex-1">
      </div>
      <div className="flex gap-4">
        <Link className="btn btn-ghost btn-sm" to="/dashboard">
          <Home className="w-4 h-4" />
          Inicio
        </Link>
        <Link className="btn btn-ghost btn-sm" to="/auth">
          <UserX className="w-4 h-4" />
          Salir
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
