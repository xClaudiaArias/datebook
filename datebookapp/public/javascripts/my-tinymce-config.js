tinymce.init({
    selector: 'textarea#post_data',
    height: 350,
    menubar: false,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 
        'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime' ,'media', 'table' ,'code' ,'help' ,'wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    paste_block_drop: false,
    paste_data_images: true,
    paste_as_text: true,
});