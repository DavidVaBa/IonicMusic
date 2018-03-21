import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSongPage } from './select-song';

@NgModule({
  declarations: [
    SelectSongPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectSongPage),
  ],
})
export class SelectSongPageModule {}
