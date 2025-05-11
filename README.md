This will start the app on [http://localhost:3000](http://localhost:3000).

---

## Project Structure

- `src/components/StudentList.tsx`: **Main component** that displays the student list and manages add/edit actions.
- `src/components/StudentForm.tsx`: **Drawer form** for creating/editing student records.
- `src/components/DriveList.tsx`: Component for managing and viewing drives.
- `src/components/ReportView.tsx`: Component to generate and display reports.
- `src/types/Student.ts`, `src/types/Drive.ts`, `src/types/Report.ts`: Type definitions for student, drive, and report data.

---

## Usage

- **Add a Student**: Click the "Add Student" button, fill in the form, and submit.
- **Edit a Student**: Click the "Edit" button next to a student, modify the information, and submit.
- **Manage Drives**: Go to the Drives section to add new drives, view details, and associate students.
- **Generate/View Reports**: Use the Reports section to generate and view up-to-date data visualizations on student and drive statistics.
- **Student List**: View all students and their details in the main list.

---

## Additional Improvements

- **Backend Integration**: Connect with an API for persistent storage.
- **Authentication & Authorization**: Restrict access to authorized users.
- **Advanced Validation**: Add robust input validation and error feedback.
- **Delete Functionality**: Allow removal of students, drives, or reports from the list.

---

## Contribution

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

**Manage students, drives, and reports with efficiency and style!**