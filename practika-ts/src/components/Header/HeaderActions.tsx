import Search from "./Search";
import AccountAction from "./AccountAction";
import CartAction from "./CartAction";

function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <Search />
      <AccountAction />
      <CartAction />
    </div>
  );
}

export default HeaderActions;
