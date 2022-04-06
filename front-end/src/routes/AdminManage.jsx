import React, { useState } from 'react';
import UserForm from '../components/manage/UserForm';
import ErrorModal from '../components/common/ErrorModal';
import UserTable from '../components/manage/UserTable';
import '../styles/manage.css';
import UserNavbar from '../components/manage/UserNavBar';

function AdminManage() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="content-main">
      <UserNavbar />
      <UserForm setErrorMessage={ setErrorMessage } />
      <ErrorModal
        errorMessage={ errorMessage }
        setErrorMessage={ setErrorMessage }
        testId="admin_manage__element-invalid-register"
      />
      <UserTable />
    </div>
  );
}

export default AdminManage;
