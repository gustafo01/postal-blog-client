import { makeAutoObservable } from "mobx";
import { IMessage } from "../models/IMessage";

export default class MessagesStore {
  messages: IMessage[] = [];
  typedMessage: string = "";
  fetching: boolean = true

  constructor() {
    makeAutoObservable(this);
  }

  setMessages(newMessage: IMessage[]) {
    this.messages = [...this.messages, ...newMessage];
  }

  setTypedMessage(value: any) {
    this.typedMessage = value;
  }

  setFetching(value: boolean) {
    this.fetching = value;
  }
}
