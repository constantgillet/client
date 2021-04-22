import styled from "styled-components"
import { MainStyle } from "../styles/style"

const CardElement = styled.div`
    border-radius: ${ MainStyle.radius.m }px;
    border: 1px solid #e8e9ec;
    background: #fff;
    display: flex;
    flex-direction: column;
`

export default function Card({
    className,
    children
}) {
    return (
        <CardElement className={className}>
            {children}
        </CardElement>
    )
}
