
import Link from "next/link"
import Image from 'next/image'
import { lighten } from "polished"
import styled from "styled-components"
import { MainStyle } from "../styles/style"
import Card from "./Card"
import Col from "./Col"
import Row from "./Row"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid"
import { toReadablePrice } from "../lib/textFunctions"
import { API_URL } from "../lib/constants"

const AnnoncesListElement = styled(Card)`
    padding: ${MainStyle.space.l}px;
`

const BlockHeader = styled.header`
    display: flex;
    justify-content: space-between;
`

const BlockTitle = styled.h2`
    font-size: ${ MainStyle.text.subtitle.fontSize };
    font-weight: ${ MainStyle.text.subtitle.fontWeight };
    margin-bottom: ${MainStyle.space.s}px;
`

const SeeMoreLink = styled.a`
    font-size: ${ MainStyle.text.small.fontSize };
    text-transform: uppercase;
    color: ${ MainStyle.color.dark80 };

    &:hover {
        text-decoration: underline;
        color: ${ MainStyle.color.dark };
    }
`

export default function AnnoncesList({
    className,
    children,
    annonces,
    title,
    seeMoreLink
}) {
    return (
        <AnnoncesListElement className={className}>
            <BlockHeader>
                <BlockTitle>{title}</BlockTitle>
                <Link href={ seeMoreLink ? seeMoreLink : '/' }><SeeMoreLink title="Voir plus"> Voir plus </SeeMoreLink></Link> 
            </BlockHeader>
            <main>
                <Row>
                    {
                        annonces ? annonces.map((annonce, index) => <AnnonceCard key={index} annonce={ annonce } />) : null
                    }
                </Row>
            </main>
        </AnnoncesListElement>
    )
}

const AnnonceCardHeader = styled.div`
    position: relative;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #146cda;
        z-index: 1;
        opacity: .04;
        border-radius: 4px;
        pointer-events: none;
    }
`

const AnnonceLink = styled.a`
    padding: 15px;
    display: block;
    border-radius: ${ MainStyle.radius.m }px;
    transition: all .2s ease-in-out;

    &:hover {
        text-decoration: none;
        box-shadow: 1px 2px 4px rgb(0 0 0 / 7%), -3px -3px 9px rgb(0 0 0 / 6%);
    }
`

const AnnonceImage = styled(Image)`
    width: 100%;
    height: auto;
    border-radius: ${ MainStyle.radius.s }px;

    img {
        width: 100%;
        height: auto;
    }
`

const AnnonceTitle = styled.h3`
    font-size: ${ MainStyle.text.bodyBold.fontSize };
    font-weight: ${ MainStyle.text.bodyBold.fontWeight };
    color: ${ MainStyle.color.dark };
    margin-top: ${ MainStyle.space.xs }px;
    margin-bottom: ${ MainStyle.space.xs }px;
`

const AnnonceInfos = styled.div`
    display: flex;
    justify-content: space-between;
`

const AnnoncePrice = styled.span`
    font-size: ${ MainStyle.text.bodyBold.fontSize };
    font-weight: ${ MainStyle.text.bodyBold.fontWeight };
    color: ${ MainStyle.color.primary };
`

const AnnonceLocation = styled.span`
    font-size: ${ MainStyle.text.small.fontSize };
    font-weight: ${ MainStyle.text.small.fontWeight };
    color: ${ MainStyle.color.dark60 };
`

function AnnonceCard({
    className,
    children,
    annonce,
}) {

    return (
        <Col sm={6} md={3} noPadding>
            <Link href="/">
                <AnnonceLink title={ annonce.title }> 
                    <AnnonceCardHeader>
                        <AnnonceImage src={API_URL + "/uploads/annonces/min-" + annonce.images[0]} width={243} height={243} layout="responsive" alt={"photo de " + annonce.title } />
                    </AnnonceCardHeader>
                    <div>
                        <AnnonceTitle>{ annonce.title }</AnnonceTitle>
                        <AnnonceInfos>
                            <AnnoncePrice>{ toReadablePrice(annonce.price) }</AnnoncePrice>
                            <AnnonceLocation><FontAwesomeIcon icon={ faMapMarkerAlt }/> { annonce.city }</AnnonceLocation>
                        </AnnonceInfos>
                    </div>
                </AnnonceLink>
            </Link>
        </Col>
    )
}
