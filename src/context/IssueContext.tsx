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

    const url = 'https://api.github.com/repos/walmartlabs/thorax/issues';

    const res: AxiosResponse<Issue[]>[] = await Axios.all([
      Axios.get(`${url}?state=closed`),
      Axios.get(`${url}?state=open`),
    ]);

    const issues = [...res[0].data, ...res[1].data].sort((a, b) => {
      return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
    });

    dispatch({
      type: Actions.SET_ISSUES,
      payload: {
        issues,
      },
    });
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
