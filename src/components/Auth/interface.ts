import { RouteComponentProps } from 'react-router-dom';

export default interface ILoginPage {
  history: RouteComponentProps['history'];
  handleChangePage: (redirectTo: string) => void;
}
