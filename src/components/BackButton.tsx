import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  iconClass: string;
  additionalClasses?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  iconClass,
  additionalClasses = '',
}) => {
  return (
    <span
      data-testid="back-button"
      className={`cursor-pointer ${additionalClasses}`}
      onClick={onClick}
    >
      <i className={iconClass}></i>
    </span>
  );
};

export default BackButton;
