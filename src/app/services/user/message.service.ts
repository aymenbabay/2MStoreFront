import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/user/message';
import { Conversation } from '../../models/user/conversation';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = "werehouse/message/"
  receiver = '';
  messages: Message[] = [];
  show: boolean=false;
  constructor(private http : HttpClient) { }

  sendMessage(message : Message):Observable<any>{
    return this.http.post(`${this.baseUrl}${this.receiver}`, message)
  }

  getAllMyMessage():Observable<Message[]>{
    return this.http.get<Message[]>(`${this.baseUrl}get_message/${this.receiver}`)
  }

  getAllMyConversation():Observable<Conversation[]>{
    return this.http.get<Conversation[]>(`${this.baseUrl}get_conversation`)
  }
}
