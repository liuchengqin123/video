import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() getSrc: string;
  @ViewChild('myVideo', { static: true}) private myVideo: ElementRef;
  @ViewChild('progressBar', {static: true}) private progressBar: ElementRef;
  @ViewChild('voice', {static: true})  private voice: ElementRef;
  @ViewChild('barBottom', {static: true}) private barBottom: ElementRef;
  @ViewChild('source', {static: true}) private source: ElementRef;
  @ViewChild('spinner', { static: false}) private spinner: ElementRef;
  isPaused = false;
  isMuted = false;
  currentTime: string;
  totalTime: string;
  volume = 60;
  isShowSpinner = false;

  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    this.currentTime = '00:00:00';
    this.totalTime = '00:00:00';
    this.myVideo.nativeElement.volume = this.volume / 100;
    this.progressBar.nativeElement.style.width = 0 + 'px';
  }

  ngAfterViewInit(): void {
    this.spinner.nativeElement.style.zIndex = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getSrcValue();
  }


  // 时间格式化
  timeFormat(time): any{
    let hour: (string | number) = Math.floor( time / 3600);
    let minute: (string | number) =  Math.floor( (time % 3600) / 60);
    let second: (string | number) = Math.floor( time % 60);

    hour =  hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    return `${hour}:${minute}:${second}`;
  }

  // 获取总时长
  getTotalTime(): any{
    if (this.myVideo.nativeElement.duration >= 0){
      this.totalTime = this.timeFormat(this.myVideo.nativeElement.duration);
      this.isShowSpinner = false;
    }
  }

  getCurrentTime(): any{
    this.currentTime = this.timeFormat(this.myVideo.nativeElement.currentTime);
  }


  // 播放
  togglePlay(): void{
    if (this.getSrc === ''){
      console.log(this.getSrc);
    }
    this.isPaused = !this.isPaused;
    if (this.isPaused){
      this.myVideo.nativeElement.play();
    }else{
      this.myVideo.nativeElement.pause();
    }


  }
  // 播放结束
  ended(): void{
    this.isPaused = false;
  }

  // 进度条
  ProgressBar(): void{
    const current = this.myVideo.nativeElement.currentTime;
    const total = this.myVideo.nativeElement.duration;
    const pro =  current / total;
    this.progressBar.nativeElement.style.width = pro * 100 + '%';
  }

  // 设置进度条
  setProgressBar(ev): void{
    const offsetX = ev.offsetX ;
    this.progressBar.nativeElement.style.width = offsetX + 'px';
    const length = this.barBottom.nativeElement.clientWidth;
    this.myVideo.nativeElement.currentTime = offsetX / length * this.myVideo.nativeElement.duration;
    if (!this.isPaused){
      this.myVideo.nativeElement.pause();
    }else{
      this.myVideo.nativeElement.play();
    }
  }
  // 声音
  toggleMuted(): void{
    this.isMuted = !this.isMuted;
    this.myVideo.nativeElement.muted = !this.myVideo.nativeElement.muted;
  }

  // 音量控制进度条渲染
  volumeChange(): void{
    const per = this.myVideo.nativeElement.volume * 100;
    this.volume = per * 10;
    this.voice.nativeElement.style.width = per + '%';
  }

 // 声音控制
  handleVolProgressDown(ev): void{ // 监听声音点击事件
    // 获取对象相对页面的
    const offsetX = ev.offsetX / 100 ;
    this.voice.nativeElement.style.width = offsetX * 100 + '%';
    this.volume = offsetX * 10;
    this.myVideo.nativeElement.volume = offsetX;
  }

  // 全屏
  toggleFullScreen(): void{
    const myVideo = this.myVideo.nativeElement;
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
      if (myVideo.requestFullscreen){
        myVideo.requestFullscreen();
      }else if (myVideo.mozRequestFullscreen){
        myVideo.mozRequestFullScreen();
      }else if ( myVideo.webkitRequestFullscreen){
        myVideo.webkitRequestFullscreen();
      }else if ( myVideo.msRequestFullscreen){
        myVideo.msRequestFullscreen();
      }
    }
  }

  toggleWaiting(): void{
    this.isShowSpinner = true;
    this.spinner.nativeElement.style.zIndex = 5;
  }

  getSrcValue(): void{
    if (this.getSrc !== '') {
      console.log(this.getSrc);
      this.myVideo.nativeElement.load();
      this.myVideo.nativeElement.src = this.getSrc;
      this.isShowSpinner = true;
      this.getTotalTime();
      if (!this.isPaused) {
        this.myVideo.nativeElement.pause();
      } else {
        this.myVideo.nativeElement.play();
      }
    }
  }

}
