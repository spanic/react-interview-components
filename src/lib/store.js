import {configureStore} from '@reduxjs/toolkit';
import totalComponentReducer from './Total/Total.slice';

export const store = configureStore({reducer: {total: totalComponentReducer}});
