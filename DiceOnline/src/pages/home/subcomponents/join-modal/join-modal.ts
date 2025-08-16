import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-join-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './join-modal.html',
  styleUrl: './join-modal.css'
})
export class JoinModal {
    @Input() loading: boolean = false;   // Verwerkt de loading status
  @Input() errorMessage: string | null = null;  // Verwerkt de foutmelding
  name = '';
  lobbyCode = '';
  joinButtonClicked = false;

  @Output() lobbyJoined = new EventEmitter<{ name: string; lobbyCode: string }>();

  submitForm(form: NgForm) {
    if (form.invalid) return;

    console.log('Joining with name:', this.name, 'and code:', this.lobbyCode);
    this.lobbyJoined.emit({ name: this.name, lobbyCode: this.lobbyCode });
  }
}
