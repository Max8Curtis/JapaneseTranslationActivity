import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import LevelButtons from "../levelbuttons";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grammar from './grammar';
import styled from 'styled-components';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import { styled as styledMUI } from '@mui/material/styles';

const LevelLabel = styled.h3`
  font-size: 20px;
`;

const StyledToggleButtonGroup = styledMUI(ToggleButtonGroup)(({ theme }) => ({
  gap: '2rem',
  width: 40,
  height: 60,
  
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
}));

// export async function getGrammarPointInfo() {
//     fetch("http://127.0.0.1:8000/grammar",
//     {
//         method: "POST",
//         body: JSON
//         .stringify
//         ({
//           level: 1
//         }),
//         headers: {
//           "Content-type": "application/json",
//         },
//       })
//       .then((response) => response.json())
//       .then((json) => console.log(json))
//       .then((json) => setGrammarPointInfo(json));    
// }


function Translate() {

    const [level, setLevel] = useState('n1');
    const [grammarPoint, setGrammarPoint] = useState('');
    const [grammarPointTranslation, setGrammarPointTranslation] = useState('');
    const [grammarPointDescription, setGrammarPointDescription] = useState('');

    const handleChange = (event, newLevel) => {
        setLevel(newLevel);
    };

    async function setString(arr, func) {
      console.log(arr);
      var string = '';
      for (let i = 0; i < arr.length; i++) {
        if (arr.at(i).at(2) == null) {
          string += arr.at(i).at(0);
        } else {
          string += arr.at(i).at(2);
        }
      }
      func(string);
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await fetch("http://127.0.0.1:8000/grammar",
              {
                  method: "POST",
                  body: JSON
                  .stringify
                  ({
                    level: level
                  }),
                  headers: {
                    "Content-type": "application/json",
                  },
                });
              const data = await res.json();
              console.log(data)
              setString(data.grammar_jp, setGrammarPoint);
              setGrammarPointTranslation(data.grammar_en);
              setString(data.description, setGrammarPointDescription);
              // setGrammarPointDescription(data.description)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    }, [level]);

    return (
        <div>
            <h2>Level select</h2>
            <StyledToggleButtonGroup
                value={level}
                exclusive
                onChange={handleChange}
                aria-label="level select"
                >
                <ToggleButton value="n1" aria-label="justified">
                    <LevelLabel>N1</LevelLabel>
                </ToggleButton>
                <ToggleButton value="n2" aria-label="justified">
                    <LevelLabel>N2</LevelLabel>
                </ToggleButton>
                <ToggleButton value="n3" aria-label="justified">
                    <LevelLabel>N3</LevelLabel>
                </ToggleButton>
                <ToggleButton value="n4" aria-label="justified">
                    <LevelLabel>N4</LevelLabel>
                </ToggleButton>
                <ToggleButton value="n5" aria-label="justified">
                    <LevelLabel>N5</LevelLabel>
                </ToggleButton>
            </StyledToggleButtonGroup>
            
            <Grammar grammarPoint={grammarPoint} grammarPointTranslation={grammarPointTranslation} grammarPointDescription={grammarPointDescription}></Grammar>
        </div>
    );
        
}

export default Translate;