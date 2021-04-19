import styled from "styled-components"


const RowElement = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`

export default function Row({ children, className }) {
    return (
        <RowElement className={ className }>
            { children }
        </RowElement>
    )
}
