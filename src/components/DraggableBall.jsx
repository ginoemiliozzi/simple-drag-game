import React from "react";
import styled from "@emotion/styled";
import Draggable from "react-draggable";

const DraggableBall = ({ onStop, innerProps }) => {
  return (
    <Draggable onStop={onStop}>
      <Ball {...innerProps} />
    </Draggable>
  );
};

const Ball = styled.div((props) => ({
  height: 70,
  width: 70,
  backgroundColor: props.color,
  borderRadius: 50,
  cursor: "pointer",
  border: "1px solid black",
}));

export default DraggableBall;
