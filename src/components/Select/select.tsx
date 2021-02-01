import React, { useState } from "react";
import Input from "./../Input/input";
import { SelectOptionProps } from "./option";

type SelectCallback = (value: string, isSelected?: boolean) => void;
export interface SelectProps {
  /**指定默认选中的条目**/
  defaultValue: string;
  /**选中值发生变化时触发 */
  onSelect?: SelectCallback;
  /** disable 的状态*/
  disabled?: boolean;
  placeholder?: string;
}

export interface ISelectContext {
  onSelect?: SelectCallback;
  selectedValues: "";
}

export const Select: React.FC<SelectProps> = (props) => {
  const { defaultValue, onSelect, children, disabled, placeholder } = props;
  const [menuOpen, setOpen] = useState(false);
  const [value] = useState(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        SelectOptionProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        console.log(displayName);
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error("Warning: Select has a child which is not Option");
      }
    });
  };
  const handClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
    }
  };
  return (
    <div className="mj-select" onClick={handClick}>
      <Input
        placeholder={placeholder}
        value={value}
        readOnly
        disabled={disabled}
      />
      {menuOpen && <ul className="mj-select-dropdown">{renderChildren()}</ul>}
    </div>
  );
};
Select.defaultProps = {
  disabled: false,
};
export default Select;
