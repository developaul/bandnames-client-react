import { useContext } from "react";

import { SocketContext } from '../context/SocketContext';
import { BandList } from "../components/BandList";
import { BandAdd } from "../components/BandAdd";
import { BandChart } from "../components/BandChart";

export const HomePage = () => {

  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {(online)
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="order-1 col-md-8 order-md-0">
          <BandList />
        </div>
        <div className="my-3 col-md-4 my-md-0">
          <BandAdd />
        </div>
      </div>

    </div>
  );
}