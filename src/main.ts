import { bootstrapApplication} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { importProvidersFrom } from '@angular/core';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/*
  bootstrapApplication(AppComponent,{
    providers:[importProvidersFrom(FalconCoreModule.forRoot(environment)),
               importProvidersFrom(RouterModule.forRoot(routes))]
  }).catch(err => console.error(err));*/