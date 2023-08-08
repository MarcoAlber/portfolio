import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formSending = false;
  alreadySend = false;

  contactForm = new FormGroup({
    nameInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    messageTextarea: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  /** takes the value of the inputfields and sends the FormData to the mail adress */
  sendMail() {
    let nameField: any = this.contactForm.controls['nameInput'];
    let mailField: any = this.contactForm.controls['emailInput'];
    let messageField: any = this.contactForm.controls['messageTextarea'];

    this.contactForm.disable();

    let formData = new FormData();
    formData.append('name', nameField.value);
    formData.append('mail', mailField.value);
    formData.append('message', messageField.value);
    this.sendData(formData);

    this.confirmationMessage();
    this.resetContactForm();
  }

  /**
   * sends the FormData into the php file and sends the mail
   * @param formData = FormData with values of the inputfields
   */
  async sendData(formData: FormData) {
    await fetch('https://marco-alber.developerakademie.net/portfolio/send_mail/send_mail.php',
      {
        method: "post",
        body: formData
      });
  }

  /** resets and enables the contact form */
  resetContactForm() {
    this.contactForm.reset();
    this.contactForm.enable();
  }

  /** changes booleans to display the confirmation message */
  confirmationMessage() {
    this.formSending = true;
    this.alreadySend = true;
    setTimeout(() => {
      this.formSending = false;
    }, 2500);
  }
}
