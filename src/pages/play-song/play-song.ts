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
  durationN: number = 0;
  timer: any;
  duration: any = "00";
  
  

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
      this.timer = setInterval(() => {
        if(this.icon == "pause"){
          if(this.durationN >= 30){
            this.durationN = 0;
            this.playSong();
          }else{
            this.durationN++;
          }
        }

        if(this.durationN < 10)
          this.duration = "0" + this.durationN;
        else
          this.duration = this.durationN;
      }, 1000)
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
