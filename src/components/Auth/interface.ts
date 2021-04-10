import { RouteComponentProps } from 'react-router-dom';

export interface ILoginPage {
  history: RouteComponentProps['history'];
  handleChangePage: (redirectTo: string) => void;
}
export interface IAuthPage {
  history: RouteComponentProps['history'];
}
