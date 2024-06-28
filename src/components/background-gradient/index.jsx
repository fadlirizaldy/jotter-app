import { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

const BackgroundGradient = ({ children, className }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.querySelector(".gradient-bg");
      if (element) {
        element.style.setProperty(
          "--tw-gradient-to",
          `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 1)`
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div className={`gradient-bg ${className}`}>{children}</div>;
};

BackgroundGradient.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default BackgroundGradient;
