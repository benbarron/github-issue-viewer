import { Actions, IssueState } from '../types';

export const IssueReducer = (state: IssueState, action: any): IssueState => {
  switch (action.type) {
    case Actions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Actions.SET_ISSUES:
      return {
        ...state,
        loading: false,
        issues: action.payload.issues,
      };
    default:
      return state;
  }
};
