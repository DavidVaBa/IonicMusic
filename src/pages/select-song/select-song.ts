import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongsService } from '../../providers/songs/songs';

/**
 * Generated class for the SelectSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-song',
  templateUrl: 'select-song.html',
})
export class SelectSongPage {

  songs: any;
  artist: String;
  title: String;
  tracks;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private SongsService: SongsService) {
    this.title = this.navParams.get('title');
    this.artist = this.navParams.get('artist');

    if(this.title == undefined || this.title == ""){
      this.SongsService.getSongsSpotifyArt(this.artist).subscribe((data: any) => {
        this.songs = data;
      });
    } else if (this.artist == undefined || this.artist == ""){
      this.SongsService.getSongsSpotifyTit(this.title).subscribe((data: any) => {
        this.songs = data;
      });
    } else{
      this.SongsService.getSongsSpotifyTitArt(this.title, this.artist).subscribe((data: any) => {
        this.songs = data;
      });
    }

    this.tracks = JSON.stringify(this.songs);
    console.log(this.songs);
  }

  addSong(title: String, artist: String, preview_url: String, image_small: String, image_medium: String, image_large: String, open_url: String){
    this.SongsService.addSong(title, artist, preview_url, image_small, image_medium, image_large, open_url);
    this.navCtrl.pop();
    this.navCtrl.pop();
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }, 1000);
  }

}
