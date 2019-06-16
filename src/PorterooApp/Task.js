import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {btn} from '../Reusable/buttons.js';
import {nhsColors} from '../Reusable/colors.js';
import { getDeadline } from "../utils/getDeadline";

const TypeHeading = styled("header")`
  text-decoration: underline;
  text-align: center;
  font-weight: 700;
  padding: 1rem 2rem .5rem 2rem;
`;

const Card = styled("section")`
  background-color: lightgray;
  padding-top: 10px;
  width: 100%;
`;

const TravelInfo = styled("div")`
  display: flex;
  padding: 0 2rem 2rem;
  justify-content: space-between;
`;

const EmphasisText = styled("p")`
    font-weight: 700;
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
`

function Task({ location, time }) {
  const [type, updateType] = useState(""); // delivery or collection
  const [text, updateText] = useState("");

  useEffect(() => {
    // TODO: Check lab location
    if (location === 'Lab') {
      updateType('Delivery')
    } else {
      updateType('Collection')
    }

  }, [location])

  useEffect(() => {
    // TODO: Check lab location
    if (location === 'Lab') {
      updateText('Deliver specimens to')
    } else {
      updateText('Collect specimens from')
    }

  }, [location])


  const CompletedBtn = btn(nhsColors.white, nhsColors.green, nhsColors.darkgreen);


  return (
    <>
      <Card>
        <TypeHeading>{type}</TypeHeading>
        <TravelInfo>
          <div>
            <p>{text}</p>
            <EmphasisText>{location}</EmphasisText>
          </div>
          <div>
            <p>By</p>
            <EmphasisText>{getDeadline(time)}</EmphasisText>
          </div>
        </TravelInfo>
      </Card>

      <CompletedBtn>Mark as completed</CompletedBtn>
    </>
  );
}

export default Task;
