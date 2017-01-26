import {NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {trace, Category, UIRouterModule, UIView} from "ui-router-ng2";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MAIN_STATES} from "./app.states";
import {AppComponent} from "./app.component";
import {ProductsModule} from "./products/products.module";
import {MyRootUIRouterConfig} from "./router.config";
import {Ng2Webstorage} from 'ng2-webstorage';


// Enables tracing (check the console) of:
// - TRANSITION transition start, redirect, success, error, ignored
// - VIEWCONFIG ui-view component creation/destruction and viewconfig de/activation
trace.enable(Category.TRANSITION, Category.VIEWCONFIG);

@NgModule({
  imports: [
    BrowserModule,
    Ng2Webstorage,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      otherwise: { state: 'app', params: {} },
      useHash: true,
      configClass: MyRootUIRouterConfig
    }),
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  declarations: [ AppComponent ],
  providers: [
    // Provide a NgModule lazy loading strategy
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
  bootstrap: [UIView],
})
class RootModule {}

platformBrowserDynamic().bootstrapModule(RootModule);
