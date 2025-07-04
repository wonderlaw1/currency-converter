import { Component, forwardRef, input, OnInit, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Autocomplete),
      multi: true,
    },
  ],
})
export class Autocomplete implements OnInit, ControlValueAccessor {
  readonly innerControl = new FormControl('');
  readonly options = input.required<any[]>();
  readonly label = input.required<string>();
  readonly filteredOptions = signal<any[]>([]);

  private onChange!: (value: unknown) => void;
  private onTouched!: () => void;

  ngOnInit(): void {
    this.innerControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options().slice();
        }),
        tap((result) => this.filteredOptions.set(result)),
      )
      .subscribe();
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  displayFn(value: any): string {
    return value?.name ?? '';
  }

  protected onOptionSelected(option: MatAutocompleteSelectedEvent): void {
    this.onChange(option.option.value);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options().filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
