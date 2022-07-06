import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbDialogService } from "@nebular/theme";
import { DialogMetaComponent } from "./component/dialog-meta/dialog-meta.component";

@Component({
    selector: "ngx-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    fileName = "";
    fileUoload: any;
    nameWebsite: any;
    titleWebsite: any;
    desWebsite: any;
    constructor(
        private http: HttpClient,
        private dialogService: NbDialogService
    ) {}

    ngOnInit(): void {}

    onFileSelected(event) {
        const file: File = event.target.files[0];

        // this.fileUoload = event.target.files[0];
        // console.log(" this.fileUoload", this.fileUoload);

        const reader = new FileReader();
        reader.onload = (e) => (this.fileUoload = reader.result);

        reader.readAsDataURL(file);

        if (file) {
            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
        }
    }

    open() {
        this.dialogService.open(DialogMetaComponent, {
            context: {
                title: "This is a title passed to the dialog component",
            },
        });
    }

    saveHome() {
        const usr= this.nameWebsite;
     const password= this.titleWebsite;
     console.log("user is" + usr , password);
    }
}
