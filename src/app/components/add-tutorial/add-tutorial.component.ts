import { Component } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Entry = {
    title: '',
    position: 0,
    points: 0
  };
  submitted = false;

  constructor(private tutorialService: EntryService) {}

  saveEntry(): void {
    const data = {
      title: this.tutorial.title,
      position: this.tutorial.position
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      position: 0,
      points: 0
    };
  }
}
