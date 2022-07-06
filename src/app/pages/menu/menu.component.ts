import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { CdkDragDrop, moveItemInArray, CdkDrag } from "@angular/cdk/drag-drop";
import { NbDialogRef, NbDialogService } from "@nebular/theme";

@Component({
    selector: "ngx-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
    movies = [
        { name: "Trang chủ", url: "https://www.youtube.com/c/vtv24" },
        { name: "Giới thiệu", url: "https://www.youtube.com/c/vtv24" },
        { name: "Sản Phẩm", url: "https://www.youtube.com/c/vtv24" },
        { name: "Hoạt động", url: "https://www.youtube.com/c/vtv24" },
        { name: "Thư viện", url: "https://www.youtube.com/c/vtv24" },
        { name: "Tuyển dụng", url: "https://www.youtube.com/c/vtv24" },
        { name: "Liên hệ", url: "https://www.youtube.com/c/vtv24" },
    ];
    @ViewChild("dialogEditMenu", { read: TemplateRef })
    dialogEditMenu: TemplateRef<HTMLElement>;
    nameEdit: string;
    nameAdd: string;
    urlNameEdit: string;
    UrlAdd: string;
    constructor(private dialogService: NbDialogService) {}

    ngOnInit(): void {}

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }

    openEditMenu(index: number) {
        this.dialogService.open<any>(this.dialogEditMenu, {
            autoFocus: true,
            context: { indexMenu: index },
        });

        console.log("this.movies[index]", this.movies[index]);
        console.log("index", index);

        // if (!this.nameEdit) {
        this.nameEdit = this.movies[index].name;
        // }
        // if(!this.urlNameEdit) {
        this.urlNameEdit = this.movies[index].url;
        // }
    }

    deleteMenu(index: number, dialog: NbDialogRef<any>) {
        const deleteData = this.movies.filter(
            (i: any, idx: any) => idx !== index
        );
        this.movies = deleteData;
        dialog.close();
    }
    saveMenu(index: number, dialog: NbDialogRef<any>) {
        this.movies[index].name = this.nameEdit;
        this.movies[index].url = this.urlNameEdit;
        dialog.close();
    }
    clickAddName(name: string, UrlAdd: string) {
        console.log("nameAdd", this.nameAdd);
        let addMenu = { name: name, url: UrlAdd };
        this.movies.push(addMenu);
        this.nameAdd = "";
        this.UrlAdd = "";
    }

    // onNameAddMenu(name: string) {
    //     this.nameAdd = name;
    // }

    // onUrlAddMenu(url: string) {
    //     this.UrlAdd = url;
    // }

    saveListMenu() {}
}
