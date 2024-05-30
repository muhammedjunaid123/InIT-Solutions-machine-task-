import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,AfterViewChecked  {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  chat_message!:string
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  constructor(private _chat: ChatService, private _user: AuthServiceService) {

  }
  users!: any
  chat_history!: any
  messageAr!: any
  id!: string
  ngOnInit() {
    this._user.findUser().subscribe(({
      next: (res) => {
        this.users = res


      }
    }))

  }
  send_chat() {
    
    let data = { message: this.chat_message, _id:this.chat_history['data']['_id'],userid:this.id }
    this.chat_message=''
    this._chat.sendMessage(data)
  }
  chater(name: string) {
    console.log(name);

    this._user.getNewMessage(name).subscribe(({
      next: (res) => {
        this.chat_history = res
        this.messageAr = this.chat_history['data']['message']     
        if (this.chat_history['email'] == this.chat_history['data']['senderId']['email']) {
          this.id = this.chat_history['data']['senderId']['_id']
        } else {
          this.id = this.chat_history['data']['recipientId']['_id']
        }


      }
    }))
    this._chat.getNewMessage().subscribe({
      next: (res:any) => {
         this.messageAr=res['message']
         console.log(this.messageAr,'message');
         
      }
    })
  }
  disconnect() {
    this._chat.disconnect()
  }
}

