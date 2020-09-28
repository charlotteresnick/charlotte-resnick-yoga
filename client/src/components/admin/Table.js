import React from "react";
import MUIDataTable from "mui-datatables";

const Table = ({ columns, data, onRowClick, title, customToolbar }) => {
  const options = {
    filterType: "checkbox",
    tableBodyMaxHeight: "60vh",
    responsive: "standard",
    selectableRows: "none",
    tableBodyHeight: "500px",
    onRowClick: onRowClick,
    print: false,
    download: false,
    draggableColumns: {
      enabled: true,
    },
    customToolbar,
  };
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default Table;
