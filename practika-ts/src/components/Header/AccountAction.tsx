import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function AccountAction() {
  const { isAuth, user, logout } = useAuth();
  const navigate = useNavigate();

  if (isAuth && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-slate-600 sm:inline">
          {user.name}
        </span>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      Войти
    </Link>
  );
}

export default AccountAction;