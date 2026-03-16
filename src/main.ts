import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [


    importProvidersFrom(BrowserModule),
    

    provideRouter(
      [
        {
          path: '',
          loadComponent: () =>
            import('./app/dashboard/dashboard.component')
              .then(m => m.DashboardComponent)
        },
        {
          path: 'roadmap',
          loadComponent: () =>
            import('./app/roadmap/roadmap.component')
              .then(m => m.RoadmapComponent)
        },
        { path: '**', redirectTo: '' }
      ],
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    )

  ]
}).catch(err => console.error(err));