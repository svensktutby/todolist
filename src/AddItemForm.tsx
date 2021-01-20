import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = React.memo((props) => {
  console.log('AddItemForm is called');
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError('Title is required!');
    }
    setTitle('');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.key === 'Enter') addItem();
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox />
      </IconButton>
    </div>
  );
});
