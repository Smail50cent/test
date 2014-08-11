function onChooseImage() {
    beforeSubmitImage();
}
function beforeSubmitImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fsize = $('#photo_user_id')[0].files[0].size; //get file size
        var ftype = $('#photo_user_id')[0].files[0].type; // get file type
        switch (ftype) {
            case 'image/png':
            case 'image/gif':
            case 'image/jpeg':
            case 'image/pjpeg':
                break;
            default:
                alert(strings.getString("type.file.notsupported"));
                return false
        }
        if (fsize > 1048576)
        {
            alert(strings.getString("img.too.big"));
            return false
        }
    } else {
        alert(strings.getString("plz.upgrade.browser"));
        return false;
    }
    return true;
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0)
        return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

