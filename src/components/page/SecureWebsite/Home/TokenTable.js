import React from 'react';
import { Table } from 'react-bootstrap';

const TokenTable = () => {
  return (
    <div>
      <div
        className="p-2 p-md-4 rounded mb-4"
        style={{
          background: 'linear-gradient(135deg, #1C2541, #3A506B, #5BC0BE)',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgb(205, 219, 11)',
        }}
      >
        <Table className="overflow-x-auto mb-0" bordered responsive style={{ color: "black" }}>
          <thead>
            <tr>
              <td style={{ width: "33.33%" }}>
                ACTION
              </td>
              <td style={{ width: "33.33%" }}>
                USDT
              </td>
              <td style={{ width: "33.33%" }}>
                TOKEN
              </td>

            </tr>
          </thead>
          <tbody className="text-white">
            <tr style={{ height: '20px' }}>
              <td style={{ height: '30px' }}></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style={{ height: '30px' }}></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style={{ height: '30px' }}></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style={{ height: '30px' }}></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TokenTable;