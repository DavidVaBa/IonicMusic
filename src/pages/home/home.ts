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

    this.getSongs();

    this.LoadingProvider.endLoad();
  }

  deleteSong(id: String){
    this.SongsService.deleteSong(id);
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }, 200);
  }

  getSongs(){
    this.SongsService.getSongs().subscribe((data: Song[]) => {
      this.songs = data;
    })
  }

  getItems(ev: any) {

    this.getSongs();

    let val = ev.target.value;

    setTimeout(() => {
      if (val && val.trim() != '') {
        this.songs = this.songs.filter((song) => {
          return (song.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }, 90);
  }
}
