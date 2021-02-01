import React from 'react';
import Input, { InputProps } from './input';
import { render, fireEvent } from '@testing-library/react';
import Icon from '../Icon/icon';

const defaultProps :InputProps = {
  onChange: jest.fn(),
  placeholder:'test-input'
}
describe('test input component', ()=>{
  it('should render correct input components with different props',()=>{
    const wrapper = render(<Input {...defaultProps}/>);
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('mj-input-inner');
    fireEvent.change(testNode, {target: {value :'change'}});
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('change')
  })
  it('should render disabled with disabled props', ()=>{
    const wrapper = render(<Input disabled placeholder='disabled'/>);
    const disabled = wrapper.getByPlaceholderText('disabled');
    expect(disabled).toBeDisabled();
  })
  it('should render large input size', ()=>{
    const wrapper = render(<Input size='lg' placeholder='lg'/>);
    const lgInput = wrapper.getByTestId('input');
    expect(lgInput).toHaveClass('input-lg');
  })
  it('should render correct append | prepend based on append | prepend props',()=>{
    const wrapper = render(<Input size='lg' placeholder='lg' prepend='.com' append='https://'/>);
    const prependEl = wrapper.getByText('.com');
    const appendEl = wrapper.getByText('https://');
    const element =  wrapper.getByTestId('input');
    expect(element).toHaveClass('input-group-append input-group-prepend')
    expect(prependEl).toBeInTheDocument();
    expect(appendEl).toBeInTheDocument();
  })
  it('should render correct suffix | prefix based on suffix | prefix props',()=>{
    const wrapper = render(<Input size='lg' suffix={<Icon icon='search'/>} prefix={<Icon icon='search'/>}/>);
    expect(wrapper.container.querySelectorAll('.icon-wrapper').length).toEqual(2);
    expect(wrapper.container.querySelector('.icon-suffix')).toBeInTheDocument();
    expect(wrapper.container.querySelector('.icon-prefix')).toBeInTheDocument();
  })
})