import React from 'react';
import Alert, {  AlertProps } from './alert';
import { render, fireEvent } from '@testing-library/react'

const defaultProps:AlertProps = {
  description:'this is description',
  message:'message',
  alertType:'default',
  onClose:jest.fn(),
}

const testProps:AlertProps = {
  description:' description',
  message:'hello',
  alertType:'success',
  onClose:jest.fn(),
}

describe('test alert component', ()=>{
  it('should render correct alert components', ()=>{
    const { getByText,queryByText, container} = render(<Alert {...defaultProps}/>)
    expect(queryByText('this is description')).toBeInTheDocument();
    expect(getByText('message')).toBeInTheDocument();
    expect(container.querySelector('.mj-alert')).toHaveClass('mj-alert-default')
    fireEvent.click(getByText('关闭'))
    expect(defaultProps.onClose).toHaveBeenCalled();
    expect(container.querySelector('.mj-alert')).not.toBeInTheDocument();
  })
  it('should render correct alert components based on different props', ()=>{
    const { container , getByText}  = render(<Alert {...testProps}/>)
    expect(container.querySelector('.mj-alert')).toHaveClass('mj-alert-success');
    expect(getByText('hello')).toBeInTheDocument();
  })
})