-- Create Student table
CREATE TABLE Student (
    studentID INT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    Grade INT NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    yearEnrolled INT NOT NULL
);

-- Create Library Person (Librarian) table
CREATE TABLE LibraryPerson (
    staffID INT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateHired DATE NOT NULL
);

-- Create Library table
CREATE TABLE Library (
    libraryID INT PRIMARY KEY,
    libraryName VARCHAR(100) NOT NULL,
    universityName VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL
);

-- Create Book table
CREATE TABLE Book (
    bookID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    DatePublished DATE NOT NULL,
    ISBN VARCHAR(20) UNIQUE NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    isAvailable BOOLEAN NOT NULL
);

-- Create Rental table to track rented books by students
CREATE TABLE Rental (
    rentalID INT PRIMARY KEY,
    studentID INT NOT NULL,
    libraryID INT NOT NULL,
    bookID INT NOT NULL,
    rentalDate DATE NOT NULL,
    dueDate DATE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    FOREIGN KEY (libraryID) REFERENCES Library(libraryID),
    FOREIGN KEY (bookID) REFERENCES Book(bookID)
);

-- Create an index on the Rental table's dueDate column
CREATE INDEX idx_dueDate ON Rental(dueDate);

-- Create a view of overdue rentals
CREATE VIEW OverdueRentals AS
SELECT
    r.rentalID,
    r.studentID,
    s.firstName AS studentFirstName,
    s.lastName AS studentLastName,
    r.libraryID,
    l.libraryName,
    r.bookID,
    b.Title AS bookTitle,
    r.rentalDate,
    r.dueDate
FROM
    Rental r
    JOIN Student s ON r.studentID = s.studentID
    JOIN Library l ON r.libraryID = l.libraryID
    JOIN Book b ON r.bookID = b.bookID
WHERE
    r.dueDate < CURRENT_DATE;

-- Insert sample data into Student table
INSERT INTO Student (studentID, firstName, lastName, Grade, Email, yearEnrolled)
VALUES
(1, 'John', 'Doe', 3, 'john.doe@email.com', 2020),
(2, 'Jane', 'Smith', 2, 'jane.smith@email.com', 2021),
(3, 'Mary', 'Johnson', 4, 'mary.johnson@email.com', 2019);

-- Insert sample data into LibraryPerson table
INSERT INTO LibraryPerson (staffID, firstName, lastName, dateHired)
VALUES
(1, 'Emily', 'Brown', '2018-06-01'),
(2, 'Michael', 'Davis', '2020-03-15');

-- Insert sample data into Library table
INSERT INTO Library (libraryID, libraryName, universityName, City, Address)
VALUES
(1, 'Main Library', 'Example University', 'New York', '123 Main St'),
(2, 'Science Library', 'Example University', 'New York', '456 College Ave');

-- Insert sample data into Book table
INSERT INTO Book (bookID, Title, Author, DatePublished, ISBN, Price, isAvailable)
VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', '9780743273565', 10.99, 1),
(2, 'Moby Dick', 'Herman Melville', '1851-10-18', '9780142437247', 12.99, 1),
(3, 'Pride and Prejudice', 'Jane Austen', '1813-01-28', '9780143105428', 9.99, 0);

-- Insert sample data into Rental table
INSERT INTO Rental (rentalID, studentID, libraryID, bookID, rentalDate, dueDate)
VALUES
(1, 3, 1, 3, '2023-04-15', '2023-05-13');




