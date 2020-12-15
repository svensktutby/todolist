import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };
  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addItem();
  };
  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError('Title is required!');
    }
    setTitle('');
  };

  return (
    <div>
      <input
        value={title}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
}
