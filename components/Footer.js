import { faFacebook, faFacebookF, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { MainStyle } from "../styles/style"
import Col from "./Col"
import Container from "./Container"
import Row from "./Row"
import Image from 'next/image'
import Link  from 'next/link'
import { faEnvelope, faMapMarker, faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid"

const FooterElement = styled.footer`
    color: ${ MainStyle.color.light };
    background-color: #10233a;
`

const SocialBanner = styled.div`
    background-color: ${ MainStyle.color.primary };
`

const SocialBannerRow = styled(Row)`
    display: flex;
    align-items: center;
    padding: ${ MainStyle.space.l }px 0px;
`

const SocialBannerTextCol = styled(Col)`
    text-align: center;
    margin-bottom: ${ MainStyle.space.l }px;

    @media (min-width: ${ MainStyle.breakpoint.md }px) {
        text-align: left;
        margin-bottom: 0px;
    }

    h6 {
        margin-bottom: 0px;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.2;
    }
`

const SocialNetworksListCol= styled(Col)`
    text-align: center;

    @media (min-width: ${ MainStyle.breakpoint.md }px) {
        text-align: right;
    }

    svg {
        color: white;
        margin-right: ${ MainStyle.space.l }px;
    }

    .ins-ic svg {
        margin-right:0px;
    }
`

const MainPartContainer = styled(Container)`
    margin-top: ${ MainStyle.space.xl }px;
    text-align: center;

    @media (min-width: ${ MainStyle.breakpoint.md }px) {
        text-align: left;
    }
`

const LogotypeContainer = styled.div`
    margin-bottom: 8px;
    display: block;
`

const LinksCol = styled(Col)`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${ MainStyle.space.l }px;
`

const SeparatorHr = styled.hr`
    display: inline-block;
    margin-top: 0px;
    margin-left: auto;
    margin-left: right;
    margin-bottom: ${ MainStyle.space.l }px;
    background-color: ${ MainStyle.color.primary };
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    width: 60px;
`

const WebsiteInfosP = styled.p`
    font-size: ${ MainStyle.text.body.fontSize };
    margin-bottom: ${ MainStyle.space.l }px;
`

const LinksList = styled.ul`
    list-style: none;

    svg {
        margin-right: ${ MainStyle.space.m }px;
    }

    a {
        font-size: ${ MainStyle.text.body.fontSize };
        margin-bottom: ${ MainStyle.space.m }px;
        color: white;
        display: block;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            color: white;
        }
    }
`

const FooterSubtitle = styled.h6`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: ${ MainStyle.space.s }px;
`

const FooterCopyright = styled.div`
    font-size: ${ MainStyle.text.body.fontSize };
    text-align: center;
    color: rgba(248,249,250,.6);
    background: rgba(0,0,0,.2);
    padding-top: ${ MainStyle.space.m }px;
    padding-bottom: ${ MainStyle.space.m }px;

    a {
        color: ${ MainStyle.color.light };
        text-decoration: none;
    }
`

export default function Footer() {
    return (
        <FooterElement>
            <SocialBanner>
                <Container>
                    <SocialBannerRow>
                        <SocialBannerTextCol md={6} lg={5}>
                            <h6>Suivez nous sur les réseaux sociaux!</h6>
                        </SocialBannerTextCol>
                        <SocialNetworksListCol md={6} lg={7}>
                            <a className="fb-ic" href="https://www.facebook.com/upgearairsoft/" rel="nofollow" target="_blank"> <FontAwesomeIcon icon={faFacebookF}/></a>
                            <a className="tw-ic" href="https://twitter.com/UpGear1" rel="nofollow" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a>
                            <a className="li-ic" href="https://www.linkedin.com/company/upgear-airsoft/" rel="nofollow" target="_blank"><FontAwesomeIcon icon={faLinkedin}/></a>
                            <a className="ins-ic"><FontAwesomeIcon icon={faInstagram}/></a>
                        </SocialNetworksListCol>
                    </SocialBannerRow>
                </Container>
            </SocialBanner>
            <MainPartContainer>
                <Row>
                    <LinksCol md={3} lg={4} xl={3}>
                        <LogotypeContainer>
                            <Image src={'/images/logo-white.png'} width={94} height={18} alt="Upgear logotype" />
                        </LogotypeContainer>
                        <SeparatorHr/>
                        <WebsiteInfosP>
                            UpGear est une plateforme de matériel d'airsoft d'occasion. Achetez & vendez votre équipement au meilleur prix !
                        </WebsiteInfosP>
                    </LinksCol >
                    <LinksCol md={2} lg={2} xl={2}>
                        <FooterSubtitle>Catégories</FooterSubtitle>
                        <SeparatorHr/>
                        <LinksList>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                           
                        </LinksList>
                    </LinksCol>
                    <LinksCol md={3} lg={2} xl={2}>
                        <FooterSubtitle>Liens utiles</FooterSubtitle>
                        <SeparatorHr/>
                        <LinksList>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a> Répliques longues AEG </a>
                                </Link>
                            </li>
                           
                        </LinksList>
                    </LinksCol>
                    <LinksCol md={4} lg={3} xl={3}>
                        <FooterSubtitle>Contact</FooterSubtitle>
                        <SeparatorHr/>
                        <LinksList>
                            <li>
                                <Link href="/">
                                    <a> <FontAwesomeIcon icon={ faMapMarkerAlt }/> Paris, France</a>
                                </Link>
                            </li>

                            <li>
                                <a href="mailto:contact@upgear.fr"> <FontAwesomeIcon icon={ faEnvelope }/> contact@upgear.fr </a>
                            </li>
                           
                        </LinksList>
                    </LinksCol>
                </Row>
            </MainPartContainer>
            <FooterCopyright>© 2020 Copyright:<a href="https://upgear.fr/"> upgear.fr</a></FooterCopyright>
        </FooterElement>
    )
}
