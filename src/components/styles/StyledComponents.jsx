import React from 'react';
import { keyframes, Skeleton, styled } from '@mui/material';
import { Link as LinkComponent } from 'react-router-dom';
import { grayColor, matBlack } from '../../constants/color';

const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled('input')`
  width: 100%;
  height: 6vh;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;

const SearchField = styled('input')`
  width: 20vmax;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;

const CurveButton = styled('button')`
  border: none;
  outline: none;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  background-color: ${matBlack};
  cursor: pointer;
  color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
  }
    50% {
    transform: scale(1.5);
  }
    100% {
    transform: scale(1);
  }`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} is infinite`,
}));

export {
  VisuallyHiddenInput,
  Link,
  InputBox,
  SearchField,
  CurveButton,
  BouncingSkeleton,
};
