import React, {
  ChangeEvent,
  useState,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";
import Transition from "../Transition/transition";
import classNames from "classnames";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = any> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [showDropdown, setshowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([] as DataSourceType[]);
  const debouncedValue = useDebounce(inputValue, 300);
  const container = useRef(null);
  useClickOutSide(container, () => {
    console.log("click outsider");
    setSuggestions([]);
  });
  const handChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };
  useEffect(() => {
    if (debouncedValue) {
      console.log("after delay");
      setSuggestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        results.then((data) => {
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    }
  }, [debouncedValue, fetchSuggestions]);
  // 点击
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    if (onSelect) onSelect(item);
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropDown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="mj-suggestion-list">
          {suggestions.map((item, index) => {
            // const cnames = classNames('suggestion-item', {
            //   'is-active': index === highlightIndex
            // })
            return (
              <li
                key={index}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="mj-auto-complete" ref={container}>
      <Input value={inputValue} onChange={handChange} {...restProps} />
      {generateDropDown()}
    </div>
  );
};

export default AutoComplete;
