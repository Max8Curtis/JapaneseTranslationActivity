import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import styled from 'styled-components';

const Header = styled.h3`
  color: purple;
  font-size: 2rem;
`;

export async function getGrammarPointInfo() {
    const res = await fetch("http://127.0.0.1:8000/grammar");
    const data = await res.json();
    console.log(data)
    return data;
}

function Grammar() {

    const [grammarPoint, setGrammarPoint] = useState('');
    const [grammarPointTranslation, setGrammarPointTranslation] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getGrammarPointInfo();
                setGrammarPoint(result.grammarPointJp);
                setGrammarPointTranslation(result.grammarPointEn);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    }, []);


    return (
        <div id="grammar-section-container">
            <h2>Grammar Notes</h2>
            <div>
                <div id="grammar-point-translation">
                    <Header>{grammarPoint}</Header>
                    <Header>{grammarPointTranslation}</Header>
                </div>
            </div>
        </div>
    );
}

export default Grammar;