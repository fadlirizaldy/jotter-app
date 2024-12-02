import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/themeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, handleToggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Success Logout");
    navigate("/login");
  };

  return (
    <div className="h-14 flex items-center justify-between py-2 px-5 dark:text-white dark:bg-dark-bg-primary">
      <h1
        className="text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Jotter
      </h1>
      <div className="dark:text-white flex items-center gap-4">
        {theme === "light" ? (
          <div className="tooltip tooltip-bottom" data-tip="Dark">
            <Icon
              icon="ph:moon-fill"
              className={"cursor-pointer "}
              width={24}
              onClick={handleToggleTheme}
            />
          </div>
        ) : (
          <div className="tooltip tooltip-bottom" data-tip="Light">
            <Icon
              icon="ph:sun-fill"
              className={"cursor-pointer "}
              width={24}
              onClick={handleToggleTheme}
            />
          </div>
        )}

        <div className="tooltip tooltip-bottom" data-tip="Logout">
          <Icon
            icon="mdi:shutdown"
            width={24}
            className="cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
