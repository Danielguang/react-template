import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

type inputSize = 'lg' | 'sm';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size' |'prefix'> {
  disabled?: boolean;
  size?: inputSize;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
  prefix?:  string| React.ReactElement;
  suffix?: string | React.ReactElement;
  value?:any;
  onChange?:(e: ChangeEvent<HTMLInputElement>) => void;
  defaultVal?:any;
}

export const Input: React.FC<InputProps> = (props) => {
  // 取出各种属性
  const { disabled, size, prepend, append, style, prefix, suffix,defaultVal, ...restProps} = props;
  
  // 根据属性计算不同的className
  const className = classNames('mj-input', {
    'is-disabled': disabled,
    [`input-${size}`]:size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
    'input-suffix':suffix,
    'input-prefix':prefix,
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={className} style={style} data-testid='input'>
      {
        prepend &&<div className="mj-input-group-prepend">{prepend}</div>
      }
       <div className="mj-input-wrapper">
       {
         prefix && <div className="icon-wrapper icon-prefix">
           {prefix}
         </div>
        }
        {
        suffix && <div className="icon-wrapper icon-suffix">
            {suffix}
         </div>
        }
      <input
        className='mj-input-inner'
        disabled={disabled}
        {...restProps }
      />
      </div>
      {append && <div className="mj-input-group-append">{append}</div>}
    </div>
  )

}
export default Input;