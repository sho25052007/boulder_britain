function previewSingle(event) {
    const image = document.getElementById("image");
    const urls = URL.createObjectURL(event.target.files[0]);
    document.getElementById("formFile").innerHTML = '<img src="' + urls + '">';
}