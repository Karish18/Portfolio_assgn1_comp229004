console.log('Goes to the client side');

const { event } = require("jquery");

console.log('app script is working.');


if(getTitle == "Users List")
{
    let deletebutton = document.querySelectorAll('.btn-danger');
    for(button of deletebutton)
    {
        button.addEventListener('click', (event) => {
            if(!confirm("Are you sure you want to delete the user?"))
            {
                event.preventDefault();
            }
        });
    }
}

if(getTitle == "Sign-up Form")
{
    const confirm = document.querySelector('input[name=password_confirm]');
    confirm.addEventListener('change', onChange); 

}


function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=password_confirm]');
    
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
}