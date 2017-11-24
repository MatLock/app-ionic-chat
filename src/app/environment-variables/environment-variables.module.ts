import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';

import { prodVariables } from './prd';

export function environmentFactory(){  
  return prodVariables;
}

@NgModule({
  providers:[
    {
      provide: EnvVariables,
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}