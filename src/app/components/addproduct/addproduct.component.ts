import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productType: string[] = ['CPU','RAM','HDD','Mainboard'];

  productForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.ps.addProduct(this.productForm.value).subscribe(
      data => {
        alert('Product added successfully');
        this.productForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
       // ตรวจสอบให้แน่ใจว่า reader.result เป็น string ก่อนที่จะกำหนดค่า
        const imgDataUrl = reader.result as string;
        this.productForm.patchValue({
          img: imgDataUrl
        });
      };
    }
  }
  

  resetForm(){
    this.productForm.reset();
    this.previewLoaded = false;
  }

}
