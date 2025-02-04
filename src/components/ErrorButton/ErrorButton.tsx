import { useState } from 'react';

import s from './ErrorButton.module.scss';

import { Button } from '@/UI/Button/Button';

export const ErrorButton = () => {
  const [customError, setCustomError] = useState(false);

  if (customError) {
    throw new Error('Load characters with an Error');
  }

  return (
    <div className={s.buttonContainer}>
      <Button
        label="Make an error"
        onClick={() => setCustomError(true)}
        type="button"
      />
    </div>
  );
};
