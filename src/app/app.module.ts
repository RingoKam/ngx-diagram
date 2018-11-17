import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxDiagramModule} from 'ngx-diagram';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, NgxDiagramModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
