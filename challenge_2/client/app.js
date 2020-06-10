//Lastly, add a link to download the most recently created CSV report. You can
//choose to make this a server-based or client-based action.

//You are allowed to use jQuery to manipulate the DOM and handle any DOM events.
//You may use jQuery/Ajax only when you get to the step in the basic requirements
//that asks you to do so. For ease of development, be sure to use nodemon to watch
//for changes in your project. Additionally, no CSS styling is necessary. Use the
//browser's default styling for all elements on your page.

//Use the coding best practices you learned previously to ensure a clear separation
//of concerns with well-defined interfaces.


$(document).ready(() => {
  //CONTROLLER
  //event listener for form submission
  const $form = $('#JSON-data-form');
  $form.on('submit', event => {
    event.preventDefault();
    const file = event.target[0].files[0];
    sendRequest.postFile(file);
  });

  const sendRequest = {
    postFile: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      $.ajax({
        url: 'http://127.0.0.1:3000',
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
          console.log('error');
        }
      });
    }
  };
});
