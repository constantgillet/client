import styled from "styled-components"
import { MainStyle } from "../styles/style"

const TextInputElement = styled.input`
    border-radius: ${ MainStyle.radius.s }px;
    border: 1px solid #f2f3f7;
    font-size: 14px;
    display: block;
    width: 100%;
    padding: 8px 15px;
    font-size: ${ MainStyle.text.body.fontSize };
    font-weight: ${ MainStyle.text.body.fontWeight };
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    &:focus {
        border-color: ${ MainStyle.color.primary };
        outline: none;
    }

    &::placeholder {
        font-size: ${ MainStyle.text.body.fontSize };
        font-weight: ${ MainStyle.text.body.fontWeight };
    }
`

export default function TextInput({
    className,
    onChange,
    placeholder
}) {
    return (
        <TextInputElement
            type="text"
            className={ className }
            placeholder={ placeholder }
        />
    )
}
