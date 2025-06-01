import type { ReactNode } from "react";
import s from "./layout.module.scss";

type Props = {
  children?: ReactNode;
  footer?: ReactNode;
};

export const FormPageLayout = ({ footer, children }: Props) => {
  return (
    <div className="container-fluid">
      <div className={s.row + " row"}>
        <div className=" col-lg-6 d-flex flex-column align-items-center justify-content-center p-5 gap-5">
          <header className="w-100 ">
            <div className="d-flex">
              <img src="/logo.png" alt="Logo" className={s.logo_img} />
              <div className={s.logo_text}>
                <div>The</div>
                <div>App</div>
              </div>
            </div>
          </header>
          <div
            className={
              s.container + " d-flex  flex-grow-1 align-items-center w-100"
            }
          >
            <div className="w-100">{children}</div>
          </div>
          <footer className="d-flex flex-column">
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
              {footer}
            </div>

            <span>To restore the password, contact the administrator.</span>
          </footer>
        </div>
        <div
          className={
            s.bg + " col-md-6  d-none d-lg-inline-block p-0 position-relative"
          }
        >
          <img
            src={"/bg.jpg"}
            alt=""
            className="object-fit-cover w-100 h-100 position-absolute"
          />
        </div>
      </div>
    </div>
  );
};
