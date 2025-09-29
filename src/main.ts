import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './app/modules/auth/application/auth.service';
import { APP_INITIALIZER } from '@angular/core';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

function appInitializer(authService: AuthService): () => Promise<void> {
  return () =>
    firstValueFrom(authService.checkAuthStatus())
      .then((res) => {
        authService.user.set(res.data.user);
      })
      .catch(() => {
        authService.user.set(null);
      });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
  ],
});
