import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../utils/generic-form-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
              private contaService: ContaService) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLenght: 'A senha deve possuir 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLenght: 'A senha deve possuir 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngAfterViewInit(): void {

  }

  adicionaConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario);
    }
  }

}
