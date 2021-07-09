import ReactSelect from "react-select";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const ReactSelectElement = styled(ReactSelect)`
  .react-select__control {
    border: 1px solid #e3e3e3;
    font-size: ${MainStyle.text.body.fontSize};

    &:hover {
    }

    &--menu-is-open {
      outline: none;
    }
  }

  .react-select {
    &__menu {
      font-size: ${MainStyle.text.body.fontSize};
    }

    &__option {
      &--is-selected {
        background-color: ${MainStyle.color.primary};
      }
    }
  }
`;

export default function Select({ options, placeholder, instanceId, onChange, className }) {
  return (
    <ReactSelectElement
      instanceId={instanceId}
      noOptionsMessage={() => <p> Aucun résultat </p>}
      classNamePrefix="react-select"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
}
