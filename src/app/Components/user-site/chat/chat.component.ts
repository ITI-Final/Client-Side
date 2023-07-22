import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllUsers } from './Interfaces/IAllUsers';
import * as signalR from '@microsoft/signalr';
import { Chat } from './Interfaces/IChat';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  //#region Fields
  userId: number;
  @Input() reserverId: number = 0;
  reserverName: string = "";
  allUsersArray: AllUsers[] = [];
  senderMessages: Chat[] = [];
  reserverMessages: Chat[] = [];
  AllMessages: Chat[] = [];
  chat: Chat = { sender_ID: 0, receiver_ID: 0 };
  signalRConnection!: signalR.HubConnection;
  newMessage: string = '';
  //#endregion

  //#region Constructors
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {
    this.userId = parseInt(localStorage.getItem("userId")!);
    this.getAllUsers(this.userId);
    //#region SignalR
    this.signalRConnection = this.getConnection();
    this.startConnection();
    //#endregion
  }
  //#endregion

  ngOnInit(): void {

  }

  //#region Methods
  private getAllUsers(id: number): AllUsers[] {
    this.httpClient.get<any>(`https://localhost:44326/api/Users/id/chats?id=${id}`).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.allUsersArray = response.data;
        }
      })
    return this.allUsersArray;
  }

  getChat(senderId: number, reserverId: number): any {
    this.reserverId = reserverId;
    this.httpClient.get<any>(`https://localhost:44326/api/ChatMessages/${senderId}/${reserverId}`).subscribe(
      (response: any) => {
        console.log(response)
        if (response.statusCode === 200) {
          this.AllMessages = response.data;
          const person35 = this.allUsersArray.find(person => person.id === reserverId);
          this.reserverName = person35?.name!;
        }
      })
  }

  //#region SignalR
  getConnection(): signalR.HubConnection {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44326/chat?userId=${this.userId}`, signalR.HttpTransportType.WebSockets)
      .build();

    return connection;
  }

  startConnection() {
    this.signalRConnection.start()
      .then(() => {
        console.log("SignalR Connected!");
      })
      .catch((err) => {
        console.error("SignalR Connection Error:", err);
      });
  }

  addEventListener(): any {
    this.signalRConnection.on("retrieveMessage", (chat) => {
      this.AllMessages.push(chat);
    })
  }

  public async sendMessage() {

    this.chat.receiver_ID = this.reserverId;
    this.chat.sender_ID = this.userId;
    this.chat.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd')!;
    this.chat.time = this.datePipe.transform(Date.now(), 'HH:mm:ss')!;
    this.chat.message = this.newMessage;

    if (await this.isReceiverOnline(this.chat.receiver_ID)) {
      this.signalRConnection.invoke("SendMessage", this.chat);
    } else {
      this.httpClient.post<any>("https://localhost:44326/api/ChatMessages", this.chat)
        .subscribe(data => {
          this.AllMessages.push(this.chat);
        });
    }
    this.newMessage = '';
  };



  async isReceiverOnline(reserverId: number): Promise<boolean> {
    const con = await this.httpClient.get<any>(`https://localhost:44326/api/User_Connections/${reserverId}`).toPromise();

    return con.statusCode === 200;
  }
  //#endregion

  //#endregion
}