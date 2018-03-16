import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaySongPage } from './play-song';

@NgModule({
  declarations: [
    PlaySongPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaySongPage),
  ],
})
export class PlaySongPageModule {}
