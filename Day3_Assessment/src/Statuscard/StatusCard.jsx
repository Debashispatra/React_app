import styled from "styled-components";

const Card = styled.div`
  padding: 16px;
  border-radius: 6px;
  color: white;
  margin: 10px 0;

  background-color: ${(props) =>
    props.type === "success"
      ? "green"
      : props.type === "error"
      ? "red"
      : "gray"};
`;

function StatusCard({ type, message }) {
  return <Card type={type}>{message}</Card>;
}

export default StatusCard;