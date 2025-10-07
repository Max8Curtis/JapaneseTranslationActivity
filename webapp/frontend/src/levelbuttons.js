import React, { useState } from "react";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function LevelButtons() {
    const [activeButton, setActiveButton] = useState(0);

    const levels = ['N1', 'N2', 'N3', 'N4', 'N5']
    const [active, setActive] = useState(true);

    // const toggle = () => {
    //   setSelected(!selected)
    // }

    return (
          <div id="levelselect">
        {levels.map((level, index) => 
          <div className={`level ${activeButton === index ? 'active' : ''}`}>
            {level.text}
            <button label={activeButton === index ? 'ACTIVE' : 'inactive'} onClick={() => setActiveButton(index)}>
              {activeButton ? "ACTIVE" : "inactive"}
            </button>
          </div>
        )}
        </div>
    );
}

export default LevelButtons;