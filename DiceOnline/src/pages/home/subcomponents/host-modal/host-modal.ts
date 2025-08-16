import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HSOverlay } from 'flyonui/flyonui';

@Component({
  selector: 'app-host-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './host-modal.html',
  styleUrl: './host-modal.css'
})
export class HostModal {
  @Input() loading: boolean = false;   // Verwerkt de loading status
  @Input() errorMessage: string | null = null;  // Verwerkt de foutmelding

  name = '';
  diceCount = 1;
  diceOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  @Output() hostCreated = new EventEmitter<{ name: string; diceCount: number }>();

  submitForm(form: NgForm) {
    if (form.invalid) {
      return; // Als het formulier ongeldig is, doe niks
    }
    this.hostCreated.emit({ name: this.name, diceCount: this.diceCount });
  }
}
