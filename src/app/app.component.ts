import {Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface Film{
  name: string;
  hash: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // http://127.0.0.1:8080/ipfs/QmYVri7jyBdPyfR8AgBLTgyTjiJifCgpeHFiFrKxowQeq8
  @ViewChild('searchValue', { static: true}) private searchValue: ElementRef;
  host = 'http://127.0.0.1:8080/ipfs/';
  http: HttpClient;

  src = '';
  filmOptions: Film[] = [
    { name: '神秘巨星', hash: 'QmWBbKvLhVnkryKG6F5YdkcnoVahwD7Qi3CeJeZgM6Tq68'},
    { name: '芳华', hash: 'QmYVri7jyBdPyfR8AgBLTgyTjiJifCgpeHFiFrKxowQeq8'},
    { name: '疯狂动物城', hash: 'QmUKaQwN2ppapUEFhbHsKoVXn2yBRM7mLpu5HQv9am7dB7'},
    { name: '至暗时刻', hash: 'QmUPvs7iyM5ZWPQwDovRqvNzxMJHSUWNRWAWRkAsseVcvs'},
    { name: '肖申克的救赎', hash: 'QmRUYeMkvirV4frGX8wcntCq6x5GqDixAjZnFj5Jg1E3qj'},
  ];

  constructor(public dialog: MatDialog) {
  }
  onfocus(): void{
    this.searchValue.nativeElement.placeholder = '';
  }

  onblur(): void{
    this.searchValue.nativeElement.placeholder = '输入Qm开头的IPFS hash';
  }
  getUrl(): void{
    const hash = this.searchValue.nativeElement.value;
    if (hash !== ''){
      if (hash[0] === 'Q' && hash[1] === 'm'){
        this.src = this.host + hash;
      }else{
          this.openDialog();
      }
    }else {
      this.openDialog();
    }
    this.searchValue.nativeElement.value = '';
  }


  openDialog(): void{
    this.dialog.open(TipComponent, {
      width: '300px',
      height: '200px',
    });
  }

}
@Component({
  selector: 'app-tip',
  templateUrl: './tip/tip.html'
})
export class TipComponent{
  constructor(
    public  dialogRef: MatDialogRef<TipComponent>
  ) {}
  onNoClick(): void{
    this.dialogRef.close();
  }
}
