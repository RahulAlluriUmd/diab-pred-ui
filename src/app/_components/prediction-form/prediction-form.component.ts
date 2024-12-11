import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, catchError } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../_services/user.service';
import { Observable, Subscription } from 'rxjs';

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
export class PredictionFormComponent implements OnInit, OnDestroy {

  predictionForm: FormGroup;
  loading = false;
  result: any = null;
  apicall:Subscription = new Subscription()
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.predictionForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      // gender: ['', Validators.required],
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
      var data = {
        'Age': this.predictionForm.value.age,
        'glucose': this.predictionForm.value.bloodGlucose,
        'BP': this.predictionForm.value.bloodPressure,
        'BMI': this.predictionForm.value.bmi,
        'DiabetesPedigreeFunction': this.predictionForm.value.diabetesPedigree,
        // 'gender': this.predictionForm.value.gender,
        'Insulin': this.predictionForm.value.insulin,
        'pregnancies': this.predictionForm.value.pregnancies,
        'SkinThickness': this.predictionForm.value.skinThickness
      }

      var response = {}
      this.apicall = this.userService.predictUser(data).subscribe((res: any) => {
        let response = JSON.parse(res);
        response =  response.body;
        this.result = {
          probability: response.probability,
          risk: response.risk
        };
        this.loading = false;
      })
      console.log(response)
    }
  }

  resetForm() {
    this.predictionForm.reset();
    this.result = null;
  }

  ngOnDestroy(): void {
    this.apicall.unsubscribe()
  }


}
