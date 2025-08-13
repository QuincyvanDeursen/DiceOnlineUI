import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  @Input() height = "70%";

  chats = [
    'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
        'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
       'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
        'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
        'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
        'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
       'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!',
        'Hello!',
    'How are you?',
    'What are you doing?',
    'Let\'s play a game!'
  ];
  chatForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  sendMessage() {
    // Implement your send message logic here
  }
}
