import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { useFetch } from "../useFetchHook";

const App = styled("div")`
  text-align: center;
`;

const Col = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled("button")`
  font-size: 32px;
  color: white;
  font-weight: bold;
  padding: 20px 15px;
  margin: 15px;
  margin-top: 30px;
  min-width: 85vw;

  @media (min-width: 768px) {
    min-width: 300px;
    max-width: 400px;
  }
`;

const Request = styled(Button)`
  background-color: ${props => (props.enable ? "orange" : "lightgrey")};
`;

const RequestUrgent = styled(Button)`
  background-color: ${props => (props.enable ? "orangered" : "lightgrey")};
  margin-top: 10px;
`;

const NextCollection = styled("section")`
  background-color: lightgray;
  margin: 15px 15px 0 15px;
  padding-top: 10px;
  min-width: 85vw;
  @media (min-width: 768px) {
    min-width: 300px;
    max-width: 400px;
  }
`;

const Title = styled.h2`
  font-size: 1em;
  color: ${props => (props.urgent ? "orangered" : null)};
`;
const Time = styled.h2`
  color: ${props => (props.urgent ? "orangered" : null)};
`;

const renderNext = ({ urgent, expectedTime, expectedDeliveryTime }) => (
  <NextCollection>
    <Title urgent={urgent}>
      {urgent ? "Next Collection (URGENT)" : "Next Collection"}
    </Title>
    <Time urgent={urgent}>{expectedTime}</Time>
    <Title>Delivery Window</Title>
    <Time>{expectedDeliveryTime}</Time>
  </NextCollection>
);

function BoxApp({ match }) {
  const { loading, data } = useFetch(
    `https://placeholder.com/locationPickUp/${match.params.ward}`
  );

  // Enables/Disables the requesting buttons depending if a request or urgent request has already been made
  const requestReset = {
    req: true,
    urgentReq: true
  };
  const [requestActions, updateRequestActions] = useState(requestReset);

  useEffect(() => {
    if (data) {
      data.urgent
        ? updateRequestActions({
            req: false,
            urgentReq: false
          })
        : updateRequestActions({
            req: false,
            urgentReq: true
          });
    } else {
      updateRequestActions(requestReset);
    }
  });

  return (
    <App>
      <Header ward={match.params.ward} />
      {loading ? (
        <h2>Loading Porteroo data...</h2>
      ) : (
        <main>
          <Col>
            {data ? renderNext(data) : "No upcoming collections"}
            <Request enable={requestActions.req}>Request</Request>
            <RequestUrgent enable={requestActions.urgentReq}>
              Urgent Request
            </RequestUrgent>
          </Col>
        </main>
      )}
    </App>
  );
}

export default BoxApp;
