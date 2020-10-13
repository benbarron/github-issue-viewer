import Axios, { AxiosResponse } from 'axios';
import React, { useReducer } from 'react';
import { Actions, Issue, IssueState } from '../types';
import { IssueReducer } from './IssueReducer';

const initialState: IssueState = {
  loading: false,
  issues: [],
};

export const IssueContext = React.createContext<IssueState>(initialState);

interface Props {
  children: JSX.Element;
}

export const IssueProvider = (props: Props): JSX.Element => {
  const [state, dispatch] = useReducer(IssueReducer, initialState);

  const fetch = async () => {
    dispatch({ type: Actions.SET_LOADING });
    const res1: AxiosResponse<Issue[]> = await Axios.get(
      'https://api.github.com/repos/walmartlabs/thorax/issues?state=open'
    );
    const res2: AxiosResponse<Issue[]> = await Axios.get(
      'https://api.github.com/repos/walmartlabs/thorax/issues?state=closed'
    );
    setTimeout(() => {
      dispatch({
        type: Actions.SET_ISSUES,
        payload: {
          issues: [...res1.data, ...res2.data].sort((a, b) => {
            if (new Date(a.created_at) < new Date(b.created_at)) {
              return 1;
            } else {
              return -1;
            }
          }),
        },
      });
    }, 200);
  };

  return (
    <IssueContext.Provider
      value={{
        loading: state.loading,
        issues: state.issues,
        fetch,
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};
