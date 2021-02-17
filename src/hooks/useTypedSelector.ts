import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppRootStateType } from '../app/store';

export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
