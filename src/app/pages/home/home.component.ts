import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbDialogService } from "@nebular/theme";
import { DialogMetaComponent } from "./component/dialog-meta/dialog-meta.component";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "ngx-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    fileName = "";
    fileUoload: any;
    nameWebsite: string;
    titleWebsite: string;
    desWebsite: string;
    fontWebsite: string;
    defaultOption: string;

    options: string[];
    filteredOptions$: Observable<string[]>;
    @ViewChild("autoInput") input;

    constructor(
        private http: HttpClient,
        private dialogService: NbDialogService
    ) {}

    ngOnInit(): void {
        this.options = ["Option 1", "Option 2", "Option 3"];
        this.filteredOptions$ = of(this.options);
        // this.defaultOption = "Option 2"
    }

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
        const usr = this.nameWebsite;
        const password = this.titleWebsite;
        console.log("user is" + usr, password);
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter((optionValue) =>
            optionValue.toLowerCase().includes(filterValue)
        );
    }

    getFilteredOptions(value: string): Observable<string[]> {
        return of(value).pipe(map((filterString) => this.filter(filterString)));
    }

    onChange() {
        this.filteredOptions$ = this.getFilteredOptions(
            this.input.nativeElement.value
        );
    }

    onSelectionChange($event) {
        this.filteredOptions$ = this.getFilteredOptions($event);
    }
}
