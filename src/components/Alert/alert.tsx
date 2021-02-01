import React, { useState } from 'react';
import classNames from 'classnames';
export type AlertType = 'success' | 'default' | 'danger' | 'warning' | 'primary'
export interface AlertProps {
  className?: string;
  alertType?: AlertType;
  message?: string;
  description?: string;
  title?:string;
  closable?: boolean;
  /**关闭alert时触发的事件 */
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const { className, message, description, closable, alertType, onClose } = props;
  const classes = classNames('mj-alert', className, {
    [`mj-alert-${alertType}`]: alertType,
  });
  const [close, setClose] = useState(false);
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
      setClose(true);
    }
  }
  return (
    <React.Fragment>
      {
        !close &&
        <div className={classes}>
          {message && <div className='title'>{message}</div>}
          {description && <div className='description'>{description}</div>}
          {closable && <span className='alert-icon' onClick={handleClose}>关闭</span>}
        </div>
      }
    </React.Fragment>
  )
}
Alert.defaultProps = {
  alertType: 'default',
  closable: true,
}
export default Alert;