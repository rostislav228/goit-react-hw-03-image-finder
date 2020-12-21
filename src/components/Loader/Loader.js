import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoaderSection() {
  return (
    <div>
      <Loader
        className={s.Loader}
        type="BallTriangle"
        color="#00BFFF"
        height={40}
        width={40}
      />
    </div>
  );
}

export default LoaderSection;
