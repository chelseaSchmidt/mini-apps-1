$(document).ready(() => {
  //Listen for form submission
  const $form = $('#JSON-data-form');
  $form.on('submit', event => {
    event.preventDefault();
    const file = event.target[0].files[0];
    sendRequest.postFile(file);
  });

  //AJAX request to server upon form submission
  const sendRequest = {
    postFile: (file) => {
      const $downloadLink = $('#download');
      const formData = new FormData();
      formData.append('file', file);
      $.ajax({
        url: 'http://127.0.0.1:3000/converted.csv',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
          event.preventDefault();
          console.log(data);
        },
        error: (error) => {
          event.preventDefault();
          console.error('error');
        }
      });
    }
  };
});
