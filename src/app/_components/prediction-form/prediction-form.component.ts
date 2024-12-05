import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prediction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './prediction-form.component.html',
  styleUrl: './prediction-form.component.scss'
})
export class PredictionFormComponent implements OnInit {

  predictionForm: FormGroup;
  loading = false;
  result: any = null;
  
  constructor(private fb: FormBuilder) {
    this.predictionForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['', Validators.required],
      bloodGlucose: ['', [Validators.required, Validators.min(0)]],
      bloodPressure: ['', [Validators.required, Validators.min(0)]],
      bmi: ['', [Validators.required, Validators.min(0)]],
      insulin: ['', [Validators.required, Validators.min(0)]],
      pregnancies: ['', [Validators.required, Validators.min(0)]],
      skinThickness: ['', [Validators.required, Validators.min(0)]],
      diabetesPedigree: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.predictionForm.valid) {
      this.loading = true;
      // Simulate API call
      console.log(this.predictionForm)
      setTimeout(() => {
        this.result = {
          probability: 0.75,
          risk: 'High'
        };
        this.loading = false;
      }, 1500);
    }
  }

  resetForm() {
    this.predictionForm.reset();
    this.result = null;
  }


}
