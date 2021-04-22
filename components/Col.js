
import styled, { css } from "styled-components"
import { MainStyle } from "../styles/style"

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const ColDiv = styled.div`
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;

    ${({ noPadding }) =>

        noPadding &&  
            css`
                padding-right: 0px;
                padding-left: 0px;
            `
    }

    ${({ xs }) =>

        xs &&  (
            cols.map(col => {
                return (xs == col &&
                    css`
                        flex: 0 0 ${100 / (12 / col)}%;
                        max-width: ${100 / (12 / col)}%;
                    `)
            })
        )
    }

    ${({ sm }) =>
        
        sm &&  (
            cols.map(col => {
                
                return (sm == col &&
                    css`
                        @media (min-width: ${ MainStyle.breakpoint.sm }px) {
                            flex: 0 0 ${100 / (12 / col)}%;
                            max-width: ${100 / (12 / col)}%;  
                        }
                    `)
            })
        )
    }

    ${({ md }) =>
        
        md &&  (
            cols.map(col => {
                
                return (md == col &&
                    css`
                        @media (min-width: ${ MainStyle.breakpoint.md }px) {
                            flex: 0 0 ${100 / (12 / col)}%;
                            max-width: ${100 / (12 / col)}%;  
                        }
                    `)
            })
        )
    }

    ${({ lg }) =>
        
        lg &&  (
            cols.map(col => {
                
                return (lg == col &&
                    css`
                        @media (min-width: ${ MainStyle.breakpoint.lg }px) {
                            flex: 0 0 ${100 / (12 / col)}%;
                            max-width: ${100 / (12 / col)}%;  
                        }
                    `)
            })
        )
    }

    ${({ xl }) =>
    
        xl &&  (
            cols.map(col => {
                
                return (xl == col &&
                    css`
                        @media (min-width: ${ MainStyle.breakpoint.xl }px) {
                            flex: 0 0 ${100 / (12 / col)}%;
                            max-width: ${100 / (12 / col)}%;  
                        }
                    `)
            })
        )
    }

    
`

export default function Col({
    children,
    className,
    xs,
    sm,
    md,
    lg,
    xl,
    noPadding
}) {
    return (
        <ColDiv xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={className} noPadding={noPadding}>
            { children }
        </ColDiv>
    )
}
