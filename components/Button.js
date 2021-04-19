import {useState, useRef, useEffect}  from 'react'
import styled, { css } from "styled-components"
import { MainStyle } from "../styles/style"
import { rgba, darken } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid'

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const ButtonElement = styled.button`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: ${MainStyle.radius.s}px;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    cursor: pointer;
    padding: 9px 15px;
    background-color:  ${MainStyle.color.primary};
    color: white;
    text-transform: uppercase;
    font-size: ${MainStyle.text.bodyBold.fontSize};
    font-weight: ${MainStyle.text.bodyBold.fontWeight};

    ${({ block }) =>
        
        block &&  
            css`
                display: block;
            `
    }

    &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem ${rgba(MainStyle.color.primary, 0.2)};
    }

    &:hover {
        background-color:  ${darken(0.1, MainStyle.color.primary)};
    }

`

const ButtonIcon = styled(FontAwesomeIcon)`
    margin-right: ${MainStyle.space.m};
`

export default function Button({
    isLoading, 
    onClick, 
    block, 
    variant, 
    size, 
    children, 
    disabled,
    className,
    icon,
    ...props
}) {
    
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {

        if (isLoading) {
          setShowLoader(true);
        }
    
        // Show loader a bits longer to avoid loading flash
        if (!isLoading && showLoader) {

            const timeout = setTimeout(() => {
                setShowLoader(false);
            }, 300);
        
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isLoading, showLoader]);

    useEffect(() => {
        if (ref.current && ref.current.getBoundingClientRect().width > 0) {
          setWidth(ref.current.getBoundingClientRect().width)
        }
        if (ref.current && ref.current.getBoundingClientRect().height > 0) {
          setHeight(ref.current.getBoundingClientRect().height)
        }
    }, [children])

    return (
        <ButtonElement

            ref={ref}

            block={ block }

            onClick={onClick}

            className={className}

            style={
                showLoader
                    ? {
                      width: `${width}px`,
                      height: `${height}px`
                    }
                    : {}
            }

            disabled={ disabled ? true : false }
        >
            {showLoader ? (
                <div className={`loader ${isLoading ? 'fade-in' : 'fade-out'}`}>
                    <i className="fas fa-circle-notch fa-spin" />
                    <FontAwesomeIcon icon={ faCircleNotch } spin={true} />
                </div>
            ) : (
                <div> { icon ? <ButtonIcon icon={icon} />  : null } {children}</div>
            )}
        </ButtonElement>
    )
}
