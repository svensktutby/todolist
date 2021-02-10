import React, { ChangeEvent, FC, useState } from 'react';
import { TextField } from '@material-ui/core';

export type EditableSpanPropsType = {
  value: string;
  onChange: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
  console.log('EditableSpan is called');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(props.value);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
    const newTitle = title.trim();

    if (newTitle) props.onChange(newTitle);
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      type="text"
      value={title}
      onBlur={offEditMode}
      onChange={changeTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.value}</span>
  );
});
