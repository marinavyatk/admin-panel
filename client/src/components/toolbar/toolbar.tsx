import s from "./toolbar.module.scss";
import { DebouncedInput } from "../debaunced-input/debaunced-input.tsx";

type Props = {
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onFilterChange: (filter: string) => void;
};

export const Toolbar = ({
  onFilterChange,
  onDelete,
  onUnblock,
  onBlock,
}: Props) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between p-3  gap-3 border rounded bg-light">
      <div className="d-flex gap-3">
        <button className="btn btn-outline-primary" onClick={onBlock}>
          Block{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lock-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
            />
          </svg>
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={onUnblock}
          aria-label={"unblock"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-unlock-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 0a4 4 0 0 1 4 4v2.5h-1V4a3 3 0 1 0-6 0v2h.5A2.5 2.5 0 0 1 12 8.5v5A2.5 2.5 0 0 1 9.5 16h-7A2.5 2.5 0 0 1 0 13.5v-5A2.5 2.5 0 0 1 2.5 6H8V4a4 4 0 0 1 4-4"
            />
          </svg>
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={onDelete}
          aria-label={"delete"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
        </button>
      </div>

      <DebouncedInput
        onChange={onFilterChange}
        className={s.filter + " form-control"}
        placeholder={"Search by name"}
      />
    </div>
  );
};
