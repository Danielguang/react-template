import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps} from './button';

const defaultProps = {
  onClick:jest.fn(),
}
const testProps:ButtonProps = {
  btnType:'primary',
  size:'lg'
}
const disabledProps: ButtonProps = {
  disabled:true,
  onClick:jest.fn(),
}
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {... defaultProps }>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps }>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-primary btn-lg'); 
    
  })
  it('should render a link with btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href="http://dummyLink">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link'); 
  })
  it('should render the button with disabled state when disabled props set to be true', () => {
    const wrapper = render(<Button {...disabledProps }>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})