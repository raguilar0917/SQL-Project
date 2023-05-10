// Get references to the tables in the HTML file
const studentTable = document.getElementById('student-table');
const bookTable = document.getElementById('book-table');
const libraryTable = document.getElementById('library-table');
const rentalTable = document.getElementById('rental-table');



// Retrieve data for the Student table
fetch('/get-students')
  .then(response => response.json())
  .then(data => {
    const header = studentTable.createTHead();
    const row = header.insertRow();
    const columns = ['ID', 'First Name', 'Last Name', 'Grade', 'Email', 'Year Enrolled'];
    columns.forEach(column => {
      const cell = row.insertCell();
      cell.innerHTML = column;
    });

    const body = studentTable.createTBody();
    data.forEach(student => {
      const row = body.insertRow();
      const { studentID, firstName, lastName, Grade, Email, yearEnrolled } = student;
      row.insertCell().innerHTML = studentID;
      row.insertCell().innerHTML = firstName;
      row.insertCell().innerHTML = lastName;
      row.insertCell().innerHTML = Grade;
      row.insertCell().innerHTML = Email;
      row.insertCell().innerHTML = yearEnrolled;
    });
  });

// Retrieve data for the Books table
fetch('/get-book')
  .then(response => response.json())
  .then(data => {
    const header = bookTable.createTHead();
    const row = header.insertRow();
    const columns = ['ID', 'Title', 'Author', 'Date Published', 'ISBN', 'Price', 'Available'];
    columns.forEach(column => {
      const cell = row.insertCell();
      cell.innerHTML = column;
    });

    const body = bookTable.createTBody();
    data.forEach(book => {
      const row = body.insertRow();
      const { bookID, Title, Author, DatePublished, ISBN, Price, isAvailable } = book;
      row.insertCell().innerHTML = bookID;
      row.insertCell().innerHTML = Title;
      row.insertCell().innerHTML = Author;
      row.insertCell().innerHTML = new Date(DatePublished).toLocaleDateString();
      row.insertCell().innerHTML = ISBN;
      row.insertCell().innerHTML = `$${Price}`;
      row.insertCell().innerHTML = isAvailable ? 'Yes' : 'No';
    });
  });

// Retrieve data for the Libraries table
fetch('/get-libraries')
  .then(response => response.json())
  .then(data => {
    const header = libraryTable.createTHead();
    const row = header.insertRow();
    const columns = ['ID', 'Name', 'University', 'City', 'Address'];
    columns.forEach(column => {
      const cell = row.insertCell();
      cell.innerHTML = column;
    });

    const body = libraryTable.createTBody();
    data.forEach(library => {
      const row = body.insertRow();
      const { libraryID, libraryName, universityName, City, Address } = library;
      console.log(library)
      row.insertCell().innerHTML = libraryID;
      row.insertCell().innerHTML = libraryName;
      row.insertCell().innerHTML = universityName;
      row.insertCell().innerHTML = City;
      row.insertCell().innerHTML = Address;
    });
  });

// Retrieve data for the Rentals table
fetch('/get-rentals')
  .then(response => response.json())
  .then(data => {
    const header = rentalTable.createTHead();
    const row = header.insertRow();
    const columns = ['ID','Student ID', 'Library ID', 'Book ID', 'Rental Date', 'Due Date'];
    columns.forEach(column => {
    const cell = row.insertCell();
    cell.innerHTML = column;
    });
    const body = rentalTable.createTBody();
  data.forEach(rental => {
  const row = body.insertRow();
  const { rentalID, studentID, libraryID, bookID, rentalDate, dueDate } = rental;
  row.insertCell().innerHTML = rentalID;
  row.insertCell().innerHTML = studentID;
  row.insertCell().innerHTML = libraryID;
  row.insertCell().innerHTML = bookID;
  row.insertCell().innerHTML = new Date(rentalDate).toLocaleDateString();
  row.insertCell().innerHTML = new Date(dueDate).toLocaleDateString();
  });
});
