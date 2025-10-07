import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import LevelButtons from "./levelbuttons";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

function Translate() {


    function GrammarScreen() {

        function LevelSelect() {

            const [level, setLevel] = useState('n1');

                const handleChange = (event) => {
                    setLevel((event.target).value);
                };

            return (
                <Stack 
                    direction="column"
                      sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                    <h2>Level select</h2>
                    <h4>{level}</h4>
                    
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="level-select-radio-buttons"
                            defaultValue="n1"
                            name="radio-buttons-group"
                            value={level}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="n1" control={<Radio />} label="N1" labelPlacement="bottom"/>
                            <FormControlLabel value="n2" control={<Radio />} label="N2" labelPlacement="bottom"/>
                            <FormControlLabel value="n3" control={<Radio />} label="N3" labelPlacement="bottom"/>
                            <FormControlLabel value="n4" control={<Radio />} label="N4" labelPlacement="bottom"/>
                            <FormControlLabel value="n5" control={<Radio />} label="N5" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>
            );
        }

        return (
            <Stack direction="column">
                <LevelSelect></LevelSelect>
            </Stack>
        );
    }

  return (
    <Stack direction="row" spacing={2}>
        <GrammarScreen></GrammarScreen>
    </Stack>

  );


}

export default Translate;