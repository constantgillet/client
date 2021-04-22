import styled from "styled-components"
import { MainStyle } from "../styles/style"

const MainElement = styled.main`
    background-color: ${ MainStyle.color.backgroundColor };
`

export default function Main({
    className,
    children
}) {
    return (
        <MainElement className={className}>
            {children}
        </MainElement>
    )
}
