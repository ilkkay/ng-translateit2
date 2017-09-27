import { Observable } from 'rxjs/Rx';

export interface MessageInterface {
  clearMessages();
  sendTextMessage(message: string);
  sendErrorMessage(error: any);
  sendSuccessMessage(success: any);
  getMessage(): Observable<any>;
}
