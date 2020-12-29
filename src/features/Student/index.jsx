import { Button, Container, Dialog, DialogContent, LinearProgress } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

StudentFeature.propTypes = {};

function StudentFeature(props) {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    _sort: 'updatedAt',
    _order: 'desc',
  });
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await studentApi.getAll(filters);
        setStudentList(data);
      } catch (error) {
        console.log('Failed to fetch student list', error);
      }
    })();
  }, [filters]);

  const handleEditClick = (student) => {
    setSelectedStudent({
      gender: '',
      city: '',
      level: 'junior',
      avatar: '',
      ...student,
    });
    setOpen(true);
  };

  const handleSubmit = async (values) => {
    const isAdd = !selectedStudent;
    if (isAdd) {
      await studentApi.add(values);
      // re-fetch student list with current filters
      setFilters((x) => ({ ...x }));
      setOpen(false);
      return;
    }
    // Truoc tien la` so sanh la` them moi hay sua, neu them thi` chay api add
    // !selectedStudent la` khong co moi add

    // Edit mode
    try {
      setSubmitting(true);

      values.id = selectedStudent.id;
      const updatedStudent = await studentApi.update(values);

      // Update student item
      setStudentList((currentList) => {
        const newList = [...currentList];
        const updatedIdx = newList.findIndex((x) => x.id === selectedStudent.id);
        if (updatedIdx < 0) return currentList;
        // Find item need edit/update with findIndex
        // Check this item have exist? if not, will render previous list

        // clone student item
        newList[updatedIdx] = {
          ...newList[updatedIdx],
          ...updatedStudent,
        };

        return newList;
      });

      setSelectedStudent(null);

      // Close dialog
      setOpen(false);
    } catch (error) {
      console.log('Failed to update student', error);
    }

    // finish loading
    setSubmitting(false);
  };

  // open dialog when click add button
  const handleAddClick = () => setOpen(true);

  // remove one item in list
  const handleRemoveClick = async (student) => {
    try {
      const message = `Are you sure to remove student named "${student.name}" 😥`;
      if (window.confirm(message)) {
        await studentApi.remove(student.id);
        setFilters((x) => ({ ...x }));
      }
    } catch (error) {
      console.log('Failed to remove student: ', error);
    }
  };

  return (
    <Container fixed>
      <h2>STUDENT FEATURE</h2>

      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add new student
      </Button>

      <StudentList data={studentList} onEdit={handleEditClick} onRemove={handleRemoveClick} />

      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {submitting && <LinearProgress />}

        <DialogContent>
          <StudentForm initialValues={selectedStudent} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default StudentFeature;
