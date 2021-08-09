import styled from "styled-components";
import { MainStyle } from "../styles/style";

const MainElement = styled.main`
  background-color: ${MainStyle.color.backgroundColor};
  animation: opacityAnimation 0.5s ease-in backwards;

  @keyframes opacityAnimation {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }
`;

export default function Main({ className, children }) {
  return <MainElement className={className}>{children}</MainElement>;
}
