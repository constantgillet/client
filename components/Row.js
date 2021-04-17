import styled from "styled-components"


const ContainerDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`

export default function Row({ children }) {
    return (
        <ContainerDiv>
            { children }
        </ContainerDiv>
    )
}
