import s from "./table.module.scss";
import type { User } from "../../types/common-types.ts";

type Props = {
  users: User[];
  onColumnClick: (value: string) => void;
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  sorted: string;
};

const columns = [
  { name: "Name", value: "name" },
  { name: "Email", value: "email" },
  { name: "Last seen", value: "last_seen" },
  { name: "Status", value: "active" },
];

const formatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const Table = ({
  users,
  onColumnClick,
  selectedIds,
  setSelectedIds,
  sorted,
}: Props) => {
  const handleMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = users.map((user) => user.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowCheckboxChange = (id: number) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((userId) => userId !== id)
      : [...selectedIds, id];

    setSelectedIds(updated);
  };

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;

  const sortIcon = "•";

  const activeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check-circle-fill text-success"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  );

  const banIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-circle-fill text-danger"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
    </svg>
  );

  console.log(users);
  return (
    <div className="border rounded p-3 table-responsive">
      <table className={s.table + " table table-hover align-top"}>
        <thead>
          <tr>
            <th>
              <input
                className="form-check-input"
                type="checkbox"
                checked={isAllSelected}
                onChange={handleMainCheckboxChange}
              />
            </th>
            {columns.map((column) => {
              return (
                <th
                  onClick={() => onColumnClick(column.value)}
                  className="text-nowrap"
                  key={column.value}
                >
                  <button>
                    {column.name} {sorted === column.value && sortIcon}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const formatted = formatter.format(new Date(user.last_seen));

            return (
              <tr key={user.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => handleRowCheckboxChange(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{formatted}</td>
                <td title={user.active ? "active" : "blocked"}>
                  {user.active ? activeIcon : banIcon}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
