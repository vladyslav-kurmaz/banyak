import { FC } from "react";
import { useAppDispatch } from "../../hooks/reduxToolkidHooks";

import MainSlider from "../../components/MainSlider/MainSlider";
const MainPage: FC = () => {
  return (
    <main className="main">
      <MainSlider />
    </main>
  );
};

export default MainPage;
