import { Action } from '../common/types/Action';

export default function actionCreator<P>(type: string, payload: P = {} as any): Action<P> {
  return { type, payload };
}
