import {AfterViewChecked, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {first, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {setToken, tokenSelector} from "./reducers/token";
import {LoaderService} from "./shared/services/loader/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{

  @HostListener('window:beforeunload')
  onSaveToken(){
    this.token$.pipe(first()).subscribe((response) => {
      localStorage.setItem('token', response)
    })
  }

  token$ = this.store.select(tokenSelector)
  loading$: Observable<boolean> = this.loaderService.loading$

  constructor(private store: Store, private changeDetector: ChangeDetectorRef, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.store.dispatch(setToken({token: <string>localStorage.getItem('token')}))
    }
    localStorage.removeItem('token')
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges()
  }
}
