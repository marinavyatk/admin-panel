import { useEffect, useState, useTransition } from "react";
import type { User } from "../../types/common-types.ts";
import { api } from "../../api/api.ts";
import { Link, useNavigate } from "react-router";
import { paths } from "../../routing/paths.tsx";
import { Toolbar } from "../../components/toolbar/toolbar.tsx";
import { Table } from "../../components/table/table.tsx";
import { toast } from "react-toastify";

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sorted, setSorted] = useState("last_seen");
  const [ascending, setAscending] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const onColumnClick = (value: string) => {
    if (value === sorted) {
      setAscending(!ascending);
    } else {
      setSorted(value);
      setAscending(false);
    }
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        await api.deleteUsers(selectedIds);
        setUsers((prev) =>
          prev.filter((user) => !selectedIds.includes(user.id)),
        );
        setSelectedIds([]);
      } catch (e) {
        navigate(paths.signIn);
        toast.error(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const onBlock = () => {
    startTransition(async () => {
      try {
        await api.updateUserStatus(selectedIds, false);
        setUsers((prev) =>
          prev.map((user) =>
            selectedIds.includes(user.id) ? { ...user, active: false } : user,
          ),
        );
        setSelectedIds([]);
      } catch (e) {
        navigate(paths.signIn);
        toast.error(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const onUnblock = async () => {
    startTransition(async () => {
      try {
        await api.updateUserStatus(selectedIds, true);
        setUsers((prev) =>
          prev.map((user) =>
            selectedIds.includes(user.id) ? { ...user, active: true } : user,
          ),
        );
        setSelectedIds([]);
      } catch (e) {
        navigate(paths.signIn);
        toast.error(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const onFilterChange = (value: string) => {
    setFilter(value);
  };

  const onSignOut = () => {
    api.signOut();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = () => {
      startTransition(async () => {
        try {
          const rawUsers = await api.getUsers({ sorted, ascending, filter });
          setUsers(rawUsers);
        } catch (e) {
          navigate(paths.signIn);
          toast.error(e instanceof Error ? e.message : String(e));
        }
      });
    };
    getUsers();
  }, [sorted, ascending, filter]);

  return (
    <div className="p-2 p-sm-5">
      <div className="d-flex align-items-center justify-content-end mb-5 flex-wrap border-bottom">
        {currentUser}
        <Link to={paths.signIn} className="btn btn-link" onClick={onSignOut}>
          Sign out
        </Link>
      </div>

      <div className="container">
        <div className="d-flex align-items-center gap-3">
          <h1>Admin panel</h1>
          {isPending && (
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <Toolbar
            onFilterChange={onFilterChange}
            onDelete={onDelete}
            onBlock={onBlock}
            onUnblock={onUnblock}
          />
        </div>

        <Table
          users={users}
          onColumnClick={onColumnClick}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          sorted={sorted}
        />
      </div>
    </div>
  );
};
