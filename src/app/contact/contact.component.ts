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
  errorInfo: any = false;

  contactForm = new FormGroup({
    nameInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    messageTextarea: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  /** takes the value of the inputfields and sends the FormData to the mail adress */
  sendMail() {
    this.errorInfo = false;
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
   * sends the FormData into the php file and sends the mail, else error message
   * @param formData = FormData with values of the inputfields
   */
  async sendData(formData: FormData) {
    try {
      await fetch('https://marco-alber.net/send_mail/send_mail.php',
        {
          method: "post",
          body: formData
        })
    }
    catch (e) {
      this.errorMessage();
    }
  }

  /** display the error message after sendData error */
  errorMessage() {
    this.errorInfo = true;
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
    }, 3500);
  }
}
