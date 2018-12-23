const url = 'http://aws.random.cat/meow';

$('#btn').click( () => {

  $.getJSON(url)
  .done ( (data) => {
    $('#photo').attr('src', data.file);
  })
  .fail ( () => {
    console.log('Error!');
  } )

})