import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, FabContainer } from 'ionic-angular';
import { Song } from '../../models/song/song.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicControls } from '@ionic-native/music-controls';

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
  isEnabled: boolean = true;
  
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private musicControls: MusicControls
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

  openUrl(){
    let url = this.song.open_url.substring(31);
    window.open('spotify:track:' + url, '_system');
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
      this.setTimer();
    } 

    this.isEnabled = !this.isEnabled;
    
    if(this.icon == "play")
      this.media.play();
    else
      this.media.pause();

      this.changeIcon();
  }

  loadSong(url: String){
    this.media = new Media(url);
    this.musicControls.create({
      track: this.song.title,
      artist: this.song.artist,
      cover: this.song.image_small,
      hasNext: false,
      hasPrev: false,
    });

    this.musicControls.subscribe().subscribe(action => {
      function events(action) {
        const message = JSON.parse(action).message;
        switch(message){
          case 'music-controls-pause':
            this.playSong();
            break;
        }
      }
    })

    this.musicControls.listen();
  }

  setMusicTime(){
    if(this.duration != this.durationN){
      this.media.seekTo(this.duration * 1000);
      this.durationN = this.duration;
      clearInterval(this.timer);
      this.setTimer();
    }
  }

  setTimer(){
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

  shareSongFb(image: string, url: string){
    url = url.substring(31);
    window.open('spotify:track:' + url, '_system');
  }

  shareSongTw(image: string, url: string){
    this.socialSharing.shareViaTwitter("I like this song!", image, url);
  }

  shareSongIg(image: string){
    this.socialSharing.shareViaInstagram("I like this!", image)
  }
}
