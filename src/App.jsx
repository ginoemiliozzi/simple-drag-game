import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";
import styled from "@emotion/styled";
import DraggableBall from "./components/DraggableBall";
import {
  getRandomColor,
  isInside,
  wasOutsideBeforeDrag,
  colorsAvailable,
} from "./utils";

const App = () => {
  const [balls, setBalls] = useState([
    { elementN: 1, color: getRandomColor() },
  ]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [ballsInside, setBallsInside] = useState(
    colorsAvailable.map((color) => {
      return {
        color: color,
        balls: [],
        targetRef: React.createRef(),
      };
    })
  );

  useInterval(
    () => {
      setBalls(
        balls.concat({
          elementN: balls[balls.length - 1].elementN + 1,
          color: getRandomColor(),
        })
      );
      setTimer(timer - 1);
    },
    1050,
    30
  );

  useEffect(() => {
    if (timer < 1) alert("Your score is " + score);
  }, [timer]);

  const handleStop = (element) => (e, data) => {
    if (timer < 1) return;

    const colorData = ballsInside.find(d => d.color === element.color)
    if (isInside(colorData.targetRef, data)) {
      if (wasOutsideBeforeDrag(element, ballsInside)) {
        setScore(score + 1);
        setBallsInside(ballsInside.concat(element));
      }
    } else if (!wasOutsideBeforeDrag(element, ballsInside)) {
      setBallsInside(
        ballsInside.filter((ball) => ball.elementN !== element.elementN)
      );
      setScore(score - 1);
    }
  };

  return (
    <Container>
      <Title>Simple drag game</Title>
      <Subtitle>Remaining time: {timer}</Subtitle>
      <Subtitle>Score: {score}</Subtitle>
      <FlexContainer>
        {balls.map((b, idx) => (
          <DraggableBall onStop={handleStop(b)} key={idx} innerProps={b} />
        ))}
      </FlexContainer>
      <TargetsContainer>
        {colorsAvailable.map((color, idx) => (
          <CircleTarget
            key={color}
            color={color}
            ref={ballsInside.find(b => b.color === color).targetRef}
          />
        ))}
      </TargetsContainer>
    </Container>
  );
};

const Container = styled.div({
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
});

const FlexContainer = styled.div({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  height: 150,
});

const CircleTarget = styled.div((props) => ({
  marginTop: 30,
  height: 300,
  width: 300,
  border: "5px solid " + props.color,
  borderRadius: 260,
}));

const TargetsContainer = styled(FlexContainer)({
  justifyContent: "space-between",
});

const Title = styled.h1({
  fontFamily: "'Baloo Bhaina 2', cursive"
})

const Subtitle = styled.h3({
  fontFamily: "'Baloo Bhaina 2', cursive",
  margin: 0
})

export default App;
