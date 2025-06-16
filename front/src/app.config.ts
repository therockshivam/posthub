import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ErrorInterceptor } from './security/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
     JwtInterceptor, 
    ErrorInterceptor, 
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(
      withInterceptors([
        (req, next) => inject(JwtInterceptor).intercept(req, { handle: next }),
        (req, next) => inject(ErrorInterceptor).intercept(req, { handle: next }),
      ])
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } }
    })
  ]
};
