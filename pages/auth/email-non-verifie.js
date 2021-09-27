import Main from "../../components/Main";
import Container from "../../components/Container";
import { Row, Col, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserCheck } from "@fortawesome/fontawesome-free-solid";
import Button from "../../components/Button";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import Card from "../../components/Card";
import { sendVerificationEmail } from "../../lib/API/authAPI";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";
import { getUser } from "../../redux/actions/userActions";

const IconContainer = styled.div`
  color: ${MainStyle.color.primary};
  font-size: 36px;
  margin-bottom: ${MainStyle.space.m}px;
  height: 75px;
  width: 75px;
  padding: 12px;
  border: ${MainStyle.color.primary} solid 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VerifyMailSection = styled(Card)`
  justify-content: center;
  align-items: center;
  background: white;
  padding: ${MainStyle.space.l}px;

  h1 {
    font-size: ${MainStyle.text.subtitle.fontSize};
    font-weight: ${MainStyle.text.subtitle.fontWeight};
    text-align: center;
  }

  p {
    text-align: center;
  }

  margin-top: ${MainStyle.space.xl}px;
  margin-bottom: ${MainStyle.space.m}px;
`;

let checkEmailVerified;

function MailNotVerified(props) {
  const { user } = props;

  const [isPosting, setIsPosting] = useState(false);
  const [canPost, setCanPost] = useState(true);

  const [session, loading] = useSession();

  useEffect(() => {
    sendEmail();
  }, []);

  const onButtonClick = async () => {
    sendEmail();
  };

  const sendEmail = async () => {
    try {
      setCanPost(false);
      setIsPosting(true);

      setTimeout(() => {
        setCanPost(true);
      }, 1000 * 20); //20 seconds

      if (user) {
        await sendVerificationEmail(user.id);
        message.success("Un email vous a été envoyé");
        setIsPosting(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (session?.user && !loading) {
      checkEmailVerified = setInterval(() => {
        props.getUser(session?.user.id);
      }, 1000 * 10); //20 seconds
    }

    return () => clearInterval(checkEmailVerified);
  }, [session, loading]);

  return (
    <Main style={{ height: "50vh" }}>
      <Container>
        <Row justify="center" align="middle">
          <Col span={24} md={12}>
            <VerifyMailSection>
              <IconContainer>
                <FontAwesomeIcon icon={faEnvelope} />
              </IconContainer>

              <h1>Vérification de l'adresse email</h1>
              <p>Nous avons envoyé un email de confirmation à {user && user.email}</p>
              <p>Si vous ne le recevez pas, cliquez sur le bouton ci-dessous ou regardez dans vos spams</p>
              <Button onClick={onButtonClick} loading={isPosting} disabled={!canPost}>
                Renvoyer l'email
              </Button>
            </VerifyMailSection>
            <p style={{ textAlign: "center", marginBottom: MainStyle.space.xl + "px" }}>
              Vous avez un problème ? Contactez nous à {""}
              <a href="mailto:contact@upgear.fr" title="Email d'upgear">
                contact@upgear.fr
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}

const mapState = (state) => {
  return {
    user: state.user.user
  };
};

const mapDis = {
  getUser: getUser
};

export default connect(mapState, mapDis)(MailNotVerified);
