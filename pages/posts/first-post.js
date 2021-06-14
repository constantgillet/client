import Link from "next/link";
import styled from "styled-components";

const BackButton = styled.button`
  background-color: "blue";
  font-size: 16px;
  color: "blue" !important;
`;

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <BackButton>Back to home</BackButton>
        </Link>
      </h2>
    </>
  );
}
