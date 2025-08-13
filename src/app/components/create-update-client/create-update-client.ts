import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { COUNTRIES } from '../../utils/localities';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-update-client',
  imports: [
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DatePickerModule,
    FloatLabelModule,
    SelectModule,
    ToastModule,
  ],
  templateUrl: './create-update-client.html',
  styleUrl: './create-update-client.scss',
})
export class CreateUpdateClient implements OnInit {
  form!: FormGroup;
  isEdit = false;
  clientId?: string;
  isCpfValid = true;
  loading = false;
  countryOptions = COUNTRIES.map((country) => ({
    name: country.name,
    code: country.code,
  }));
  stateOptions: { name: string; code: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.isEdit = !!this.clientId;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: [''],
      birthDate: [null, Validators.required],
      phone: [''],
      country: [null],
      state: [null],
    });

    this.form.get('country')?.valueChanges.subscribe((country) => {
      const cpfControl = this.form.get('cpf');

      if (country?.name === 'Brasil' && country?.code === 'BR') {
        cpfControl?.addValidators(Validators.required);
      } else {
        cpfControl?.removeValidators(Validators.required);
      }

      cpfControl?.updateValueAndValidity();
    });


    if (this.isEdit) {
      this.loadClient();
    }
  }

  loadStates() {
    const selectedCountry = this.form.get('country')?.value;
    if (selectedCountry) {
      this.stateOptions = COUNTRIES.filter(
        (country) => country.code === selectedCountry.code
      ).flatMap((country) =>
        country.states.map((state) => ({
          name: state.name,
          code: state.code,
        }))
      );
    }
  }

  loadClient() {
    this.loading = true;
    this.clientService.getClientById(this.clientId!).subscribe({
      next: (client: Client) => {
        this.form.patchValue(client);
        this.loadStates();
        this.form.get('state')?.setValue(client.state);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  validateCpf() {
    const cpf = this.form.get('cpf')?.value;

    if (!cpf) {
      this.isCpfValid = false;
      return;
    }

    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11) {
      this.isCpfValid = false;
      return;
    }

    if (/^(\d)\1+$/.test(cleaned)) {
      this.isCpfValid = false;
      return;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cleaned.charAt(9))) {
      this.isCpfValid = false;
      return;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cleaned.charAt(10))) {
      this.isCpfValid = false;
      return;
    }

    this.isCpfValid = true;
  }

  validateDate() {
    const birthDate = this.form.get('birthDate')?.value;
    if (birthDate instanceof Date) {
      const today = new Date();
      if (birthDate >= today) {
        this.form.get('birthDate')?.setErrors({ invalidDate: true });
      } else {
        this.form.get('birthDate')?.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail:
          'Por favor, preencha todos os campos obrigatórios corretamente.',
      });
      return;
    }

    const clientData = this.form.value;

    if (clientData.birthDate instanceof Date) {
      const day = String(clientData.birthDate.getDate()).padStart(2, '0');
      const month = String(clientData.birthDate.getMonth() + 1).padStart(
        2,
        '0'
      );
      const year = clientData.birthDate.getFullYear();
      clientData.birthDate = `${day}/${month}/${year}`;
    }

    if (this.isEdit && this.clientId) {
      this.clientService.updateClient(this.clientId, clientData).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente atualizado com sucesso!',
          });
        },
      });
    } else {
      this.clientService.createClient(clientData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente cadastrado com sucesso!',
          });
          this.router.navigate(['/clients']);
        },
      });
    }
  }

  routeToClients() {
    this.router.navigate(['/clients']);
  }
}
