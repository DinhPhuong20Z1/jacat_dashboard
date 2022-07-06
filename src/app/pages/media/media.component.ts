import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ngx-media",
    templateUrl: "./media.component.html",
    styleUrls: ["./media.component.scss"],
})
export class MediaComponent implements OnInit {
    fileName = "";
    fileUoload: any;
    files: any = [];
    constructor() {}

    ngOnInit(): void {}

    previewFiles() {
        const preview = document.querySelector("#preview");
        const files = document.querySelector(
            "input[type=file]"
        ) as HTMLInputElement | null;

        function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                const reader = new FileReader();

                reader.addEventListener(
                    "load",
                    function () {
                        const image = new Image();
                        image.height = 180;
                        image.width = 180;
                        image.title = file.name;
                        image.style.boxShadow = "inset 0 0 15px rgb(0 0 0 / 10%), inset 0 0 0 1px rgb(0 0 0 / 5%)"
                        image.style.background = "#eee"
                        image.style.margin = "8px"
                        image.style.position = "relative"
                        image.src = this.result as string;
                        preview.appendChild(image);
                    },
                    false
                );

                reader.readAsDataURL(file);
            }
        }
        if (files.files) {
            [].forEach.call(files.files, readAndPreview);
        }
    }

    dropHandler(ev) {
        console.log("File(s) dropped");

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === "file") {
                    const file = ev.dataTransfer.items[i].getAsFile();
                    console.log("... file[" + i + "].name = " + file.name);

                    const preview = document.querySelector("#preview");
                    const files = document.querySelector(
                        "input[type=file]"
                    ) as HTMLInputElement | null;

                    if (files.files) {
                        [].forEach.call(files.files, readAndPreview());
                    }

                    function readAndPreview() {
                        // Make sure `file.name` matches our extensions criteria
                        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                            const reader = new FileReader();

                            reader.addEventListener(
                                "load",
                                function () {
                                    const image = new Image();
                                    image.height = 180;
                                    image.width = 180;
                                    image.title = file.name;
                                    image.src = this.result as string;
                                    preview.appendChild(image);
                                },
                                false
                            );

                            reader.readAsDataURL(file);
                        }
                    }
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                console.log(
                    "... file[" +
                        i +
                        "].name = " +
                        ev.dataTransfer.files[i].name
                );
            }
        }
    }

    dragOverHandler(ev) {
        console.log("File(s) in drop zone");

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }
}
