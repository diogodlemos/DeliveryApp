import React, { useState, useEffect } from 'react';
import { deleteUser } from '../../api/admin';
import { getAllUsers } from '../../api/register';
import { useUserContext } from '../../context/UserContext';

function UserTable() {
  const [data, setData] = useState();
  const { token } = useUserContext();

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(token, id);

    const { message } = response;

    if (message) {
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    const getAllSellers = async () => {
      const { users } = await getAllUsers(token);

      setData(users);
    };
    getAllSellers();
  }, [data, token]);

  return (
    <div className="container-form">
      <h3>Lista de usuários</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            data
          && data.map(({ id, name, email, role,
          }, index) => (
            <tr key={ id }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${
                  index - 1}` }
              >
                { id }

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${
                  index - 1}` }
              >
                { name }

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${
                  index - 1}` }
              >
                { email }

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${
                  index - 1}` }
              >
                { role }

              </td>
              <td>
                <button
                  className="actions"
                  type="button"
                  style={ { cursor: 'pointer' } }
                  data-testid={ `admin_manage__element-user-table-remove-${index - 1}` }
                  onClick={ () => handleDeleteUser(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
