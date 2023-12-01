import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbrmService } from './services/nbrm.service';
import { DataDisplayComponent } from './data-display/data-display.component';
import { SortingComponent } from './sorting/sorting.component';
import { PopupComponent } from './popup/popup.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    SortingComponent,
    PopupComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    NbrmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
