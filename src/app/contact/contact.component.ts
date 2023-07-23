import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('mailField') mailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('buttonField') buttonField!: ElementRef;

  async sendMail() {
    let nameField = this.nameField.nativeElement;
    let mailField = this.mailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let buttonField = this.buttonField.nativeElement;

    nameField.disabled = true;
    mailField.disabled = true;
    messageField.disabled = true;
    buttonField.disabled = true;

    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('mail', mailField.value);
    fd.append('message', messageField.value);

    await fetch('https://marco-alber.developerakademie.net/portfolio/send_mail/send_mail.php',
      {
        method: "post",
        body: fd
      });

    nameField.disabled = false;
    mailField.disabled = false;
    messageField.disabled = false;
    buttonField.disabled = false;
  }
}
