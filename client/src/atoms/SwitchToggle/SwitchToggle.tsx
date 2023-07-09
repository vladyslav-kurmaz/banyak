import { FC } from "react"

import './SwitchToggle.scss';

const SwitchToogle: FC = () => {
  return (
    <div className="switch-toggle">
      <span className="switch-toggle__button active" data-lang='ua'>УКР</span>
      <span className="switch-toggle__button" data-lang='end'>ENG</span>
    </div>
  );
}

export default SwitchToogle;