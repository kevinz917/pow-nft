import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const navigateTo = (url?: string): void => {
  if (url) {
    history.push(url);
  }
};

export default history;
