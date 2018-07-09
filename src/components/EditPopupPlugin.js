import * as React from "react";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

class EditPopupPlugin extends React.PureComponent {
  render() {
    const { popupComponent: Popup, pathname} = this.props;
    return (
      <Plugin>
        <Template name="editPopup">
          <TemplateConnector>
            {(
              {
                rows,
                getRowId,
                editingRowIds,
                createRowChange,
                rowChanges,
                isColumnEditingEnabled
              },
              { changeRow, commitChangedRows, stopEditRows }
            ) => {
              const rowId = editingRowIds[0];
              const open = editingRowIds.length > 0;
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];

              const changedRow = { ...targetRow, ...rowChanges[rowId] };
              const processValueChange = (fieldName, newValue) => {
                const changeArgs = {
                  rowId,
                  change: createRowChange(changedRow, newValue, fieldName)
                };
                changeRow(changeArgs);
              };
              const applyChanges = () => {
                stopEditRows({ rowIds: editingRowIds });
                commitChangedRows({ rowIds: editingRowIds });
                
              };
              const cancelChanges = () => {
                stopEditRows({ rowIds: editingRowIds });
              };

              return (
                <Popup
                  open={open}
                  pathname={pathname}
                  row={changedRow}
                  onChange={processValueChange}
                  onApplyChanges={applyChanges}
                  onCancelChanges={cancelChanges}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="root">
          <TemplatePlaceholder />
          <TemplatePlaceholder name="editPopup" />
        </Template>
      </Plugin>
    );
  }
}

export default EditPopupPlugin;
