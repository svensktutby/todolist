import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(
  ({ addItem, disabled = false }) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
      const trimmedTitle = title.trim();
      if (trimmedTitle) {
        addItem(trimmedTitle);
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
      if (e.key === 'Enter') addItemHandler();
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
          disabled={disabled}
        />
        <IconButton
          color="primary"
          onClick={addItemHandler}
          disabled={disabled}
        >
          <AddBox />
        </IconButton>
      </div>
    );
  },
);
