import Main from "../../components/Main";
import styled from "styled-components";
import Meta from "../../components/Meta";

const MainElement = styled(Main)`
  flex: 1;
`;

const Chats = () => {
  return (
    <MainElement>
      <Meta title={"Mes messages"} />
      chats
    </MainElement>
  );
};

export default Chats;
