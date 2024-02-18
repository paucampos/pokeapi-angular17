import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { LocalstorageService } from './services/localstorage.service';

export function storageFactory(provider: LocalstorageService) {
  return () => provider.setPrefix('poke-api:');
}
export const appConfig: ApplicationConfig = {
  providers: [
    LocalstorageService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: storageFactory,
      deps: [LocalstorageService],
      multi: true
    }
  ],
};
