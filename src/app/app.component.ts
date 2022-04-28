
import { HttpErrorResponse } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailpaylaterService } from './detailpaylater.service';
import { Owner } from './owner';
import { paylaterDetail } from './paylater';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public owners: Owner[];
  public paylaters: paylaterDetail[];
  public detailPaylater: paylaterDetail;
  public isOpenModal: boolean;

  ngOnInit(){
    this.getPaylaterDetail();
    this.getValue();
  }

  //constructor(private ownerService: OwnerService){}
  constructor(private paylaterService: DetailpaylaterService){}


  public getValue(): void{
    console.log(this.paylaters)
  }

  public getPaylaterDetail(): void{
    this.paylaterService.getOwner().subscribe(
      (respons: paylaterDetail[])=>{
        this.paylaters = respons
      }
    );
  }

  public generatePDF(id:String,logoName:String): void{
    this.paylaterService.generatePDF(id,logoName).subscribe(
     (response: void) => {
        console.log(response);
        // this.generatePDF(id,logoName);
        this.isOpenModal = false;
        //alert("Successfully Data Exported.")
        this.getPaylaterDetail();
        this.onCloseModal();
        // this.addSingle();
      }
    );
  }

  public onDetailPaylaterS(id: String): void{
    this.paylaterService.getPaylater(id).subscribe(
      (response: paylaterDetail) => {
        //console.log(response);
        this.detailPaylater;
      }

    );
  }

  public onCloseModal(){
    const container = document.getElementById('paylaterDetail');
    const button = document.createElement('button');
    //button.setAttribute('data-dismiss','modal');
    $(".close").trigger('click');
  }

  public onOpenModal(paylater: paylaterDetail, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');  
    
    if (mode === 'paylaterDetail') {
      this.detailPaylater = paylater;
      button.setAttribute('data-target', '#paylaterDetail');
    }
    if (mode === 'closeDetailModal') {
      this.detailPaylater = paylater;
      button.setAttribute('data-dismiss', 'modal');
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPaylaterUserDetail');
    }
    container.appendChild(button);
    button.click();
  }

}


