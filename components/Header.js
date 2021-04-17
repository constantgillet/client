import Link from "next/link"
import styled from "styled-components"
import Container from "./Container"
import Image from 'next/image'
import Row from "./Row"
import Col from "./Col"
import { MainStyle } from "../styles/style"
import Button from "./Button"
import TextInput from "./TextInput"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faUser } from '@fortawesome/fontawesome-free-solid'

const HeaderContainer = styled.header`
    display: block;
    background: #ffffff;
    padding: 10px 0px;
    border-bottom: 1px solid #dee2e6 !important;
`

const LogoCol = styled(Col)`
    display: flex;
    align-items: center; 
`
const SearchBar = styled.div`
    width: 100%auto;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
` 

const SearchBarInput = styled(TextInput)`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
`

const SearchBarButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`

const AuthActionsDiv = styled.div`
    display: flex;

    @media (min-width: ${ MainStyle.breakpoint.md }px) {
        float: right;
    }
`

const WidgetDiv = styled.div`
    display: inline-flex;
    position: relative;
`

const IconButtonLink = styled.a`
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    border: 1px solid #dee2e6;
    border-radius: 50%;
    margin-right: ${ MainStyle.space.s }px;
`

const HeaderAuthDiv = styled.div`
    font-size: 14px;
    font-weight: 600;
    height: 6px;
    overflow-y: visible;
`

const LinkAddNew = styled.a`
    text-decoration: none;
    margin-right: ${MainStyle.space.m}px;
`

const AuthLink = styled.a`
    text-decoration: none;
`
export default function Header() {
    return (
        <HeaderContainer>
            <Container>
                <Row>
                    <LogoCol xs={6} lg={2}>
                        <Link href="/">
                            <a>
                                <Image src={'/images/logo.png'} width={112} height={22} alt="Upgear logotype" /> 
                            </a>
                        </Link>
                    </LogoCol>
                    <Col xs={12} lg={4} sm={12}>
                        <form action="#" className="search">
                            <SearchBar>
                                <SearchBarInput type="text" className="form-control" placeholder="Rechercher" />
                                <SearchBarButton><FontAwesomeIcon icon={faSearch}/></SearchBarButton>
                            </SearchBar>
                        </form>
                    </Col>
                    <Col xs={12} lg={6} sm={6}>
                        <AuthActionsDiv>
                            <Link href="/posts/first-post">
                                <LinkAddNew className="no-text-decoration" title="Ajouter une annonce">
                                    <Button icon={ faPlus } >Ajouter</Button>
                                </LinkAddNew>
                            </Link>
                            <WidgetDiv>
                                <Link href="/">
                                    <IconButtonLink title="Page connexion"><FontAwesomeIcon icon={faUser}/></IconButtonLink>
                                </Link>
                                <HeaderAuthDiv>
                                    <span className="text-muted">Bienvenue sur UpGear!</span>
                                    <div>
                                        <Link href="/">
                                            <AuthLink title="Page connexion">Connexion</AuthLink>
                                        </Link>
                                        <span>|</span>
                                        <Link href="/">
                                            <AuthLink title="Page inscription">Inscription</AuthLink>
                                        </Link>
                                    </div>
                                </HeaderAuthDiv>
                            </WidgetDiv>
                        </AuthActionsDiv> 
                    </Col>
                </Row>
            </Container>
        </HeaderContainer>
    )
}
