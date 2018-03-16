import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Song } from '../../models/song/song.interface';

declare let Media: any;

@IonicPage()
@Component({
  selector: 'page-play-song',
  templateUrl: 'play-song.html',
})
export class PlaySongPage {

  song: Song;
  icon: String = "play";
  media: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform
  )
  {
    platform.ready().then(() => {
      this.platform.pause.subscribe(() =>{
        if(this.icon == "pause"){
          this.playSong();
        }
      })
    })   
  }

  ionViewWillLoad() {
    this.song = this.navParams.get('song');
  }

  ionViewWillLeave(){
    this.media.stop();
  }

  changeIcon(){
    if(this.icon == "pause")
      this.icon = "play";
    else
      this.icon = "pause";
  }

  playSong(){
    if(!this.media){
      this.loadSong(this.song.preview_url);
    } 
    
    if(this.icon == "play")
      this.media.play();
    else
      this.media.pause();

      this.changeIcon();
  }

  loadSong(url: String){
    this.media = new Media(url);
  }
}
