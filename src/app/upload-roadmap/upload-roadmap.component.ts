 import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-upload-roadmap',
  templateUrl: './upload-roadmap.component.html',
  styleUrls: ['./upload-roadmap.component.css']
})
export class UploadRoadmapComponent {

prompt = `Act as a learning roadmap generator.

Your task is to generate a learning roadmap JSON file that can be directly uploaded into a roadmap tracking application.

IMPORTANT OUTPUT RULES:

1. Output must include a downloadable JSON file.
2. The file must be saved using the format:

FileName: roadmap-<topic>-<days>.json

3. The response must contain:
   - filename
   - download link
   - JSON inside a code block

JSON Schema:

{
  "config": {
    "title": "Roadmap Title",
    "goal": "Learning goal description"
  },
  "roadmap": [
    {
      "week": "Week 1",
      "focus": "Main topic",
      "days": [
        {
          "day": "Day 1",
          "concept": "Concept",
          "tasks": [
            {
              "title": "Task",
              "difficulty": "Easy | Medium | Hard",
              "topic": "Topic"
            }
          ]
        }
      ]
    }
  ]
}

User Input:

Learning Goal: <goal>
Number of Days: <days>
`;

copyPrompt() {
  navigator.clipboard.writeText(this.prompt);
  alert("Prompt copied!");
}

onFileSelected(event: any) {

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e: any) => {

    const roadmap = JSON.parse(e.target.result);

    localStorage.setItem('roadmap-data', JSON.stringify(roadmap));

    location.reload();

  };

  reader.readAsText(file);

}

}