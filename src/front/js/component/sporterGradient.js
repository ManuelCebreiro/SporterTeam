import React from "react";

import styled, { keyframes } from "styled-components";

const thingAnim = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
`;

const Thing = styled.div`
  background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    )
    0% 0% / 400%;
  animation: ${thingAnim} 60s linear infinite;
  border-radius: 15px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const boxAnimation = keyframes`
  0% {background-position:0% 50%;}
  50% {background-position:100% 50%;}
  100% {background-position:0% 50%;}
`;

const GradientBox = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  position: relative;
  padding: 2rem;
  box-sizing: border-box;

  background-clip: padding-box;
  border: solid 1px transparent;
  border-radius: 1rem;
  &:before {
    animation: ${boxAnimation} 20s ease infinite;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -1px;
    background-color: #ff1493;
    background: linear-gradient(
      124deg,
      #ff2400,
      #e81d1d,
      #e8b71d,
      #e3e81d,
      #1de840,
      #1ddde8,
      #2b1de8,
      #dd00f3,
      #dd00f3
    );
    background-size: 200% 200%;
    border-radius: 1rem;
  }
`;

const StyledA = styled.a`
  background-image: linear-gradient(
    90deg,
    rgba(251, 89, 74, 1) 0%,
    rgba(251, 222, 75, 1) 25%,
    rgba(112, 228, 112, 1) 50%,
    rgba(51, 183, 255, 1) 75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.46);
  display: inline-block;
  &:hover {
    -webkit-text-fill-color: rgba(255, 255, 255, 0.1);
  }
`;

export default function SporterGradient() {
  return (
    <GradientBox>
      <Thing>
        <h1>Run, Jump, Sporter..</h1>
      </Thing>
    </GradientBox>
  );
}
