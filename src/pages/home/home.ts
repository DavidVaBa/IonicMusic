import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SongsService } from '../../providers/songs/songs';
import { Song } from '../../models/song/song.interface';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs: Song[];

  constructor(public navCtrl: NavController, private SongsService: SongsService, private LoadingProvider: LoadingProvider) {
    this.LoadingProvider.startLoad();

    this.SongsService.getSongs().subscribe((data: Song[]) => {
      this.songs = data;
    })

    this.LoadingProvider.endLoad();
  }

  deleteSong(id: String){
    this.SongsService.deleteSong(id);
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }, 200);
  }
}
