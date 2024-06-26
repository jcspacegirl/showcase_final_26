// plain javascript

// a validation check for each input
function validation(){
  var surname = document.getElementById("surname").value;
  var forename = document.getElementById("forename").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var subject_description = document.getElementById("subject").value;
  var description = document.getElementById("description").value;
  var invalid = document.getElementById("invalid");

// To produce warning message
  invalid.style.padding = "11px";
  invalid.style.marginTop = "13px";
  invalid.style.marginBottom = "13px";

  var warning_message;
  // surname check
  if (surname.length < 2) {
    warning_message = "Please enter surname with more than 2 characters.";
    invalid.innerHTML = warning_message;
    document.getElementById("surname").style.borderColor = "red";
    document.getElementById("surname").style.borderWidth= "3px";
    return false;
  } else if (!/^[A-Za-z]+$/.test(surname)) {
    warning_message = "Please enter surname English alphabets only.";
    invalid.innerHTML = warning_message;
    document.getElementById("surname").style.borderColor = "red";
    document.getElementById("surname").style.borderWidth= "10px";
    return false;
  } else {
     document.getElementById("surname").style.borderWidth = "0px";
   }

  // forename check
  if (forename.length < 3) {
    warning_message = "Please enter forename with more than 3 characters.";
    invalid.innerHTML = warning_message;
    document.getElementById("forename").style.borderColor = "red";
    document.getElementById("forename").style.borderWidth= "3px";
    return false;
  } else if(!/^[A-Za-z]+$/.test(forename)){
    warning_message = "Please enter forename English alphabets only.";
    invalid.innerHTML = warning_message;
    document.getElementById("forename").style.borderColor = "red";
    document.getElementById("forename").style.borderWidth= "3px";
    return false;
  } else {
     document.getElementById("forename").style.borderWidth = "0px";
   }

  // phone check
  if (!/^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(phone)) {
    // works for +44 (0) 207 111 1111 or 442071111111
    warning_message = "Phone number format must be +## (#) ### ### #### or ############";
    invalid.innerHTML = warning_message;
    document.getElementById("phone").style.borderColor = "red";
    document.getElementById("phone").style.borderWidth= "3px";
    return false;
  } else {
     document.getElementById("phone").style.borderWidth = "0px";
   }

  // email check
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
   warning_message = "The email address provided could not be found. Please try again or provide a different email address.";
   invalid.innerHTML = warning_message;
   document.getElementById("email").style.borderColor = "red";
   document.getElementById("email").style.borderWidth= "3px";
   return false;
  } else {
     document.getElementById("email").style.borderWidth = "0px";
  }

  // subject description check
  if (subject_description.length < 5) {
    warning_message = "Subject Message too vague. Please enter a subject for your message with more than 5 characters.";
    invalid.innerHTML = warning_message;
    document.getElementById("subject").style.borderColor = "red";
    document.getElementById("subject").style.borderWidth= "3px";
    return false;
  } else {
     document.getElementById("subject").style.borderWidth = "0px";
  }

  // description check
  if (description.length < 200) {
    warning_message = "Message is too short. Please enter a message with more than 200 characters.";
    invalid.innerHTML = warning_message;
    document.getElementById("description").style.borderColor = "red";
    document.getElementById("description").style.borderWidth= "3px";
    return false;
  } else {
    document.getElementById("description").style.borderWidth = "0px";
  }

  // radio button check
  const prefer = document.getElementsByName("prefer");
  let selected_pre = false;
  for (const p of prefer) {
    if (p.checked == true) {
      selected_pre = true;
    }
  }

  if (!selected_pre) {
    warning_message = "You have not selected a contact method!";
    invalid.innerHTML = warning_message;
    document.getElementById("communication").style.color = "red";
    return false;
  } else {
    document.getElementById("communication").style.color = "black";
  }

  // An alert on the screen to let the user know the form that has been inputted has worked
  alert("Thank you, your contact form has been submitted!");
  return true;

}


// SAVE CONTACT TO YOUR COMPUTER
  let saveFile = () => {

      // Get the data from each element on the form.
      const surname = document.getElementById('surname');
      const forename = document.getElementById('forename');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const subject_description = document.getElementById('subject');
      const description = document.getElementById("description");
      const prefer = document.getElementsByName("prefer");

      // This variable stores all the data.
      let data =
          '\r surname: ' + surname.value + ' \r\n ' +
          'forename: ' +forename.value + ' \r\n ' +
          'email: ' + email.value + ' \r\n ' +
          'phone: ' + phone.value + ' \r\n ' +
          'subject_description: ' + subject_description.value+ ' \r\n ' +
          'description: ' + description.value + ' \r\n ' +
          'communication: ' + prefer.value;


      const text_to_blob = new Blob([data], { type: 'text/plain' });
      // File to save
      const file_name = 'Contact form for Janice.txt';

      let newLink = document.createElement("a");
      newLink.download = file_name;

      if (window.webkitURL != null) {
          newLink.href = window.webkitURL.createObjectURL(text_to_blob);
      }
      else {
          newLink.href = window.URL.createObjectURL(text_to_blob);
          newLink.style.display = "none";
          document.body.appendChild(newLink);
      }

      newLink.click();
  }
