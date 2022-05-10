
import { Component, OnInit } from '@angular/core';
import { DetailpaylaterService } from './detailpaylater.service';
import { Owner } from './owner';
import { paylaterDetail } from './paylater';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public profiles = { "profiles": [
    {
      name: "Jhon Doe",
      jobTitle: "Actor",
      email: "JhonDoe@gmail.com",
      phone: "082195614912"
    },
    {
      name: "Dimas Op",
      jobTitle: "Feeder",
      email: "Dimas@gmail.com",
      phone: "082195614912"
    },
    {
      name: "Jhony Deep",
      jobTitle: "Actor",
      email: "Jhonny Deep@gmail.com",
      phone: "082195614912"
    },
    {
      name: "Elvis Pressbutton",
      jobTitle: "Artis",
      email: "Elvis@gmail.com",
      phone: "082195614912"
    }
  ]};

  public file:File;
  public fileType:String;
  shortLink: String = "";
  loading:boolean = false;
  public owners: Owner[];
  public paylaters: paylaterDetail[];
  public detailPaylater: paylaterDetail;
  public isOpenModal: boolean;

  ngOnInit() {
    
    this.getPaylaterDetail();
    this.getValue();
    console.log(this.profiles['profiles']);

  }
  constructor(private paylaterService: DetailpaylaterService, private toastr: ToastrService) { }

  public getValue(): void {
    console.log(this.paylaters)
  }

  public getPaylaterDetail(): void {
    this.paylaterService.getOwner().subscribe(
      (respons: paylaterDetail[]) => {
        this.paylaters = respons
      }
    );
  }

  public generatePDF(id: String, logoName: String): void {
    this.paylaterService.generatePDF(id, logoName).subscribe(
      (response: void) => {
        console.log(response);
        // this.generatePDF(id,logoName);
        this.isOpenModal = false;
        //alert("Successfully Data Exported.")
        this.getPaylaterDetail();
        this.onCloseModal();
        this.toastr.success("Export PDF Successfully!");
      }
    );
  }

  public onDetailPaylaterS(id: String): void {
    this.paylaterService.getPaylater(id).subscribe(
      (response: paylaterDetail) => {
        //console.log(response);
        this.detailPaylater;
      }

    );
  }

  public onCloseModal() {
    const container = document.getElementById('paylaterDetail');
    const button = document.createElement('button');
    //button.setAttribute('data-dismiss','modal');
    $(".close").trigger('click');
  }

  public onCloseModalUpload() {
    const container = document.getElementById('uploadPdf');
    const button = document.createElement('button');
    //button.setAttribute('data-dismiss','modal');
    $(".close").trigger('click');
  }

  public onCloseModalModify() {
    const container = document.getElementById('modifyPdf');
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
      console.log('KIK');
      button.setAttribute('data-target', '#paylaterDetail');
    }
    if (mode === 'closeDetailModal') {
      this.detailPaylater = paylater;
      button.setAttribute('data-dismiss', 'modal');
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPaylaterUserDetail');
    }
    if (mode === 'uploadPdf') {
      button.setAttribute('data-target', '#uploadPdf');
    }
    if (mode === 'modifyPdf') {
      button.setAttribute('data-target', '#modifyPdf');
    }
    container.appendChild(button);
    button.click();
  } 

  fileChangeEvent(event){
    this.file = event.target.files[0] 
  }

  onUpload(){
    this.loading = !this.loading;
    console.log(this.file);
    this.paylaterService.uploadPDF(this.file).subscribe(
      (event: any) =>{
        this.onCloseModalUpload();
        this.toastr.success("Upload Success");
      }
    );
  }
 
  onModify(name:String,address:String,id:String){
    name = (<HTMLInputElement>document.getElementById("Name")).value;
    address = (<HTMLInputElement>document.getElementById("address")).value;
    id = (<HTMLInputElement>document.getElementById("Id")).value;
    console.log(name,address,id)
    this.loading = !this.loading;
    console.log(this.file);
    console.log(name);
    this.paylaterService.modifyPDF(this.file,name,address,id).subscribe(
      (event: any) =>{
        this.onCloseModalUpload();
        this.toastr.success("Modify Success");
      }
    );
  }
}


