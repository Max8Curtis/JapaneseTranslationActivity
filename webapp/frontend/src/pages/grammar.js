import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import styled from 'styled-components';
import { List } from "@mui/icons-material";

const Header = styled.h3`
  color: #231b1bff;
  font-size: 20px;
`;

const InfoContainer = styled.div`
  margin-left: 50px;
  height: 200px;
`;

const Info = styled.div`
  width: 30%;
  float: left;
  vertical-align: middle;

  &:not(:last-child) {
    margin-bottom: 0px;
  }
;`

const Description = styled.div`
  width: 70%;
  font-size: 16px;
  float: left;
  vertical-align: middle;
`;

function Grammar({ grammarPoint, grammarPointTranslation, grammarPointDescription }) {

  const [descriptionText, setDescriptionText] = useState('');
  const [grammarText, setGrammarText] = useState('');

  useEffect(() => {
    if (grammarPointDescription) {
      setDescriptionText(grammarPointDescription);
    }
  }, [grammarPointDescription]);

  useEffect(() => {
    if (grammarPoint) {
      setGrammarText(grammarPoint);
    }
  }, [grammarPoint]);

    return (
        <div id="grammar-section-container">
            <h2>Grammar Notes</h2>
            <InfoContainer>
                <Info>
                    
                    <Header>{grammarPointTranslation}</Header>
                    <div style={{ height: 80 }}></div>
                    <Header>
                      {grammarText ? (
                        <Header dangerouslySetInnerHTML={{ __html: grammarText }} />
                      ) : (
                        <Header>--</Header>
                      )}
                    </Header>
                </Info>
                <Description>
                    <Header>Description</Header>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ante ut risus laoreet sollicitudin ac id ipsum. Proin suscipit iaculis lacus ac bibendum. Aenean at posuere turpis, nec elementum ante. Suspendisse et viverra mauris. Duis placerat tortor velit, quis euismod turpis consequat scelerisque. Ut vehicula libero id ultricies hendrerit. Aenean semper, orci non sollicitudin dignissim, augue magna interdum elit, quis congue nulla est in tellus. Praesent non interdum diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a condimentum felis. Nulla vitae risus eget dui gravida eleifend. Curabitur at ipsum libero. Nulla erat ex, sagittis at nibh id, placerat feugiat nisi. In efficitur ipsum nibh, eu aliquam diam facilisis ut. Donec in commodo nisl.</p> */}
                    {descriptionText ? (
                      <p dangerouslySetInnerHTML={{ __html: descriptionText }} />
                    ) : (
                      <p>Select a grammar point!</p>
                    )}
                    
                </Description>
            </InfoContainer>
        </div>
    );
}

export default Grammar;