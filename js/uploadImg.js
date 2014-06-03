function onChooseImage(){
    beforeSubmitImage();
}
//function to check file size before uploading.
function beforeSubmitImage(){
    //check whether browser fully supports all File API
   if (window.File && window.FileReader && window.FileList && window.Blob)
	{
		var fsize = $('#photo_user_id')[0].files[0].size; //get file size
		var ftype = $('#photo_user_id')[0].files[0].type; // get file type
		

		//allow only valid image file types 
		switch(ftype)
        {
            case 'image/png': case 'image/gif': case 'image/jpeg': case 'image/pjpeg':
                break;
            default:
                alert("Unsupported file type!");
				return false
        }
		
		//Allowed file size is less than 1 MB (1048576)
		if(fsize>1048576) 
		{
			alert("Size Image is Too big !");
			return false
		} 
	}
	else
	{
		//Output error to older unsupported browsers that doesn't support HTML5 File API
		alert("Please upgrade your browser, because your current browser lacks some new features we need!");
		return false;
	}
        return true;
}
//function to format bites bit.ly/19yoIPO
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Bytes';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

